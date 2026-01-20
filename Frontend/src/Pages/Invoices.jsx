import React, { useMemo, useState, useEffect, useCallback } from "react";
import StatusBadge from "../Components/StatusBadge";
import AiInvoiceModal from "../components/AiInvoiceModal";
import GeminiIcon from "../components/GeminiIcon";
import { useNavigate } from "react-router-dom";
import { invoicesStyles } from "../assets/dummyStyles";
import { useAuth } from "@clerk/clerk-react";

const API_BASE = "http://localhost:4000";

/* ---------- helpers ---------- */
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
        // rewrite localhost -> API_BASE
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

function normalizeInvoiceFromServer(inv = {}) {
  const id = inv.invoiceNumber || inv.id || inv._id || String(inv._id || "");
  const amount =
    inv.total ??
    inv.amount ??
    (inv.subtotal !== undefined ? inv.subtotal + (inv.tax ?? 0) : 0);
  const status = inv.status ?? inv.statusLabel ?? "Draft";

  // Resolve any image/url fields so frontend doesn't try to load localhost from deployed client
  const logo = resolveImageUrl(
    inv.logoDataUrl ?? inv.logoUrl ?? inv.logo ?? null
  );
  const stamp = resolveImageUrl(
    inv.stampDataUrl ?? inv.stampUrl ?? inv.stamp ?? null
  );
  const signature = resolveImageUrl(
    inv.signatureDataUrl ?? inv.signatureUrl ?? inv.signature ?? null
  );

  return {
    ...inv,
    id,
    amount,
    status,
    // normalized image fields (safe for deployed frontend)
    logo,
    stamp,
    signature,
  };
}

function normalizeClient(raw) {
  if (!raw) return { name: "", email: "", address: "", phone: "" };
  if (typeof raw === "string")
    return { name: raw, email: "", address: "", phone: "" };
  if (typeof raw === "object") {
    return {
      name: raw.name ?? raw.company ?? raw.client ?? "",
      email: raw.email ?? raw.emailAddress ?? "",
      address: raw.address ?? "",
      phone: raw.phone ?? raw.contact ?? "",
    };
  }
  return { name: "", email: "", address: "", phone: "" };
}

function formatCurrency(amount = 0, currency = "INR") {
  try {
    if (currency === "INR") {
      return new Intl.NumberFormat("en-IN", {
        style: "currency",
        currency: "INR",
      }).format(amount);
    }
    return new Intl.NumberFormat(undefined, {
      style: "currency",
      currency,
    }).format(amount);
  } catch {
    return `${currency} ${amount}`;
  }
}

/* ---------- date formatting helper: DD/MM/YYYY (e.g. 07/12/2025) ---------- */
function formatDate(dateInput) {
  if (!dateInput) return "—";
  const d = dateInput instanceof Date ? dateInput : new Date(String(dateInput));
  if (Number.isNaN(d.getTime())) return "—";
  const dd = String(d.getDate()).padStart(2, "0");
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  const yyyy = d.getFullYear();
  return `${dd}/${mm}/${yyyy}`;
}

