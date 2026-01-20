import React from "react";
import {
  businessProfileStyles,
  iconColors,
  customStyles,
} from "../assets/dummyStyles";
import { useAuth } from "@clerk/clerk-react";
import { useState, useEffect } from "react";
import { useUser } from "@clerk/clerk-react";
const API_BASE = "http://localhost:4000";

const BusinessProfile = () => {
  const UploadIcon = ({ className = "w-5 h-5" }) => (
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
  const ImageIcon = ({ className = "w-5 h-5" }) => (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
      <circle cx="8.5" cy="8.5" r="1.5" />
      <polyline points="21 15 16 10 5 21" />
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
  function resolveImageUrl(url) {
    if (!url) return null;
    const s = String(url).trim();

    // keep blob/object URLs and data URIs as-is
    if (s.startsWith("blob:") || s.startsWith("data:")) return s;

    // absolute http(s) -> if localhost/127.0.0.1, rewrite to API_BASE
    if (/^https?:\/\//i.test(s)) {
      try {
        const parsed = new URL(s);
        if (
          parsed.hostname === "localhost" ||
          parsed.hostname === "127.0.0.1"
        ) {
          const path =
            parsed.pathname + (parsed.search || "") + (parsed.hash || "");
          return `${API_BASE.replace(/\/+$/, "")}${path}`;
        }
        return parsed.href;
      } catch (e) {
        // fall through to relative handling
      }
    }
    return `${API_BASE.replace(/\/+$/, "")}/${s.replace(/^\/+/, "")}`;
  }

  const { getToken, isSignedIn } = useAuth();
  const { user } = useUser();

  const [meta, setMeta] = useState({});
  const [saving, setSaving] = useState(false);

  // CONDENSED file / preview state
  const [files, setFiles] = useState({
    logo: null,
    stamp: null,
    signature: null,
  });
  const [previews, setPreviews] = useState({
    logo: null,
    stamp: null,
    signature: null,
  });

  async function getAuthToken() {
    if (typeof getToken !== "function") return null;
    try {
      let t = await getToken({ template: "default" }).catch(() => null);
      if (!t) t = await getToken({ forceRefresh: true }).catch(() => null);
      return t;
    } catch {
      return null;
    }
  }
  // to fetch profile
  useEffect(() => {
    let mounted = true;

    async function fetchProfile() {
      if (!isSignedIn) return;
      const token = await getAuthToken();
      if (!token) {
        console.warn("No auth token available — cannot fetch BusinessProfile");
        return;
      }

      try {
        const res = await fetch(`${API_BASE}/api/businessProfile/me`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
          },
        });

        if (!res.ok) {
          if (res.status !== 204 && res.status !== 401)
            console.error("Failed to fetch business profile:", res.status);
          return;
        }

        const json = await res.json().catch(() => null);
        const data = json?.data;
        if (!data || !mounted) return;

        const serverMeta = {
          businessName: data.businessName ?? "",
          email: data.email ?? "",
          address: data.address ?? "",
          phone: data.phone ?? "",
          gst: data.gst ?? "",
          logoUrl: data.logoUrl ?? null,
          stampUrl: data.stampUrl ?? null,
          signatureUrl: data.signatureUrl ?? null,
          signatureOwnerName: data.signatureOwnerName ?? "",
          signatureOwnerTitle: data.signatureOwnerTitle ?? "",
          defaultTaxPercent: data.defaultTaxPercent ?? 18,
          notes: data.notes ?? "",
          profileId: data._id ?? data.id ?? null,
        };

        setMeta(serverMeta);
        setPreviews((p) => ({
          ...p,
          logo: resolveImageUrl(serverMeta.logoUrl),
          stamp: resolveImageUrl(serverMeta.stampUrl),
          signature: resolveImageUrl(serverMeta.signatureUrl),
        }));
      } catch (err) {
        console.error("Error fetching business profile:", err);
      }
    }

    fetchProfile();
    return () => {
      mounted = false;
      // revoke any object URLs created locally
      Object.values(previews).forEach((u) => {
        if (u && typeof u === "string" && u.startsWith("blob:")) {
          URL.revokeObjectURL(u);
        }
      });
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSignedIn, getToken]);

  function updateMeta(field, value) {
    setMeta((m) => ({ ...m, [field]: value }));
  }

  function updateMeta(field, value) {
    setMeta((m) => ({ ...m, [field]: value }));
  }

  function handleLocalFilePick(kind, file) {
    if (!file) return;
    // revoke previous object URL if we created it
    const prev = previews[kind];
    if (prev && typeof prev === "string" && prev.startsWith("blob:")) {
      URL.revokeObjectURL(prev);
    }

    const objUrl = URL.createObjectURL(file);
    setFiles((f) => ({ ...f, [kind]: file }));
    setPreviews((p) => ({ ...p, [kind]: objUrl }));
    updateMeta(
      kind === "logo"
        ? "logoUrl"
        : kind === "stamp"
          ? "stampUrl"
          : "signatureUrl",
      objUrl,
    );
  }
  function removeLocalFile(kind) {
    const prev = previews[kind];
    if (prev && typeof prev === "string" && prev.startsWith("blob:")) {
      URL.revokeObjectURL(prev);
    }
    setFiles((f) => ({ ...f, [kind]: null }));
    setPreviews((p) => ({ ...p, [kind]: null }));
    updateMeta(
      kind === "logo"
        ? "logoUrl"
        : kind === "stamp"
          ? "stampUrl"
          : "signatureUrl",
      null,
    );
  }
  async function handleSave(e) {
    e?.preventDefault();
    setSaving(true);

    try {
      const token = await getAuthToken();
      if (!token) {
        alert("You must be signed in to save your business profile.");
        return;
      }

      const fd = new FormData();
      fd.append("businessName", meta.businessName || "");
      fd.append("email", meta.email || "");
      fd.append("address", meta.address || "");
      fd.append("phone", meta.phone || "");
      fd.append("gst", meta.gst || "");
      fd.append("defaultTaxPercent", String(meta.defaultTaxPercent ?? 18));
      fd.append("signatureOwnerName", meta.signatureOwnerName || "");
      fd.append("signatureOwnerTitle", meta.signatureOwnerTitle || "");
      fd.append("notes", meta.notes || "");

      // Respect original field names expected by server
      if (files.logo) fd.append("logoName", files.logo);
      else if (meta.logoUrl) fd.append("logoUrl", meta.logoUrl);

      if (files.stamp) fd.append("stampName", files.stamp);
      else if (meta.stampUrl) fd.append("stampUrl", meta.stampUrl);

      if (files.signature) fd.append("signatureNameMeta", files.signature);
      else if (meta.signatureUrl) fd.append("signatureUrl", meta.signatureUrl);

      const profileId = meta.profileId;
      const url = profileId
        ? `${API_BASE}/api/businessProfile/${profileId}`
        : `${API_BASE}/api/businessProfile`;
      const method = profileId ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { Authorization: `Bearer ${token}` },
        body: fd,
      });

      const json = await res.json().catch(() => null);
      if (!res.ok) {
        const msg = json?.message || `Save failed (${res.status})`;
        throw new Error(msg);
      }

      const saved = json?.data || json;
      const merged = {
        ...meta,
        businessName: saved.businessName ?? meta.businessName,
        email: saved.email ?? meta.email,
        address: saved.address ?? meta.address,
        phone: saved.phone ?? meta.phone,
        gst: saved.gst ?? meta.gst,
        logoUrl: saved.logoUrl ?? meta.logoUrl,
        stampUrl: saved.stampUrl ?? meta.stampUrl,
        signatureUrl: saved.signatureUrl ?? meta.signatureUrl,
        signatureOwnerName: saved.signatureOwnerName ?? meta.signatureOwnerName,
        signatureOwnerTitle:
          saved.signatureOwnerTitle ?? meta.signatureOwnerTitle,
        defaultTaxPercent: saved.defaultTaxPercent ?? meta.defaultTaxPercent,
        notes: saved.notes ?? meta.notes,
        profileId: saved._id ?? meta.profileId ?? saved.id ?? meta.profileId,
      };

      setMeta(merged);

      if (saved.logoUrl)
        setPreviews((p) => ({ ...p, logo: resolveImageUrl(saved.logoUrl) }));
      if (saved.stampUrl)
        setPreviews((p) => ({ ...p, stamp: resolveImageUrl(saved.stampUrl) }));
      if (saved.signatureUrl)
        setPreviews((p) => ({
          ...p,
          signature: resolveImageUrl(saved.signatureUrl),
        }));

      alert(`Profile ${profileId ? "updated" : "created"} successfully.`);
    } catch (err) {
      console.error("Failed to save profile:", err);
      alert(err?.message || "Failed to save profile. See console for details.");
    } finally {
      setSaving(false);
    }
  }
  function handleClearProfile() {
    if (
      !confirm(
        "Clear current profile data? This will remove local changes and previews.",
      )
    )
      return;
    // revoke any object URLs created locally
    Object.values(previews).forEach((u) => {
      if (u && typeof u === "string" && u.startsWith("blob:")) {
        URL.revokeObjectURL(u);
      }
    });
    setMeta({});
    setFiles({ logo: null, stamp: null, signature: null });
    setPreviews({ logo: null, stamp: null, signature: null });
  }

  return (
    <div className={businessProfileStyles.pageContainer}>
      <div className={businessProfileStyles.headerContainer}>
        <h1 className={businessProfileStyles.headerTitle}>Business Profile</h1>
        <p className={businessProfileStyles.headerSubtitle}>
          Configure Your Company Details,branding assests and invoice default;
        </p>
        {!isSignedIn && (
          <div className={`mt-32 p-10 border-r-8 text-red-800 `}>
            You are not signed in changes cannot be saved.Please sign in to load
            your data
          </div>
        )}
      </div>
      <form
        onSubmit={handleSave}
        className={businessProfileStyles.pageContainer}
      >
        <div className={businessProfileStyles.cardContainer}>
          <div className={businessProfileStyles.cardHeaderContainer}>
            <div
              className={`${businessProfileStyles.cardIconContainer} ${iconColors.business}`}
            >
              <svg
                className="w-5 h-5"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M19 21V5a2 2 0 0 0-2-2H7a2 2 0 0 0-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 8v-4m0 4h4" />
              </svg>
            </div>
            <h2 className={businessProfileStyles.cardTitle}>
              Businnes Information
            </h2>
          </div>
          <div className={businessProfileStyles.gridCols2}>
            <div>
              <label className={businessProfileStyles.label}>
                Business Name
              </label>
              <input
                className={businessProfileStyles.input}
                value={meta.businessName || ""}
                onChange={(e) => updateMeta("businessName", e.target.value)}
                placeholder="Enter your Business name"
              />
            </div>
            <div>
              <label className={businessProfileStyles.label}>email</label>
              <input
                className={businessProfileStyles.input}
                value={meta.email || ""}
                onChange={(e) => updateMeta("email", e.target.value)}
                placeholder="Business@gmail.com"
              />
            </div>

            <div className={businessProfileStyles.gridColSpan2}>
              <label className={businessProfileStyles.label}>Address</label>
              <textarea
                rows={3}
                className={businessProfileStyles.textarea}
                value={meta.address || ""}
                onChange={(e) => updateMeta("address", e.target.value)}
                placeholder="Enter Your business address"
              ></textarea>
            </div>

            <div>
              <label className={businessProfileStyles.label}>Phone</label>
              <input
                className={businessProfileStyles.input}
                value={meta.phone || ""}
                onChange={(e) => updateMeta("phone", e.target.value)}
                placeholder="+1 (555) 123-4567"
              />
            </div>

            <div>
              <label className={businessProfileStyles.label}>GST Number</label>
              <input
                className={businessProfileStyles.input}
                value={meta.gst || ""}
                onChange={(e) => updateMeta("gst", e.target.value)}
                placeholder="27AAAPL1234C1ZV"
              />
            </div>

            <div className={businessProfileStyles.cardContainer}>
              <div className={businessProfileStyles.cardHeaderContainer}>
                <div
                  className={`${businessProfileStyles.cardIconContainer} ${iconColors.branding}`}
                >
                  <ImageIcon className="w-5 h-5" />
                </div>
                <h2 className={businessProfileStyles.gridCols2Lg}>
                  Branding & defualts
                </h2>
              </div>
              <div className={businessProfileStyles.gridCols2Lg}>
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-medium text-gray-900 mb-4">
                      Company Logo
                    </h3>

                    <div className={businessProfileStyles.uploadArea}>
                      {previews.logo ? (
                        <div
                          className={
                            businessProfileStyles.imagePreviewContainer
                          }
                        >
                          <div className={businessProfileStyles.logoPreview}>
                            <img
                              src={previews.logo}
                              alt="logo preview"
                              className="object-contain w-full h-full"
                              onError={(e) => {
                                e.currentTarget.style.display = "none";
                                console.warn(
                                  "[BusinessProfile] logo preview failed to load:",
                                  previews.logo,
                                );
                              }}
                            />
                          </div>
                          <div className={businessProfileStyles.buttonGroup}>
                            <label
                              className={businessProfileStyles.changeButton}
                            >
                              <UploadIcon className="w-4 h-4" />
                              Change
                              <input
                                type="file"
                                accept="image/*"
                                onChange={(e) =>
                                  handleLocalFilePick(
                                    "logo",
                                    e.target.files?.[0],
                                  )
                                }
                                className="hidden"
                              />
                            </label>
                            <button
                              type="button"
                              onClick={() => removeLocalFile("logo")}
                              className={businessProfileStyles.removeButton}
                            >
                              <DeleteIcon className="w-4 h-4" /> Remove
                            </button>
                          </div>
                        </div>
                      ) : (
                        <label className="cursor-pointer block">
                          <div
                            className={`${businessProfileStyles.imagePreviewContainer} ${businessProfileStyles.hoverScale}`}
                          >
                            <div
                              className={
                                businessProfileStyles.uploadIconContainer
                              }
                            >
                              <UploadIcon className="w-6 h-6" />
                            </div>
                            <div>
                              <p
                                className={
                                  businessProfileStyles.uploadTextTitle
                                }
                              >
                                Upload Logo
                              </p>
                              <p
                                className={
                                  businessProfileStyles.uploadTextSubtitle
                                }
                              >
                                PNG, JPG up to 5MB
                              </p>
                            </div>
                            <input
                              type="file"
                              accept="image/*"
                              onChange={(e) =>
                                handleLocalFilePick("logo", e.target.files?.[0])
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
            </div>
            <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium text-shadow-gray-900 mb-4">
                    Tax Settings
                  </h3>
                  <div className={businessProfileStyles.taxContainer}>
                    <label className={businessProfileStyles.label}>Default Tax Percentage</label>
                    <div><input type="number" min="0" max="100" step="0.1" className={businessProfileStyles.taxInput} value={meta.defaultTaxPercent || 18} onChange={(e)=>updateMeta("defaultTaxPercentage",Number(e.target.value||0))}/>
                  <span className={customStyles.taxPercentage}>%</span>
                  </div>
                  <p className={businessProfileStyles.taxHelpText}>
                    This tax rate will prefill in new invoices.You can adjust it per invoice as needed
                  </p>
                  </div>
                  
                </div>
            </div>
          </div>
        </div>
        {/* for stamp and signature */}
         <div className={businessProfileStyles.cardContainer}>
          <div className={businessProfileStyles.cardHeaderContainer}>
            <div
              className={`${businessProfileStyles.cardIconContainer} ${iconColors.assets}`}
            >
              <svg
                className="w-5 h-5"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M12 19l7-7 3 3-7 7-3-3z" />
                <path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z" />
                <path d="M2 2l7.586 7.586" />
              </svg>
            </div>
            <h2 className={businessProfileStyles.cardTitle}>Digital Assets</h2>
          </div>

          <div className={businessProfileStyles.gridCols2Lg}>
            {/* Stamp */}
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-4">
                Digital Stamp
              </h3>
              <div className={businessProfileStyles.uploadArea}>
                {previews.stamp ? (
                  <div className={businessProfileStyles.imagePreviewContainer}>
                    <div className={businessProfileStyles.stampPreview}>
                      <img
                        src={previews.stamp}
                        alt="stamp preview"
                        className="object-contain w-full h-full"
                        onError={(e) => {
                          e.currentTarget.style.display = "none";
                          console.warn(
                            "[BusinessProfile] stamp preview failed to load:",
                            previews.stamp
                          );
                        }}
                      />
                    </div>
                    <div className={businessProfileStyles.buttonGroup}>
                      <label className={businessProfileStyles.changeButton}>
                        <UploadIcon className="w-4 h-4" /> Change
                        <input
                          type="file"
                          accept="image/*"
                          onChange={(e) =>
                            handleLocalFilePick("stamp", e.target.files?.[0])
                          }
                          className="hidden"
                        />
                      </label>
                      <button
                        type="button"
                        onClick={() => removeLocalFile("stamp")}
                        className={businessProfileStyles.removeButton}
                      >
                        <DeleteIcon className="w-4 h-4" /> Remove
                      </button>
                    </div>
                  </div>
                ) : (
                  <label className="cursor-pointer block">
                    <div
                      className={`${businessProfileStyles.imagePreviewContainer} ${businessProfileStyles.hoverScale}`}
                    >
                      <div
                        className={
                          businessProfileStyles.uploadSmallIconContainer
                        }
                      >
                        <ImageIcon className="w-5 h-5" />
                      </div>
                      <div>
                        <p className={businessProfileStyles.uploadTextTitle}>
                          Upload Stamp
                        </p>
                        <p className={businessProfileStyles.uploadTextSubtitle}>
                          PNG with transparent background
                        </p>
                      </div>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) =>
                          handleLocalFilePick("stamp", e.target.files?.[0])
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
              <h3 className="text-lg font-medium text-gray-900 mb-4">
                Digital Signature
              </h3>
              <div className={businessProfileStyles.uploadArea}>
                {previews.signature ? (
                  <div className={businessProfileStyles.imagePreviewContainer}>
                    <div className={businessProfileStyles.signaturePreview}>
                      <img
                        src={previews.signature}
                        alt="signature preview"
                        className="object-contain w-full h-full"
                        onError={(e) => {
                          e.currentTarget.style.display = "none";
                          console.warn(
                            "[BusinessProfile] signature preview failed to load:",
                            previews.signature
                          );
                        }}
                      />
                    </div>
                    <div className={businessProfileStyles.buttonGroup}>
                      <label className={businessProfileStyles.changeButton}>
                        <UploadIcon className="w-4 h-4" /> Change
                        <input
                          type="file"
                          accept="image/*"
                          onChange={(e) =>
                            handleLocalFilePick(
                              "signature",
                              e.target.files?.[0]
                            )
                          }
                          className="hidden"
                        />
                      </label>
                      <button
                        type="button"
                        onClick={() => removeLocalFile("signature")}
                        className={businessProfileStyles.removeButton}
                      >
                        <DeleteIcon className="w-4 h-4" /> Remove
                      </button>
                    </div>
                  </div>
                ) : (
                  <label className="cursor-pointer block">
                    <div
                      className={`${businessProfileStyles.imagePreviewContainer} ${businessProfileStyles.hoverScale}`}
                    >
                      <div
                        className={
                          businessProfileStyles.uploadSmallIconContainer
                        }
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
                      <div>
                        <p className={businessProfileStyles.uploadTextTitle}>
                          Upload Signature
                        </p>
                        <p className={businessProfileStyles.uploadTextSubtitle}>
                          PNG with transparent background
                        </p>
                      </div>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) =>
                          handleLocalFilePick("signature", e.target.files?.[0])
                        }
                        className="hidden"
                      />
                    </div>
                  </label>
                )}
              </div>

              <div className="mt-6 space-y-4">
                <div>
                  <label className={businessProfileStyles.label}>
                    Signature Owner Name
                  </label>
                  <input
                    placeholder="John Doe"
                    value={meta.signatureOwnerName || ""}
                    onChange={(e) =>
                      updateMeta("signatureOwnerName", e.target.value)
                    }
                    className={`${businessProfileStyles.input} ${customStyles.inputPlaceholder}`}
                  />
                </div>
                <div>
                  <label className={businessProfileStyles.label}>
                    Signature Title / Designation
                  </label>
                  <input
                    placeholder="Director / CEO"
                    value={meta.signatureOwnerTitle || ""}
                    onChange={(e) =>
                      updateMeta("signatureOwnerTitle", e.target.value)
                    }
                    className={`${businessProfileStyles.input} ${customStyles.inputPlaceholder}`}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className={businessProfileStyles.actionContainer}>
            <div className={businessProfileStyles.actionInnerContainer}>
              <div className={businessProfileStyles.actionButtonGroup}>
                <button type="submit" onClick={handleSave} disabled={saving} className={businessProfileStyles.saveButton}>
                  <SaveIcon className="w-4 h-4"/>{" "}
                  {saving ?"Saving...":"Save Profile"}
                </button>
                <button type="button" onClick={handleClearProfile} className={businessProfileStyles.resetButton}>
                  <ResetIcon className="w-4 h-4"/> Clear Profile
                </button>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default BusinessProfile;
