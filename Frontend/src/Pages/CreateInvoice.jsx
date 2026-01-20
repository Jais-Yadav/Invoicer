import React, { useEffect, useState, useCallback } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { useAuth } from "@clerk/clerk-react";
import StatusBadge from "../Components/StatusBadge";
import {
  createInvoiceStyles,
  createInvoiceIconColors,
  createInvoiceCustomStyles,
} from "../assets/dummyStyles";

/* ---------- API BASE ---------- */
const API_BASE = "http://localhost:4000";

/* ---------- storage helpers (unchanged) ---------- */
/* ----------------- frontend-only: normalize image URLs ----------------- */
function resolveImageUrl(url) {
  if (!url) return null;
  const s = String(url).trim();

  // keep data/blobs as-is
  if (s.startsWith("data:") || s.startsWith("blob:")) return s;

  // absolute http(s)
  if (/^https?:\/\//i.test(s)) {
    try {
      const parsed = new URL(s);
      if (parsed.hostname === "localhost" || parsed.hostname === "127.0.0.1") {
        // rewrite localhost -> API_BASE (preserve path/search/hash)
        const path =
          parsed.pathname + (parsed.search || "") + (parsed.hash || "");
        return `${API_BASE.replace(/\/+$/, "")}${path}`;
      }
      return parsed.href;
    } catch (e) {
      // fall through to relative handling
    }
  }

  // relative paths like "/uploads/..." or "uploads/..." -> prefix with API_BASE
  return `${API_BASE.replace(/\/+$/, "")}/${s.replace(/^\/+/, "")}`;
}

function readJSON(key, fallback = null) {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return fallback;
    return JSON.parse(raw);
  } catch {
    return fallback;
  }
}
function writeJSON(key, val) {
  try {
    localStorage.setItem(key, JSON.stringify(val));
  } catch {}
}

/* ---------- local invoices helpers (fallback) ---------- */
function getStoredInvoices() {
  return readJSON("invoices_v1", []) || [];
}
function saveStoredInvoices(arr) {
  writeJSON("invoices_v1", arr);
}

/* ---------- util ---------- */
function uid() {
  try {
    if (typeof crypto !== "undefined" && crypto.randomUUID)
      return crypto.randomUUID();
  } catch {}
  return Math.random().toString(36).slice(2, 9);
}
function currencyFmt(amount = 0, currency = "INR") {
  try {
    if (currency === "INR") {
      return new Intl.NumberFormat("en-IN", {
        style: "currency",
        currency: "INR",
      }).format(amount);
    }
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount);
  } catch {
    return `${currency} ${amount}`;
  }
}
function computeTotals(items = [], taxPercent = 0) {
  const safe = Array.isArray(items) ? items.filter(Boolean) : [];
  const subtotal = safe.reduce(
    (s, it) => s + Number(it.qty || 0) * Number(it.unitPrice || 0),
    0
  );
  const tax = (subtotal * Number(taxPercent || 0)) / 100;
  const total = subtotal + tax;
  return { subtotal, tax, total };
}

/* ---------- helper: convert dataURL to File ---------- */
function dataURLtoFile(dataurl, filename = "file") {
  if (!dataurl || dataurl.indexOf(",") === -1) return null;
  const arr = dataurl.split(",");
  const mimeMatch = arr[0].match(/:(.*?);/);
  const mime = mimeMatch ? mimeMatch[1] : "application/octet-stream";
  const bstr = atob(arr[1]);
  let n = bstr.length;
  const u8arr = new Uint8Array(n);
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }
  try {
    return new File([u8arr], filename, { type: mime });
  } catch {
    const blob = new Blob([u8arr], { type: mime });
    blob.name = filename;
    return blob;
  }
}

/* ---------- icons ---------- (kept same as before) */
const PreviewIcon = ({ className = "w-4 h-4" }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
  >
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
    <circle cx="12" cy="12" r="3" />
  </svg>
);
const SaveIcon = ({ className = "w-4 h-4" }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
  >
    <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z" />
    <polyline points="17 21 17 13 7 13 7 21" />
    <polyline points="7 3 7 8 15 8" />
  </svg>
);
const UploadIcon = ({ className = "w-4 h-4" }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
  >
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
    <polyline points="17 8 12 3 7 8" />
    <line x1="12" y1="3" x2="12" y2="15" />
  </svg>
);
const DeleteIcon = ({ className = "w-4 h-4" }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
  >
    <path d="M3 6h18M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
  </svg>
);
const AddIcon = ({ className = "w-4 h-4" }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
  >
    <path d="M12 5v14m-7-7h14" />
  </svg>
);