/* icons (same as you had) */
const SearchIcon = ({ className = "w-4 h-4" }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
  >
    <path d="M21 21l-4.35-4.35M11 19a8 8 0 1 0 0-16 8 8 0 0 0 0 16z" />
  </svg>
);
const SortIcon = ({ className = "w-4 h-4", direction = "asc" }) => (
  <svg
    className={`${className} ${direction === "desc" ? "rotate-180" : ""}`}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
  >
    <path d="M7 15l5 5 5-5M7 9l5-5 5 5" />
  </svg>
);
const FilterIcon = ({ className = "w-4 h-4" }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
  >
    <path d="M22 3H2l8 9.46V19l4 2v-8.54L22 3z" />
  </svg>
);
const PlusIcon = ({ className = "w-4 h-4" }) => (
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
const EyeIcon = ({ className = "w-4 h-4" }) => (
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
const ResetIcon = ({ className = "w-4 h-4" }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
  >
    <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
    <path d="M3 3v5h5" />
  </svg>
);

/* Pagination component */
function Pagination({ page, totalPages, onChange }) {
  if (totalPages <= 1) return null;
  const pages = [];
  const start = Math.max(1, page - 2);
  const end = Math.min(totalPages, start + 4);
  for (let i = start; i <= end; i++) pages.push(i);
  return (
    <div className={invoicesStyles.pagination}>
      <div className={invoicesStyles.paginationText}>
        Page {page} of {totalPages}
      </div>
      <div className={invoicesStyles.paginationControls}>
        <button
          type="button"
          onClick={() => onChange(Math.max(1, page - 1))}
          disabled={page === 1}
          className={invoicesStyles.paginationButton}
        >
          Previous
        </button>
        <div className={invoicesStyles.paginationNumbers}>
          {pages.map((p) => (
            <button
              key={p}
              type="button"
              onClick={() => onChange(p)}
              className={`${invoicesStyles.paginationNumber} ${
                p === page
                  ? invoicesStyles.paginationNumberActive
                  : invoicesStyles.paginationNumberInactive
              }`}
            >
              {p}
            </button>
          ))}
        </div>
        <button
          type="button"
          onClick={() => onChange(Math.min(totalPages, page + 1))}
          disabled={page === totalPages}
          className={invoicesStyles.paginationButton}
        >
          Next
        </button>
      </div>
    </div>
  );
}

/* uid helper */
function uid() {
  try {
    if (typeof crypto !== "undefined" && crypto.randomUUID)
      return crypto.randomUUID();
  } catch {}
  return Math.random().toString(36).slice(2, 9);
}

/* ---------- Component ---------- */
export default function InvoicesPage() {
  const navigate = useNavigate();
  const { getToken, isSignedIn } = useAuth();

  // helper to obtain token (with a forceRefresh retry)
  const obtainToken = useCallback(async () => {
    if (typeof getToken !== "function") return null;
    try {
      let token = await getToken({ template: "default" }).catch(() => null);
      if (!token) {
        token = await getToken({ forceRefresh: true }).catch(() => null);
      }
      return token;
    } catch {
      return null;
    }
  }, [getToken]);

  const [allInvoices, setAllInvoices] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // filters
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("all");
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [perPage, setPerPage] = useState(6);

  // sorting/pagination
  const [sortBy, setSortBy] = useState({ key: "issueDate", dir: "desc" });
  const [page, setPage] = useState(1);

  // AI modal
  const [aiOpen, setAiOpen] = useState(false);
  const [aiLoading, setAiLoading] = useState(false);

  // fetch invoices from backend (auth-aware)
  const fetchInvoices = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const token = await obtainToken();
      const headers = { Accept: "application/json" };
      if (token) headers["Authorization"] = `Bearer ${token}`;

      const res = await fetch(`${API_BASE}/api/invoice`, {
        method: "GET",
        headers,
      });
      if (res.status === 401) {
        setError("Unauthorized. Please sign in.");
        setAllInvoices([]);
        setLoading(false);
        return;
      }
      if (!res.ok) {
        const json = await res.json().catch(() => null);
        throw new Error(json?.message || `Failed to fetch (${res.status})`);
      }
      const json = await res.json().catch(() => null);
      const raw = Array.isArray(json?.data) ? json.data : json || [];
      const mapped = raw.map(normalizeInvoiceFromServer);
      setAllInvoices(mapped);
    } catch (err) {
      console.error("fetchInvoices error:", err);
      setError(err?.message || "Failed to load invoices");
      // keep existing list if any
    } finally {
      setLoading(false);
    }
  }, [obtainToken]);

  useEffect(() => {
    // load invoices on mount and whenever auth state changes
    fetchInvoices();
  }, [fetchInvoices, isSignedIn]);

  // client-side filtering/sorting (same logic)
  const filtered = useMemo(() => {
    let arr = Array.isArray(allInvoices) ? allInvoices.slice() : [];

    if (search.trim()) {
      const q = search.toLowerCase();
      arr = arr.filter((i) => {
        const client = normalizeClient(i.client);
        return (
          (client.name && client.name.toLowerCase().includes(q)) ||
          (i.id && i.id.toLowerCase().includes(q)) ||
          String(i.email || "")
            .toLowerCase()
            .includes(q) ||
          String(i.company || "")
            .toLowerCase()
            .includes(q)
        );
      });
    }

    if (status !== "all")
      arr = arr.filter(
        (i) =>
          (i.status || "").toString().toLowerCase() ===
          status.toString().toLowerCase()
      );

    if (from || to) {
      arr = arr.filter((i) => {
        const d = new Date(i.issueDate || i.date || i.createdAt).setHours(
          0,
          0,
          0,
          0
        );
        if (from) {
          const f = new Date(from).setHours(0, 0, 0, 0);
          if (d < f) return false;
        }
        if (to) {
          const t = new Date(to).setHours(23, 59, 59, 999);
          if (d > t) return false;
        }
        return true;
      });
    }

    arr.sort((a, b) => {
      const ak = a[sortBy.key];
      const bk = b[sortBy.key];

      if (typeof ak === "number" && typeof bk === "number")
        return sortBy.dir === "asc" ? ak - bk : bk - ak;

      const ad = Date.parse(ak || a.issueDate || a.dueDate || "");
      const bd = Date.parse(bk || b.issueDate || b.dueDate || "");
      if (!isNaN(ad) && !isNaN(bd))
        return sortBy.dir === "asc" ? ad - bd : bd - ad;

      const as = (ak || "").toString().toLowerCase();
      const bs = (bk || "").toString().toLowerCase();
      if (as < bs) return sortBy.dir === "asc" ? -1 : 1;
      if (as > bs) return sortBy.dir === "asc" ? 1 : -1;
      return 0;
    });

    return arr;
  }, [allInvoices, search, status, from, to, sortBy]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / perPage));
  const startIndex = (page - 1) * perPage;
  const pageData = filtered.slice(startIndex, startIndex + perPage);

  useEffect(() => {
    if (page > totalPages) setPage(1);
  }, [totalPages]);

  function handleSort(key) {
    setSortBy((s) =>
      s.key === key
        ? { key, dir: s.dir === "asc" ? "desc" : "asc" }
        : { key, dir: "asc" }
    );
  }

  function openInvoice(inv) {
    const found = allInvoices.find((x) => x && x.id === inv.id) || inv;
    navigate(`/app/invoices/${inv.id}/preview`, { state: { invoice: found } });
  }

  // delete invoice (backend)
  async function handleDeleteInvoice(inv) {
    if (!inv?.id) return;
    if (!confirm(`Delete invoice ${inv.id}? This cannot be undone.`)) return;
    try {
      const token = await obtainToken();
      if (!token) {
        alert("Delete requires authentication. Please sign in.");
        navigate("/login");
        return;
      }
      const res = await fetch(
        `${API_BASE}/api/invoice/${encodeURIComponent(inv.id)}`,
        {
          method: "DELETE",
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      if (res.status === 401) {
        alert("Unauthorized. Please sign in.");
        navigate("/login");
        return;
      }
      if (!res.ok) {
        const json = await res.json().catch(() => null);
        throw new Error(json?.message || `Delete failed (${res.status})`);
      }
      await fetchInvoices();
      alert("Invoice deleted.");
    } catch (err) {
      console.error("deleteInvoice error:", err);
      alert(err?.message || "Failed to delete invoice.");
    }
  }

  // AI flow: call AI -> create invoice on backend (requires auth).
  // NOTE: If the AI provider returns quota/429 (or any non-ok), this function throws
  // an Error with a readable message — the modal will display it.
  async function handleGenerateFromAI(rawText) {
    setAiLoading(true);
    try {
      // Prefer server-side AI if available
      if (API_BASE) {
        const token = await obtainToken();
        const aiRes = await fetch(`${API_BASE}/api/ai/generate`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
          },
          body: JSON.stringify({ prompt: rawText }),
        });

        const bodyText = await aiRes.text().catch(() => null);

        // try parse JSON if possible
        let bodyJson = null;
        try {
          bodyJson = bodyText ? JSON.parse(bodyText) : null;
        } catch (e) {
          bodyJson = null;
        }

        // if server returned an error status: surface clear message (esp. 429/quota)
        if (!aiRes.ok) {
          const serverMessage =
            (bodyJson && (bodyJson.message || bodyJson.detail)) ||
            bodyText ||
            `AI generate failed (${aiRes.status})`;

          if (
            aiRes.status === 429 ||
            /quota|exhausted|resource_exhausted/i.test(serverMessage)
          ) {
            // explicit quota message
            throw new Error(`AI provider quota/exhausted: ${serverMessage}`);
          }

          // Other server errors
          throw new Error(serverMessage);
        }

        // OK - parse AI invoice
        const aiJson =
          bodyJson ||
          (await (async () => {
            try {
              return JSON.parse(bodyText || "");
            } catch {
              return null;
            }
          })());

        const aiInvoice = aiJson?.data || aiJson;
        if (!aiInvoice) {
          throw new Error("AI returned no invoice data (unexpected response).");
        }

        // Now send to create invoice endpoint (backend) if we have token (requires auth)
        const tokenForCreate = await obtainToken();
        if (tokenForCreate) {
          const createRes = await fetch(`${API_BASE}/api/invoice`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${tokenForCreate}`,
            },
            body: JSON.stringify(aiInvoice),
          });

          if (!createRes.ok) {
            const errText = await createRes.text().catch(() => null);
            let errJson = null;
            try {
              errJson = errText ? JSON.parse(errText) : null;
            } catch {}
            const errMsg =
              (errJson && (errJson.message || errJson.detail)) ||
              errText ||
              `Create failed (${createRes.status})`;
            throw new Error(errMsg);
          }

          const createJson = await createRes.json().catch(() => null);
          const saved = normalizeInvoiceFromServer(
            createJson?.data || createJson
          );
          await fetchInvoices();
          setAiOpen(false);
          navigate(`/app/invoices/${saved.id}/edit`, {
            state: { invoice: saved },
          });
          return;
        } else {
          // no token: creation requires sign-in
          throw new Error(
            "Creating invoice requires sign-in. Please sign in to save the AI-generated invoice."
          );
        }
      }

      // If API_BASE not configured, fallback to UI-only creation (unchanged)
      const newId = `INV-${Math.floor(Math.random() * 900000) + 1000}`;
      const firstLine =
        (rawText || "")
          .split(/\r?\n/)
          .map((l) => l.trim())
          .find(Boolean) || "";
      const clientPlaceholder = firstLine.length
        ? firstLine.length > 60
          ? firstLine.slice(0, 57) + "..."
          : firstLine
        : "";

      const newInvoice = {
        id: newId,
        invoiceNumber: newId,
        issueDate: new Date().toISOString().slice(0, 10),
        dueDate: "",
        client: clientPlaceholder || "",
        items: [],
        currency: "INR",
        status: "Draft",
        notes: "",
        taxPercent: 18,
        aiSource: rawText,
      };

      setAllInvoices((prev) => [newInvoice, ...(prev || [])]);
      setAiOpen(false);
      navigate(`/app/invoices/${newId}/edit`, {
        state: { invoice: newInvoice },
      });
    } finally {
      setAiLoading(false);
    }
  }

  // Helper: client initial
  const getClientInitial = (client) => {
    const c = normalizeClient(client);
    return c.name ? c.name.charAt(0).toUpperCase() : "C";
  };

  return (
    <div className={invoicesStyles.pageContainer}>
      {/* Header */}
      <div className={invoicesStyles.headerContainer}>
        <div>
          <h1 className={invoicesStyles.headerTitle}>Invoice Management</h1>
          <p className={invoicesStyles.headerSubtitle}>
            Search, filter, and manage your invoices with powerful AI tools
          </p>
        </div>

        <div className={invoicesStyles.headerActions}>
          <button
            type="button"
            onClick={() => setAiOpen(true)}
            className={invoicesStyles.aiButton}
          >
            <GeminiIcon className="w-6 h-6 group-hover:scale-110 transition-transform flex-none" />
            Create with AI
          </button>

          <button
            type="button"
            onClick={() => navigate("/app/create-invoice")}
            className={invoicesStyles.createButton}
          >
            <PlusIcon className="w-4 h-4" />
            Create Invoice
          </button>
        </div>
      </div>

      {/* Error banner */}
      {error && (
        <div
          style={{
            padding: 12,
            background: "#fff4f4",
            color: "#7f1d1d",
            borderRadius: 6,
            marginBottom: 12,
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <div>{error}</div>
            <div style={{ display: "flex", gap: 8 }}>
              <button
                type="button"
                onClick={() => fetchInvoices()}
                style={{
                  padding: "6px 10px",
                  background: "#efefef",
                  borderRadius: 4,
                }}
              >
                Retry
              </button>
              {String(error).toLowerCase().includes("unauthorized") && (
                <button
                  type="button"
                  onClick={() => navigate("/login")}
                  style={{
                    padding: "6px 10px",
                    background: "#111827",
                    color: "white",
                    borderRadius: 4,
                  }}
                >
                  Sign in
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Stats */}
      <div className={invoicesStyles.statsGrid}>
        <div className={invoicesStyles.statCard}>
          <div className={invoicesStyles.statValue}>{allInvoices.length}</div>
          <div className={invoicesStyles.statLabel}>Total Invoices</div>
        </div>
        <div className={invoicesStyles.statCard}>
          <div className={invoicesStyles.statValue}>
            {
              allInvoices.filter(
                (inv) => (inv.status || "").toString().toLowerCase() === "paid"
              ).length
            }
          </div>
          <div className={invoicesStyles.statLabel}>Paid</div>
        </div>
        <div className={invoicesStyles.statCard}>
          <div className={invoicesStyles.statValue}>
            {
              allInvoices.filter((inv) =>
                ["unpaid", "overdue"].includes(
                  (inv.status || "").toString().toLowerCase()
                )
              ).length
            }
          </div>
          <div className={invoicesStyles.statLabel}>Unpaid</div>
        </div>
        <div className={invoicesStyles.statCard}>
          <div className={invoicesStyles.statValue}>
            {
              allInvoices.filter(
                (inv) => (inv.status || "").toString().toLowerCase() === "draft"
              ).length
            }
          </div>
          <div className={invoicesStyles.statLabel}>Drafts</div>
        </div>
      </div>

      {/* Filters */}
      <div className={invoicesStyles.filtersCard}>
        <div className={invoicesStyles.filtersHeader}>
          <div className={invoicesStyles.filtersHeaderLeft}>
            <div className={invoicesStyles.filtersIconContainer}>
              <FilterIcon className="w-5 h-5" />
            </div>
            <h2 className={invoicesStyles.filtersTitle}>Filters & Search</h2>
          </div>
          <div className={invoicesStyles.filtersCount}>
            Showing{" "}
            <span className={invoicesStyles.filtersCountNumber}>
              {filtered.length}
            </span>{" "}
            of {allInvoices.length} invoices
          </div>
        </div>

        <div className={invoicesStyles.filtersGrid}>
          <div className={invoicesStyles.searchContainer}>
            <label
              htmlFor="invoice-search"
              className={invoicesStyles.filterLabel}
            >
              Search Invoices
            </label>
            <div className={invoicesStyles.searchInputContainer}>
              <div className={invoicesStyles.searchIcon}>
                <SearchIcon className="w-5 h-5 text-gray-400" />
              </div>
              <input
                id="invoice-search"
                name="search"
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                  setPage(1);
                }}
                onKeyDown={(e) => e.key === "Enter" && setPage(1)}
                placeholder="Search by client, invoice ID, email..."
                className={invoicesStyles.searchInput}
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="status-filter"
              className={invoicesStyles.filterLabel}
            >
              Status
            </label>
            <select
              id="status-filter"
              value={status}
              onChange={(e) => {
                setStatus(e.target.value);
                setPage(1);
              }}
              className={invoicesStyles.selectInput}
            >
              <option value="all">All Status</option>
              <option value="Paid">Paid</option>
              <option value="Unpaid">Unpaid</option>
              <option value="Overdue">Overdue</option>
              <option value="Draft">Draft</option>
            </select>
          </div>

          <div className={invoicesStyles.dateRangeContainer}>
            <label className={invoicesStyles.filterLabel}>Date Range</label>
            <div className={invoicesStyles.dateRangeFlex}>
              <input
                id="from-date"
                name="from"
                type="date"
                value={from}
                onChange={(e) => {
                  setFrom(e.target.value);
                  setPage(1);
                }}
                className={invoicesStyles.dateInput}
                aria-label="Start date"
              />
              <div className={invoicesStyles.dateSeparator}>
                <span className={invoicesStyles.dateSeparatorText}>to</span>
              </div>
              <input
                id="to-date"
                name="to"
                type="date"
                value={to}
                onChange={(e) => {
                  setTo(e.target.value);
                  setPage(1);
                }}
                className={invoicesStyles.dateInput}
                aria-label="End date"
              />
            </div>
          </div>
        </div>

        <div className={invoicesStyles.filtersFooter}>
          <div className={invoicesStyles.perPageContainer}>
            <label htmlFor="per-page" className={invoicesStyles.perPageLabel}>
              Show
            </label>
            <select
              id="per-page"
              value={perPage}
              onChange={(e) => {
                setPerPage(Number(e.target.value));
                setPage(1);
              }}
              className={invoicesStyles.perPageSelect}
            >
              <option value={6}>6 per page</option>
              <option value={10}>10 per page</option>
              <option value={20}>20 per page</option>
            </select>
          </div>

          <div style={{ display: "flex", gap: 8 }}>
            <button
              type="button"
              onClick={() => {
                setSearch("");
                setStatus("all");
                setFrom("");
                setTo("");
                setPage(1);
              }}
              className={invoicesStyles.resetButton}
            >
              <ResetIcon className="w-4 h-4" /> Reset Filters
            </button>
            <button
              type="button"
              onClick={() => fetchInvoices()}
              className={invoicesStyles.resetButton}
            >
              Refresh
            </button>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className={invoicesStyles.tableCard}>
        <div className={invoicesStyles.tableHeader}>
          <div className={invoicesStyles.tableHeaderContent}>
            <div>
              <h3 className={invoicesStyles.tableTitle}>All Invoices</h3>
              <p className={invoicesStyles.tableSubtitle}>
                Sorted by{" "}
                <span className={invoicesStyles.tableSubtitleBold}>
                  {sortBy.key}
                </span>{" "}
                ·{" "}
                <span className={invoicesStyles.tableSubtitleBold}>
                  {sortBy.dir === "asc" ? "Ascending" : "Descending"}
                </span>
              </p>
            </div>
          </div>
        </div>

        <div className={invoicesStyles.tableContainer}>
          <table className={invoicesStyles.table}>
            <thead>
              <tr className={invoicesStyles.tableHead}>
                <th
                  onClick={() => handleSort("client")}
                  className={invoicesStyles.tableHeaderCell}
                >
                  <div className={invoicesStyles.tableHeaderContent}>
                    Client{" "}
                    <SortIcon
                      direction={sortBy.key === "client" ? sortBy.dir : "asc"}
                    />
                  </div>
                </th>
                <th
                  onClick={() => handleSort("amount")}
                  className={invoicesStyles.tableHeaderCell}
                >
                  <div className={invoicesStyles.tableHeaderContent}>
                    Amount{" "}
                    <SortIcon
                      direction={sortBy.key === "amount" ? sortBy.dir : "asc"}
                    />
                  </div>
                </th>
                <th
                  onClick={() => handleSort("status")}
                  className={invoicesStyles.tableHeaderCell}
                >
                  <div className={invoicesStyles.tableHeaderContent}>
                    Status{" "}
                    <SortIcon
                      direction={sortBy.key === "status" ? sortBy.dir : "asc"}
                    />
                  </div>
                </th>
                <th
                  onClick={() => handleSort("dueDate")}
                  className={invoicesStyles.tableHeaderCell}
                >
                  <div className={invoicesStyles.tableHeaderContent}>
                    Due Date{" "}
                    <SortIcon
                      direction={sortBy.key === "dueDate" ? sortBy.dir : "asc"}
                    />
                  </div>
                </th>
                <th className={invoicesStyles.tableHeaderCellRight}>Actions</th>
              </tr>
            </thead>
            <tbody className={invoicesStyles.tableBody}>
              {pageData.map((inv) => {
                const client = normalizeClient(inv.client);
                const clientInitial = getClientInitial(inv.client);
                return (
                  <tr key={inv.id} className={invoicesStyles.tableRow}>
                    <td className={invoicesStyles.clientCell}>
                      <div className={invoicesStyles.clientContainer}>
                        <div className={invoicesStyles.clientAvatar}>
                          {clientInitial}
                        </div>
                        <div>
                          <div className={invoicesStyles.clientInfo}>
                            {client.name || inv.company || inv.id}
                          </div>
                          <div className={invoicesStyles.clientId}>
                            {inv.id}
                          </div>
                          <div className={invoicesStyles.clientEmail}>
                            {client.email || inv.email}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className={invoicesStyles.amountCell}>
                      {formatCurrency(inv.amount || 0, inv.currency)}
                    </td>
                    <td className={invoicesStyles.statusCell}>
                      <StatusBadge
                        status={inv.status}
                        size="default"
                        showIcon
                      />
                    </td>
                    <td className={invoicesStyles.dateCell}>
                      {inv.dueDate ? formatDate(inv.dueDate) : "—"}
                    </td>
                    <td className={invoicesStyles.actionsCell}>
                      <div className={invoicesStyles.actionsContainer}>
                        <button
                          type="button"
                          onClick={() => openInvoice(inv)}
                          className={invoicesStyles.viewButton}
                        >
                          <EyeIcon className={invoicesStyles.buttonIcon} /> View
                        </button>

                        <button
                          type="button"
                          onClick={() => handleDeleteInvoice(inv)}
                          className={invoicesStyles.sendButton}
                          title="Delete invoice"
                          style={{
                            background: "#ffefef",
                            color: "#b91c1c",
                            borderColor: "#fca5a5",
                          }}
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
              {pageData.length === 0 && !loading && (
                <tr>
                  <td colSpan="5" className={invoicesStyles.emptyState}>
                    <div className={invoicesStyles.emptyStateText}>
                      <div className={invoicesStyles.emptyStateIconContainer}>
                        <SearchIcon className={invoicesStyles.emptyStateIcon} />
                      </div>
                      <div className={invoicesStyles.emptyStateTitle}>
                        No invoices found
                      </div>
                      <p className={invoicesStyles.emptyStateMessage}>
                        Try adjusting your search filters or create a new
                        invoice to get started.
                      </p>
                      <button
                        type="button"
                        onClick={() => navigate("/app/create-invoice")}
                        className={invoicesStyles.emptyStateAction}
                      >
                        Create your first invoice
                      </button>
                    </div>
                  </td>
                </tr>
              )}
              {loading && (
                <tr>
                  <td colSpan="5" style={{ padding: 40, textAlign: "center" }}>
                    Loading invoices...
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {pageData.length > 0 && (
          <div className={invoicesStyles.paginationContainer}>
            <Pagination
              page={page}
              totalPages={totalPages}
              onChange={(p) => setPage(p)}
            />
          </div>
        )}
      </div>

      {/* AI modal */}
      <AiInvoiceModal
        open={aiOpen}
        onClose={() => setAiOpen(false)}
        onGenerate={handleGenerateFromAI}
        initialText=""
      />
    </div>
  );
}