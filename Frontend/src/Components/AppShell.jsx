import React, { useState } from "react";
import { appShellStyles } from "../assets/dummyStyles";
import { useClerk, useUser } from "@clerk/clerk-react";
import { useNavigate, Link, NavLink, Outlet } from "react-router-dom";
import logo from "../assets/logo.png";
import { useEffect } from "react";

const AppShell = () => {
  const navigate = useNavigate();
  const { signOut } = useClerk();
  const { user } = useUser();

  const [mobileOpen, setMobileOpen] = useState(false);
  const [IsMobile, setIsMobile] = useState(false);

  const [collapsed, setCollapsed] = useState(() => {
    try {
      return localStorage.getItem("sidebar-collapsed") === "true";
    } catch {
      return false;
    }
  });
  const [scrolled, setScrolled] = useState(false);
  const [isMobile, setisMobile] = useState(false);
  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 1024);
      if (window.innerWidth < 1024) setCollapsed(false);
    };
    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);
    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem("sidebar-collapsed", collapsed ? "true" : "false");
    } catch {}
  }, [collapsed]);

  // Lock body scroll when mobile drawer is open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  // Header scroll effect
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const logout = async () => {
    try {
      await signOut();
    } catch (err) {
      console.warn(err);
    }
    navigate("/login");
  };
  const toggleSidebar = () => setCollapsed(!collapsed);

  const DashboardIcon = ({ className = "w-5 h-5" }) => (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
    >
      <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
      <polyline points="9 22 9 12 15 12 15 22" />
    </svg>
  );

  const InvoiceIcon = ({ className = "w-5 h-5" }) => (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
    >
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <polyline points="14 2 14 8 20 8" />
      <line x1="16" y1="13" x2="8" y2="13" />
      <line x1="16" y1="17" x2="8" y2="17" />
      <polyline points="10 9 9 9 8 9" />
    </svg>
  );

  const CreateIcon = ({ className = "w-5 h-5" }) => (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
    >
      <circle cx="12" cy="12" r="10" />
      <line x1="12" y1="8" x2="12" y2="16" />
      <line x1="8" y1="12" x2="16" y2="12" />
    </svg>
  );

  const ProfileIcon = ({ className = "w-5 h-5" }) => (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
    >
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  );

  const LogoutIcon = ({ className = "w-5 h-5" }) => (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
    >
      <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
      <polyline points="16 17 21 12 16 7" />
      <line x1="21" y1="12" x2="9" y2="12" />
    </svg>
  );

  const CollapseIcon = ({ className = "w-4 h-4", collapsed }) => (
    <svg
      className={`${className} transition-transform duration-300 ${
        collapsed ? "rotate-180" : ""
      }`}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M11 19l-7-7 7-7m8 14l-7-7 7-7"
      />
    </svg>
  );

  /* ----- SidebarLink ----- */
  const SidebarLink = ({ to, icon, children }) => (
    <NavLink
      to={to}
      className={({ isActive }) => `
        ${appShellStyles.sidebarLink}
        ${collapsed ? appShellStyles.sidebarLinkCollapsed : ""}
        ${
          isActive
            ? appShellStyles.sidebarLinkActive
            : appShellStyles.sidebarLinkInactive
        }
      `}
      onClick={() => setMobileOpen(false)}
    >
      {({ isActive }) => (
        <>
          <div
            className={`${appShellStyles.sidebarIcon} ${
              isActive
                ? appShellStyles.sidebarIconActive
                : appShellStyles.sidebarIconInactive
            }`}
          >
            {icon}
          </div>
          {!collapsed && (
            <span className={appShellStyles.sidebarText}>{children}</span>
          )}
          {!collapsed && isActive && (
            <div className={appShellStyles.sidebarActiveIndicator} />
          )}
        </>
      )}
    </NavLink>
  );