/* ---------- Component (Create / Edit Invoice) ---------- */
export default function CreateInvoice() {
  const navigate = useNavigate();
  const { id } = useParams(); // if editing, id will be present
  const loc = useLocation();
  const invoiceFromState =
    loc.state && loc.state.invoice ? loc.state.invoice : null;
  const isEditing = Boolean(id && id !== "new");

  // Clerk auth hooks
  const { getToken, isSignedIn } = useAuth();

  // helper to obtain token with a retry
  const obtainToken = useCallback(async () => {
    if (typeof getToken !== "function") return null;
    try {
      let token = await getToken({ template: "default" }).catch(() => null);
      if (!token) {
        token = await getToken({ forceRefresh: true }).catch(() => null);
      }
      return token;
    } catch (err) {
      return null;
    }
  }, [getToken]);

  // invoice & items state
  function buildDefaultInvoice() {
    // Use a safe client-side local id for previews and local storage.
    const localId = uid();
    return {
      id: localId, // local preview id (server will return _id after save)
      invoiceNumber: "", // will be set on creation by generator
      issueDate: new Date().toISOString().slice(0, 10),
      dueDate: "",
      fromBusinessName: "",
      fromEmail: "",
      fromAddress: "",
      fromPhone: "",
      fromGst: "",
      client: { name: "", email: "", address: "", phone: "" },
      items: [
        { id: uid(), description: "Service / Item", qty: 1, unitPrice: 0 },
      ],
      currency: "INR",
      status: "draft",
      stampDataUrl: null,
      signatureDataUrl: null,
      logoDataUrl: null,
      signatureName: "",
      signatureTitle: "",
      // leave taxPercent undefined so business profile default can fill it
      taxPercent: undefined,
      notes: "",
    };
  }

  const [invoice, setInvoice] = useState(() => buildDefaultInvoice());
  const [items, setItems] = useState(invoice.items || []);
  const [loading, setLoading] = useState(false);

  // profile fetched from server
  const [profile, setProfile] = useState(null);

  /* ---------- helpers for invoice editing ---------- */
  function updateInvoiceField(field, value) {
    setInvoice((inv) => (inv ? { ...inv, [field]: value } : inv));
  }
  function updateClient(field, value) {
    setInvoice((inv) =>
      inv ? { ...inv, client: { ...(inv.client || {}), [field]: value } } : inv
    );
  }

  function updateItem(idx, key, value) {
    setItems((arr) => {
      const copy = arr.slice();
      const it = { ...(copy[idx] || {}) };
      if (key === "description") it.description = value;
      else it[key] = Number(value) || 0;
      copy[idx] = it;
      setInvoice((inv) => (inv ? { ...inv, items: copy } : inv));
      return copy;
    });
  }
  function addItem() {
    const it = { id: uid(), description: "", qty: 1, unitPrice: 0 };
    setItems((arr) => {
      const next = [...arr, it];
      setInvoice((inv) => (inv ? { ...inv, items: next } : inv));
      return next;
    });
  }
  function removeItem(idx) {
    setItems((arr) => {
      const next = arr.filter((_, i) => i !== idx);
      setInvoice((inv) => (inv ? { ...inv, items: next } : inv));
      return next;
    });
  }

  /* status & currency handlers */
  function handleStatusChange(newStatus) {
    setInvoice((inv) => (inv ? { ...inv, status: newStatus } : inv));
  }
  function handleCurrencyChange(newCurrency) {
    setInvoice((inv) => (inv ? { ...inv, currency: newCurrency } : inv));
  }

  /* images - keep as data URLs in the invoice object */
  function handleImageUpload(file, kind = "logo") {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (e) => {
      const dataUrl = e.target.result;
      setInvoice((inv) =>
        inv
          ? {
              ...inv,
              [`${kind}DataUrl`]: dataUrl,
              ...(kind === "logo" ? { logoDataUrl: dataUrl } : {}),
            }
          : inv
      );
    };
    reader.readAsDataURL(file);
  }
  function removeImage(kind = "logo") {
    setInvoice((inv) =>
      inv
        ? {
            ...inv,
            [`${kind}DataUrl`]: null,
            ...(kind === "logo" ? { logoDataUrl: null } : {}),
          }
        : inv
    );
  }

  /* ---------- helper: check candidate invoiceNumber exists on server/local ---------- */
  const checkInvoiceExists = useCallback(
    async (candidate) => {
      // Check local storage first
      const local = getStoredInvoices();
      if (local.some((x) => x && x.invoiceNumber === candidate)) return true;

      // If we have token, ask server
      try {
        const token = await obtainToken();
        const headers = { Accept: "application/json" };
        if (token) headers["Authorization"] = `Bearer ${token}`;

        const res = await fetch(
          `${API_BASE}/api/invoice?invoiceNumber=${encodeURIComponent(
            candidate
          )}`,
          { method: "GET", headers }
        );
        if (!res.ok) {
          // if unauthorized or server error, treat as "not found" to avoid blocking generation;
          // collisions will still be caught on save (server returns 409).
          return false;
        }
        const json = await res.json().catch(() => null);
        const data = json?.data || json || [];
        if (Array.isArray(data) && data.length > 0) return true;
        return false;
      } catch (err) {
        // network / other error -> assume not exists (we rely on server-side check on save)
        return false;
      }
    },
    [obtainToken]
  );

  /* ---------- generator: create a candidate and ensure uniqueness (tries up to N times) ---------- */
  const generateUniqueInvoiceNumber = useCallback(
    async (attempts = 10) => {
      for (let i = 0; i < attempts; i++) {
        const datePart = new Date()
          .toISOString()
          .slice(0, 10)
          .replace(/-/g, "");
        const rand = Math.floor(Math.random() * 9000) + 1000; // 4 digit
        const candidate = `INV-${datePart}-${rand}`;
        // quick local check first
        const exists = await checkInvoiceExists(candidate);
        if (!exists) return candidate;
        // else loop to try again
      }
      // fallback: use uid suffix if all attempts collide (very unlikely)
      return `INV-${new Date()
        .toISOString()
        .slice(0, 10)
        .replace(/-/g, "")}-${uid().slice(0, 4)}`;
    },
    [checkInvoiceExists]
  );

  /* ---------- fetch business profile as soon as page loads (when signed in) ---------- */
  useEffect(() => {
    let mounted = true;

    async function fetchBusinessProfile() {
      if (!isSignedIn) return;
      try {
        const token = await obtainToken();
        if (!token) return;
        const res = await fetch(`${API_BASE}/api/businessProfile/me`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
          },
        });
        if (!res.ok) {
          // don't throw — just ignore profile if not accessible
          return;
        }
        const json = await res.json().catch(() => null);
        const data = json?.data || json || null;
        if (!data || !mounted) return;

        const serverProfile = {
          businessName: data.businessName ?? "",
          email: data.email ?? "",
          address: data.address ?? "",
          phone: data.phone ?? "",
          gst: data.gst ?? "",
          defaultTaxPercent: data.defaultTaxPercent ?? 18,
          signatureOwnerName: data.signatureOwnerName ?? "",
          signatureOwnerTitle: data.signatureOwnerTitle ?? "",
          logoUrl: data.logoUrl ?? null,
          stampUrl: data.stampUrl ?? null,
          signatureUrl: data.signatureUrl ?? null,
        };

        setProfile(serverProfile);

        // Merge into invoice only if those invoice fields are empty/unset
        setInvoice((prev) => {
          if (!prev) return prev;
          const shouldOverwriteBusinessName =
            !prev.fromBusinessName || prev.fromBusinessName.trim() === "";
          const shouldOverwriteEmail =
            !prev.fromEmail || prev.fromEmail.trim() === "";
          const shouldOverwriteAddress =
            !prev.fromAddress || prev.fromAddress.trim() === "";
          const shouldOverwritePhone =
            !prev.fromPhone || prev.fromPhone.trim() === "";
          const shouldOverwriteGst =
            !prev.fromGst || prev.fromGst.trim() === "";

          const merged = {
            ...prev,
            fromBusinessName: shouldOverwriteBusinessName
              ? serverProfile.businessName
              : prev.fromBusinessName,
            fromEmail: shouldOverwriteEmail
              ? serverProfile.email
              : prev.fromEmail,
            fromAddress: shouldOverwriteAddress
              ? serverProfile.address
              : prev.fromAddress,
            fromPhone: shouldOverwritePhone
              ? serverProfile.phone
              : prev.fromPhone,
            fromGst: shouldOverwriteGst ? serverProfile.gst : prev.fromGst,
            logoDataUrl:
              prev.logoDataUrl ||
              resolveImageUrl(serverProfile.logoUrl) ||
              null,
            stampDataUrl:
              prev.stampDataUrl ||
              resolveImageUrl(serverProfile.stampUrl) ||
              null,
            signatureDataUrl:
              prev.signatureDataUrl ||
              resolveImageUrl(serverProfile.signatureUrl) ||
              null,
            signatureName:
              prev.signatureName || serverProfile.signatureOwnerName || "",
            signatureTitle:
              prev.signatureTitle || serverProfile.signatureOwnerTitle || "",
            taxPercent:
              prev && prev.taxPercent !== undefined && prev.taxPercent !== null
                ? prev.taxPercent
                : serverProfile.defaultTaxPercent,
          };

          return merged;
        });
      } catch (err) {
        console.warn("Failed to fetch business profile:", err);
      }
    }

    fetchBusinessProfile();

    return () => {
      mounted = false;
    };
  }, [isSignedIn, obtainToken]);

  /* ---------- load invoice when editing (server first, fallback local) ---------- */
  useEffect(() => {
    let mounted = true;

    async function prepare() {
      // If AI/Gemini passed an invoice via location.state
      if (invoiceFromState) {
        // merge then normalize any image URLs that may be `http://localhost:...`
        const base = { ...buildDefaultInvoice(), ...invoiceFromState };

        base.logoDataUrl =
          resolveImageUrl(base.logoDataUrl ?? base.logoUrl ?? base.logo) ||
          null;
        base.stampDataUrl =
          resolveImageUrl(base.stampDataUrl ?? base.stampUrl ?? base.stamp) ||
          null;
        base.signatureDataUrl =
          resolveImageUrl(
            base.signatureDataUrl ?? base.signatureUrl ?? base.signature
          ) || null;

        setInvoice(base);

        setItems(
          Array.isArray(invoiceFromState.items)
            ? invoiceFromState.items.slice()
            : invoiceFromState.items
            ? [...invoiceFromState.items]
            : buildDefaultInvoice().items
        );

        return;
      }

      // If editing and no invoiceFromState then fetch from server (or local fallback)
      if (isEditing && !invoiceFromState) {
        setLoading(true);
        try {
          const token = await obtainToken();
          const headers = { Accept: "application/json" };
          if (token) headers["Authorization"] = `Bearer ${token}`;

          const res = await fetch(`${API_BASE}/api/invoice/${id}`, {
            method: "GET",
            headers,
          });
          if (res.ok) {
            const json = await res.json().catch(() => null);
            const data = json?.data || json || null;
            if (data && mounted) {
              const merged = { ...buildDefaultInvoice(), ...data };
              merged.id = data._id ?? data.id ?? merged.id;
              merged.invoiceNumber = data.invoiceNumber ?? merged.invoiceNumber;

              // normalize server-returned image fields (rewrite localhost/relative -> API_BASE)
              merged.logoDataUrl =
                resolveImageUrl(
                  data.logoDataUrl ?? data.logoUrl ?? data.logo
                ) ||
                merged.logoDataUrl ||
                null;
              merged.stampDataUrl =
                resolveImageUrl(
                  data.stampDataUrl ?? data.stampUrl ?? data.stamp
                ) ||
                merged.stampDataUrl ||
                null;
              merged.signatureDataUrl =
                resolveImageUrl(
                  data.signatureDataUrl ?? data.signatureUrl ?? data.signature
                ) ||
                merged.signatureDataUrl ||
                null;

              setInvoice(merged);
              setItems(
                Array.isArray(data.items) ? data.items.slice() : merged.items
              );
              setLoading(false);
              return;
            }
          }
        } catch (err) {
          // ignore and fallback
          console.warn(
            "Server invoice fetch failed, will fallback to local:",
            err
          );
        } finally {
          setLoading(false);
        }

        // fallback to local storage
        const all = getStoredInvoices();
        const found = all.find(
          (x) => x && (x.id === id || x._id === id || x.invoiceNumber === id)
        );
        if (found && mounted) {
          const fixed = { ...buildDefaultInvoice(), ...found };

          fixed.logoDataUrl =
            resolveImageUrl(found.logoDataUrl ?? found.logoUrl ?? found.logo) ||
            fixed.logoDataUrl ||
            null;
          fixed.stampDataUrl =
            resolveImageUrl(
              found.stampDataUrl ?? found.stampUrl ?? found.stamp
            ) ||
            fixed.stampDataUrl ||
            null;
          fixed.signatureDataUrl =
            resolveImageUrl(
              found.signatureDataUrl ?? found.signatureUrl ?? found.signature
            ) ||
            fixed.signatureDataUrl ||
            null;

          setInvoice(fixed);
          setItems(
            Array.isArray(found.items)
              ? found.items.slice()
              : buildDefaultInvoice().items
          );
        }

        return;
      }

      // Creating new (neither editing nor invoiceFromState)
      // Build default invoice then generate unique invoiceNumber and set it
      setInvoice((prev) => ({ ...buildDefaultInvoice(), ...prev }));
      setItems(buildDefaultInvoice().items);

      // generate unique invoice number for new invoices
      if (!isEditing) {
        try {
          const candidate = await generateUniqueInvoiceNumber(10);
          if (mounted) {
            setInvoice((inv) =>
              inv ? { ...inv, invoiceNumber: candidate } : inv
            );
          }
        } catch (err) {
          // ignore, keep empty (server will handle on save)
          console.warn("Invoice number generation failed:", err);
        }
      }
    }

    prepare();

    return () => {
      mounted = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    id,
    invoiceFromState,
    isEditing,
    obtainToken,
    generateUniqueInvoiceNumber,
  ]);

  /* ---------- Save invoice to backend (POST or PUT) using Clerk token ---------- */
  async function handleSave() {
    if (!invoice) return;
    setLoading(true);

    try {
      // Build prepared object but OMIT invoiceNumber when empty so server auto-generates.
      const prepared = {
        issueDate: invoice.issueDate || "",
        dueDate: invoice.dueDate || "",
        fromBusinessName: invoice.fromBusinessName || "",
        fromEmail: invoice.fromEmail || "",
        fromAddress: invoice.fromAddress || "",
        fromPhone: invoice.fromPhone || "",
        fromGst: invoice.fromGst || "",
        client: invoice.client || {},
        items: items || [],
        currency: invoice.currency || "INR",
        status: invoice.status || "draft",
        taxPercent: Number(invoice.taxPercent ?? 18),
        subtotal: computeTotals(items, invoice.taxPercent).subtotal,
        tax: computeTotals(items, invoice.taxPercent).tax,
        total: computeTotals(items, invoice.taxPercent).total,
        logoDataUrl: invoice.logoDataUrl || null,
        stampDataUrl: invoice.stampDataUrl || null,
        signatureDataUrl: invoice.signatureDataUrl || null,
        signatureName: invoice.signatureName || "",
        signatureTitle: invoice.signatureTitle || "",
        notes: invoice.notes || "",
        localId: invoice.id,
      };

      // include invoiceNumber only if provided (we prefill for new invoices)
      if (
        invoice.invoiceNumber &&
        String(invoice.invoiceNumber).trim().length > 0
      ) {
        prepared.invoiceNumber = String(invoice.invoiceNumber).trim();
      }

      const endpoint =
        isEditing && invoice.id
          ? `${API_BASE}/api/invoice/${invoice.id}`
          : `${API_BASE}/api/invoice`;
      const method = isEditing && invoice.id ? "PUT" : "POST";

      // try to obtain Clerk token; if present include Authorization
      const token = await obtainToken();
      const headers = { "Content-Type": "application/json" };
      if (token) headers["Authorization"] = `Bearer ${token}`;

      const res = await fetch(endpoint, {
        method,
        headers,
        body: JSON.stringify(prepared),
      });

      // handle conflict (409) when user supplied invoiceNumber already exists
      if (res.status === 409) {
        const json = await res.json().catch(() => null);
        const message = json?.message || "Invoice number already exists.";
        // Let the user decide — do not auto-retry; they may want to pick a different number.
        throw new Error(message);
      }

      const json = await res.json().catch(() => null);
      if (!res.ok) {
        const msg = json?.message || `Save failed (${res.status})`;
        throw new Error(msg);
      }

      const saved = json?.data || json || null;
      const savedId = saved?._id ?? saved?.id ?? invoice.id;

      // Use server-provided invoiceNumber (if server generated one)
      const merged = {
        ...prepared,
        id: savedId,
        invoiceNumber:
          saved?.invoiceNumber ??
          prepared.invoiceNumber ??
          invoice.invoiceNumber,
        subtotal: saved?.subtotal ?? prepared.subtotal,
        tax: saved?.tax ?? prepared.tax,
        total: saved?.total ?? prepared.total,
      };

      setInvoice((inv) => ({ ...inv, ...merged }));
      setItems(Array.isArray(saved?.items) ? saved.items : items);

      // update local stored invoices (keep local fallback in sync)
      const all = getStoredInvoices();
      if (isEditing) {
        const idx = all.findIndex(
          (x) =>
            x &&
            (x.id === invoice.id ||
              x._id === invoice.id ||
              x.invoiceNumber === invoice.invoiceNumber)
        );
        if (idx >= 0) all[idx] = merged;
        else all.unshift(merged);
      } else {
        // For newly created, use server's invoiceNumber/id if provided
        all.unshift(merged);
      }
      saveStoredInvoices(all);

      alert(`Invoice ${isEditing ? "updated" : "created"} successfully.`);
      navigate("/app/invoices");
    } catch (err) {
      console.error("Failed to save invoice to server:", err);

      // If it was a 409 conflict (duplicate invoice number provided by user), show message and let user fix.
      if (
        String(err?.message || "")
          .toLowerCase()
          .includes("invoice number")
      ) {
        alert(err.message || "Invoice number already exists. Choose another.");
        setLoading(false);
        return;
      }

      // fallback: save locally
      try {
        const all = getStoredInvoices();
        const preparedLocal = {
          ...invoice,
          items,
          subtotal: computeTotals(items, invoice.taxPercent).subtotal,
          tax: computeTotals(items, invoice.taxPercent).tax,
          total: computeTotals(items, invoice.taxPercent).total,
        };
        if (isEditing) {
          const idx = all.findIndex(
            (x) =>
              x &&
              (x.id === invoice.id ||
                x._id === invoice.id ||
                x.invoiceNumber === invoice.invoiceNumber)
          );
          if (idx >= 0) all[idx] = preparedLocal;
          else all.unshift(preparedLocal);
        } else {
          all.unshift(preparedLocal);
        }
        saveStoredInvoices(all);
        alert("Saved locally as fallback (server error).");
        navigate("/app/invoices");
      } catch (localErr) {
        console.error("Local fallback failed:", localErr);
        alert(err?.message || "Save failed. See console.");
      }
    } finally {
      setLoading(false);
    }
  }

  function handlePreview() {
    const prepared = {
      ...invoice,
      items,
      subtotal: computeTotals(items, invoice.taxPercent).subtotal,
      tax: computeTotals(items, invoice.taxPercent).tax,
      total: computeTotals(items, invoice.taxPercent).total,
    };
    navigate(`/app/invoices/${invoice.id}/preview`, {
      state: { invoice: prepared },
    });
  }

  const totals = computeTotals(items, invoice?.taxPercent ?? 18);

  /* ---------- JSX (kept structure, invoiceNumber input prefills generated value) ---------- */
  return (
    <div className={createInvoiceStyles.pageContainer}>
      {/* Header Section */}
      <div className={createInvoiceStyles.headerContainer}>
        <div>
          <h1 className={createInvoiceStyles.headerTitle}>
            {isEditing ? "Edit Invoice" : "Create New Invoice"}
          </h1>
          <p className={createInvoiceStyles.headerSubtitle}>
            {isEditing
              ? "Update invoice details and items below"
              : "Fill in invoice details, add line items, and configure branding"}
          </p>
        </div>

        <div className={createInvoiceStyles.headerButtonContainer}>
          <button
            onClick={handlePreview}
            className={createInvoiceStyles.previewButton}
          >
            <PreviewIcon className="w-4 h-4" />
            Preview
          </button>
          <button
            onClick={handleSave}
            disabled={loading}
            className={createInvoiceStyles.saveButton}
          >
            <SaveIcon className="w-4 h-4" />
            {loading
              ? "Saving..."
              : isEditing
              ? "Update Invoice"
              : "Create Invoice"}
          </button>
        </div>
      </div>
      {/* Invoice Header Section */}
      <div className={createInvoiceStyles.cardContainer}>
        <div className={createInvoiceStyles.cardHeaderContainer}>
          <div
            className={`${createInvoiceStyles.cardIconContainer} ${createInvoiceIconColors.invoice}`}
          >
            <svg
              className="w-5 h-5"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
              <polyline points="14 2 14 8 20 8" />
              <line x1="16" y1="13" x2="8" y2="13" />
              <line x1="16" y1="17" x2="8" y2="17" />
              <polyline points="10 9 9 9 8 9" />
            </svg>
          </div>
          <h2 className={createInvoiceStyles.cardTitle}>Invoice Details</h2>
        </div>

        <div className={createInvoiceStyles.gridCols3}>
          <div>
            <label className={createInvoiceStyles.label}>Invoice Number</label>
            <input
              value={invoice?.invoiceNumber || ""}
              onChange={(e) =>
                updateInvoiceField("invoiceNumber", e.target.value)
              }
              className={createInvoiceStyles.inputMedium}
            />
          </div>

          <div>
            <label className={createInvoiceStyles.label}>Invoice Date</label>
            <input
              type="date"
              value={invoice?.issueDate || ""}
              onChange={(e) => updateInvoiceField("issueDate", e.target.value)}
              className={createInvoiceStyles.input}
            />
          </div>

          <div>
            <label className={createInvoiceStyles.label}>Due Date</label>
            <input
              type="date"
              value={invoice?.dueDate || ""}
              onChange={(e) => updateInvoiceField("dueDate", e.target.value)}
              className={createInvoiceStyles.input}
            />
          </div>
        </div>

        {/* Currency and Status Section */}
        <div className={createInvoiceStyles.currencyStatusGrid}>
          {/* Currency Selection */}
          <div>
            <label className={createInvoiceStyles.labelWithMargin}>
              Currency
            </label>
            <div className={createInvoiceStyles.currencyContainer}>
              <button
                onClick={() => handleCurrencyChange("INR")}
                className={`${createInvoiceStyles.currencyButton} ${
                  invoice.currency === "INR"
                    ? createInvoiceStyles.currencyButtonActive1
                    : createInvoiceStyles.currencyButtonInactive
                }`}
              >
                <span className={createInvoiceCustomStyles.currencySymbol}>
                  ₹
                </span>
                <div className="text-left">
                  <div className="font-medium">Indian Rupee</div>
                  <div className="text-xs opacity-70">INR</div>
                </div>
              </button>

              <button
                onClick={() => handleCurrencyChange("USD")}
                className={`${createInvoiceStyles.currencyButton} ${
                  invoice.currency === "USD"
                    ? createInvoiceStyles.currencyButtonActive2
                    : createInvoiceStyles.currencyButtonInactive
                }`}
              >
                <span className={createInvoiceCustomStyles.currencySymbol}>
                  $
                </span>
                <div className="text-left">
                  <div className="font-medium">US Dollar</div>
                  <div className="text-xs opacity-70">USD</div>
                </div>
              </button>
            </div>
          </div>

          {/* Status Selection */}
          <div>
            <label className={createInvoiceStyles.labelWithMargin}>
              Status
            </label>
            <div className={createInvoiceStyles.statusContainer}>
              {[
                { value: "draft", label: "Draft" },
                { value: "unpaid", label: "Unpaid" },
                { value: "paid", label: "Paid" },
                { value: "overdue", label: "Overdue" },
              ].map((status) => (
                <button
                  key={status.value}
                  onClick={() => handleStatusChange(status.value)}
                  className={`${createInvoiceStyles.statusButton} ${
                    invoice.status === status.value
                      ? createInvoiceStyles.statusButtonActive
                      : createInvoiceStyles.statusButtonInactive
                  }`}
                >
                  <StatusBadge
                    status={status.label}
                    size="default"
                    showIcon={true}
                  />
                </button>
              ))}
            </div>

            <div className={createInvoiceStyles.statusDropdown}>
              <select
                value={invoice.status}
                onChange={(e) => handleStatusChange(e.target.value)}
                className="w-full"
              >
                <option value="draft">Draft</option>
                <option value="unpaid">Unpaid</option>
                <option value="paid">Paid</option>
                <option value="overdue">Overdue</option>
              </select>
            </div>
          </div>
        </div>
      </div>
      {/* Main Content Grid - left & right columns remain unchanged except they use `invoice` state */}
      <div className={createInvoiceStyles.mainGrid}>
        <div className={createInvoiceStyles.leftColumn}>
          {/* Bill From */}
          <div className={createInvoiceStyles.cardContainer}>
            <div className={createInvoiceStyles.cardHeaderWithButton}>
              <div className={createInvoiceStyles.cardHeaderLeft}>
                <div
                  className={`${createInvoiceStyles.cardIconContainer} ${createInvoiceIconColors.billFrom}`}
                >
                  <svg
                    className="w-5 h-5"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                    <circle cx="12" cy="7" r="4" />
                  </svg>
                </div>
                <h3 className={createInvoiceStyles.cardTitle}>Bill From</h3>
              </div>
              {/* Save as Profile button removed */}
            </div>

            <div className={createInvoiceStyles.gridCols2}>
              <div>
                <label className={createInvoiceStyles.label}>
                  Business Name
                </label>
                <input
                  value={invoice?.fromBusinessName ?? ""}
                  onChange={(e) =>
                    updateInvoiceField("fromBusinessName", e.target.value)
                  }
                  placeholder="Your Business Name"
                  className={createInvoiceStyles.input}
                />
              </div>
              <div>
                <label className={createInvoiceStyles.label}>Email</label>
                <input
                  value={invoice?.fromEmail ?? ""}
                  onChange={(e) =>
                    updateInvoiceField("fromEmail", e.target.value)
                  }
                  placeholder="business@email.com"
                  className={createInvoiceStyles.input}
                />
              </div>
              <div className={createInvoiceStyles.gridColSpan2}>
                <label className={createInvoiceStyles.label}>Address</label>
                <textarea
                  value={invoice?.fromAddress ?? ""}
                  onChange={(e) =>
                    updateInvoiceField("fromAddress", e.target.value)
                  }
                  placeholder="Business Address"
                  rows={3}
                  className={createInvoiceStyles.textarea}
                />
              </div>
              <div>
                <label className={createInvoiceStyles.label}>Phone</label>
                <input
                  value={invoice?.fromPhone ?? ""}
                  onChange={(e) =>
                    updateInvoiceField("fromPhone", e.target.value)
                  }
                  placeholder="+1 (555) 123-4567"
                  className={createInvoiceStyles.input}
                />
              </div>
              <div>
                <label className={createInvoiceStyles.label}>GST Number</label>
                <input
                  value={invoice?.fromGst ?? ""}
                  onChange={(e) =>
                    updateInvoiceField("fromGst", e.target.value)
                  }
                  placeholder="27AAAPL1234C1ZV"
                  className={createInvoiceStyles.input}
                />
              </div>
            </div>
          </div>

          {/* Bill To */}
          <div className={createInvoiceStyles.cardContainer}>
            <div className={createInvoiceStyles.cardHeaderContainer}>
              <div
                className={`${createInvoiceStyles.cardIconContainer} ${createInvoiceIconColors.billTo}`}
              >
                <svg
                  className="w-5 h-5"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                  <circle cx="12" cy="7" r="4" />
                </svg>
              </div>
              <h3 className={createInvoiceStyles.cardTitle}>Bill To</h3>
            </div>

            <div className={createInvoiceStyles.gridCols2}>
              <div>
                <label className={createInvoiceStyles.label}>Client Name</label>
                <input
                  value={invoice?.client?.name || ""}
                  onChange={(e) => updateClient("name", e.target.value)}
                  placeholder="Client Name"
                  className={createInvoiceStyles.input}
                />
              </div>
              <div>
                <label className={createInvoiceStyles.label}>
                  Client Email
                </label>
                <input
                  value={invoice?.client?.email || ""}
                  onChange={(e) => updateClient("email", e.target.value)}
                  placeholder="client@email.com"
                  className={createInvoiceStyles.input}
                />
              </div>
              <div className={createInvoiceStyles.gridColSpan2}>
                <label className={createInvoiceStyles.label}>
                  Client Address
                </label>
                <textarea
                  value={invoice?.client?.address || ""}
                  onChange={(e) => updateClient("address", e.target.value)}
                  placeholder="Client Address"
                  rows={3}
                  className={createInvoiceStyles.textarea}
                />
              </div>
              <div>
                <label className={createInvoiceStyles.label}>
                  Client Phone
                </label>
                <input
                  value={invoice?.client?.phone || ""}
                  onChange={(e) => updateClient("phone", e.target.value)}
                  placeholder="+1 (555) 123-4567"
                  className={createInvoiceStyles.input}
                />
              </div>
            </div>
          </div>

          {/* Items */}
          <div className={createInvoiceStyles.cardContainer}>
            <div className={createInvoiceStyles.cardHeaderWithButton}>
              <div className={createInvoiceStyles.cardHeaderLeft}>
                <div className={createInvoiceStyles.cardIconContainer}>
                  <svg
                    className="w-5 h-5"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                    <line x1="8" y1="12" x2="16" y2="12" />
                    <line x1="12" y1="8" x2="12" y2="16" />
                  </svg>
                </div>
                <h3 className={createInvoiceStyles.cardTitle}>
                  Items & Services
                </h3>
              </div>
              <div className={createInvoiceStyles.currencyBadge}>
                All amounts in {invoice.currency}
              </div>
            </div>

            {/* Items list */}
            <div className={createInvoiceStyles.itemsListWrapper}>
              {items.map((it, idx) => {
                const totalValue =
                  Number(it?.qty || 0) * Number(it?.unitPrice || 0);
                const totalLabel = currencyFmt(totalValue, invoice.currency);

                return (
                  <div
                    key={it?.id ?? idx}
                    className={`${createInvoiceStyles.itemsTableRow} ${createInvoiceStyles.itemRow}`}
                  >
                    {/* Description */}
                    <div className={createInvoiceStyles.itemColDescription}>
                      <label
                        className={createInvoiceStyles.itemsFieldLabel}
                        htmlFor={`desc-${idx}`}
                      >
                        Description
                      </label>
                      <input
                        id={`desc-${idx}`}
                        className={createInvoiceStyles.itemsInput}
                        value={it?.description ?? ""}
                        onChange={(e) =>
                          updateItem(idx, "description", e.target.value)
                        }
                        placeholder="Item description"
                        title={it?.description ?? ""}
                        aria-label={`Item ${idx + 1} description`}
                      />
                    </div>

                    {/* Quantity */}
                    <div className={createInvoiceStyles.itemColQuantity}>
                      <label
                        className={createInvoiceStyles.itemsFieldLabel}
                        htmlFor={`qty-${idx}`}
                      >
                        Quantity
                      </label>
                      <input
                        id={`qty-${idx}`}
                        type="text"
                        inputMode="numeric"
                        pattern="[0-9]*"
                        className={createInvoiceStyles.itemsNumberInput}
                        value={String(it?.qty ?? "")}
                        onChange={(e) => updateItem(idx, "qty", e.target.value)}
                        title={String(it?.qty ?? "")}
                        aria-label={`Item ${idx + 1} quantity`}
                      />
                    </div>

                    {/* Unit Price */}
                    <div className={createInvoiceStyles.itemColUnitPrice}>
                      <label
                        className={createInvoiceStyles.itemsFieldLabel}
                        htmlFor={`price-${idx}`}
                      >
                        Unit Price
                      </label>
                      <input
                        id={`price-${idx}`}
                        type="text"
                        inputMode="decimal"
                        className={createInvoiceStyles.itemsNumberInput}
                        value={String(it?.unitPrice ?? "")}
                        onChange={(e) =>
                          updateItem(idx, "unitPrice", e.target.value)
                        }
                        title={String(it?.unitPrice ?? "")}
                        aria-label={`Item ${idx + 1} unit price`}
                      />
                    </div>

                    {/* Total */}
                    <div className={createInvoiceStyles.itemColTotal}>
                      <label
                        className={createInvoiceStyles.itemsFieldLabel}
                        aria-hidden
                      >
                        Total
                      </label>
                      <div
                        className={createInvoiceStyles.itemsTotal}
                        title={totalLabel}
                        aria-label={`Item ${idx + 1} total`}
                      >
                        {totalLabel}
                      </div>
                    </div>

                    {/* Remove */}
                    <div className={createInvoiceStyles.itemColRemove}>
                      <button
                        type="button"
                        onClick={() => removeItem(idx)}
                        className={createInvoiceStyles.itemsRemoveButton}
                        aria-label={`Remove item ${idx + 1}`}
                        title="Remove item"
                      >
                        <DeleteIcon className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="mt-6">
              <button
                onClick={addItem}
                className={createInvoiceStyles.addItemButton}
              >
                <AddIcon
                  className={`w-4 h-4 ${createInvoiceStyles.iconHover}`}
                />{" "}
                Add Item
              </button>
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className={createInvoiceStyles.rightColumn}>
          {/* Logo & Branding */}
          <div className={createInvoiceStyles.cardSmallContainer}>
            <h3 className={createInvoiceStyles.cardSubtitle}>Branding</h3>

            <div className="space-y-4">
              <div>
                <label className={createInvoiceStyles.label}>
                  Company Logo
                </label>
                <div className={createInvoiceStyles.uploadSmallArea}>
                  {invoice?.logoDataUrl ? (
                    <div className={createInvoiceStyles.imagePreviewContainer}>
                      <div className={createInvoiceStyles.logoPreview}>
                        <img
                          src={invoice.logoDataUrl}
                          alt="logo"
                          className="object-contain w-full h-full"
                          onError={(e) => {
                            e.currentTarget.style.display = "none";
                            console.warn(
                              "[CreateInvoice] failed to load logo preview:",
                              invoice.logoDataUrl
                            );
                          }}
                        />
                      </div>
                      <div className={createInvoiceStyles.buttonGroup}>
                        <label className={createInvoiceStyles.changeButton}>
                          <UploadIcon className="w-4 h-4" /> Change
                          <input
                            type="file"
                            accept="image/*"
                            onChange={(e) =>
                              handleImageUpload(
                                e.target.files && e.target.files[0],
                                "logo"
                              )
                            }
                            className="hidden"
                          />
                        </label>
                        <button
                          onClick={() => removeImage("logo")}
                          className={createInvoiceStyles.removeButton}
                        >
                          <DeleteIcon className="w-4 h-4" /> Remove
                        </button>
                      </div>
                    </div>
                  ) : (
                    <label className="cursor-pointer block">
                      <div
                        className={`${createInvoiceStyles.imagePreviewContainer} ${createInvoiceStyles.hoverScale}`}
                      >
                        <div
                          className={createInvoiceStyles.uploadIconContainer}
                        >
                          <UploadIcon className="w-5 h-5" />
                        </div>
                        <div>
                          <p className={createInvoiceStyles.uploadTextTitle}>
                            Upload Logo
                          </p>
                          <p className={createInvoiceStyles.uploadTextSubtitle}>
                            PNG, JPG up to 5MB
                          </p>
                        </div>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={(e) =>
                            handleImageUpload(
                              e.target.files && e.target.files[0],
                              "logo"
                            )
                          }
                          className="hidden"
                        />
                      </div>
                    </label>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Summary & Tax */}
          <div className={createInvoiceStyles.cardSmallContainer}>
            <h3 className={createInvoiceStyles.cardSubtitle}>Summary & Tax</h3>
            <div className="space-y-4">
              <div className={createInvoiceStyles.summaryRow}>
                <div className={createInvoiceStyles.summaryLabel}>Subtotal</div>
                <div className={createInvoiceStyles.summaryValue}>
                  {currencyFmt(totals.subtotal, invoice.currency)}
                </div>
              </div>

              <div className="space-y-3">
                <div>
                  <label className={createInvoiceStyles.label}>
                    Tax Percentage
                  </label>
                  <input
                    type="number"
                    value={invoice.taxPercent ?? 18}
                    onChange={(e) =>
                      updateInvoiceField(
                        "taxPercent",
                        Number(e.target.value || 0)
                      )
                    }
                    className={createInvoiceStyles.inputCenter}
                    min="0"
                    max="100"
                    step="0.1"
                  />
                </div>

                <div className={createInvoiceStyles.taxRow}>
                  <div className="text-sm text-gray-600">Tax Amount</div>
                  <div className="font-medium text-gray-900">
                    {currencyFmt(totals.tax, invoice.currency)}
                  </div>
                </div>
              </div>

              <div className={createInvoiceStyles.totalRow}>
                <div className={createInvoiceStyles.totalLabel}>Total</div>
                <div className={createInvoiceStyles.totalValue}>
                  {currencyFmt(totals.total, invoice.currency)}
                </div>
              </div>
            </div>
          </div>

          {/* Stamp & Signature */}
          <div className={createInvoiceStyles.cardSmallContainer}>
            <h3 className={createInvoiceStyles.cardSubtitle}>
              Stamp & Signature
            </h3>

            <div className="space-y-6">
              {/* Stamp */}
              <div>
                <label className={createInvoiceStyles.label}>
                  Digital Stamp
                </label>
                <div className={createInvoiceStyles.uploadSmallArea}>
                  {invoice.stampDataUrl ? (
                    <div className={createInvoiceStyles.imagePreviewContainer}>
                      <div className={createInvoiceStyles.stampPreview}>
                        <img
                          src={invoice.stampDataUrl}
                          alt="stamp"
                          className="object-contain w-full h-full"
                          onError={(e) => {
                            e.currentTarget.style.display = "none";
                            console.warn(
                              "[CreateInvoice] failed to load stamp preview:",
                              invoice.stampDataUrl
                            );
                          }}
                        />
                      </div>
                      <div className={createInvoiceStyles.buttonGroup}>
                        <label className={createInvoiceStyles.changeButton}>
                          <UploadIcon className="w-4 h-4" /> Change
                          <input
                            type="file"
                            accept="image/*"
                            onChange={(e) =>
                              handleImageUpload(
                                e.target.files && e.target.files[0],
                                "stamp"
                              )
                            }
                            className="hidden"
                          />
                        </label>
                        <button
                          onClick={() => removeImage("stamp")}
                          className={createInvoiceStyles.removeButton}
                        >
                          <DeleteIcon className="w-4 h-4" /> Remove
                        </button>
                      </div>
                    </div>
                  ) : (
                    <label className="cursor-pointer block">
                      <div
                        className={`${createInvoiceStyles.imagePreviewContainer} ${createInvoiceStyles.hoverScale}`}
                      >
                        <div
                          className={
                            createInvoiceStyles.uploadSmallIconContainer
                          }
                        >
                          <UploadIcon className="w-4 h-4" />
                        </div>
                        <div>
                          <p className={createInvoiceStyles.uploadTextTitle}>
                            Upload Stamp
                          </p>
                          <p className={createInvoiceStyles.uploadTextSubtitle}>
                            PNG with transparency
                          </p>
                        </div>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={(e) =>
                            handleImageUpload(
                              e.target.files && e.target.files[0],
                              "stamp"
                            )
                          }
                          className="hidden"
                        />
                      </div>
                    </label>
                  )}
                </div>
              </div>

              {/* Signature */}
              <div>
                <label className={createInvoiceStyles.label}>
                  Digital Signature
                </label>
                <div className={createInvoiceStyles.uploadSmallArea}>
                  {invoice.signatureDataUrl ? (
                    <div className={createInvoiceStyles.imagePreviewContainer}>
                      <div className={createInvoiceStyles.signaturePreview}>
                        <img
                          src={invoice.signatureDataUrl}
                          alt="signature"
                          className="object-contain w-full h-full"
                          onError={(e) => {
                            e.currentTarget.style.display = "none";
                            console.warn(
                              "[CreateInvoice] failed to load signature preview:",
                              invoice.signatureDataUrl
                            );
                          }}
                        />
                      </div>
                      <div className={createInvoiceStyles.buttonGroup}>
                        <label className={createInvoiceStyles.changeButton}>
                          <UploadIcon className="w-4 h-4" /> Change
                          <input
                            type="file"
                            accept="image/*"
                            onChange={(e) =>
                              handleImageUpload(
                                e.target.files && e.target.files[0],
                                "signature"
                              )
                            }
                            className="hidden"
                          />
                        </label>
                        <button
                          onClick={() => removeImage("signature")}
                          className={createInvoiceStyles.removeButton}
                        >
                          <DeleteIcon className="w-4 h-4" /> Remove
                        </button>
                      </div>
                    </div>
                  ) : (
                    <label className="cursor-pointer block">
                      <div
                        className={`${createInvoiceStyles.imagePreviewContainer} ${createInvoiceStyles.hoverScale}`}
                      >
                        <div
                          className={
                            createInvoiceStyles.uploadSmallIconContainer
                          }
                        >
                          <UploadIcon className="w-4 h-4" />
                        </div>
                        <div>
                          <p className={createInvoiceStyles.uploadTextTitle}>
                            Upload Signature
                          </p>
                          <p className={createInvoiceStyles.uploadTextSubtitle}>
                            PNG with transparency
                          </p>
                        </div>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={(e) =>
                            handleImageUpload(
                              e.target.files && e.target.files[0],
                              "signature"
                            )
                          }
                          className="hidden"
                        />
                      </div>
                    </label>
                  )}
                </div>

                {/* Signature Details */}
                <div className="mt-4 space-y-3">
                  <div>
                    <label className={createInvoiceStyles.label}>
                      Signature Owner Name
                    </label>
                    <input
                      placeholder="John Doe"
                      value={invoice.signatureName || ""}
                      onChange={(e) =>
                        updateInvoiceField("signatureName", e.target.value)
                      }
                      className={`${createInvoiceStyles.inputSmall} ${createInvoiceCustomStyles.inputPlaceholder}`}
                    />
                  </div>
                  <div>
                    <label className={createInvoiceStyles.label}>
                      Signature Title / Designation
                    </label>
                    <input
                      placeholder="Director / CEO"
                      value={invoice.signatureTitle || ""}
                      onChange={(e) =>
                        updateInvoiceField("signatureTitle", e.target.value)
                      }
                      className={`${createInvoiceStyles.inputSmall} ${createInvoiceCustomStyles.inputPlaceholder}`}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>{" "}
      {/* end main grid */}
    </div>
  );
}