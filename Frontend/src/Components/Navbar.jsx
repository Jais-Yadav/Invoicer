import React, { use, useCallback, useEffect } from "react";
import { navbarStyles } from "../assets/dummyStyles";
import logo from "../assets/logo.png";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useAuth, useClerk, useUser } from "@clerk/clerk-react";
import { useRef } from "react";
import { SignedOut } from "@clerk/clerk-react";

function Navbar() {
  const [open, setopen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  const { user } = useUser();
  const { getToken, isSignedIn } = useAuth();
  const clerk = useClerk();

  const navigate = useNavigate();
  const profileRef = useRef(null);
  
  const failureRef = useRef(0);
  const TOKEN_KEY = "token";

  // for token generation or refresh the token
  const fetchAndStoreToken = useCallback(async (options = {}) => {
    try {
      if (!getToken) return null;
      const attemptToken = async (opts) => {
        try {
          const t = await getToken(opts).catch(() => null);
          return t;
        } catch (err) {
          console.error("getToken error:", err);
          return null;
        }
      };
      let token = await attemptToken(options);
      if (!token && !options.forceRefresh) {
        token = await attemptToken({ forceRefresh: true });
      }
      if (token) {
        try {
          localStorage.setItem(TOKEN_KEY, token);
          console.log("Stored token:", token);
        } catch (e) {}
        failureRef.current = 0;
        return token;
      } else {
        failureRef.current = (failureRef.current || 0) + 1;
        if (failureRef.current >= 2) {
          console.warn("Token fetch failed repeatedly — signing out");
          try {
            await clerk.signOut();
          } catch (e) {
            console.error("signOut error:", e);
          }
        }
        return null;
      }
    } catch (error) {
      console.error("fetchAndStoreToken error:", error);
      return null;
    }
  }, [getToken, clerk]);

useEffect(() => {
  let mounted = true;
  (async () => {
    if (isSignedIn) {
      const t = await fetchAndStoreToken({ template: "default" }).catch(() => null);
      if (!t && mounted) {
        await fetchAndStoreToken({ forceRefresh: true }).catch(() => null);
      }
    } else {
      try {
        localStorage.removeItem(TOKEN_KEY);
      } catch (error) {}
    }
  })();
  return () => {
    mounted = false;
  };
}, [isSignedIn, fetchAndStoreToken]);
// to redirect user to dashboard if already signed in
useEffect(()=>{
  if(isSignedIn){
    const pathname=window.location.pathname || "/";
    if(pathname==="/login" || pathname ==="/signup"|| pathname.startsWith("/auth")||pathname==='/'){
      navigate("/app/dashboard",{replace:true})
    }
  }
});

// Close profile popover on outside click
useEffect(() => {
  function onDocClick(e) {
    if (!profileRef.current) return;
    if (!profileRef.current.contains(e.target)) {
      setProfileOpen(false);
    }
  }
  if (profileOpen) {
    document.addEventListener("mousedown", onDocClick);
    document.addEventListener("touchstart", onDocClick);
  }
  return () => {
    document.removeEventListener("mousedown", onDocClick);
    document.removeEventListener("touchstart", onDocClick);
  };
}, [profileOpen]);

  const openSignIn = () => {
    try {
      if (clerk && typeof clerk.openSignIn === "function") {
        clerk.openSignIn();
      } else {
        navigate("/login");
      }
    } catch (error) {
      console.error("Error opening sign-in:", error);
      navigate("/login");
    }
  };
  const openSignUp = () => {
    try {
      if (clerk && typeof clerk.openSignUp === "function") {
        clerk.openSignUp();
      } else {
        navigate("/signUp");
      }
    } catch (error) {
      navigate("/signUp");
    }
  };

  return (
    <div>
      <header className={navbarStyles.header}>
        <div className={navbarStyles.container}>
          <nav className={navbarStyles.nav}>
            <div className={navbarStyles.logoSection}>
              <Link to="/" className={navbarStyles.logoLink}>
                <img src={logo} alt="logo" className={navbarStyles.logoImage} />
                <span className={navbarStyles.logoText}>InvoiceR</span>
              </Link>
              <div className={navbarStyles.desktopNav}>
                <a href="#features" className={navbarStyles.navLink}>
                  Features
                </a>
                <a href="#pricing" className={navbarStyles.navLinkInactive}>
                  Pricing
                </a>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <SignedOut>
                <button
                  onClick={openSignIn}
                  className={navbarStyles.signInButton}
                  type="button"
                >
                  Sign In
                </button>
                <button
                  onClick={openSignUp}
                  className={navbarStyles.signUpButton}
                  type="button"
                >
                  <div className={navbarStyles.signUpOverlay}></div>
                  <span className={navbarStyles.signUpText}>Get Started</span>
                  <svg
                    className={navbarStyles.signUpIcon}
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M5 12h14m-7-7l7 7-7 7" />
                  </svg>
                  
                </button>
                
              </SignedOut>

              
                 
            </div>
            <button onClick={()=>setopen(!open)} className={navbarStyles.mobileMenuButton}>
                <div className={navbarStyles.mobileMenuIcon}>
                    <span className={`${navbarStyles.mobileMenuLine1} ${open?navbarStyles.mobileMenuLine1Open:navbarStyles.mobileMenuLine1Closed}`}></span>
                    <span className={`${navbarStyles.mobileMenuLine2} ${open?navbarStyles.mobileMenuLine2Open:navbarStyles.mobileMenuLine2Closed}`}></span>
                    <span className={`${navbarStyles.mobileMenuLine3} ${open?navbarStyles.mobileMenuLine3Open:navbarStyles.mobileMenuLine3Closed}`}></span>
                </div>
            </button>
         
          </nav>
        </div>

        <div className={`${open? "block":"hidden"} ${navbarStyles.mobileMenu}`}>
            <div className={navbarStyles.mobileMenuContainer}>
                <a href="#features" className={navbarStyles.mobileNavLink}>Features</a>
                <a href="#pricing" className={navbarStyles.mobileNavLink}>Pricing</a>
            </div>
            <div className={navbarStyles.mobileAuthSection}>
          <SignedOut>
            <button onClick={openSignIn} className={navbarStyles.mobileSignIn}> SignIn</button>
            <button onClick={openSignUp} className={navbarStyles.mobileSignIn}>Get Started</button>
          </SignedOut>
        </div>
        </div>
        
      </header>
    </div>
  );
}

export default Navbar;
