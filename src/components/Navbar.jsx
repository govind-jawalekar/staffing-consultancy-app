import React, { useState, useEffect, useRef } from "react";
import { useNavigate, NavLink,useLocation } from "react-router-dom";
import { HashLink } from "react-router-hash-link";
import { auth, db } from "../firebase/firebaseconfig";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import logo from "../assets/logo.png";
import { LogOutIcon, User } from "lucide-react";

export default function Navbar() {
  const navigate = useNavigate();

  const [menuOpen,      setMenuOpen]      = useState(false);
  const [scrolled,      setScrolled]      = useState(false);
  const [user,          setUser]          = useState(null);
  const [username,      setUsername]      = useState("");
  const [dropdownOpen,  setDropdownOpen]  = useState(false);

  const location=useLocation();

  const dropdownRef = useRef();

  /* ── Firebase auth ── */
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        const snap = await getDoc(doc(db, "Users", currentUser.uid));
        if (snap.exists()) setUsername(snap.data().fullname || "User");
      } else {
        setUser(null);
        setUsername("");
      }
    });
    return () => unsub();
  }, []);

  /* ── Close dropdown on outside click ── */
  useEffect(() => {
    const handler = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target))
        setDropdownOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  /* ── Scroll shadow ── */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* ── Close menu on route change ── */
  useEffect(() => { setMenuOpen(false); }, []);

  const handleLogout = async () => {
    await signOut(auth);
    setDropdownOpen(false);
    navigate("/");
  };

  const getInitials = (name) => {
    if (!name) return "U";
    const w = name.trim().split(" ");
    return w.length === 1 ? w[0][0].toUpperCase() : w[0][0].toUpperCase() + w[1][0].toUpperCase();
  };

  const links = [  
    { label: "Home",              to: "/" },
    { label: "Job Opportunities", to: "/jobs" },
    { label: "About",             to: "/about" },
    { label: "Services",          to: "/services"},
    { label: "Clients",           to: "/clients" },
    { label: "Contact",           to: "/contact" },
  ];

  return (
    <>
      



      {/* ── NAVBAR ── */}
      <nav className={`jc-navbar${scrolled ? " scrolled" : ""}`}>

        {/* Logo */}
        <div className="jc-logo" onClick={() => navigate("/")}>
          <img src={logo} alt="JobChoice Consulting" />
        </div>

        {/* Desktop links */}
       <ul className="jc-links">
        <li>
          <HashLink to="/#home" className={location.hash === "#home" ? "active" : ""}>
            Home
          </HashLink>
        </li>
        <li>
          <HashLink to="/jobs#jobs" className={location.hash === "#jobs" ? "active" : ""}>
            Jobs
          </HashLink>
        </li>
        <li>
          <HashLink to="/about#about" className={location.hash === "#about" ? "active" : ""}>
            About
          </HashLink>
        </li>
        <li>
          <HashLink to="/services#services" className={location.hash === "#services" ? "active" : ""}>
            Services
          </HashLink>
        </li>
        <li>
          <HashLink to="/clients#clients" className={location.hash === "#clients" ? "active" : ""}>
            Clients
          </HashLink>
        </li>
        <li>
          <HashLink to="/contact#contact" className={location.hash === "#contact" ? "active" : ""}>
            Contact
          </HashLink>
        </li>
      </ul>

        {/* Desktop actions */}
        <div className="jc-actions">
          {user ? (
            <div className="jc-profile-wrap" ref={dropdownRef}>
              <div className="jc-profile-trigger" onClick={() => setDropdownOpen(v => !v)}>
                <div className="jc-profile-badge">{getInitials(username)}</div>
                <span className="jc-profile-name">Hey, {username}</span>
                <span className={`jc-profile-chevron${dropdownOpen ? " open" : ""}`}>▼</span>
              </div>
              {dropdownOpen && (
                <div className="jc-dropdown">
                  <div className="jc-dropdown-header">
                    <span>Signed in as</span>
                    <strong>{username}</strong>
                  </div>
                  <div className="jc-dropdown-item" onClick={() => { navigate("/profile"); setDropdownOpen(false); }}>
                    <User size={18}/>Profile
                  </div>
                  <div className="jc-dropdown-item danger" onClick={handleLogout}>
                    <LogOutIcon size={18}/>Logout
                  </div>
                </div>
              )}
            </div>
          ) : (
            <>
              <button className="jc-btn-login"  onClick={() => navigate("/login")}>Login</button>
              <button className="jc-btn-signup" onClick={() => navigate("/signup")}>Get Started</button>
            </>
          )}
        </div>

        {/* Hamburger */}
        <button
          className={`jc-hamburger${menuOpen ? " open" : ""}`}
          onClick={() => setMenuOpen(v => !v)}
          aria-label="Toggle menu"
          aria-expanded={menuOpen}
        >
          <span /><span /><span />
        </button>
      </nav>

      {/* Backdrop — conditionally rendered, never blocks taps when closed */}
      {menuOpen && (
        <div className="jc-backdrop" onClick={() => setMenuOpen(false)} />
      )}

      {/* Mobile drawer */}
      <div className={`jc-mobile-menu${menuOpen ? " open" : ""}`}>
        <ul>
          {links.map(({ label, to }) => (
            <li key={label}>
              <NavLink
                to={to}
                className={({ isActive }) => isActive ? "active" : ""}
                onClick={() => setMenuOpen(false)}
              >
                {label}
              </NavLink>
            </li>
          ))}
        </ul>

        <div className="jc-mobile-divider" />

        {user ? (
          <div className="jc-mobile-profile">
            <div className="jc-profile-badge">{getInitials(username)}</div>
            <div className="jc-mobile-profile-info">
              <span>Signed in as</span>
              <strong>{username}</strong>
            </div>
            <div className="jc-dropdown-item" onClick={() => { navigate("/profile"); setDropdownOpen(false); }}>
                    <User size={20}/>Profile
                  </div>
            <button className="jc-mobile-logout" onClick={handleLogout}><LogOutIcon size={18}/> Logout</button>
          </div>
        ) : (
          <div className="jc-mobile-actions">
            <button className="jc-btn-login"  onClick={() => { navigate("/login");  setMenuOpen(false); }}>Login</button>
            <button className="jc-btn-signup" onClick={() => { navigate("/signup"); setMenuOpen(false); }}>Get Started</button>
          </div>
        )}
      </div>
    </>
  );
}