const displayName = (() => {
    if (!user) return "User";
    const name = user.fullName || user.firstName || user.username || "";
    return name.trim() || (user.email || "").split?.("@")?.[0] || "User";
  })();

  const firstName = () => {
    const parts = displayName.split(" ").filter(Boolean);
    return parts.length ? parts[0] : displayName;
  };

  const initials = () => {
    const parts = displayName.split(" ").filter(Boolean);
    if (parts.length === 1) return parts[0].charAt(0).toUpperCase();
    return (
      parts[0].charAt(0) + parts[parts.length - 1].charAt(0)
    ).toUpperCase();
  };
  return (
    <div className={appShellStyles.root}>
      <div className={appShellStyles.layout}>
        <aside
          className={`${appShellStyles.sidebar} ${
            collapsed
              ? appShellStyles.sidebarCollapsed
              : appShellStyles.sidebarExpanded
          }`}
        >
          <div className={appShellStyles.sidebarGradient}></div>
          <div className={appShellStyles.sidebarContainer}>
            <div>
              <div
                className={`${appShellStyles.logoContainer} ${
                  collapsed ? appShellStyles.logoContainerCollapsed : ""
                }`}
              >
                <Link to="/" className={appShellStyles.logoLink}>
                  <div className=" relative flex items-center justify-center group">
                    <img
                      src={logo}
                      alt="logo"
                      className={appShellStyles.logoImage}
                    />
                    <div className="absolute inset-0 rounded-lg blur-sm group-hover:blur-md transition-all duration-300" />
                    {!collapsed && (
                      <div className={appShellStyles.logoTextContainer}>
                        <span className={appShellStyles.logoText}>
                          InvoiceAi
                        </span>
                        <div className={appShellStyles.logoUnderline}></div>
                      </div>
                    )}
                  </div>
                </Link>
                {!collapsed && (
                  <button
                    onClick={toggleSidebar}
                    className={appShellStyles.collapseButton}
                  >
                    <CollapseIcon collapsed={collapsed} />
                  </button>
                )}
              </div>
              <nav className={appShellStyles.nav}>
                <SidebarLink to="/app/dashboard" icon={<DashboardIcon />}>
                  Dashboard
                </SidebarLink>
                <SidebarLink to="/app/invoices" icon={<InvoiceIcon />}>
                  Invoices
                </SidebarLink>
                <SidebarLink to="/app/create-invoice" icon={<CreateIcon />}>
                  Create Invoice
                </SidebarLink>
                <SidebarLink to="/app/business" icon={<ProfileIcon />}>
                  Business Profile
                </SidebarLink>
              </nav>
            </div>
            <div className={appShellStyles.userSection}>
              <div
                className={`${appShellStyles.userDivider} ${
                  collapsed
                    ? appShellStyles.userDividerCollapsed
                    : appShellStyles.userDividerExpanded
                }`}
              >
                {!collapsed ? (
                  <button
                    onClick={logout}
                    className={appShellStyles.logoutButton}
                  >
                    <LogoutIcon className={appShellStyles.logoutIcon} />
                    <span>Logout</span>
                  </button>
                ) : (
                  <button
                    onClick={logout}
                    className="w-full flex items-center p-3 rounded-xl text-red-600 hover:bg-red-50 hover:shadow-md transition-all duration-300"
                  >
                    <LogoutIcon className="w-5 h-2 hover:scale-110 transition-transform" />
                  </button>
                )}
                <div>
                  <button
                    onClick={toggleSidebar}
                    className={`${appShellStyles.collapseButtonInner} ${
                      collapsed ? appShellStyles.collapseButtonCollapsed : " "
                    }`}
                  >
                    {!collapsed && (
                      <span>{collapsed ? "Expand" : "Collapse"}</span>
                    )}
                    <CollapseIcon collapsed={collapsed} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </aside>
        {mobileOpen && (
          <div className={appShellStyles.mobileOverlay}>
            <div
              className={appShellStyles.mobileBackdrop}
              onClick={() => setMobileOpen(false)}
            >
              <div className={appShellStyles.mobileSidebar}>
                <div className={appShellStyles.mobileHeader}>
                  <Link
                    to="/"
                    className={appShellStyles.mobileLogoLink}
                    onClick={() => setMobileOpen(false)}
                  >
                    <img
                      src={logo}
                      alt="logo"
                      className={appShellStyles.mobileLogoImage}
                    />
                    <span className={appShellStyles.mobileLogoText}>
                      InvoiceAi
                    </span>
                  </Link>

                  <button
                    onClick={() => setMobileOpen(false)}
                    className={appShellStyles.mobileCloseButton}
                  >
                    <svg
                      className={appShellStyles.mobileCloseIcon}
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
                <nav className={appShellStyles.mobileNav}>
                  <NavLink
                    onClick={() => setMobileOpen(false)}
                    to="/app/dashboard"
                    className={({ isActive }) =>
                      `${appShellStyles.mobileNavLink} ${
                        isActive
                          ? appShellStyles.mobileNavLinkActive
                          : appShellStyles.mobileNavLinkInactive
                      }`
                    }
                  >
                    {" "}
                    <DashboardIcon /> Dashboard
                  </NavLink>
                  <NavLink
                    onClick={() => setMobileOpen(false)}
                    to="/app/invoices"
                    className={({ isActive }) =>
                      `${appShellStyles.mobileNavLink} ${
                        isActive
                          ? appShellStyles.mobileNavLinkActive
                          : appShellStyles.mobileNavLinkInactive
                      }`
                    }
                  >
                    {" "}
                    <InvoiceIcon /> Invoices
                  </NavLink>
                  <NavLink
                    onClick={() => setMobileOpen(false)}
                    to="/app/create-invoice"
                    className={({ isActive }) =>
                      `${appShellStyles.mobileNavLink} ${
                        isActive
                          ? appShellStyles.mobileNavLinkActive
                          : appShellStyles.mobileNavLinkInactive
                      }`
                    }
                  >
                    {" "}
                    <CreateIcon /> Create Invoice
                  </NavLink>
                  <NavLink
                    onClick={() => setMobileOpen(false)}
                    to="/app/business"
                    className={({ isActive }) =>
                      `${appShellStyles.mobileNavLink} ${
                        isActive
                          ? appShellStyles.mobileNavLinkActive
                          : appShellStyles.mobileNavLinkInactive
                      }`
                    }
                  >
                    {" "}
                    <ProfileIcon /> Business Profile
                  </NavLink>
                </nav>
                <div className={appShellStyles.mobileLogoutSection}>
                  <button onClick={()=>{setMobileOpen(false);logout()}} className={appShellStyles.mobileLogoutButton}>
                      <LogoutIcon/> logout
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="flex-1 min-w-0 z-10 relative">
          <header className={`${appShellStyles.header} ${scrolled?appShellStyles.headerScrolled:appShellStyles.headerNotScrolled}`}>
            <div className={appShellStyles.headerTopSection}>
              <div className={appShellStyles.headerContent}>
              <button onClick={()=>setMobileOpen(true)} className={appShellStyles.mobileMenuButton}>
                <svg
                    className={appShellStyles.mobileMenuIcon}
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
            
              </button>
              {!isMobile &&(
                <button onClick={toggleSidebar} className={appShellStyles.desktopCollapseButton}>
                  <CollapseIcon collapsed={collapsed} />
                </button>
              )}
                <div className={appShellStyles.welcomeContainer}>
                  <h2 className={appShellStyles.welcomeTitle}>
                    Welcome back,{" "}
                    <span className={appShellStyles.welcomeName}>{firstName()}</span>
                  </h2>
                  <p className={appShellStyles.welcomeSubtitle}>Ready to create amazing invoice?</p>
                </div>
              </div>
            </div>
            <div className={appShellStyles.headerActions}>
              <button onClick={()=>navigate("/app/create-invoice")} className={appShellStyles.ctaButton}>
                <CreateIcon className={appShellStyles.ctaIcon}/>
                <span className="hidden xs:inline">Create Invoice</span>
                <span className="xs:hidden">Create</span>
              </button>

              <div className={appShellStyles.userSectionDesktop}>
                <div className={appShellStyles.userInfo}>
                  <div className={appShellStyles.userName}>{displayName}</div>
                  <div className={appShellStyles.userEmail}>{user?.email}</div>
                  
                </div>
                <div className={appShellStyles.userAvatarContainer}>
                  <div className={appShellStyles.userAvatar}>
                    {initials()}
                    <div className={appShellStyles.userAvatarBorder}></div>
                  </div>
                  <div className={appShellStyles.userStatus}></div>
                </div>
              </div>
            </div>
          </header>
          <main className={appShellStyles.main}>
            <div className={appShellStyles.mainContainer}><Outlet/></div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default AppShell;
