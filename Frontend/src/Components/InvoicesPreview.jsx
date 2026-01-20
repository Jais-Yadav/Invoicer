import React, { useState, useEffect, useCallback, useRef } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "@clerk/clerk-react";
import { invoicePreviewStyles } from "../assets/dummyStyles";

const API_BASE = "http://localhost:4000";
const PROFILE_ENDPOINT = `${API_BASE}/api/businessProfile/me`;
const INVOICE_ENDPOINT = (id) => `${API_BASE}/api/invoice/${id}`;

function resolveImageUrl(url) {
  if (!url) return null;
  const s = String(url).trim();
  // data URI -> return directly
  if (s.startsWith("data:")) {
    console.debug("[resolveImageUrl] data URI", s.slice(0, 40) + "...");
    return s;
  }

  if (/localhost|127\.0\.0\.1/.test(s)) {
    try {
      const parsed = new URL(s);
      const path =
        parsed.pathname + (parsed.search || "") + (parsed.hash || "");
      const resolved = `${API_BASE.replace(/\/+$/, "")}${path}`;
      console.debug("[resolveImageUrl] rewritten localhost ->", {
        orig: s,
        resolved,
      });
      return resolved;
    } catch (e) {
      // fallback: strip host prefix
      const path = s.replace(/^https?:\/\/[^/]+/, "");
      const resolved = `${API_BASE.replace(/\/+$/, "")}${path}`;
      console.debug("[resolveImageUrl] fallback rewrite localhost ->", {
        orig: s,
        resolved,
      });
      return resolved;
    }
  }

  // absolute http(s) -> return as-is
  if (/^https?:\/\//i.test(s)) {
    console.debug("[resolveImageUrl] absolute URL", s);
    return s;
  }

  // relative path like "/uploads/..." or "uploads/..."
  const resolved = `${API_BASE.replace(/\/+$/, "")}/${s.replace(/^\/+/, "")}`;
  console.debug("[resolveImageUrl] relative ->", { orig: s, resolved });
  return resolved;
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
function getStoredInvoices() {
  return readJSON("invoices_v1", []) || [];
}

const defaultProfile = {
  businessName: "",
  email: "",
  address: "",
  phone: "",
  gst: "",
  stampDataUrl: null,
  signatureDataUrl: null,
  logoDataUrl: null,
  defaultTaxPercent: 18,
  signatureName: "",
  signatureTitle: "",
};

function currencyFmt(amount = 0, currency = "INR") {
  try {
    if (currency === "INR") {
      return new Intl.NumberFormat("en-IN", {
        style: "currency",
        currency: "INR",
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      }).format(amount);
    }
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(amount);
  } catch {
    return `${currency} ${Number(amount || 0).toFixed(2)}`;
  }
}

function formatDate(dateInput) {
  if (!dateInput) return "—";
  const d = dateInput instanceof Date ? dateInput : new Date(String(dateInput));
  if (Number.isNaN(d.getTime())) return "—";
  const dd = String(d.getDate()).padStart(2, "0");
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  const yyyy = d.getFullYear();
  return `${dd}/${mm}/${yyyy}`;
}

function normalizeClient(raw) {
  if (!raw) return { name: "", email: "", address: "", phone: "" };
  if (typeof raw === "string")
    return { name: raw, email: "", address: "", phone: "" };
  if (typeof raw === "object") {
    return {
      name: raw.name ?? raw.company ?? raw.client ?? "",
      email: raw.email ?? raw.emailAddress ?? "",
      address: raw.address ?? raw.addr ?? raw.clientAddress ?? "",
      phone: raw.phone ?? raw.contact ?? raw.mobile ?? "",
    };
  }
  return { name: "", email: "", address: "", phone: "" };
}

/* ----------------- icons ----------------- */
const PrintIcon = ({ className = "w-4 h-4" }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
  >
    <path d="M6 9V2h12v7M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2" />
    <path d="M6 14h12v8H6z" />
  </svg>
);
const EditIcon = ({ className = "w-4 h-4" }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
  >
    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
  </svg>
);
const ArrowLeftIcon = ({ className = "w-4 h-4" }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
  >
    <path d="M19 12H5M12 19l-7-7 7-7" />
  </svg>
);

/* ----------------- component ----------------- */
export default function InvoicePreview() {
  const { id } = useParams();
  const loc = useLocation();
  const navigate = useNavigate();

  const { getToken, isSignedIn } = useAuth
    ? useAuth()
    : { getToken: null, isSignedIn: false };

  const invoiceFromState = loc?.state?.invoice ?? null;
  const [invoice, setInvoice] = useState(() =>
    invoiceFromState ? invoiceFromState : null
  );
  const [loadingInvoice, setLoadingInvoice] = useState(
    !invoiceFromState && Boolean(id)
  );
  const [invoiceError, setInvoiceError] = useState(null);

  const [profile, setProfile] = useState(
    () => readJSON("business_profile", defaultProfile) || defaultProfile
  );
  const [profileLoading, setProfileLoading] = useState(false);

  const prevTitleRef = useRef(document.title);

  const obtainToken = useCallback(async () => {
    if (typeof getToken !== "function") return null;
    try {
      let token = await getToken({ template: "default" }).catch(() => null);
      if (!token)
        token = await getToken({ forceRefresh: true }).catch(() => null);
      return token;
    } catch {
      return null;
    }
  }, [getToken]);


  useEffect(() => {
    let mounted = true;
    async function fetchInvoice() {
      if (!id || invoiceFromState) return;
      setLoadingInvoice(true);
      setInvoiceError(null);
      try {
        const token = await obtainToken();
        const headers = { Accept: "application/json" };
        if (token) headers["Authorization"] = `Bearer ${token}`;

        const res = await fetch(INVOICE_ENDPOINT(id), {
          method: "GET",
          headers,
        });
        if (res.ok) {
          const json = await res.json().catch(() => null);
          const data = json?.data ?? json ?? null;
          if (mounted && data) {
            const normalized = {
              ...data,
              id: data._id ?? data.id ?? id,
              items: Array.isArray(data.items)
                ? data.items
                : data.items
                ? [...data.items]
                : [],
              invoiceNumber: data.invoiceNumber ?? data.invoiceNumber ?? "",
              currency: data.currency || "INR",
            };
            setInvoice(normalized);
            return;
          }
        } else {
          console.warn("Failed to fetch invoice from server:", res.status);
        }
      } catch (err) {
        console.warn("Error fetching invoice:", err);
      } finally {
        if (!mounted) return;
        const all = getStoredInvoices();
        const found = all.find(
          (x) => x && (x.id === id || x._id === id || x.invoiceNumber === id)
        );
        if (found) setInvoice(found);
        else setInvoiceError("Invoice not found");
        setLoadingInvoice(false);
      }
    }
    fetchInvoice();
    return () => {
      mounted = false;
    };
  }, [id, invoiceFromState, obtainToken]);


  useEffect(() => {
    let mounted = true;
    async function fetchProfile() {
      setProfileLoading(true);
      try {
        const token = await obtainToken();
        const headers = { Accept: "application/json" };
        if (token) headers["Authorization"] = `Bearer ${token}`;

        const res = await fetch(PROFILE_ENDPOINT, { method: "GET", headers });
        if (!res.ok) {
          console.warn("Profile fetch returned non-ok:", res.status);
          setProfileLoading(false);
          return;
        }
        const json = await res.json().catch(() => null);
        const data = json?.data ?? json ?? null;
        if (mounted && data && typeof data === "object") {
          const normalized = {
            businessName:
              data.businessName ?? data.name ?? defaultProfile.businessName,
            email: data.email ?? defaultProfile.email,
            address: data.address ?? defaultProfile.address,
            phone: data.phone ?? defaultProfile.phone,
            gst: data.gst ?? defaultProfile.gst,
            stampDataUrl:
              data.stampUrl ?? data.stampDataUrl ?? defaultProfile.stampDataUrl,
            signatureDataUrl:
              data.signatureUrl ??
              data.signatureDataUrl ??
              defaultProfile.signatureDataUrl,
            logoDataUrl:
              data.logoUrl ?? data.logoDataUrl ?? defaultProfile.logoDataUrl,
            defaultTaxPercent: Number.isFinite(Number(data.defaultTaxPercent))
              ? Number(data.defaultTaxPercent)
              : defaultProfile.defaultTaxPercent,
            signatureName:
              data.signatureOwnerName ??
              data.signatureName ??
              defaultProfile.signatureName,
            signatureTitle:
              data.signatureOwnerTitle ??
              data.signatureTitle ??
              defaultProfile.signatureTitle,
          };
          setProfile(normalized);
          try {
            writeJSON("business_profile", normalized);
          } catch {}
        }
      } catch (err) {
        console.warn("Error fetching profile:", err);
      } finally {
        if (mounted) setProfileLoading(false);
      }
    }

    const stored = readJSON("business_profile", null);
    if (!stored) fetchProfile();
    return () => {
      mounted = false;
    };
  }, [obtainToken]);


  useEffect(() => {
    if (!invoice) return;
    const invoiceNumber =
      invoice.invoiceNumber || invoice.id || `invoice-${Date.now()}`;
    const safe = `Invoice-${String(invoiceNumber).replace(
      /[^\w\-_.() ]/g,
      "_"
    )}`;
    const prev = prevTitleRef.current ?? document.title;
    if (document.title !== safe) document.title = safe;
    return () => {
      try {
        document.title = prev;
      } catch {}
    };
  }, [invoice]);


  const handlePrint = useCallback(() => {
    const invoiceNumber =
      (invoice && (invoice.invoiceNumber || invoice.id)) ||
      `invoice-${Date.now()}`;
    const safe = `Invoice-${String(invoiceNumber).replace(
      /[^\w\-_.() ]/g,
      "_"
    )}`;

    const prevTitle = document.title;
    document.title = safe;
    window.print();

    // Restore title after a delay
    setTimeout(() => {
      document.title = prevTitle;
    }, 500);
  }, [invoice]);

  if (!invoice && (loadingInvoice || profileLoading)) {
    return <div className="p-6">Loading…</div>;
  }
  if (!invoice) {
    return (
      <div className={invoicePreviewStyles.pageContainer}>
        <div className={invoicePreviewStyles.emptyStateContainer}>
          <div className={invoicePreviewStyles.emptyStateCard}>
            <div className={invoicePreviewStyles.emptyStateIconContainer}>
              <svg
                className={invoicePreviewStyles.emptyStateIcon}
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <circle cx="12" cy="12" r="10" />
                <line x1="15" y1="9" x2="9" y2="15" />
                <line x1="9" y1="9" x2="15" y2="15" />
              </svg>
            </div>
            <h3 className={invoicePreviewStyles.emptyStateTitle}>
              Invoice Not Found
            </h3>
            <p className={invoicePreviewStyles.emptyStateMessage}>
              The invoice you're looking for doesn't exist or may have been
              deleted.
            </p>
            <div className="mt-6">
              <button
                onClick={() => navigate(-1)}
                className={invoicePreviewStyles.emptyStateButton}
              >
                <ArrowLeftIcon className="w-4 h-4" /> Back to Invoices
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const items = (
    invoice.items && Array.isArray(invoice.items) ? invoice.items : []
  ).filter(Boolean);
  const subtotal = items.reduce(
    (s, it) => s + Number(it.qty || 0) * Number(it.unitPrice || 0),
    0
  );
  const taxPercent = Number(
    invoice.taxPercent ?? profile.defaultTaxPercent ?? 18
  );
  const tax = (subtotal * taxPercent) / 100;
  const total = subtotal + tax;

  const logo = resolveImageUrl(
    invoice.logoDataUrl ?? profile.logoDataUrl ?? null
  );
  const stamp = resolveImageUrl(
    invoice.stampDataUrl ?? profile.stampDataUrl ?? null
  );
  const signature = resolveImageUrl(
    invoice.signatureDataUrl ?? profile.signatureDataUrl ?? null
  );

  const signatureName = invoice.signatureName ?? profile.signatureName ?? "";
  const signatureTitle = invoice.signatureTitle ?? profile.signatureTitle ?? "";

  const client = normalizeClient(invoice.client);
  const invoiceCurrency = invoice.currency || "INR";


  return (
    <div className={invoicePreviewStyles.pageContainer}>
      <div className={invoicePreviewStyles.container}>
        {/* Header Actions */}
        <div
          className={`${invoicePreviewStyles.headerContainer} ${invoicePreviewStyles.noPrint}`}
        >
          <div>
            <h1 className={invoicePreviewStyles.headerTitle}>
              Invoice Preview
            </h1>
            <p className={invoicePreviewStyles.headerSubtitle}>
              Review invoice{" "}
              <span className={invoicePreviewStyles.headerInvoiceNumber}>
                #{invoice.invoiceNumber || invoice.id}
              </span>
            </p>
          </div>

          <div className={invoicePreviewStyles.headerActions}>
            <button
              onClick={() =>
                navigate(`/app/invoices/${invoice.id}/edit`, {
                  state: { invoice },
                })
              }
              className={invoicePreviewStyles.editInvoiceButton}
            >
              <EditIcon className="w-4 h-4" /> Edit Invoice
            </button>

            <button
              onClick={handlePrint}
              className={invoicePreviewStyles.printButton}
            >
              <PrintIcon className="w-4 h-4" /> Print / Save as PDF
            </button>
          </div>
        </div>

        {/* Printable invoice area */}
        <div id="print-area" className={invoicePreviewStyles.printArea}>
          <div className={invoicePreviewStyles.printHeader}>
            <div className={invoicePreviewStyles.companyInfo}>
              {logo && (
                <img
                  src={logo}
                  alt="Company Logo"
                  className={invoicePreviewStyles.logo}
                  onError={(e) => {
                    e.currentTarget.style.display = "none";
                  }}
                />
              )}
              <div>
                <div className={invoicePreviewStyles.invoiceFromLabel}>
                  Invoice From
                </div>
                <div className={invoicePreviewStyles.companyName}>
                  {invoice.fromBusinessName || profile.businessName || "—"}
                </div>
                <div className={invoicePreviewStyles.companyAddress}>
                  {invoice.fromAddress || profile.address || "—"}
                </div>
                <div className={invoicePreviewStyles.companyContact}>
                  {invoice.fromEmail || profile.email ? (
                    <div>
                      <strong>Email:</strong>{" "}
                      {invoice.fromEmail || profile.email}
                    </div>
                  ) : null}
                  {invoice.fromPhone || profile.phone ? (
                    <div>
                      <strong>Phone:</strong>{" "}
                      {invoice.fromPhone || profile.phone}
                    </div>
                  ) : null}
                  {invoice.fromGst || profile.gst ? (
                    <div>
                      <strong>GST:</strong> {invoice.fromGst || profile.gst}
                    </div>
                  ) : null}
                </div>
              </div>
            </div>

            <div className={invoicePreviewStyles.invoiceInfo}>
              <div className={invoicePreviewStyles.invoiceTitle}>INVOICE</div>
              <div className={invoicePreviewStyles.invoiceNumber}>
                #{invoice.invoiceNumber || invoice.id}
              </div>

              <div className={invoicePreviewStyles.invoiceDetails}>
                <div className={invoicePreviewStyles.invoiceDetailRow}>
                  <span className={invoicePreviewStyles.invoiceDetailLabel}>
                    Invoice Date:
                  </span>
                  <span className={invoicePreviewStyles.invoiceDetailValue}>
                    {invoice.issueDate ? formatDate(invoice.issueDate) : "—"}
                  </span>
                </div>
                <div className={invoicePreviewStyles.invoiceDetailRow}>
                  <span className={invoicePreviewStyles.invoiceDetailLabel}>
                    Due Date:
                  </span>
                  <span className={invoicePreviewStyles.invoiceDetailValue}>
                    {invoice.dueDate ? formatDate(invoice.dueDate) : "—"}
                  </span>
                </div>
                <div className={invoicePreviewStyles.invoiceDetailRow}>
                  <span className={invoicePreviewStyles.invoiceDetailLabel}>
                    Status:
                  </span>
                  <span
                    className={`${invoicePreviewStyles.invoiceDetailValue} ${
                      invoice.status === "paid"
                        ? invoicePreviewStyles.statusPaid
                        : invoice.status === "unpaid"
                        ? invoicePreviewStyles.statusUnpaid
                        : invoice.status === "overdue"
                        ? invoicePreviewStyles.statusOverdue
                        : invoicePreviewStyles.statusDraft
                    }`}
                  >
                    {invoice.status
                      ? invoice.status.charAt(0).toUpperCase() +
                        invoice.status.slice(1)
                      : "Draft"}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Client & Payment Details */}
          <div className={invoicePreviewStyles.section}>
            <div className={invoicePreviewStyles.flexContainer}>
              <div className="flex-1">
                <div className={invoicePreviewStyles.billToLabel}>Bill To</div>
                <div className={invoicePreviewStyles.clientDetails}>
                  <div className={invoicePreviewStyles.clientName}>
                    {client.name || "Client Name"}
                  </div>
                  {client.address && (
                    <div className={invoicePreviewStyles.clientText}>
                      {client.address}
                    </div>
                  )}
                  {client.email && (
                    <div className={invoicePreviewStyles.clientText}>
                      {client.email}
                    </div>
                  )}
                  {client.phone && (
                    <div className={invoicePreviewStyles.clientText}>
                      {client.phone}
                    </div>
                  )}
                </div>
              </div>

              <div className="flex-1">
                <div className={invoicePreviewStyles.paymentDetailsLabel}>
                  Payment Details
                </div>
                <div className={invoicePreviewStyles.paymentDetails}>
                  <div className={invoicePreviewStyles.paymentDetailRow}>
                    <span className={invoicePreviewStyles.paymentDetailLabel}>
                      Currency:
                    </span>
                    <span className={invoicePreviewStyles.paymentDetailValue}>
                      {invoiceCurrency}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Items Table */}
          <div className={invoicePreviewStyles.section}>
            <div className="overflow-x-auto">
              <table className={invoicePreviewStyles.table}>
                <thead>
                  <tr>
                    <th style={{ width: "50%", minWidth: "150px" }}>
                      Description
                    </th>
                    <th
                      style={{
                        width: "15%",
                        textAlign: "right",
                        minWidth: "70px",
                      }}
                    >
                      Quantity
                    </th>
                    <th
                      style={{
                        width: "20%",
                        textAlign: "right",
                        minWidth: "90px",
                      }}
                    >
                      Unit Price
                    </th>
                    <th
                      style={{
                        width: "15%",
                        textAlign: "right",
                        minWidth: "80px",
                      }}
                    >
                      Total
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {items.length ? (
                    items.map((it, idx) => (
                      <tr key={it.id || idx}>
                        <td className={invoicePreviewStyles.tableCell}>
                          {it.description || "Item Description"}
                        </td>
                        <td style={{ textAlign: "right" }}>{it.qty || 0}</td>
                        <td style={{ textAlign: "right" }}>
                          {currencyFmt(it.unitPrice, invoiceCurrency)}
                        </td>
                        <td style={{ textAlign: "right", fontWeight: "600" }}>
                          {currencyFmt(
                            Number(it.qty || 0) * Number(it.unitPrice || 0),
                            invoiceCurrency
                          )}
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td
                        colSpan="4"
                        style={{
                          textAlign: "center",
                          padding: "20px",
                          color: "#6b7280",
                        }}
                      >
                        No items added to this invoice
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* Notes */}
          {invoice.notes && (
            <div className={invoicePreviewStyles.section}>
              <div className={invoicePreviewStyles.notesLabel}>Notes</div>
              <div className={invoicePreviewStyles.notesContent}>
                {invoice.notes}
              </div>
            </div>
          )}

          {/* Totals, Signature, Stamp */}
          <div className={invoicePreviewStyles.section}>
            <div className={invoicePreviewStyles.flexContainer}>
              <div className="flex-1">
                <div className={invoicePreviewStyles.signatureLabel}>
                  Authorized Signature
                </div>
                {signature ? (
                  <div className={invoicePreviewStyles.signatureContainer}>
                    <img
                      src={signature}
                      alt="Authorized Signature"
                      className={invoicePreviewStyles.signatureImage}
                      onError={(e) => {
                        e.currentTarget.style.display = "none";
                      }}
                    />
                    {(signatureName || signatureTitle) && (
                      <div className="mt-2 text-sm text-gray-700">
                        <div className={invoicePreviewStyles.signatureName}>
                          {signatureName}
                        </div>
                        {signatureTitle && (
                          <div className={invoicePreviewStyles.signatureTitle}>
                            {signatureTitle}
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                ) : (
                  <div className={invoicePreviewStyles.placeholderContainer}>
                    No Signature
                  </div>
                )}
              </div>

              <div className="flex-1 text-center">
                <div className={invoicePreviewStyles.stampLabel}>
                  Company Stamp
                </div>
                {stamp ? (
                  <img
                    src={stamp}
                    alt="Company Stamp"
                    className={invoicePreviewStyles.stampImage}
                    onError={(e) => {
                      e.currentTarget.style.display = "none";
                    }}
                  />
                ) : (
                  <div className={invoicePreviewStyles.placeholderContainer}>
                    No Stamp
                  </div>
                )}
              </div>

              <div className="flex-1">
                <div className={invoicePreviewStyles.totalsContainer}>
                  <div className="space-y-2">
                    <div className={invoicePreviewStyles.totalsRow}>
                      <span className={invoicePreviewStyles.totalsLabel}>
                        Subtotal
                      </span>
                      <span className={invoicePreviewStyles.totalsValue}>
                        {currencyFmt(subtotal, invoiceCurrency)}
                      </span>
                    </div>
                    <div className={invoicePreviewStyles.totalsRow}>
                      <span className={invoicePreviewStyles.totalsLabel}>
                        Tax ({taxPercent}%)
                      </span>
                      <span className={invoicePreviewStyles.totalsValue}>
                        {currencyFmt(tax, invoiceCurrency)}
                      </span>
                    </div>
                    <div className={invoicePreviewStyles.totalDivider}>
                      <div className={invoicePreviewStyles.totalsRow}>
                        <span className={invoicePreviewStyles.totalAmountLabel}>
                          Total Amount
                        </span>
                        <span className={invoicePreviewStyles.totalAmountValue}>
                          {currencyFmt(total, invoiceCurrency)}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className={invoicePreviewStyles.footer}>
            <div className={invoicePreviewStyles.footerText}>
              {invoice.terms ||
                invoice.footnote ||
                "Thank you for your business. We appreciate your trust in our services."}
            </div>
            <div className={invoicePreviewStyles.footerSubText}>
              Invoice generated by InvoiceAI • {formatDate(new Date())}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}