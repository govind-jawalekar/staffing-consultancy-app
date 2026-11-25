const globalCSS = `
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap');
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  html { scroll-behavior: smooth; overflow-x: hidden; }
  body { font-family: 'Inter', sans-serif; background: #fff; color: #111827; position: relative; }
  a { text-decoration: none; }
  button { cursor: pointer; }

  /* ── Global mobile overflow kill-switch ─────────────────────────
     Fixes right-side gap on ALL pages / ALL browsers
  ──────────────────────────────────────────────────────────────── */
  @media (max-width: 768px) {
    html, body {
      overflow-x: hidden !important;
      max-width: 100% !important;
    }
    /* Inputs: prevent iOS auto-zoom (font < 16px triggers it, shifting viewport) */
    input, textarea, select {
      font-size: 16px !important;
      touch-action: manipulation;
    }
    button, a, [role="button"] {
      touch-action: manipulation;
    }
  }


   @import url('https://fonts.googleapis.com/css2?family=Raleway:wght@500;600;700;800&family=Lato:wght@400;600;700&display=swap');

        :root {
          --jc-navy:      #12263F;
          --jc-steel:     #1E4A6E;
          --jc-sky:       #2D6A96;
          --jc-accent:    #3A8FB5;
          --jc-mist:      #E8F1F8;
          --jc-cloud:     #F4F8FB;
          --jc-divider:   #D0DFE9;
          --jc-txt-sec:   #4A6A82;
          --jc-txt-muted: #7A9AB0;
          --jc-white:     #FFFFFF;
        }

        /* ── Shell ── */

        /* ── Shell ── */
        .jc-navbar {
          position: sticky;
          position: -webkit-sticky;
          top: 0; z-index: 1000;
          height: 72px; padding: 0 56px;
          background: var(--jc-cloud, #F4F8FB);
          border-bottom: 1.5px solid var(--jc-divider, #D0DFE9);
          display: flex; align-items: center; justify-content: space-between;
          font-family: 'Lato', sans-serif;
          transition: box-shadow 0.3s, background 0.3s;
        }
        .jc-navbar.scrolled {
          box-shadow: 0 4px 28px rgba(18,38,63,0.12);
          background: rgba(244,248,251,0.97);
          backdrop-filter: blur(10px);
        }

        /* ── Logo ── */
        .jc-logo { display: flex; align-items: center; cursor: pointer; flex-shrink: 0; }
        .jc-logo img { height: 42px; width: auto; display: block; }

        /* ── Desktop nav links ── */
        .jc-links {
          display: flex; gap: 2px;
          list-style: none; margin: 0; padding: 0;
        }
        .jc-links li a {
          display: block; padding: 8px 15px;
          font-size: 0.875rem; font-weight: 600; letter-spacing: 0.025em;
          color: var(--jc-txt-sec, #4A6A82);
          border-radius: 7px; text-decoration: none;
          position: relative;
          transition: color 0.2s, background 0.2s;
        }
        /* Teal underline sweep animation */
        .jc-links li a::after {
          content: '';
          position: absolute;
          bottom: 4px; left: 15px; right: 15px;
          height: 2px;
          background: var(--jc-accent, #3A8FB5);
          border-radius: 2px;
          transform: scaleX(0);
          transform-origin: left;
          transition: transform 0.25s ease;
        }
        .jc-links li a:hover {
          color: var(--jc-navy, #12263F);
          background: var(--jc-mist, #E8F1F8);
        }
        .jc-links li a:hover::after { transform: scaleX(1); }
        .jc-links li a.active {
          color: var(--jc-navy, #12263F);
          background: var(--jc-mist, #E8F1F8);
          font-weight: 700;
        }
        .jc-links li a.active::after { transform: scaleX(1); }

        /* ── Desktop actions ── */
        .jc-actions { display: flex; align-items: center; gap: 10px; }

        .jc-btn-login {
          background: none; border: 1.5px solid var(--jc-divider, #D0DFE9);
          font-family: 'Lato', sans-serif; font-size: 0.875rem; font-weight: 600;
          color: var(--jc-txt-sec, #4A6A82);
          padding: 9px 20px; border-radius: 8px; cursor: pointer;
          transition: border-color 0.2s, color 0.2s, background 0.2s;
        }
        .jc-btn-login:hover {
          border-color: var(--jc-sky, #2D6A96);
          color: var(--jc-steel, #1E4A6E);
          background: var(--jc-mist, #E8F1F8);
        }

        .jc-btn-signup {
          background: linear-gradient(135deg, #1E4A6E 0%, #2D6A96 100%);
          color: #fff; border: none;
          padding: 10px 22px; border-radius: 8px;
          font-family: 'Lato', sans-serif; font-size: 0.875rem; font-weight: 700;
          cursor: pointer;
          box-shadow: 0 3px 14px rgba(30,74,110,0.28);
          transition: opacity 0.2s, transform 0.2s, box-shadow 0.2s;
        }
        .jc-btn-signup:hover {
          opacity: 0.9; transform: translateY(-1px);
          box-shadow: 0 6px 20px rgba(30,74,110,0.36);
        }

        /* ── Profile trigger ── */
        .jc-profile-wrap { position: relative; }
        .jc-profile-trigger {
          display: flex; align-items: center; gap: 9px;
          cursor: pointer; padding: 5px 12px 5px 5px;
          border-radius: 10px; border: 1.5px solid var(--jc-divider, #D0DFE9);
          background: #fff;
          transition: border-color 0.2s, box-shadow 0.2s;
          user-select: none;
        }
        .jc-profile-trigger:hover {
          border-color: var(--jc-accent, #3A8FB5);
          box-shadow: 0 2px 12px rgba(18,38,63,0.08);
        }
        .jc-profile-badge {
          width: 34px; height: 34px; border-radius: 8px;
          background: linear-gradient(135deg, #1E4A6E, #2D6A96);
          color: #fff; font-family: 'Raleway', sans-serif;
          font-size: 0.78rem; font-weight: 800;
          display: flex; align-items: center; justify-content: center;
          flex-shrink: 0;
        }
        .jc-profile-name {
          font-size: 0.85rem; font-weight: 700; color: var(--jc-navy, #12263F);
          max-width: 120px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;
        }
        .jc-profile-chevron {
          font-size: 0.6rem; color: var(--jc-txt-muted, #7A9AB0);
          margin-left: 2px; transition: transform 0.2s; display: inline-block;
        }
        .jc-profile-chevron.open { transform: rotate(180deg); }

        /* ── Dropdown ── */
        .jc-dropdown {
          position: absolute; top: calc(100% + 8px); right: 0;
          background: #fff; border: 1.5px solid var(--jc-divider, #D0DFE9);
          border-radius: 12px; box-shadow: 0 8px 32px rgba(18,38,63,0.12);
          min-width: 188px; overflow: hidden;
          animation: jcDropIn 0.18s ease; z-index: 1010;
        }
        @keyframes jcDropIn {
          from { opacity: 0; transform: translateY(-6px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .jc-dropdown-header {
          padding: 12px 16px 10px;
          border-bottom: 1px solid var(--jc-divider, #D0DFE9);
        }
        .jc-dropdown-header span {
          font-size: 0.72rem; color: var(--jc-txt-muted, #7A9AB0); display: block; margin-bottom: 2px;
        }
        .jc-dropdown-header strong {
          font-size: 0.88rem; font-weight: 700; color: var(--jc-navy, #12263F);
          font-family: 'Raleway', sans-serif;
        }
        .jc-dropdown-item {
          display: flex; align-items: center; gap: 9px;
          padding: 11px 16px; font-size: 0.85rem; font-weight: 600;
          color: var(--jc-txt-sec, #4A6A82);
          cursor: pointer; transition: background 0.15s, color 0.15s;
        }
        .jc-dropdown-item:hover { background: var(--jc-mist, #E8F1F8); color: var(--jc-navy, #12263F); }
        .jc-dropdown-item.danger { color: #c94f4f; }
        .jc-dropdown-item.danger:hover { background: #fff0f0; color: #b03a3a; }

        /* ── Hamburger ── */
        .jc-hamburger {
          display: none; flex-direction: column; justify-content: center; gap: 5px;
          width: 40px; height: 40px; background: none; border: none;
          cursor: pointer; padding: 5px; border-radius: 8px; z-index: 1001;
          transition: background 0.2s;
        }
        .jc-hamburger:hover { background: var(--jc-mist, #E8F1F8); }
        .jc-hamburger span {
          display: block; height: 2px; background: var(--jc-navy, #12263F);
          border-radius: 2px;
          transition: transform 0.3s ease, opacity 0.3s ease, width 0.3s ease;
        }
        .jc-hamburger span:nth-child(1) { width: 22px; }
        .jc-hamburger span:nth-child(2) { width: 16px; }
        .jc-hamburger span:nth-child(3) { width: 22px; }
        /* Animated X */
        .jc-hamburger.open span:nth-child(1) { transform: translateY(7px) rotate(45deg); width: 22px; }
        .jc-hamburger.open span:nth-child(2) { opacity: 0; transform: scaleX(0); }
        .jc-hamburger.open span:nth-child(3) { transform: translateY(-7px) rotate(-45deg); width: 22px; }

        /* ── Mobile drawer ── */
        .jc-mobile-menu {
          display: none; position: fixed; top: 72px; left: 0; right: 0;
          background: var(--jc-cloud, #F4F8FB);
       
          box-shadow: 0 12px 40px rgba(18,38,63,0.12);
          z-index: 999; overflow: hidden;
          max-height: 0;
          transition: max-height 0.35s cubic-bezier(0.4,0,0.2,1);
        }
        .jc-mobile-menu.open { max-height: 600px; }
        .jc-mobile-menu ul { list-style: none; padding: 10px 0 4px; margin: 0; }
        .jc-mobile-menu ul li a {
          display: flex; align-items: center; padding: 13px 24px;
          font-size: 0.95rem; font-weight: 600;
          color: var(--jc-txt-sec, #4A6A82);
          text-decoration: none;
          border-left: 3px solid transparent;
          transition: background 0.15s, color 0.15s, border-color 0.15s;
        }
        .jc-mobile-menu ul li a:hover,
        .jc-mobile-menu ul li a.active {
          background: var(--jc-mist, #E8F1F8);
          color: var(--jc-navy, #12263F);
          border-left-color: var(--jc-accent, #3A8FB5);
        }
        .jc-mobile-divider { height: 1px; background: var(--jc-divider, #D0DFE9); margin: 8px 24px; }

        /* Mobile profile (logged in) */
        .jc-mobile-profile {
          display: flex; align-items: center; gap: 12px;
          padding: 14px 24px;
          border-top: 1px solid var(--jc-divider, #D0DFE9);
          background: #fff;
        }
        .jc-mobile-profile-info { flex: 1; min-width: 0; }
        .jc-mobile-profile-info span { font-size: 0.72rem; color: var(--jc-txt-muted, #7A9AB0); display: block; }
        .jc-mobile-profile-info strong { font-size: 0.88rem; font-weight: 700; color: var(--jc-navy, #12263F); }
        .jc-mobile-logout {
          font-size: 0.8rem; font-weight: 700; color: #c94f4f;
          background: none; border: 1.5px solid #f0d0d0; border-radius: 7px;
          padding: 6px 12px; cursor: pointer; font-family: 'Lato', sans-serif;
          transition: background 0.15s; touch-action: manipulation;
        }
        .jc-mobile-logout:hover { background: #fff0f0; }

        /* Mobile actions (logged out) */
        .jc-mobile-actions { display: flex; gap: 12px; padding: 12px 24px 20px; }
        .jc-mobile-actions .jc-btn-login,
        .jc-mobile-actions .jc-btn-signup {
          flex: 1; text-align: center; touch-action: manipulation;
        }

        /* ── Backdrop — only rendered in JSX when open ── */
        .jc-backdrop {
          position: fixed; inset: 0; top: 72px;
          background: rgba(18,38,63,0.22); z-index: 998;
          cursor: pointer;
          animation: jcFadeIn 0.2s ease forwards;
        }
        @keyframes jcFadeIn { from { opacity: 0; } to { opacity: 1; } }

        /* ── Responsive ── */
        @media (max-width: 960px) {
          .jc-navbar { padding: 0 24px; }
          .jc-links, .jc-actions { display: none; }
          .jc-hamburger { display: flex; }
          .jc-mobile-menu { display: block; }
        }
        @media (max-width: 480px) {
          .jc-navbar { padding: 0 16px; height: 64px; }
          .jc-logo img { height: 36px; }
          .jc-mobile-menu { top: 64px; }
          .jc-backdrop { top: 64px; }
        }

  /* HERO SLIDER */
  @import url('https://fonts.googleapis.com/css2?family=Raleway:wght@700;800;900&family=Lato:wght@400;600;700&display=swap');

        /* ── Section ── */
        .jct-section {
          background: linear-gradient(150deg, #12263F 0%, #1E4A6E 55%, #2D6A96 100%);
          padding: 72px 0 80px;
          overflow: hidden;
          contain: paint;
          position: relative;
          font-family: 'Lato', sans-serif;
        }
        .jct-section::before {
          content: '';
          position: absolute; top: -70px; right: -70px;
          width: 320px; height: 320px; border-radius: 50%;
          background: rgba(58,143,181,0.09); pointer-events: none;
        }
        .jct-section::after {
          content: '';
          position: absolute; bottom: -50px; left: -50px;
          width: 220px; height: 220px; border-radius: 50%;
          background: rgba(18,38,63,0.20); pointer-events: none;
        }

        /* ── Header ── */
        .jct-header {
          text-align: center;
          padding: 0 80px;
          margin-bottom: 44px;
          position: relative; z-index: 1;
        }
        .jct-label {
          font-size: 0.72rem; font-weight: 700;
          letter-spacing: 0.14em; text-transform: uppercase;
          color: #3A8FB5; margin-bottom: 10px;
          display: flex; align-items: center; justify-content: center; gap: 8px;
        }
        .jct-label::before, .jct-label::after {
          content: ''; display: block; width: 22px; height: 2px;
          background: #3A8FB5; border-radius: 2px;
        }
        .jct-header h2 {
          font-family: 'Raleway', sans-serif;
          font-size: clamp(1.5rem, 3vw, 2.1rem); font-weight: 900;
          color: #FFFFFF; margin-bottom: 10px; letter-spacing: -0.3px;
        }
        .jct-header p {
          font-size: 0.93rem; color: rgba(232,241,248,0.78); line-height: 1.65;
        }

        /* ── Marquee ── */
        .jct-marquee-outer {
          overflow: hidden;
          contain: paint;
          -webkit-mask-image: linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%);
          mask-image: linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%);
          position: relative; z-index: 1;
        }
        .jct-marquee-track {
          display: flex;
          gap: 20px;
          width: max-content;
          animation: jct-scroll 36s linear infinite;
          padding: 8px 0 12px;
        }
        .jct-marquee-track:hover { animation-play-state: paused; }

        @keyframes jct-scroll {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }

        /* ── Card ── */
        .jct-card {
          min-width: 300px; max-width: 300px;
          flex-shrink: 0;
          background: #FFFFFF;
          border: 1.5px solid #D0DFE9;
          border-radius: 16px;
          padding: 24px 22px;
          display: flex; flex-direction: column; gap: 12px;
          box-shadow: 0 4px 20px rgba(18,38,63,0.12);
          transition: transform 0.25s, box-shadow 0.25s;
        }
        .jct-card:hover { transform: translateY(-4px); box-shadow: 0 10px 32px rgba(18,38,63,0.18); }

        /* Stars */
        .jct-stars {
          color: #f5a623;
          font-size: 0.82rem;
          letter-spacing: 2px;
        }

        /* Quote mark */
        .jct-qq {
          font-family: Georgia, serif;
          font-size: 2rem; font-weight: 900;
          color: #3A8FB5; line-height: 1;
          opacity: 0.6;
        }

        /* Quote body */
        .jct-body {
          font-size: 0.855rem;
          color: #4A6A82;
          line-height: 1.7;
          flex: 1;
        }

        /* Author */
        .jct-author {
          display: flex; align-items: center; gap: 11px;
          border-top: 1px solid #D0DFE9;
          padding-top: 12px; margin-top: 4px;
        }
        .jct-av {
          width: 38px; height: 38px; border-radius: 10px;
          display: flex; align-items: center; justify-content: center;
          font-family: 'Raleway', sans-serif;
          font-size: 0.75rem; font-weight: 800;
          color: #FFFFFF; flex-shrink: 0;
          letter-spacing: 0.04em;
        }
        .jct-name {
          font-family: 'Raleway', sans-serif;
          font-size: 0.875rem; font-weight: 800;
          color: #12263F; line-height: 1.3;
        }
        .jct-role {
          font-size: 0.75rem; color: #7A9AB0; line-height: 1.4; margin-top: 1px;
        }

        /* ── Responsive ── */
        @media (max-width: 600px) {
          .jct-header { padding: 0 20px; margin-bottom: 32px; }
          .jct-card { min-width: 260px; max-width: 260px; padding: 20px 18px; }
        }

  /* SECTION SHARED */
  .section-title { font-size: 2rem; font-weight: 800; color: #111827; margin-bottom: 12px; }
  .section-sub { color: #6b7280; font-size: 0.95rem; line-height: 1.65; }

/* ═══════════════════════════════════
           HERO BANNER
        ═══════════════════════════════════ */
        .jca-hero {
          /* Background image with dark overlay for readability */
          background:
            linear-gradient(150deg,
              rgba(18,38,63,0.80) 0%,
              rgba(30,74,110,0.72) 50%,
              rgba(18,38,63,0.82) 100%),
            url('https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=1400&q=80')
            center/cover no-repeat;
          padding: 100px 80px 90px;
          position: relative;
          overflow: hidden;
          contain: paint;
          text-align: center;
        }
        /* Blur layer over the background image */
        .jca-hero::before {
          content: '';
          position: absolute; inset: 0;
          backdrop-filter: blur(3px);
          -webkit-backdrop-filter: blur(3px);
          pointer-events: none;
          z-index: 0;
        }
        .jca-hero::after {
          content: ''; position: absolute; bottom: 0; left: 0; right: 0;
          height: 120px;
          background: linear-gradient(to bottom, transparent, rgba(18,38,63,0.35));
          pointer-events: none;
          z-index: 0;
        }
        /* Centred inner container */
        .jca-hero-inner {
          position: relative; z-index: 1;
          max-width: 860px;
          margin: 0 auto;
          display: flex; flex-direction: column; align-items: center;
        }
        .jca-hero-chip {
          display: inline-flex; align-items: center; gap: 8px;
          background: rgba(58,143,181,0.22); border: 1px solid rgba(58,143,181,0.50);
          color: var(--jc-mist); font-size: 0.72rem; font-weight: 700;
          letter-spacing: 0.13em; text-transform: uppercase;
          padding: 5px 14px; border-radius: 20px; margin-bottom: 24px;
        }
        .jca-hero h1 {
          font-family: 'Raleway', sans-serif;
          font-size: clamp(2rem, 4.5vw, 3.4rem); font-weight: 900;
          color: var(--jc-white); line-height: 1.1;
          margin-bottom: 24px; letter-spacing: -0.5px;
          text-align: center;
          text-shadow: 0 2px 20px rgba(18,38,63,0.40);
        }
        .jca-hero h1 span { color: var(--jc-accent); }
        .jca-hero-desc {
          font-size: clamp(0.9rem, 1.6vw, 1.05rem);
          color: rgba(232,241,248,0.90); line-height: 1.8;
          max-width: 1000px; margin-bottom: 18px;
          text-align: center;
        }
        .jca-tagline {
          display: inline-block;
          font-family: 'Raleway', sans-serif;
          font-size: 1.1rem; font-weight: 700; font-style: italic;
          color: var(--jc-mist);
          border-left: 3px solid white;
          padding-left: 16px;
          margin: 16px 0;
        }
 
 
        /* ═══════════════════════════════════
           STATS
        ═══════════════════════════════════ */
        .jca-stats-section { background: var(--jc-cloud); padding: 60px 80px; }
        .jca-stats-grid {
          display: grid; grid-template-columns: repeat(4, 1fr);
          gap: 20px; max-width: 1080px; margin: 0 auto;
        }
        .jca-stat-card {
          background: var(--jc-white); border: 1.5px solid var(--jc-divider);
          border-radius: 16px; padding: 36px 20px; text-align: center;
          box-shadow: 0 2px 16px rgba(18,38,63,0.06);
          transition: transform 0.25s, box-shadow 0.25s, border-color 0.25s;
        }
        .jca-stat-card:hover { transform: translateY(-5px); box-shadow: 0 10px 32px rgba(18,38,63,0.12); border-color: var(--jc-accent); }
        .jca-stat-icon { width: 56px; height: 56px; background: var(--jc-mist); border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 1.4rem; margin: 0 auto 14px; }
        .jca-stat-num { font-family: 'Raleway', sans-serif; font-size: 2rem; font-weight: 900; color: var(--jc-navy); margin-bottom: 6px; }
        .jca-stat-label { font-size: 0.8rem; font-weight: 600; color: var(--jc-txt-sec); letter-spacing: 0.04em; text-transform: uppercase; }

       /* ═══════════════════════════════════
           ABOUT + VISION SPLIT
        ═══════════════════════════════════ */
        .jca-about-section { padding: 80px 80px; background: var(--jc-white); }
        .jca-about-grid {
          display: grid; grid-template-columns: 1fr 1fr;
          gap: 56px; max-width: 1080px; margin: 0 auto; align-items: start;
        }
         
        .jca-about-grid h2 {
          font-family: 'Raleway', sans-serif;
          font-size: clamp(1.5rem, 2.5vw, 2rem); font-weight: 800;
          color: var(--jc-navy); line-height: 1.2; margin-bottom: 18px;
        }
        .jca-about-grid p { font-size: 0.93rem; color: var(--jc-txt-sec); line-height: 1.8; margin-bottom: 14px; }
 
        /* ── Vision card — standalone centred layout ── */
       .jca-vision-section {
          padding: 100px 0;
          background-color: #f0f7fa; /* Matches your light blue theme */
          overflow: hidden;
        }

        .jca-container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 20px;
        }

        /* Flexbox Layout */
        .jca-vision-flex {
          display: flex;
          align-items: center;
          gap: 100px;
          padding: 50px;
        }

        /* Left Side: Image Styling */
        .jca-vision-image {
          flex: 1.6;
          position: relative;
          border-radius: 20px;
          overflow: hidden;
          height: 400px;
          box-shadow: 15px 15px 0px var(--jc-sky); /* Small decorative offset box */
        }

        .jca-vision-image img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.5s ease;
        }

        .jca-vision-image:hover img {
          transform: scale(1.05);
        }

        /* Right Side: Text Styling */
        .jca-vision-content {
          flex: 1.4;
        }

        .jca-vision-label {
          font-size: 0.8rem;
          text-transform: uppercase;
          letter-spacing: 2px;
          color: var(--jc-accent);
          font-weight: 700;
          margin-bottom: 10px;
        }

        .jca-vision-content h2 {
          font-family: 'Raleway', sans-serif;
          font-size: 2.8rem;
          font-weight: 900;
          color: #505255;
          margin-bottom: 20px;
        }

        .jca-vision-content h2 span {
          color: var(--jc-sky);
        }

        .jca-main-para {
          font-size: 1rem;
          color: #4a5568;
          line-height: 1.8;
          margin-bottom: 25px;
        }

        /* Decorative List */
        .jca-vision-list {
          list-style: none;
          padding: 0;
        }

        .jca-vision-list li {
          margin-bottom: 12px;
          font-weight: 500;
          color: #2d3748;
          display: flex;
          align-items: center;
          gap: 10px;
        }

        /* Responsive for Tablets/Mobile */
        @media (max-width: 992px) {
          .jca-vision-flex {
            flex-direction: column;
            padding: 30px;
            gap: 40px;
          }
          
          .jca-vision-image {
            width: 100%;
            height: 300px;
            box-shadow: 10px 10px 0px var(--jc-sky);
          }
        }
 
        @media (max-width: 600px) {
          .jca-vision-center { padding: 56px 20px; }
          .jca-vision-box { padding: 36px 24px; }
        }
 

        /* ═══════════════════════════════════
           MISSION
        ═══════════════════════════════════ */
        .jca-mission-section { background: var(--jc-cloud); padding: 80px 80px; }
        .jca-mission-inner { max-width: 1080px; margin: 0 auto; }
        .jca-mission-inner .jca-section-label { justify-content: center; }
        .jca-mission-inner .jca-section-label::before { display: none; }
        .jca-mission-header { text-align: center; margin-bottom: 52px; }
        .jca-mission-header h2 {
          font-family: 'Raleway', sans-serif;
          font-size: clamp(1.6rem, 2.8vw, 2.2rem); font-weight: 800;
          color: var(--jc-navy); margin-bottom: 12px;
        }
        .jca-mission-header p { font-size: 0.93rem; color: var(--jc-txt-sec); max-width: 520px; margin: 0 auto; line-height: 1.7; }
        .jca-mission-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 16px; }
        .jca-mission-item {
          background: var(--jc-white); border: 1.5px solid var(--jc-divider);
          border-radius: 12px; padding: 24px 26px;
          display: flex; align-items: flex-start; gap: 16px;
          transition: border-color 0.2s, box-shadow 0.2s;
        }
        .jca-mission-item:hover { border-color: var(--jc-accent); box-shadow: 0 4px 20px rgba(18,38,63,0.08); }
        .jca-mission-dot { width: 10px; height: 10px; background: var(--jc-accent); border-radius: 50%; margin-top: 5px; flex-shrink: 0; }
        .jca-mission-item p { font-size: 0.9rem; color: var(--jc-txt-sec); line-height: 1.65; margin: 0; }

        /* ═══════════════════════════════════
           USP SECTION
        ═══════════════════════════════════ */
        .jca-usp-section {
          background: linear-gradient(150deg, var(--jc-navy) 0%, var(--jc-steel) 55%, var(--jc-sky) 100%);
          padding: 80px 80px;
        }
        .jca-usp-inner { max-width: 1080px; margin: 0 auto; }
        .jca-usp-header { text-align: center; margin-bottom: 52px; }
        .jca-usp-header .jca-section-label { justify-content: center; color: var(--jc-accent); }
        .jca-usp-header .jca-section-label::before { display: none; }
        .jca-usp-header h2 {
          font-family: 'Raleway', sans-serif;
          font-size: clamp(1.6rem, 2.8vw, 2.2rem); font-weight: 800;
          color: var(--jc-white); margin-bottom: 12px;
        }
        .jca-usp-header p { font-size: 0.93rem; color: rgba(255, 255, 255, 0.78); max-width: 540px; margin: 0 auto; line-height: 1.7; }
        .jca-usp-grid {
          display: grid; grid-template-columns: repeat(3, 1fr);
          gap: 16px; margin-bottom: 48px;
        }
        .jca-usp-item {
          background: rgba(255,255,255,0.07); border: 1px solid rgba(58,143,181,0.30);
          border-radius: 12px; padding: 22px 22px;
          display: flex; align-items: flex-start; gap: 14px;
          backdrop-filter: blur(8px);
          transition: background 0.2s, border-color 0.2s;
        }
        .jca-usp-item:hover { background: rgba(255,255,255,0.12); border-color: rgba(58,143,181,0.65); }
        .jca-usp-icon {
          width: 28px; height: 28px; border-radius: 50%;
          background: rgba(58,143,181,0.25); border: 1px solid rgba(58,143,181,0.50);
          display: flex; align-items: center; justify-content: center;
          color: #ffffff; font-size: 0.8rem; font-weight: 700;
          flex-shrink: 0; margin-top: 1px;
        }
        .jca-usp-item p { font-size: 0.875rem; color: rgba(255, 255, 255, 0.9); line-height: 1.6; margin: 0; }
        .jca-usp-tagline {
          text-align: center; padding: 28px 40px;
          background: rgba(58,143,181,0.15); border: 1px solid rgba(58,143,181,0.35);
          border-radius: 14px; backdrop-filter: blur(6px);
        }
        .jca-usp-tagline p { font-size: 0.92rem; color: rgba(255, 255, 255, 0.75); margin-bottom: 8px; font-style: italic; }
        .jca-usp-tagline strong { font-family: 'Raleway', sans-serif; font-size: 1.15rem; font-weight: 800; color: var(--jc-white); }
        .jca-usp-tagline strong em { color: white; font-style: normal; }

        /* ═══════════════════════════════════
           WHY US
        ═══════════════════════════════════ */
        .jca-why-section { background: var(--jc-cloud); padding: 80px 80px; }
        .jca-why-header { text-align: center; margin-bottom: 52px; }
        .jca-why-header .jca-section-label { justify-content: center; }
        .jca-why-header .jca-section-label::before { display: none; }
        .jca-why-header h2 {
          font-family: 'Raleway', sans-serif;
          font-size: clamp(1.6rem, 2.8vw, 2.2rem); font-weight: 800;
          color: var(--jc-navy); margin-bottom: 12px;
        }
        .jca-why-header p { font-size: 0.93rem; color: var(--jc-txt-sec); max-width: 520px; margin: 0 auto; line-height: 1.7; }
        .jca-why-grid {
          display: grid; grid-template-columns: repeat(3, 1fr);
          gap: 20px; max-width: 1080px; margin: 0 auto;
        }
        .jca-why-card {
          background: var(--jc-white); border: 1.5px solid var(--jc-divider);
          border-radius: 16px; padding: 32px 28px; text-align: left;
          transition: transform 0.25s, box-shadow 0.25s, border-color 0.25s;
        }
        .jca-why-card:hover { transform: translateY(-5px); box-shadow: 0 10px 32px rgba(18,38,63,0.10); border-color: var(--jc-accent); }
        .jca-why-icon { width: 50px; height: 50px; background: var(--jc-mist); border-radius: 12px; display: flex; align-items: center; justify-content: center; font-size: 1.3rem; margin-bottom: 18px; }
        .jca-why-card h4 { font-family: 'Raleway', sans-serif; font-size: 1rem; font-weight: 800; color: var(--jc-navy); margin-bottom: 10px; }
        .jca-why-card p { font-size: 0.86rem; color: var(--jc-txt-sec); line-height: 1.7; }

       /* ═══════════════════════════════════
           RESPONSIVE
        ═══════════════════════════════════ */
        @media (max-width: 960px) {
          .jca-hero { padding: 72px 32px 64px; }
          .jca-stats-section, .jca-about-section,
          .jca-mission-section, .jca-usp-section, .jca-why-section {
            padding-left: 32px; padding-right: 32px;
          }
          .jca-stats-grid { grid-template-columns: repeat(2, 1fr); }
          .jca-about-grid { grid-template-columns: 1fr; gap: 32px; }
          .jca-usp-grid { grid-template-columns: repeat(2, 1fr); }
          .jca-why-grid { grid-template-columns: repeat(2, 1fr); }
        }
        @media (max-width: 600px) {
          .jca-hero { padding: 56px 20px 52px; }
          .jca-stats-section, .jca-about-section,
          .jca-mission-section, .jca-usp-section, .jca-why-section {
            padding-left: 20px; padding-right: 20px;
          }
          .jca-stats-grid { grid-template-columns: repeat(2, 1fr); gap: 12px; }
          .jca-mission-grid { grid-template-columns: 1fr; }
          .jca-usp-grid { grid-template-columns: 1fr; }
          .jca-why-grid { grid-template-columns: 1fr; }
          .jca-vision-box { padding: 32px 24px; }
          .jca-usp-tagline { padding: 20px 20px; }
        }
  /* MISSION */
  .mission-section { padding: 64px 80px; background: #f9fafb; }
  .mission-card { background: #fff; border-radius: 16px; display: grid; grid-template-columns: 1fr 1fr; overflow: hidden; box-shadow: 0 2px 28px rgba(0,0,0,0.07); max-width: 1080px; margin: 0 auto; }
  .mission-text { padding: 56px 52px; display: flex; flex-direction: column; justify-content: center; }
  .mission-text h2 { font-size: 1.75rem; font-weight: 800; color: #111827; margin-bottom: 18px; }
  .mission-text p { color: #6b7280; font-size: 0.93rem; line-height: 1.8; margin-bottom: 14px; }
  .mission-img { background: url('https://images.unsplash.com/photo-1555066931-4365d14431b9?w=900&q=80') center/cover no-repeat; min-height: 360px; }

  /* SERVICES */
    .jcs-root { font-family: 'Lato', sans-serif; background: var(--jc-white); color: var(--jc-navy); }

        /* ── Hero ── */
        .jcs-hero {
          background: linear-gradient(150deg, var(--jc-navy) 0%, var(--jc-steel) 55%, var(--jc-sky) 100%);
          padding: 72px 80px 64px;
          text-align: center;
          position: relative;
          overflow: hidden;
          contain: paint;
        }
        .jcs-hero::before {
          content: ''; position: absolute; top: -80px; right: -80px;
          width: 380px; height: 380px; border-radius: 50%;
          background: rgba(58,143,181,0.10); pointer-events: none;
        }
        .jcs-hero::after {
          content: ''; position: absolute; bottom: -50px; left: -50px;
          width: 260px; height: 260px; border-radius: 50%;
          background: rgba(18,38,63,0.20); pointer-events: none;
        }
        .jcs-hero-chip {
          display: inline-flex; align-items: center; gap: 8px;
          background: rgba(58,143,181,0.20); border: 1px solid rgba(58,143,181,0.48);
          color: var(--jc-mist); font-size: 0.72rem; font-weight: 700;
          letter-spacing: 0.13em; text-transform: uppercase;
          padding: 5px 14px; border-radius: 20px; margin-bottom: 18px;
          position: relative; z-index: 1;
        }
        .jcs-hero h1 {
          font-family: 'Raleway', sans-serif;
          font-size: clamp(1.8rem, 4vw, 3rem); font-weight: 900;
          color: var(--jc-white); line-height: 1.1; margin-bottom: 14px;
          letter-spacing: -0.5px; position: relative; z-index: 1;
        }
        .jcs-hero h1 span { color: var(--jc-accent); }
        .jcs-hero p {
          font-size: clamp(0.9rem, 1.5vw, 1rem); color: rgba(232,241,248,0.82);
          max-width: 620px; margin: 0 auto; line-height: 1.7;
          position: relative; z-index: 1;
        }

        /* ── Service section ── */
        .jcs-svc-wrap {
          padding: 72px 80px;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 68px;
          align-items: center;
          max-width: 1200px;
          margin: 0 auto;
        }
        .jcs-svc-wrap.alt { direction: rtl; }
        .jcs-svc-wrap.alt > * { direction: ltr; }

        /* Separator */
        .jcs-sep-wrap {
          padding: 0 80px;
        }
        .jcs-sep {
          height: 1px;
          background: linear-gradient(90deg, transparent, var(--jc-divider), transparent);
        }

        /* ── Image ── */
        .jcs-img-wrap {
          position: relative;
          border-radius: 20px;
          overflow: hidden;
          aspect-ratio: 6 / 6;
          box-shadow: 0 16px 52px rgba(18,38,63,0.15);
        }
        .jcs-img-wrap img {
          width: 100%; height: 100%;
          object-fit: cover; display: block;
          transition: transform 0.6s ease;
        }
        .jcs-img-wrap:hover img { transform: scale(1.05); }
        .jcs-img-overlay {
          position: absolute; inset: 0;
          background: linear-gradient(to top, rgba(18,38,63,0.40) 0%, transparent 55%);
        }
        
      
        /* ── Content ── */
        .jcs-content-label {
          font-size: 1rem; font-weight: 700;
          letter-spacing: 0.14em; text-transform: uppercase;
          color: var(--jc-accent); margin-bottom: 10px;
          display: flex; align-items: center; gap: 8px;
        }
        .jcs-content-label::before {
          content: ''; display: block;
          width: 22px; height: 2px;
          background: var(--jc-accent); border-radius: 2px;
        }
        .jcs-content h2 {
          font-family: 'Raleway', sans-serif;
          font-size: clamp(1rem, 2vw, 2rem); font-weight: 900;
          color: var(--jc-navy); line-height: 1.15;
          margin-bottom: 14px; letter-spacing: -0.3px;
        }
        .jcs-content-desc {
          font-size: 1rem; color: ;
          line-height: 1.4; margin-bottom: 24px;
        }

        /* Points */
        .jcs-points {
          list-style: none; padding: 0; margin: 0;
          display: flex; flex-direction: column; gap: 10px;
        }
        .jcs-points li {
          display: flex; align-items: flex-start; gap: 11px;
          font-size: 1.2rem; color:black; line-height: 1.55;
        }
        .jcs-points li::before {
          content: '✔'; font-size: 0.68rem; font-weight: 900;
          color:var(--jc-mist) ; background: var(--jc-accent);
          border-radius: 50%; min-width: 22px; height: 22px;
          display: flex; align-items: center; justify-content: center;
          flex-shrink: 0; margin-top: 1px;
        }

        /* Subsections */
        .jcs-subsections { display: flex; flex-direction: column; gap: 20px; }
        .jcs-sub-label {
          font-family: 'Raleway', sans-serif;
          font-size: 1rem; font-weight: 800;
          color: var(--jc-navy); letter-spacing: 0.07em;
          text-transform: uppercase; margin-bottom: 8px;
          display: flex; align-items: center; gap: 8px;
        }
        .jcs-sub-label::before {
          content: ''; display: block;
          width: 14px; height: 2px;
          background: var(--jc-accent); border-radius: 2px;
        }

        /* ── CTA ── */
        .jcs-cta {
          background: var(--jc-cloud);
          padding: 72px 80px 80px;
        }
        .jcs-cta-box {
          background: linear-gradient(150deg, var(--jc-navy) 0%, var(--jc-steel) 55%, var(--jc-sky) 100%);
          border-radius: 20px; padding: 56px 48px; text-align: center;
          position: relative; overflow: hidden;
          contain: paint;
          max-width: 860px; margin: 0 auto;
        }
        .jcs-cta-box::before {
          content: ''; position: absolute; top: -50px; right: -50px;
          width: 240px; height: 240px; border-radius: 50%;
          background: rgba(58,143,181,0.12);
        }
        .jcs-cta-box h3 {
          font-family: 'Raleway', sans-serif;
          font-size: clamp(1.4rem, 2.5vw, 2rem); font-weight: 900;
          color: var(--jc-white); margin-bottom: 12px;
          position: relative; z-index: 1;
        }
        .jcs-cta-box p {
          font-size: 0.95rem; color: rgba(232,241,248,0.82);
          margin-bottom: 30px; line-height: 1.65;
          max-width: 500px; margin-left: auto; margin-right: auto;
          position: relative; z-index: 1;
        }
        .jcs-cta-btn {
          background: linear-gradient(135deg, var(--jc-sky), var(--jc-accent));
          color: var(--jc-white); border: none;
          padding: 13px 36px; border-radius: 9px;
          font-family: 'Lato', sans-serif; font-size: 0.95rem; font-weight: 700;
          letter-spacing: 0.03em; cursor: pointer;
          box-shadow: 0 4px 18px rgba(18,38,63,0.30);
          position: relative; z-index: 1;
          transition: opacity 0.2s, transform 0.2s;
        }
        .jcs-cta-btn:hover { opacity: 0.9; transform: translateY(-2px); }

        /* ── Responsive ── */
        @media (max-width: 960px) {
          .jcs-hero { padding: 56px 32px 48px; }
          .jcs-svc-wrap { padding: 56px 32px; gap: 44px; }
          .jcs-sep-wrap { padding: 0 32px; }
          .jcs-cta { padding: 56px 32px 64px; }
        }
        @media (max-width: 720px) {
          .jcs-svc-wrap {
            grid-template-columns: 1fr;
            padding: 44px 24px; gap: 28px;
          }
          .jcs-svc-wrap.alt { direction: ltr; }
          .jcs-img-wrap { aspect-ratio: 16/9; }
          .jcs-sep-wrap { padding: 0 24px; }
          .jcs-cta { padding: 44px 20px 56px; }
          .jcs-cta-box { padding: 40px 28px; }
        }
        @media (max-width: 480px) {
          .jcs-hero { padding: 44px 18px 40px; }
          .jcs-svc-wrap { padding: 36px 16px; }
          .jcs-content h2 { font-size: 1.3rem; }
          .jcs-cta-box { padding: 32px 20px; }
        }

  /* WHY US */
  .why-section { background: #eff6ff; padding: 80px 80px; text-align: center; }
  .why-section .section-title { margin-bottom: 10px; }
  .why-section .section-sub { margin-bottom: 52px; }
  .why-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; max-width: 1080px; margin: 0 auto; }
  .why-card { background: #fff; border-radius: 14px; padding: 36px 28px; text-align: left; box-shadow: 0 2px 18px rgba(37,99,235,0.07); transition: transform .25s, box-shadow .25s; }
  .why-card:hover { transform: translateY(-5px); box-shadow: 0 10px 30px rgba(37,99,235,0.14); }
  .why-icon { width: 54px; height: 54px; background: #2563eb; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 1.25rem; color: #fff; margin-bottom: 18px; }
  .why-card h4 { font-size: 1rem; font-weight: 700; color: #111827; margin-bottom: 8px; }
  .why-card p { font-size: 0.86rem; color: #6b7280; line-height: 1.65; }

/*HOME*/

        *, *::before, *::after { box-sizing: border-box; }
        .jch-root { font-family: 'Lato', sans-serif; background: var(--jc-white); color: var(--jc-navy); }

        /* ── Reveal ── */
        .reveal { opacity: 0; transform: translateY(24px); transition: opacity 0.6s ease, transform 0.6s ease; }
        .reveal.visible { opacity: 1; transform: translateY(0); }
        .reveal-d0 { transition-delay: 0s; }
        .reveal-d1 { transition-delay: 0.1s; }
        .reveal-d2 { transition-delay: 0.2s; }
        .reveal-d3 { transition-delay: 0.3s; }

        /* ════════════════════════
           ABOUT / STATS
        ════════════════════════ */
        .jch-about { background: var(--jc-cloud); padding: 72px 80px; text-align: center; }
        .jch-section-label {
          font-size: 0.72rem; font-weight: 700; letter-spacing: 0.14em; text-transform: uppercase;
          color: var(--jc-accent); margin-bottom: 10px;
          display: flex; align-items: center; justify-content: center; gap: 8px;
        }
        .jch-section-label::before, .jch-section-label::after {
          content: ''; display: block; width: 22px; height: 2px;
          background: var(--jc-accent); border-radius: 2px;
        }
        .jch-section-title {
          font-family: 'Raleway', sans-serif;
          font-size: clamp(1.6rem, 3vw, 2.2rem); font-weight: 900;
          color: var(--jc-navy); margin-bottom: 12px; letter-spacing: -0.3px;
        }
        .jch-section-sub {
          font-size: 0.95rem; color: var(--jc-txt-sec);
          line-height: 1.7; max-width: 560px; margin: 0 auto 52px;
        }
        .jch-stats-grid {
          display: grid; grid-template-columns: repeat(4, 1fr);
          gap: 20px; max-width: 1000px; margin: 0 auto;
        }
        .jch-stat-card {
          background: var(--jc-white); border: 1.5px solid var(--jc-divider);
          border-radius: 16px; padding: 32px 20px; text-align: center;
          box-shadow: 0 2px 14px rgba(18,38,63,0.06);
          transition: transform 0.25s, box-shadow 0.25s, border-color 0.25s;
        }
        .jch-stat-card:hover { transform: translateY(-4px); box-shadow: 0 8px 28px rgba(18,38,63,0.10); border-color: var(--jc-accent); }
        .jch-stat-icon { width: 52px; height: 52px; background: var(--jc-mist); border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 1.4rem; margin: 0 auto 12px; }
        .jch-stat-num { font-family: 'Raleway', sans-serif; font-size: 1.9rem; font-weight: 900; color: var(--jc-navy); margin-bottom: 5px; }
        .jch-stat-label { font-size: 0.78rem; font-weight: 600; color: var(--jc-txt-sec); letter-spacing: 0.04em; text-transform: uppercase; }

        /* ════════════════════════
           MISSION
        ════════════════════════ */
        .jch-mission {
          padding: 72px 80px; background: var(--jc-white);
          max-width: 1200px; margin: 0 auto;
          display: grid; grid-template-columns: 1fr 1fr;
          gap: 64px; align-items: center;
        }
        .jch-mission h2 {
          font-family: 'Raleway', sans-serif;
          font-size: clamp(1.5rem, 2.5vw, 2rem); font-weight: 900;
          color: var(--jc-navy); margin-bottom: 18px; line-height: 1.2;
        }
        .jch-mission p { font-size: 0.93rem; color: var(--jc-txt-sec); line-height: 1.8; margin-bottom: 14px; }
        .jch-mission-img {
        border-radius: 20px; 
        overflow: hidden;box-shadow: 0 16px 48px rgba(18,38,63,0.13);
        background: linear-gradient(150deg, var(--jc-navy), var(--jc-steel), var(--jc-sky));
        display: flex;
        align-items: center;
        justify-content: center;
      }

      .jch-mission-img img{
        width:100%;
        height:100%;
        object-fit:contain;
      }
                /* ════════════════════════
           SERVICES — FOCUS SCROLL
        ════════════════════════ */
        .jch-services {
          background: rgb(206, 230, 241);
          padding: 72px 0 64px;
          position: relative; overflow: hidden;
        }
        .jch-services::before {
          content: ''; position: absolute; top: -60px; right: -60px;
          width: 320px; height: 320px; border-radius: 50%;
          background: rgba(58,143,181,0.06); pointer-events: none;
        }
 
        .jch-services-header {
          padding: 0 180px;
          display: flex; align-items: flex-end;
          justify-content: space-between;
          margin-bottom: 40px;
          position: relative; z-index: 1;
        }
        .jch-services-header-left {}
        .jch-services-label {
        
       
          font-size: 0.72rem; font-weight: 700;
          letter-spacing: 0.14em; text-transform: uppercase;
          color: var(--jc-accent); margin-bottom: 8px;
          display: flex; align-items: center; gap: 8px;
        }
        .jch-services-label::before {
          content: ''; display: block; width: 22px; height: 2px;
          background: var(--jc-accent); border-radius: 2px;
        }
        .jch-services h2 {

          font-family: 'Raleway', sans-serif;
          font-size: clamp(1.6rem, 3vw, 2.2rem); font-weight: 900;
          color: var(--jc-navy); line-height: 1.1; letter-spacing: -0.3px;
        }
        .jch-services h2 span { color: var(--jc-accent); }
        .jch-services-sub {
          font-size: 0.9rem; color: var(--jc-txt-sec); margin-top: 8px; line-height: 1.6;
        }
 
        /* Arrow buttons */
        .jch-scroll-arrows { display: flex; gap: 10px; flex-shrink: 0; padding-bottom: 4px; }
        .jch-arrow {
          width: 42px; height: 42px; border-radius: 50%;
          background: var(--jc-white);
          border: 1.5px solid var(--jc-divider);
          color: var(--jc-steel);
          display: flex; align-items: center; justify-content: center;
          cursor: pointer; font-size: 1rem;
          transition: background 0.2s, border-color 0.2s;
        }
        .jch-arrow:hover:not(:disabled) {
          background: var(--jc-mist);
          border-color: var(--jc-accent);
        }
        .jch-arrow:disabled { opacity: 0.3; cursor: not-allowed; }
 
        /* Track wrapper — fade edges */
        .jch-svc-track-wrap {
          position: relative; z-index: 1; overflow: hidden; padding: 16px 0 24px;
        }
        .jch-svc-track-wrap::before,
        .jch-svc-track-wrap::after {
          content: ''; position: absolute; top: 0; bottom: 0;
          width: 120px; z-index: 2; pointer-events: none;
        }
        .jch-svc-track-wrap::before { left: 0;  background: linear-gradient(to right, var(--jc-cloud) 30%, transparent); }
        .jch-svc-track-wrap::after  { right: 0; background: linear-gradient(to left,  var(--jc-cloud) 30%, transparent); }
 
        /* Scroll track */
        .jch-scroll-track,
        .jch-svc-track {
          display: flex;
          gap: 24px;
          overflow-x: auto;
          scroll-snap-type: x mandatory;
          scroll-behavior: smooth;
          scrollbar-width: none;
          -ms-overflow-style: none;
          position: relative; z-index: 1;
          padding:12px 20%;
        }
        .jch-scroll-track::-webkit-scrollbar,
        .jch-svc-track::-webkit-scrollbar { display: none; }
 
        /* ── Service card — solid white, always visible ── */
        .jch-svc-card {
          min-width: 300px; max-width: 300px; flex-shrink: 0;
          background: var(--jc-white);
          border: 1.5px solid var(--jc-divider);
          border-radius: 18px; padding: 28px 24px;
          scroll-snap-align: center;
          cursor: pointer;
          position: relative; overflow: hidden;
          /* Dim + shrink non-active cards */
          opacity: 0.48; transform: scale(0.91);
          box-shadow: 0 2px 10px rgba(18,38,63,0.06);
          transition: opacity 0.4s ease, transform 0.4s ease,
                      border-color 0.4s ease, box-shadow 0.4s ease;
        }
        /* Teal top accent stripe — hidden on inactive */
        .jch-svc-card::before {
          content: '';
          position: absolute; top: 0; left: 0; right: 0;
          height: 3px;
          background: linear-gradient(90deg, var(--jc-steel), var(--jc-accent));
          border-radius: 18px 18px 0 0;
          opacity: 0;
          transition: opacity 0.4s ease;
        }
 
        /* ★ Active card — full, bright, elevated */
        .jch-svc-card.active {
          opacity: 1; transform: scale(1.04);
          border-color: var(--jc-accent);
          box-shadow: 0 12px 40px rgba(18,38,63,0.13);
        }
        .jch-svc-card.active::before { opacity: 1; }
 
        /* Icon box */
        .jch-svc-icon-wrap {
          width: 52px; height: 52px; border-radius: 13px;
          background: var(--jc-mist);
          border: 1.5px solid var(--jc-divider);
          display: flex; align-items: center; justify-content: center;
          margin-bottom: 16px;
          transition: border-color 0.3s;
        }
        .jch-svc-card.active .jch-svc-icon-wrap {
          border-color: var(--jc-accent);
        }
 
        /* Title */
        .jch-svc-card h4 {
          font-family: 'Raleway', sans-serif;
          font-size: 0.97rem; font-weight: 800;
          color: var(--jc-navy); margin-bottom: 10px; line-height: 1.3;
        }
 
        /* Body text */
        .jch-svc-card p {
          font-size: 0.82rem;
          color: var(--jc-txt-sec);
          line-height: 1.65; margin-bottom: 20px;
        }
 
        /* Learn More */
        .jch-svc-link {
          display: inline-flex; align-items: center; gap: 6px;
          font-size: 0.78rem; font-weight: 700;
          color: var(--jc-steel); letter-spacing: 0.04em;
          text-transform: uppercase;
          background: none;
          border: 1.5px solid var(--jc-divider);
          border-radius: 6px; padding: 6px 14px;
          cursor: pointer; font-family: 'Lato', sans-serif;
          transition: background 0.2s, border-color 0.2s, color 0.2s;
        }
        .jch-svc-card.active .jch-svc-link {
          background: var(--jc-mist);
          border-color: var(--jc-accent);
          color: var(--jc-steel);
        }
        .jch-svc-link:hover {
          background: var(--jc-mist);
          border-color: var(--jc-accent);
        }
 
        /* Progress dots */
        .jch-svc-dots {
          display: flex; justify-content: center; align-items: center;
          gap: 7px; margin-top: 24px; position: relative; z-index: 1;
        }
        .jch-svc-dot {
          height: 6px; border-radius: 3px; cursor: pointer; border: none;
          background:rgba(58, 142, 181, 0.91);
          transition: width 0.35s cubic-bezier(.4,0,.2,1), background 0.35s;
          width: 6px;
        }
        .jch-svc-dot.active { width: 28px; background: var(--jc-accent); }
 
        /* View all CTA */
        .jch-svc-cta {
          padding: 28px 80px 0;
          position: relative; z-index: 1;
          text-align: center;
        }
        .jch-svc-cta-btn {
          background: linear-gradient(135deg, var(--jc-steel), var(--jc-sky));
          color: var(--jc-white); border: none;
          padding: 11px 32px; border-radius: 9px;
          font-family: 'Lato', sans-serif; font-size: 0.88rem; font-weight: 700;
          cursor: pointer; letter-spacing: 0.03em;
          box-shadow: 0 4px 16px rgba(18,38,63,0.16);
          transition: opacity 0.2s, transform 0.2s;
        }
        .jch-svc-cta-btn:hover { opacity: 0.9; transform: translateY(-2px); }
 




/* ════════════════════════
           CLIENTS MARQUEE
        ════════════════════════ */
        .jch-clients { background: var(--jc-white); padding: 64px 0; overflow: hidden; }
        .jch-clients-header { text-align: center; padding: 0 80px; margin-bottom: 40px; }
        @keyframes jch-marquee { from { transform: translateX(0); } to { transform: translateX(-50%); } }
        .jch-clients-marquee { overflow: hidden; }
        .jch-clients-track {
          display: flex; gap: 32px; width: max-content;
          animation: jch-marquee 28s linear infinite;
        }
        .jch-clients-track:hover { animation-play-state: paused; }
        .jch-client-logo {
          display: flex; flex-direction: column; align-items: center; gap: 8px;
          padding: 16px 20px; 
          transition: border-color 0.25s, background 0.25s; cursor: default;
        }
        .jch-client-logo:hover { background: var(--jc-mist); border-color: var(--jc-accent); }
        .jch-client-logo-icon {
          width: 52px; height: 52px; border-radius: 12px;
          display: flex; align-items: center; justify-content: center;
          font-size: 1.5rem; background: var(--jc-mist);
          border: 1.5px solid var(--jc-divider); transition: border-color 0.25s;
        }
        .jch-client-logo:hover .jch-client-logo-icon { border-color: var(--jc-accent); }
        .jch-client-logo-name {
          font-family: 'Raleway', sans-serif; font-size: 0.78rem; font-weight: 800;
          color: var(--jc-txt-sec); letter-spacing: 0.04em; white-space: nowrap;
        }

        /* ════════════════════════
           WHY US
        ════════════════════════ */
        .jch-why { background: var(--jc-cloud); padding: 72px 80px; text-align: center; }
       /* --- Base Styles (Mobile First: 0px and up) --- */
.jch-why-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 12px; /* Small gap to maximize space for cards */
  justify-content: center;
  max-width: 1040px;
  margin: 0 auto;
  padding: 0 10px; /* Minimal side padding */
}

.jch-why-card {
  /* Logic: 50% width minus half of the gap */
  flex: 0 1 calc(50% - 6px); 
  background: var(--jc-white);
  border: 1.5px solid var(--jc-divider);
  border-radius: 12px;
  padding: 16px 10px; /* Compact padding for mobile */
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  box-shadow: 0 2px 10px rgba(18,38,63,0.05);
  box-sizing: border-box; /* Ensures padding doesn't add to width */
}

.jch-why-icon {
  width: 36px;
  height: 36px;
  background: var(--jc-mist);
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1rem; /* Smaller icon */
  margin-bottom: 10px;
}

.jch-why-card h4 {
  font-family: 'Raleway', sans-serif;
  font-size: 0.8rem; /* Scaled down heading */
  font-weight: 800;
  color: var(--jc-navy);
  margin-bottom: 6px;
  line-height: 1.2;
}

.jch-why-card p {
  font-size: 0.72rem; /* Small, legible body text */
  color: var(--jc-txt-sec);
  line-height: 1.4;
}

/* --- Tablets & Desktop (768px and up) --- */
@media (min-width: 768px) {
  .jch-why-grid {
    gap: 20px;
    padding: 0 20px;
  }

  .jch-why-card {
    flex: 1 1 300px; /* Switch to 3 or 4 per row on desktop */
    max-width: 340px;
    padding: 32px 26px;
    border-radius: 16px;
  }

  .jch-why-icon {
    width: 48px;
    height: 48px;
    font-size: 1.3rem;
    margin-bottom: 16px;
  }

  .jch-why-card h4 {
    font-size: 0.97rem;
    margin-bottom: 8px;
  }

  .jch-why-card p {
    font-size: 0.85rem;
    line-height: 1.7;
  }

  .jch-why-card:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 28px rgba(18,38,63,0.10);
    border-color: var(--jc-accent);
  }
}

        /* ═══════════════════════════
           OUR CLIENTS
        ═══════════════════════════ */
        .jch-clients {
          background: var(--jc-white);
          padding: 64px 0;
          overflow: hidden;
          border-top: 1px solid var(--jc-divider);
          border-bottom: 1px solid var(--jc-divider);
        }
        .jch-clients-header {
          text-align: center;
          margin-bottom: 40px;
          padding: 0 80px;
        }
        .jch-clients-header .jch-section-label { justify-content: center; }

        /* Marquee wrapper with fade edges */
        .jch-clients-marquee {
          position: relative;
          overflow: hidden;
          -webkit-mask-image: linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%);
          mask-image: linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%);
        }
        
        .jch-client-logo {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            padding: 15px;
          }

        .jch-client-logo-img {
          width: 120px;
          height: 60px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .jch-client-logo-img img {
          max-width: 100%;
          max-height: 100%;
          object-fit: contain;
        }

        .jch-client-logo-name {
          margin-top: 6px;
          font-size: 14px;
          font-weight: 500;
        }
        /* The scrolling track — duplicated for seamless loop */
        .jch-clients-track {
          display: flex;
          align-items: center;
          gap: 0;
          width: max-content;
          animation: jch-clients-scroll 28s linear infinite;
        }
        .jch-clients-track:hover { animation-play-state: paused; }

        @keyframes jch-clients-scroll {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }

        /* Individual logo card */
        .jch-client-logo {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 8px;
          padding: 0 36px;
          min-width: 160px;
          border-right: 1px solid var(--jc-divider);
          cursor: default;
          transition: opacity 0.25s;
        }
        .jch-client-logo:hover { opacity: 0.75; }
        .jch-client-logo-icon {
          width: 56px; height: 56px;
          border-radius: 14px;
          display: flex; align-items: center; justify-content: center;
          font-size: 1.5rem;
          background: var(--jc-mist);
          border: 1.5px solid var(--jc-divider);
          transition: border-color 0.25s, background 0.25s;
          flex-shrink: 0;
        }
        .jch-client-logo:hover .jch-client-logo-icon {
          background: var(--jc-mist);
          border-color: var(--jc-accent);
        }
        .jch-client-logo-name {
          font-family: 'Raleway', sans-serif;
          font-size: 0.78rem;
          font-weight: 800;
          color: var(--jc-txt-sec);
          letter-spacing: 0.04em;
          white-space: nowrap;
        }

        /* ═══════════════════════════
           RESPONSIVE
        ════════════════════════ */
        @media (max-width: 960px) {
          .jch-about, .jch-why { padding: 56px 32px; }
          .jch-stats-grid { grid-template-columns: repeat(2, 1fr); }
          .jch-services-header { padding: 0 32px; }
          .jch-svc-track { padding: 12px 32px 12px; }
          .jch-svc-cta { padding: 24px 32px 0; }
          .jch-mission { padding: 56px 32px; gap: 36px; }
          .jch-clients-header { padding: 0 32px; }
        }
        @media (max-width: 720px) {
          .jch-mission { grid-template-columns: 1fr; padding: 48px 24px; }
          .jch-mission-img { aspect-ratio: 16/9; }
          .jch-svc-card { min-width: 260px; max-width: 260px; }
        }
        @media (max-width: 600px) {
          .jch-about, .jch-why { padding: 48px 20px; }
          .jch-stats-grid { grid-template-columns: repeat(2, 1fr); gap: 12px; }
          .jch-services-header { padding: 0 20px; flex-direction: column; align-items: flex-start; gap: 16px; }
          .jch-svc-track { padding: 12px 20px 12px; }
          .jch-svc-track-wrap::before, .jch-svc-track-wrap::after { width: 48px; }
          .jch-svc-cta { padding: 20px 20px 0; }
          .jch-svc-card { min-width: 240px; max-width: 240px; }
          .jch-clients-header { padding: 0 20px; }
        }

  /* TESTIMONIALS */

        .testi-section {
          background: linear-gradient(150deg, var(--jc-navy) 0%, var(--jc-steel) 55%, var(--jc-sky) 100%);
          padding: 80px 80px;
          text-align: center;
          overflow: hidden;
        }
        .testi-section .section-title {
          font-family: 'Raleway', sans-serif;
          color: var(--jc-white);
          margin-bottom: 10px;
        }
        .testi-section .section-sub {
          color: rgba(232, 241, 248, 0.78);
          margin-bottom: 20px;
          font-family: 'Lato', sans-serif;
        }

        /* ── Add Review button ── */
        .testi-add-btn {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: rgba(58, 143, 181, 0.20);
          border: 1.5px solid rgba(58, 143, 181, 0.55);
          color: var(--jc-mist);
          font-family: 'Lato', sans-serif;
          font-size: 0.875rem;
          font-weight: 700;
          letter-spacing: 0.04em;
          padding: 10px 22px;
          border-radius: 8px;
          cursor: pointer;
          margin-bottom: 44px;
          transition: background 0.2s, border-color 0.2s, transform 0.2s;
          backdrop-filter: blur(6px);
        }
        .testi-add-btn:hover {
          background: rgba(58, 143, 181, 0.35);
          border-color: rgba(58, 143, 181, 0.9);
          transform: translateY(-1px);
        }
        .testi-add-btn svg { flex-shrink: 0; }

        /* ── Marquee ── */
        .testi-marquee-outer {
          overflow: hidden;
          contain: paint;
          -webkit-mask-image: linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%);
          mask-image: linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%);
        }
        .testi-marquee-track {
          display: flex;
          gap: 20px;
          width: max-content;
          animation: testi-marquee 36s linear infinite;
        }
        .testi-marquee-track:hover { animation-play-state: paused; }

        @keyframes testi-marquee {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }

        /* ── Card ── */
        .testi-marquee-outer .testi-card {
          min-width: 320px;
          max-width: 320px;
          flex-shrink: 0;
          background: var(--jc-white);
          border: 1.5px solid var(--jc-divider);
          border-radius: 16px;
          padding: 28px 26px;
          text-align: left;
          box-shadow: 0 4px 24px rgba(18,38,63,0.13);
          transition: transform 0.25s, box-shadow 0.25s;
        }
        .testi-marquee-outer .testi-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 10px 36px rgba(18,38,63,0.20);
        }
        .testi-qq {
          font-size: 1.6rem;
          color: var(--jc-accent);
          font-family: Georgia, serif;
          line-height: 1;
          margin-bottom: 8px;
        }
        .testi-stars { color: #f59e0b; font-size: 0.85rem; letter-spacing: 2px; margin-bottom: 14px; }
        .testi-body {
          font-family: 'Lato', sans-serif;
          font-size: 0.875rem;
          color: #374151;
          line-height: 1.72;
          margin-bottom: 22px;
          font-style: italic;
        }
        .testi-author { display: flex; align-items: center; gap: 12px; }
        .testi-av {
          width: 42px; height: 42px;
          border-radius: 50%;
          display: flex; align-items: center; justify-content: center;
          font-size: 0.78rem; font-weight: 700;
          color: var(--jc-white);
          flex-shrink: 0;
          font-family: 'Lato', sans-serif;
          letter-spacing: 0.03em;
        }
        .testi-name { font-family: 'Lato', sans-serif; font-size: 0.875rem; font-weight: 700; color: var(--jc-navy); }
        .testi-role { font-family: 'Lato', sans-serif; font-size: 0.75rem; color: var(--jc-txt-sec); margin-top: 2px; }

        /* ── Modal backdrop ── */
        .testi-modal-backdrop {
          position: fixed;
          inset: 0;
          background: rgba(18, 38, 63, 0.65);
          backdrop-filter: blur(6px);
          z-index: 2000;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 20px;
          animation: testi-fade-in 0.2s ease;
        }
        @keyframes testi-fade-in {
          from { opacity: 0; }
          to   { opacity: 1; }
        }

        /* ── Modal card ── */
        .testi-modal {
          background: var(--jc-white);
          border-radius: 18px;
          padding: 40px 36px 36px;
          width: 100%;
          max-width: 480px;
          position: relative;
          box-shadow: 0 24px 64px rgba(18,38,63,0.35);
          animation: testi-slide-up 0.25s ease;
        }
        @keyframes testi-slide-up {
          from { opacity: 0; transform: translateY(20px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        .testi-modal-close {
          position: absolute;
          top: 16px; right: 16px;
          width: 32px; height: 32px;
          border-radius: 50%;
          background: var(--jc-cloud);
          border: none;
          cursor: pointer;
          display: flex; align-items: center; justify-content: center;
          font-size: 1rem;
          color: var(--jc-txt-sec);
          transition: background 0.2s;
        }
        .testi-modal-close:hover { background: var(--jc-mist); }

        .testi-modal h3 {
          font-family: 'Raleway', sans-serif;
          font-size: 1.4rem;
          font-weight: 800;
          color: var(--jc-navy);
          margin-bottom: 4px;
        }
        .testi-modal-sub {
          font-family: 'Lato', sans-serif;
          font-size: 0.85rem;
          color: var(--jc-txt-sec);
          margin-bottom: 28px;
        }

        /* Star picker */
        .testi-star-row {
          display: flex;
          gap: 6px;
          margin-bottom: 22px;
        }
        .testi-star-btn {
          background: none;
          border: none;
          font-size: 1.8rem;
          cursor: pointer;
          padding: 0;
          line-height: 1;
          transition: transform 0.15s;
          color: #d1d5db;
        }
        .testi-star-btn.lit { color: #f59e0b; }
        .testi-star-btn:hover { transform: scale(1.2); }

        /* Form fields */
        .testi-field {
          margin-bottom: 16px;
        }
        .testi-field label {
          display: block;
          font-family: 'Lato', sans-serif;
          font-size: 0.8rem;
          font-weight: 700;
          color: var(--jc-navy);
          letter-spacing: 0.05em;
          text-transform: uppercase;
          margin-bottom: 7px;
        }
        .testi-field input,
        .testi-field textarea {
          width: 100%;
          background: var(--jc-cloud);
          border: 1.5px solid var(--jc-divider);
          border-radius: 9px;
          padding: 11px 14px;
          font-family: 'Lato', sans-serif;
          font-size: 0.92rem;
          color: var(--jc-navy);
          outline: none;
          transition: border-color 0.2s, background 0.2s;
          resize: none;
          box-sizing: border-box;
        }
        .testi-field input:focus,
        .testi-field textarea:focus {
          border-color: var(--jc-accent);
          background: var(--jc-white);
        }
        .testi-field input::placeholder,
        .testi-field textarea::placeholder { color: #a0b4c3; }

        /* Submit button */
        .testi-submit-btn {
          width: 100%;
          background: linear-gradient(135deg, var(--jc-steel) 0%, var(--jc-sky) 100%);
          color: var(--jc-white);
          border: none;
          padding: 13px;
          border-radius: 9px;
          font-family: 'Lato', sans-serif;
          font-size: 0.95rem;
          font-weight: 700;
          letter-spacing: 0.03em;
          cursor: pointer;
          margin-top: 6px;
          box-shadow: 0 4px 16px rgba(30,74,110,0.28);
          transition: opacity 0.2s, transform 0.2s;
        }
        .testi-submit-btn:hover { opacity: 0.9; transform: translateY(-1px); }
        .testi-submit-btn:disabled { opacity: 0.5; cursor: not-allowed; transform: none; }

        /* Success state */
        .testi-success {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 14px;
          padding: 20px 0;
          text-align: center;
        }
        .testi-success-icon {
          width: 64px; height: 64px;
          background: var(--jc-mist);
          border-radius: 50%;
          display: flex; align-items: center; justify-content: center;
          font-size: 2rem;
        }
        .testi-success h4 {
          font-family: 'Raleway', sans-serif;
          font-size: 1.2rem;
          font-weight: 800;
          color: var(--jc-navy);
          margin: 0;
        }
        .testi-success p {
          font-family: 'Lato', sans-serif;
          font-size: 0.875rem;
          color: var(--jc-txt-sec);
          margin: 0;
        }

        /* ── Responsive ── */
        @media (max-width: 900px) {
          .testi-section { padding: 60px 20px; }
          .testi-marquee-outer .testi-card { min-width: 280px; max-width: 280px; }
        }
        @media (max-width: 480px) {
          .testi-section { padding: 48px 16px; }
          .testi-modal { padding: 32px 20px 28px; }
          .testi-modal h3 { font-size: 1.2rem; }
}
/*JOBS */

        .jcj-root {
          font-family: 'Lato', sans-serif;
          background: var(--jc-cloud);
          color: var(--jc-navy);
          min-height: calc(100vh - 72px);
        }

        /* ── Hero ── */
        .jcj-hero {
          background: linear-gradient(150deg, var(--jc-navy) 0%, var(--jc-steel) 55%, var(--jc-sky) 100%);
          padding: 64px 80px 56px;
          text-align: center;
          position: relative;
          overflow: hidden;
          contain: paint;
        }
        .jcj-hero::before {
          content: ''; position: absolute; top: -80px; right: -80px;
          width: 360px; height: 360px; border-radius: 50%;
          background: rgba(58,143,181,0.10); pointer-events: none;
        }
        .jcj-hero::after {
          content: ''; position: absolute; bottom: -50px; left: -50px;
          width: 240px; height: 240px; border-radius: 50%;
          background: rgba(18,38,63,0.22); pointer-events: none;
        }
        .jcj-hero-chip {
          display: inline-flex; align-items: center; gap: 8px;
          background: rgba(58,143,181,0.20); border: 1px solid rgba(58,143,181,0.48);
          color: var(--jc-mist); font-size: 0.72rem; font-weight: 700;
          letter-spacing: 0.13em; text-transform: uppercase;
          padding: 5px 14px; border-radius: 20px; margin-bottom: 18px;
          position: relative; z-index: 1;
        }
        .jcj-hero h1 {
          font-family: 'Raleway', sans-serif;
          font-size: clamp(1.8rem, 4vw, 3rem); font-weight: 900;
          color: var(--jc-white); line-height: 1.1; margin-bottom: 12px;
          letter-spacing: -0.5px; position: relative; z-index: 1;
        }
        .jcj-hero h1 span { color: var(--jc-accent); }
        .jcj-hero-sub {
          font-size: clamp(0.88rem, 1.5vw, 1rem);
          color: rgba(232,241,248,0.80); margin-bottom: 32px;
          position: relative; z-index: 1;
        }

        /* ── Search bar ── */
        .jcj-search-wrap {
          display: flex; align-items: center;
          max-width: 640px; margin: 0 auto;
          background: var(--jc-white); border-radius: 12px;
          padding: 6px 6px 6px 18px; gap: 10px;
          box-shadow: 0 8px 32px rgba(18,38,63,0.22);
          position: relative; z-index: 1;
        }
        .jcj-search-icon { font-size: 1rem; color: var(--jc-muted); flex-shrink: 0; }
        .jcj-search-wrap input {
          flex: 1; border: none; outline: none;
          font-family: 'Lato', sans-serif; font-size: 0.9rem;
          color: var(--jc-navy); background: transparent; padding: 8px 0;
        }
        .jcj-search-wrap input::placeholder { color: var(--jc-muted); }
        .jcj-search-btn {
          background: linear-gradient(135deg, var(--jc-steel), var(--jc-sky));
          color: var(--jc-white); border: none;
          padding: 10px 22px; border-radius: 8px;
          font-family: 'Lato', sans-serif; font-size: 0.875rem; font-weight: 700;
          cursor: pointer; white-space: nowrap; flex-shrink: 0;
          transition: opacity 0.2s;
        }
        .jcj-search-btn:hover { opacity: 0.88; }

        /* ── Body ── */
        .jcj-body { max-width: 1100px; margin: 0 auto; padding: 48px 40px 72px; }

        /* ── Toolbar ── */
        .jcj-toolbar {
          display: flex; align-items: center; justify-content: space-between;
          margin-bottom: 28px; flex-wrap: wrap; gap: 14px;
        }
        .jcj-tabs { display: flex; gap: 8px; }
        .jcj-tab {
          padding: 8px 20px; border-radius: 8px;
          border: 1.5px solid var(--jc-divider); background: var(--jc-white);
          color: var(--jc-txt-sec); font-family: 'Lato', sans-serif;
          font-size: 0.85rem; font-weight: 700; cursor: pointer; transition: all 0.2s;
        }
        .jcj-tab:hover { border-color: var(--jc-accent); color: var(--jc-steel); }
        .jcj-tab.active {
          background: linear-gradient(135deg, var(--jc-steel), var(--jc-sky));
          border-color: transparent; color: var(--jc-white);
          box-shadow: 0 3px 12px rgba(30,74,110,0.22);
        }
        .jcj-count { font-size: 0.82rem; color: var(--jc-muted); font-weight: 600; white-space: nowrap; }
        .jcj-count strong { color: var(--jc-navy); font-size: 0.92rem; }

        /* ── Grid ── */
        .jcj-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 20px;
        }

        /* ── Empty state ── */
        .jcj-empty { text-align: center; padding: 64px 20px; color: var(--jc-muted); grid-column: 1/-1; }
        .jcj-empty-icon { font-size: 3rem; margin-bottom: 14px; }
        .jcj-empty h3 {
          font-family: 'Raleway', sans-serif; font-size: 1.15rem; font-weight: 800;
          color: var(--jc-navy); margin-bottom: 8px;
        }
        .jcj-empty p { font-size: 0.875rem; }

        /* ── Responsive ── */
        @media (max-width: 960px) {
          .jcj-grid { grid-template-columns: repeat(2, 1fr); }
          .jcj-body { padding: 36px 24px 56px; }
        }
        @media (max-width: 768px) {
          .jcj-hero { padding: 48px 24px 44px; }
          .jcj-search-wrap { max-width: 100%; }
        }
        @media (max-width: 600px) {
          .jcj-grid { grid-template-columns: 1fr; }
          .jcj-hero { padding: 40px 18px 36px; }
          .jcj-body { padding: 28px 14px 48px; }
          .jcj-toolbar { flex-direction: column; align-items: flex-start; }
          .jcj-search-wrap { flex-wrap: wrap; padding: 8px 12px; }
          .jcj-search-btn { width: 100%; text-align: center; padding: 10px; }
          .jcj-tabs { flex-wrap: wrap; }
          .jcj-tab { padding: 7px 14px; font-size: 0.8rem; }
        }

        /*CONTACT*/
        
       /* Select styling */
.jcc-select { width: 100%;  border: none;outline: none;background: transparent;font-size: 14px;padding: 10px 5px;appearance: none; cursor: pointer;}

/* Dropdown arrow only for select */
.jcc-select-wrap {
  position: relative;
}

.jcc-select-wrap::after {
  content: "▼";
  position: absolute;
  right: 12px;
  top: 50%;
  transform: translateY(-50%);
  font-size: 12px;
  color: #666;
  pointer-events: none;
}

        .jcc-root {
          font-family: 'Lato', sans-serif;
          background: var(--jc-cloud);
          min-height: calc(100vh - 72px);
          color: var(--jc-navy);
        }

        /* ───────────────────────────
           HERO
        ─────────────────────────── */
        .jcc-hero {
          background: linear-gradient(150deg, var(--jc-navy) 0%, var(--jc-steel) 55%, var(--jc-sky) 100%);
          padding: 72px 80px 64px;
          text-align: center;
          position: relative;
          overflow: hidden;
          contain: paint;
        }
        .jcc-hero::before {
          content: '';
          position: absolute;
          top: -80px; right: -80px;
          width: 380px; height: 380px;
          border-radius: 50%;
          background: rgba(58,143,181,0.10);
          pointer-events: none;
        }
        .jcc-hero::after {
          content: '';
          position: absolute;
          bottom: -50px; left: -50px;
          width: 240px; height: 240px;
          border-radius: 50%;
          background: rgba(18,38,63,0.20);
          pointer-events: none;
        }
        .jcc-hero-chip {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: rgba(58,143,181,0.20);
          border: 1px solid rgba(58,143,181,0.48);
          color: var(--jc-mist);
          font-size: 0.72rem;
          font-weight: 700;
          letter-spacing: 0.13em;
          text-transform: uppercase;
          padding: 5px 14px;
          border-radius: 20px;
          margin-bottom: 18px;
          position: relative;
          z-index: 1;
        }
        .jcc-hero h1 {
          font-family: 'Raleway', sans-serif;
          font-size: clamp(1.9rem, 4vw, 3rem);
          font-weight: 900;
          color: var(--jc-white);
          line-height: 1.1;
          margin-bottom: 14px;
          letter-spacing: -0.5px;
          position: relative;
          z-index: 1;
        }
        .jcc-hero h1 span { color: var(--jc-accent); }
        .jcc-hero p {
          font-size: clamp(0.9rem, 1.5vw, 1rem);
          color: rgba(232,241,248,0.82);
          max-width: 560px;
          margin: 0 auto;
          line-height: 1.7;
          position: relative;
          z-index: 1;
        }

        /* ───────────────────────────
           BODY WRAPPER
        ─────────────────────────── */
        .jcc-body {
          max-width: 1160px;
          margin: 0 auto;
          padding: 56px 80px 80px;
        }

        /* ───────────────────────────
           INFO CARDS
        ─────────────────────────── */
        .jcc-info-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 18px;
          margin-bottom: 48px;
        }
        .jcc-info-card {
          background: var(--jc-white);
          border: 1.5px solid var(--jc-divider);
          border-radius: 16px;
          padding: 28px 20px;
          text-align: center;
          box-shadow: 0 2px 14px rgba(18,38,63,0.06);
          transition: transform 0.25s, box-shadow 0.25s, border-color 0.25s;
        }
        .jcc-info-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 8px 28px rgba(18,38,63,0.11);
          border-color: var(--jc-accent);
        }
        .jcc-info-icon {
          width: 52px; height: 52px;
          background: var(--jc-mist);
          border-radius: 50%;
          display: flex; align-items: center; justify-content: center;
          font-size: 1.4rem;
          margin: 0 auto 14px;
        }
        .jcc-info-card h4 {
          font-family: 'Raleway', sans-serif;
          font-size: 0.92rem;
          font-weight: 800;
          color: var(--jc-navy);
          margin-bottom: 8px;
        }
        .jcc-info-card p {
          font-size: 0.82rem;
          color: var(--jc-txt-sec);
          line-height: 1.65;
        }

        /* ───────────────────────────
           MAIN ROW
        ─────────────────────────── */
        .jcc-main {
          display: grid;
          grid-template-columns: 1fr 320px;
          gap: 24px;
        }

        /* ───────────────────────────
           FORM CARD
        ─────────────────────────── */
        .jcc-form-card {
          background: var(--jc-white);
          border: 1.5px solid var(--jc-divider);
          border-radius: 18px;
          padding: 44px 44px;
          box-shadow: 0 4px 24px rgba(18,38,63,0.07);
        }
        .jcc-form-card h2 {
          font-family: 'Raleway', sans-serif;
          font-size: 1.5rem;
          font-weight: 900;
          color: var(--jc-navy);
          margin-bottom: 6px;
        }
        .jcc-form-sub {
          font-size: 0.875rem;
          color: var(--jc-txt-sec);
          margin-bottom: 32px;
          line-height: 1.6;
        }
        .jcc-form-divider {
          height: 2px;
          background: linear-gradient(90deg, var(--jc-steel), var(--jc-accent), transparent);
          border-radius: 2px;
          margin-bottom: 28px;
        }

        /* Form rows */
        .jcc-form-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 16px;
        }
        .jcc-form-group {
          margin-bottom: 18px;
        }
        .jcc-form-group label {
          display: block;
          font-size: 0.78rem;
          font-weight: 700;
          color: var(--jc-navy);
          letter-spacing: 0.06em;
          text-transform: uppercase;
          margin-bottom: 7px;
        }
        .jcc-req { color: #e05a5a; }

        /* Input wrap */
        .jcc-input-wrap {
          display: flex;
          align-items: center;
          background: var(--jc-cloud);
          border: 1.5px solid var(--jc-divider);
          border-radius: 9px;
          padding: 0 14px;
          gap: 10px;
          transition: border-color 0.2s, background 0.2s;
        }
        .jcc-input-wrap:focus-within {
          border-color: var(--jc-accent);
          background: var(--jc-white);
          box-shadow: 0 0 0 3px rgba(58,143,181,0.10);
        }
        .jcc-input-icon {
          font-size: 0.88rem;
          color: var(--jc-muted);
          flex-shrink: 0;
        }
        .jcc-input-wrap input {
          flex: 1;
          background: transparent;
          border: none;
          outline: none;
          font-family: 'Lato', sans-serif;
          font-size: 0.9rem;
          color: var(--jc-navy);
          padding: 12px 0;
        }
        .jcc-input-wrap input::placeholder { color: var(--jc-muted); }

        /* Textarea */
        .jcc-textarea {
          width: 100%;
          background: var(--jc-cloud);
          border: 1.5px solid var(--jc-divider);
          border-radius: 9px;
          padding: 12px 14px;
          font-family: 'Lato', sans-serif;
          font-size: 0.9rem;
          color: var(--jc-navy);
          outline: none;
          resize: vertical;
          transition: border-color 0.2s, background 0.2s, box-shadow 0.2s;
          box-sizing: border-box;
        }
        .jcc-textarea:focus {
          border-color: var(--jc-accent);
          background: var(--jc-white);
          box-shadow: 0 0 0 3px rgba(58,143,181,0.10);
        }
        .jcc-textarea::placeholder { color: var(--jc-muted); }

        /* Submit button */
        .jcc-submit-btn {
          width: 100%;
          background: linear-gradient(135deg, var(--jc-steel) 0%, var(--jc-sky) 100%);
          color: var(--jc-white);
          border: none;
          padding: 14px;
          border-radius: 9px;
          font-family: 'Lato', sans-serif;
          font-size: 0.97rem;
          font-weight: 700;
          letter-spacing: 0.03em;
          cursor: pointer;
          box-shadow: 0 4px 18px rgba(30,74,110,0.28);
          transition: opacity 0.2s, transform 0.2s;
          margin-top: 4px;
        }
        .jcc-submit-btn:hover { opacity: 0.9; transform: translateY(-1px); }
        .jcc-submit-btn:disabled { opacity: 0.5; cursor: not-allowed; transform: none; }

        /* Success state */
        .jcc-success {
          text-align: center;
          padding: 48px 20px;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 14px;
        }
        .jcc-success-icon {
          width: 72px; height: 72px;
          background: var(--jc-mist);
          border-radius: 50%;
          display: flex; align-items: center; justify-content: center;
          font-size: 2.2rem;
        }
        .jcc-success h3 {
          font-family: 'Raleway', sans-serif;
          font-size: 1.5rem;
          font-weight: 900;
          color: var(--jc-navy);
          margin: 0;
        }
        .jcc-success p {
          font-size: 0.9rem;
          color: var(--jc-txt-sec);
          margin: 0;
          line-height: 1.6;
        }
        .jcc-reset-btn {
          background: none;
          border: 1.5px solid var(--jc-divider);
          color: var(--jc-txt-sec);
          padding: 10px 26px;
          border-radius: 8px;
          font-family: 'Lato', sans-serif;
          font-size: 0.88rem;
          font-weight: 700;
          cursor: pointer;
          margin-top: 6px;
          transition: border-color 0.2s, color 0.2s;
        }
        .jcc-reset-btn:hover {
          border-color: var(--jc-accent);
          color: var(--jc-steel);
        }

        /* ───────────────────────────
           SIDE PANEL
        ─────────────────────────── */
        .jcc-side {
          display: flex;
          flex-direction: column;
          gap: 18px;
        }

        /* Map placeholder */
        // .jcc-map {
        //   background: linear-gradient(150deg, var(--jc-navy) 0%, var(--jc-steel) 60%, var(--jc-sky) 100%);
        //   border-radius: 16px;
        //   height: 190px;
        //   display: flex;
        //   flex-direction: column;
        //   align-items: center;
        //   justify-content: center;
        //   gap: 8px;
        //   position: relative;
        //   overflow: hidden;
        //   box-shadow: 0 4px 20px rgba(18,38,63,0.15);
        // }
        // .jcc-map::before {
        //   content: '';
        //   position: absolute;
        //   top: -30px; right: -30px;
        //   width: 140px; height: 140px;
        //   border-radius: 50%;
        //   background: rgba(58,143,181,0.15);
        // }
        // .jcc-map-pin {
        //   font-size: 2.4rem;
        //   position: relative;
        //   z-index: 1;
        //   animation: jcc-bounce 2s ease-in-out infinite;
        // }
        // @keyframes jcc-bounce {
        //   0%, 100% { transform: translateY(0); }
        //   50%       { transform: translateY(-6px); }
        // }
        // .jcc-map p {
        //   font-family: 'Lato', sans-serif;
        //   font-size: 0.82rem;
        //   color: rgba(232,241,248,0.85);
        //   font-weight: 600;
        //   position: relative;
        //   z-index: 1;
        //   margin: 0;
        // }
        .jcc-map {
  border-radius: 16px;
  height: 190px;
  overflow: hidden;
  box-shadow: 0 4px 20px rgba(18,38,63,0.15);
}

.jcc-map iframe {
  width: 100%;
  height: 100%;
  border: 0;
}
  

        /* Social card */
        .jcc-social-card {
          background: var(--jc-white);
          border: 1.5px solid var(--jc-divider);
          border-radius: 16px;
          padding: 24px 22px;
          box-shadow: 0 2px 14px rgba(18,38,63,0.06);
        }
        .jcc-social-card h4 {
          font-family: 'Raleway', sans-serif;
          font-size: 0.95rem;
          font-weight: 800;
          color: var(--jc-navy);
          margin-bottom: 6px;
        }
        .jcc-social-card p {
          font-size: 0.82rem;
          color: var(--jc-txt-sec);
          margin-bottom: 16px;
          line-height: 1.55;
        }
        .jcc-socials { display: flex; gap: 10px; }
        .jcc-social-btn {
          width: 38px; height: 38px;
          border-radius: 9px;
          background: var(--jc-mist);
          border: 1.5px solid var(--jc-divider);
          color: var(--jc-steel);
          font-size: 0.78rem;
          font-weight: 800;
          display: flex; align-items: center; justify-content: center;
          cursor: pointer;
          transition: background 0.2s, border-color 0.2s, color 0.2s, transform 0.2s;
          font-family: 'Lato', sans-serif;
        }
        .jcc-social-btn:hover {
          background: var(--jc-steel);
          border-color: var(--jc-steel);
          color: var(--jc-white);
          transform: translateY(-2px);
        }


        /* ───────────────────────────
           RESPONSIVE
        ─────────────────────────── */
    @media (max-width: 960px) {
          .jcc-hero { padding: 56px 32px 48px; }
          .jcc-body { padding: 40px 32px 64px; }
          .jcc-info-grid { grid-template-columns: repeat(2, 1fr); }
          .jcc-main { grid-template-columns: 1fr; }
          .jcc-form-card { padding: 32px 28px; }
          .jcc-side { flex-direction: row; flex-wrap: wrap; }
          .jcc-map { flex: 1 1 200px; }
          .jcc-social-card, .jcc-faq-card { flex: 1 1 200px; }
    }
    @media (max-width: 600px) {
          .jcc-hero { padding: 48px 20px 40px; }
          .jcc-body { padding: 28px 16px 56px; }
          .jcc-info-grid {
            display: flex;
            flex-wrap: wrap; /* Allows wrapping to a second row of 2 cards */
            gap: 10px;       /* Spacing between cards */
            padding: 5px;
            justify-content: center;
            width: 100%;
          }
          .jcc-form-card { padding: 20px 10px; border-radius: 14px; }
          .jcc-form-row { grid-template-columns: 1fr; }
          .jcc-side { flex-direction: column; }
         
          .jcc-info-card {
            flex: 0 0 calc(50% - 5px); 
            box-sizing: border-box; 
            display: flex;
            flex-direction: column;
            align-items: center;
            padding: 15px 8px;
            background: #fff;
            border-radius: 12px;
            min-width: 0; /* Allows card to shrink if text is long */
          }
          .jcc-info-card h4 {
              font-size: 0.75rem;
              width: 100%;
              white-space: nowrap;      /* Keeps title on one line */
              overflow: hidden;
              text-overflow: ellipsis;  /* Adds '...' if title is too long */
          }

          .jcc-info-card p {
            font-size: 0.65rem;
            line-height: 1.2;
            word-break:break-word;
          }
          .jcc-info-icon {
            width: 32px;
            height: 32px;
            font-size: 1rem;
            margin-bottom: 8px;
          }
          .jcc-form-card h2 { 
            font-size: 1.2rem; /* Scaled down from 1.5rem */
            margin-bottom: 4px; 
          }

          .jcc-form-sub { 
            font-size: 0.78rem; /* Smaller subtext */
            margin-bottom: 20px; /* Less bottom gap */
            line-height: 1.4;
          }

          .jcc-form-divider {
            margin-bottom: 20px;
            height: 1.5px; /* Thinner line */
          }

  
          .jcc-form-group {
            margin-bottom: 14px; /* Tighter vertical stack */
          }

        .jcc-form-group label {
          font-size: 0.68rem; /* Tiny uppercase labels */
          margin-bottom: 5px;
        }

        /* 4. Compact Inputs */
        .jcc-input-wrap {
          padding: 0 10px; /* Tighter horizontal padding */
          gap: 8px;
        }

        .jcc-input-wrap input {
          padding: 10px 0; /* Slightly shorter inputs */
          font-size: 0.85rem; /* Standard mobile input font size */
        }

        .jcc-input-icon {
          font-size: 0.8rem; /* Smaller icons inside inputs */
        }

        .jcc-textarea {
          padding: 10px 12px;
          font-size: 0.85rem;
          min-height: 100px; /* Shorter initial height on mobile */
        }

        /* 5. Compact Submit Button */
        .jcc-submit-btn {
          padding: 12px;
          font-size: 0.9rem;
          margin-top: 8px;
        }

        /* 6. Success State Shrink */
        .jcc-success {
          padding: 32px 10px;
        }

        .jcc-success-icon {
          width: 56px;
          height: 56px;
          font-size: 1.8rem;
        }

        .jcc-success h3 {
          font-size: 1.2rem;
        }
      .jcc-side {
        display: flex;
        flex-direction: row; 
        flex-wrap: wrap;     
        gap: 12px;           
        width: 100%;
        margin-top: 24px;
      }

      
      .jcc-map, 
      .jcc-social-card {
        flex: 0 0 calc(50% - 6px); 
        min-width: 0;               
        box-sizing: border-box;
        height: 160px;              
      }

      
      .jcc-map-pin {
        font-size: 1.5rem;
        margin-bottom: 2px;
      }

      .jcc-map p {
        font-size: 0.7rem;
        text-align: center;
        padding: 0 5px;
      }

      
      .jcc-social-card {
        padding: 15px 10px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        text-align: center;
      }

      .jcc-social-card h4 {
        font-size: 0.8rem;
        margin-bottom: 4px;
      }

      .jcc-social-card p {
        display: none; 
      }

      .jcc-socials {
        gap: 6px;
      }

      .jcc-social-btn {
        width: 32px;
        height: 32px;
        font-size: 0.7rem;
      }


    }
          

   /* FOOTER */
    footer {
            background: #ddeaf3;
            padding: 56px 80px 28px;
          }
  
          .footer-grid {
            display: grid;
            grid-template-columns: 2fr 1fr 1.2fr 1.5fr;
            gap: 48px;
            margin-bottom: 40px;
          }
  
          .footer-logo-row {
            display: flex;
            align-items: center;
            gap: 10px;
            margin-bottom: 14px;
          }
          .footer-logo-row img {
            width: 180px;
            height: auto;
            display: block;
          }
  
          .footer-tagline {
            color: #122039;
            font-size: 1rem;
            line-height: 1.7;
            margin-bottom: 20px;
          }
  
          .footer-socials {
            display: flex;
            gap: 10px;
            flex-wrap: wrap;
          }
          .social-btn {
            width: 34px; height: 34px;
            border-radius: 6px;
            background: transparent;
            color: #122039;
            display: flex; align-items: center; justify-content: center;
            font-size: 0.75rem; font-weight: 700;
            cursor: pointer;
            transition: all .2s;
            touch-action: manipulation;
          }
          .social-btn:hover {  color: #ffffff; }
  
          .footer-col-title {
            font-size: 0.9rem; font-weight: 700;
            letter-spacing: .1em; text-transform: uppercase;
            color: #162b47; margin-bottom: 16px;
          }
  
          .footer-links {
            list-style: none;
            display: flex; flex-direction: column;
            gap: 10px;
            padding: 0; margin: 0;
          }
          .footer-links a {
            color: #122039;
            font-size: 1rem;
            transition: color .2s;
            cursor: pointer;
            text-decoration: none;
          }
          .footer-links a:hover { color: black;
          font-weight:700 }
  
          .fc-row {
            display: flex; gap: 10px;
            align-items: flex-start;
            margin-bottom: 12px;
          }
          .fc-icon {
            color: #122039;
            margin-top: 2px;
            flex-shrink: 0;
          }
          .fc-text {
            color: #122039;
            font-size: 1rem;
            line-height: 1.6;
            text-decoration: none;
          }
          a.fc-text:hover { color: #000000;font-weight:700 }
  
          .footer-bottom {
            border-top: 1px solid rgba(18,32,57,0.25);
            padding-top: 20px;
            text-align: center;
            color: #060606;
            font-size: 1rem;
          }
  
          /* ── Responsive ── */
          @media (max-width: 1024px) {
            footer { padding: 48px 40px 24px; }
            .footer-grid {
              grid-template-columns: 1fr 1fr;
              gap: 36px;
            }
          }
  
          @media (max-width: 640px) {
            footer { padding: 40px 20px 20px; }
            .footer-grid {
              grid-template-columns: 1fr;
              gap: 28px;
              margin-bottom:40px
            }
            .footer-logo-row img { width: 140px;height:auto }
            .footer-bottom {
              text-align: center;
              font-size:0.75rem;
            }
            .footer-tagline{
               font-size:0.8rem;
               line-height:1.6;
               margin-bottom:20px
            }
          .fc-row{
              width:100%;
          }
          .fc-icon{
              flex-shrink:0;
              margin-top:2px;
          }   
          .fc-text{
             font-size:0.8rem;
             line-height:1.5;
             word-break:break-word;
             overflow-wrap:break-word;
             white-space:normal;
             flex:1;
          }
          .footer-links a{
            font-size:0.85rem;
          }
          .footer-bottom{
            
          }
          }
  /* JOBS Card */
     
        .jcjc-card {
          background: #FFFFFF;
          border: 1.5px solid #D0DFE9;
          border-radius: 16px;
          padding: 22px 24px;
          box-shadow: 0 2px 12px rgba(18,38,63,0.05);
          display: flex;
          flex-direction: column;
          height: 100%;
          font-family: 'Lato', sans-serif;
          transition: transform 0.25s, box-shadow 0.25s, border-color 0.25s;
        }
        .jcjc-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 10px 32px rgba(18,38,63,0.10);
          border-color: #3A8FB5;
        }

        /* ── Header ── */
        .jcjc-header {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          gap: 12px;
          margin-bottom: 14px;
        }
        .jcjc-title {
          font-family: 'Raleway', sans-serif;
          font-size: 1rem;
          font-weight: 800;
          color: #12263F;
          line-height: 1.3;
          flex: 1;
          min-width: 0;
        }

        /* ── Status badge ── */
        .jcjc-status {
          flex-shrink: 0;
          font-size: 0.68rem;
          font-weight: 700;
          letter-spacing: 0.07em;
          text-transform: uppercase;
          padding: 4px 11px;
          border-radius: 20px;
          white-space: nowrap;
        }
        .jcjc-status.open   { background: #e6f4ea; color: #2d7a3a; border: 1px solid #b7dfbe; }
        .jcjc-status.closed { background: #fdecea; color: #b03a3a; border: 1px solid #f0c0c0; }

        /* ── Meta rows ── */
        .jcjc-meta { display: flex; flex-direction: column; gap: 7px; margin-bottom: 14px; }
        .jcjc-meta-row {
          display: flex; align-items: center; gap: 8px;
          font-size: 0.845rem; color: #4A6A82;
        }
        .jcjc-meta-row svg { flex-shrink: 0; }
        .jcjc-salary { font-weight: 700; color: #1E4A6E; }

        /* ── Description ── */
        .jcjc-desc {
          display: flex; align-items: flex-start; gap: 8px;
          font-size: 0.845rem; color: #4A6A82; line-height: 1.65;
          margin-bottom: 14px; flex: 1;
        }
        .jcjc-desc svg { flex-shrink: 0; margin-top: 2px; }
        .jcjc-desc-text {
        display: -webkit-box;
        -webkit-line-clamp: 3;
        -webkit-box-orient: vertical;
        overflow: hidden;
      }

      /* Expanded state → scrollable */
      .jcjc-desc-text.expanded {
        display: block;
        max-height: 120px;   /* control height */
        overflow-y: auto;    /* scrollbar */
        padding-right: 5px;
      }
       .jcjc-see-more {
          background: none;
          border: none;
          color: #3182ce;
          cursor: pointer;
          margin-left: 5px;
          
        }

        .jcjc-see-more:hover {
          text-decoration: underline;
        }

        /* ── Job type chip ── */
        .jcjc-type {
          display: inline-flex; align-items: center;
          font-size: 0.72rem; font-weight: 700;
          letter-spacing: 0.05em; text-transform: uppercase;
          color: #1E4A6E; background: #E8F1F8;
          border: 1px solid #D0DFE9;
          padding: 4px 12px; border-radius: 6px;
          margin-bottom: 16px; align-self: flex-start;
        }

        /* ── Button ── */
        .jcjc-btn {
          width: 100%; padding: 11px; border-radius: 9px; border: none;
          font-family: 'Lato', sans-serif; font-size: 0.9rem; font-weight: 700;
          letter-spacing: 0.02em; cursor: pointer; margin-top: auto;
          transition: opacity 0.2s, transform 0.2s;
        }
        .jcjc-btn.active {
          background: linear-gradient(135deg, #1E4A6E 0%, #2D6A96 100%);
          color: #FFFFFF;
          box-shadow: 0 4px 14px rgba(30,74,110,0.25);
        }
        .jcjc-btn.active:hover { opacity: 0.88; transform: translateY(-1px); }
        .jcjc-btn.closed {
          background: #F4F8FB; color: #7A9AB0;
          border: 1.5px solid #D0DFE9; cursor: not-allowed;
        }
  /*SignUp8>


        /* ── Page layout ── */
        .jcsu-root {
          min-height: calc(100vh - 72px);
          display: grid;
          grid-template-columns: 1fr 1fr;
          font-family: 'Lato', sans-serif;
        }

        /* ── Left panel ── */
        .jcsu-panel {
          background: linear-gradient(150deg, var(--jc-navy) 0%, var(--jc-steel) 55%, var(--jc-sky) 100%);
          display: flex; flex-direction: column;
          justify-content: center; align-items: flex-start;
          padding: 72px 64px;
          position: relative; overflow: hidden;
        }
        .jcsu-panel::before {
          content: ''; position: absolute; top: -90px; right: -90px;
          width: 420px; height: 420px; border-radius: 50%;
          background: rgba(58,143,181,0.10); pointer-events: none;
        }
        .jcsu-panel::after {
          content: ''; position: absolute; bottom: -60px; left: -60px;
          width: 300px; height: 300px; border-radius: 50%;
          background: rgba(18,38,63,0.25); pointer-events: none;
        }
        .jcsu-panel-chip {
          display: inline-flex; align-items: center; gap: 8px;
          background: rgba(58,143,181,0.20); border: 1px solid rgba(58,143,181,0.48);
          color: var(--jc-mist); font-size: 0.7rem; font-weight: 700;
          letter-spacing: 0.13em; text-transform: uppercase;
          padding: 5px 14px; border-radius: 20px; margin-bottom: 24px;
          position: relative; z-index: 1;
        }
        .jcsu-panel h2 {
          font-family: 'Raleway', sans-serif;
          font-size: clamp(1.8rem, 3vw, 2.6rem); font-weight: 900;
          color: var(--jc-white); line-height: 1.15; margin-bottom: 18px;
          letter-spacing: -0.5px; position: relative; z-index: 1;
        }
        .jcsu-panel h2 span { color: var(--jc-accent); }
        .jcsu-panel-desc {
          font-size: 0.93rem; color: rgba(232,241,248,0.80);
          line-height: 1.75; max-width: 380px; margin-bottom: 36px;
          position: relative; z-index: 1;
        }
        .jcsu-tagline {
          display: inline-block;
          font-family: 'Raleway', sans-serif;
          font-size: 0.92rem; font-weight: 700; font-style: italic;
          color: var(--jc-accent); border-left: 3px solid var(--jc-accent);
          padding-left: 14px; position: relative; z-index: 1; margin-bottom: 40px;
        }
        .jcsu-features { display: flex; flex-direction: column; gap: 14px; position: relative; z-index: 1; }
        .jcsu-feature { display: flex; align-items: center; gap: 12px; font-size: 0.875rem; color: rgba(232,241,248,0.85); }
        .jcsu-feature-dot {
          width: 22px; height: 22px;
          background: rgba(58,143,181,0.28); border: 1px solid rgba(58,143,181,0.55);
          border-radius: 50%; display: flex; align-items: center; justify-content: center;
          font-size: 0.65rem; color: var(--jc-accent); flex-shrink: 0; font-weight: 900;
        }

        /* ── Right form side ── */
        .jcsu-form-side {
          background: var(--jc-cloud);
          display: flex; align-items: center; justify-content: center;
          padding: 36px 32px;
        }
        .jcsu-card {
          background: var(--jc-white); border: 1.5px solid var(--jc-divider);
          border-radius: 16px; padding: 32px 32px;
          width: 100%; max-width: 380px;
          box-shadow: 0 6px 28px rgba(18,38,63,0.08);
        }

        /* Logo */
        .jcsu-logo { display: flex; align-items: center; gap: 9px; margin-bottom: 20px; }
        .jcsu-logo-icon {
          width: 36px; height: 36px;
          background: linear-gradient(135deg, var(--jc-steel), var(--jc-sky));
          border-radius: 8px; display: flex; align-items: center; justify-content: center;
          font-size: 1rem; box-shadow: 0 3px 10px rgba(30,74,110,0.25);
        }
        .jcsu-logo-text { font-family: 'Raleway', sans-serif; font-size: 1rem; font-weight: 900; color: var(--jc-navy); letter-spacing: -0.3px; }
        .jcsu-logo-text span { color: var(--jc-accent); }

        /* Headings */
        .jcsu-card h2 { font-family: 'Raleway', sans-serif; font-size: 1.3rem; font-weight: 900; color: var(--jc-navy); margin-bottom: 4px; }
        .jcsu-sub { font-size: 0.82rem; color: var(--jc-txt-sec); margin-bottom: 20px; line-height: 1.5; }
        .jcsu-divider {
          height: 2px;
          background: linear-gradient(90deg, var(--jc-steel), var(--jc-accent), transparent);
          border-radius: 2px; margin-bottom: 20px;
        }

        /* Form group */
        .jcsu-group { margin-bottom: 14px; }
        .jcsu-group label {
          display: block; font-size: 0.73rem; font-weight: 700;
          color: var(--jc-navy); letter-spacing: 0.07em; text-transform: uppercase; margin-bottom: 6px;
        }
        .jcsu-input-wrap {
          display: flex; align-items: center;
          background: var(--jc-cloud); border: 1.5px solid var(--jc-divider);
          border-radius: 8px; padding: 0 12px; gap: 9px;
          transition: border-color 0.2s, background 0.2s, box-shadow 0.2s;
        }
        .jcsu-input-wrap:focus-within {
          border-color: var(--jc-accent); background: var(--jc-white);
          box-shadow: 0 0 0 3px rgba(58,143,181,0.10);
        }
        .jcsu-input-icon { font-size: 0.82rem; color: var(--jc-muted); flex-shrink: 0; }
        .jcsu-input-wrap input {
          flex: 1; background: transparent; border: none; outline: none;
          font-family: 'Lato', sans-serif; font-size: 0.875rem;
          color: var(--jc-navy); padding: 10px 0;
        }
        .jcsu-input-wrap input::placeholder { color: var(--jc-muted); }
        .jcsu-eye-btn {
          background: none; border: none; cursor: pointer;
          color: var(--jc-muted); font-size: 0.82rem; padding: 0;
          flex-shrink: 0; transition: color 0.2s;
        }
        .jcsu-eye-btn:hover { color: var(--jc-steel); }

        /* Terms checkbox */
        .jcsu-terms {
          display: flex; align-items: flex-start; gap: 9px;
          margin-bottom: 18px; cursor: pointer;
        }
        .jcsu-terms input { accent-color: var(--jc-accent); width: 14px; height: 14px; margin-top: 2px; cursor: pointer; flex-shrink: 0; }
        .jcsu-terms span { font-size: 0.8rem; color: var(--jc-txt-sec); line-height: 1.55; }
        .jcsu-terms-link { color: var(--jc-accent); font-weight: 700; cursor: pointer; transition: color 0.2s; }
        .jcsu-terms-link:hover { color: var(--jc-steel); }

        /* Submit */
        .jcsu-btn {
          width: 100%;
          background: linear-gradient(135deg, var(--jc-steel) 0%, var(--jc-sky) 100%);
          color: var(--jc-white); border: none;
          padding: 11px; border-radius: 8px;
          font-family: 'Lato', sans-serif; font-size: 0.92rem; font-weight: 700;
          letter-spacing: 0.03em; cursor: pointer;
          box-shadow: 0 4px 16px rgba(30,74,110,0.25);
          transition: opacity 0.2s, transform 0.2s;
          margin-bottom: 16px;
        }
        .jcsu-btn:hover:not(:disabled) { opacity: 0.9; transform: translateY(-1px); }
        .jcsu-btn:disabled { opacity: 0.45; cursor: not-allowed; transform: none; }

        /* Switch */
        .jcsu-switch { text-align: center; font-size: 0.82rem; color: var(--jc-txt-sec); }
        .jcsu-switch a { color: var(--jc-accent); font-weight: 700; cursor: pointer; text-decoration: none; transition: color 0.2s; }
        .jcsu-switch a:hover { color: var(--jc-steel); }

        /* ── Responsive ── */
        @media (max-width: 860px) {
          .jcsu-root { grid-template-columns: 1fr; grid-template-rows: auto 1fr; }
          .jcsu-panel { padding: 32px 32px 24px; align-items: center; text-align: center; }
          .jcsu-panel::before { width: 220px; height: 220px; top: -50px; right: -50px; }
          .jcsu-panel::after  { width: 150px; height: 150px; bottom: -35px; left: -35px; }
          .jcsu-panel h2 { font-size: clamp(1.3rem, 4vw, 1.85rem); margin-bottom: 10px; }
          .jcsu-panel-desc { font-size: 0.875rem; margin-bottom: 16px; max-width: 500px; }
          .jcsu-tagline { margin-bottom: 0; font-size: 0.85rem; }
          .jcsu-features { display: none; }
          .jcsu-form-side { padding: 28px 24px 44px; }
          .jcsu-card { max-width: 480px; margin: 0 auto; padding: 28px 26px; }
        }
        @media (max-width: 540px) {
          .jcsu-panel { padding: 22px 18px 18px; }
          .jcsu-panel h2 { font-size: 1.2rem; margin-bottom: 7px; }
          .jcsu-panel-desc { font-size: 0.8rem; margin-bottom: 10px; }
          .jcsu-tagline { font-size: 0.78rem; }
          .jcsu-form-side { padding: 18px 14px 36px; }
          .jcsu-card { padding: 20px 16px; border-radius: 13px; max-width: 100%; }
          .jcsu-card h2 { font-size: 1.1rem; }
          .jcsu-group { margin-bottom: 11px; }
          .jcsu-input-wrap input { padding: 9px 0; font-size: 0.84rem; }
          .jcsu-btn { padding: 11px; font-size: 0.88rem; }
          .jcsu-terms span { font-size: 0.77rem; }
        }

  /* Login PAGES */
    @import url('https://fonts.googleapis.com/css2?family=Raleway:wght@700;800;900&family=Lato:wght@400;600;700&display=swap');

        :root {
          --jc-navy:    #12263F;
          --jc-steel:   #1E4A6E;
          --jc-sky:     #2D6A96;
          --jc-accent:  #3A8FB5;
          --jc-mist:    #E8F1F8;
          --jc-cloud:   #F4F8FB;
          --jc-divider: #D0DFE9;
          --jc-txt-sec: #4A6A82;
          --jc-muted:   #7A9AB0;
          --jc-white:   #FFFFFF;
        }

        /* ── Page layout ── */
        .jcl-root {
          min-height: calc(100vh - 72px);
          display: grid;
          grid-template-columns: 1fr 1fr;
          font-family: 'Lato', sans-serif;
          overflow: visible;
        }
        /* Prevent the panel's overflow:hidden from clipping the form on mobile */
        .jcl-panel { overflow: hidden; }
        .jcl-form-side { overflow: visible; }

        /* ── Left panel ── */
        .jcl-panel {
          background: linear-gradient(150deg, var(--jc-navy) 0%, var(--jc-steel) 55%, var(--jc-sky) 100%);
          display: flex; flex-direction: column;
          justify-content: center; align-items: flex-start;
          padding: 72px 64px;
          position: relative; overflow: hidden;
        }
        .jcl-panel::before {
          content: ''; position: absolute; top: -90px; right: -90px;
          width: 420px; height: 420px; border-radius: 50%;
          background: rgba(58,143,181,0.10); pointer-events: none;
        }
        .jcl-panel::after {
          content: ''; position: absolute; bottom: -60px; left: -60px;
          width: 300px; height: 300px; border-radius: 50%;
          background: rgba(18,38,63,0.25); pointer-events: none;
        }
        .jcl-panel-chip {
          display: inline-flex; align-items: center; gap: 8px;
          background: rgba(58,143,181,0.20); border: 1px solid rgba(58,143,181,0.48);
          color: var(--jc-mist); font-size: 0.7rem; font-weight: 700;
          letter-spacing: 0.13em; text-transform: uppercase;
          padding: 5px 14px; border-radius: 20px; margin-bottom: 24px;
          position: relative; z-index: 1;
        }
        .jcl-panel h2 {
          font-family: 'Raleway', sans-serif;
          font-size: clamp(1.8rem, 3vw, 2.6rem); font-weight: 900;
          color: var(--jc-white); line-height: 1.15; margin-bottom: 18px;
          letter-spacing: -0.5px; position: relative; z-index: 1;
        }
        .jcl-panel h2 span { color: var(--jc-accent); }
        .jcl-panel-desc {
          font-size: 0.93rem; color: rgba(232,241,248,0.80);
          line-height: 1.75; max-width: 380px; margin-bottom: 40px;
          position: relative; z-index: 1;
        }
        .jcl-tagline {
          display: inline-block;
          font-family: 'Raleway', sans-serif;
          font-size: 0.92rem; font-weight: 700; font-style: italic;
          color: var(--jc-accent);
          border-left: 3px solid var(--jc-accent);
          padding-left: 14px;
          position: relative; z-index: 1; margin-bottom: 44px;
        }
        .jcl-features { display: flex; flex-direction: column; gap: 14px; position: relative; z-index: 1; }
        .jcl-feature { display: flex; align-items: center; gap: 12px; font-size: 0.875rem; color: rgba(232,241,248,0.85); }
        .jcl-feature-dot {
          width: 22px; height: 22px;
          background: rgba(58,143,181,0.28); border: 1px solid rgba(58,143,181,0.55);
          border-radius: 50%; display: flex; align-items: center; justify-content: center;
          font-size: 0.65rem; color: var(--jc-accent); flex-shrink: 0; font-weight: 900;
        }

        /* ── Right form side ── */
        .jcl-form-side {
          background: var(--jc-cloud);
          display: flex; align-items: center; justify-content: center;
          padding: 36px 32px;
        }
        .jcl-card {
          background: var(--jc-white); border: 1.5px solid var(--jc-divider);
          border-radius: 16px; padding: 32px 32px;
          width: 100%; max-width: 380px;
          box-shadow: 0 6px 28px rgba(18,38,63,0.08);
        }

        /* Logo */
        .jcl-logo { display: flex; align-items: center; gap: 9px; margin-bottom: 20px; }
        .jcl-logo-icon {
          width: 36px; height: 36px;
          background: linear-gradient(135deg, var(--jc-steel), var(--jc-sky));
          border-radius: 8px; display: flex; align-items: center; justify-content: center;
          font-size: 1rem; box-shadow: 0 3px 10px rgba(30,74,110,0.25);
        }
        .jcl-logo-text { font-family: 'Raleway', sans-serif; font-size: 1rem; font-weight: 900; color: var(--jc-navy); letter-spacing: -0.3px; }
        .jcl-logo-text span { color: var(--jc-accent); }

        /* Headings */
        .jcl-card h2 { font-family: 'Raleway', sans-serif; font-size: 1.3rem; font-weight: 900; color: var(--jc-navy); margin-bottom: 4px; }
        .jcl-sub { font-size: 0.82rem; color: var(--jc-txt-sec); margin-bottom: 20px; line-height: 1.5; }
        .jcl-divider {
          height: 2px;
          background: linear-gradient(90deg, var(--jc-steel), var(--jc-accent), transparent);
          border-radius: 2px; margin-bottom: 20px;
        }

        /* Form group */
        .jcl-group { margin-bottom: 14px; }
        .jcl-group label {
          display: block; font-size: 0.73rem; font-weight: 700;
          color: var(--jc-navy); letter-spacing: 0.07em; text-transform: uppercase; margin-bottom: 6px;
        }
        .jcl-input-wrap {
          display: flex; align-items: center;
          background: var(--jc-cloud); border: 1.5px solid var(--jc-divider);
          border-radius: 8px; padding: 0 12px; gap: 9px;
          transition: border-color 0.2s, background 0.2s, box-shadow 0.2s;
        }
        .jcl-input-wrap:focus-within {
          border-color: var(--jc-accent); background: var(--jc-white);
          box-shadow: 0 0 0 3px rgba(58,143,181,0.10);
        }
        .jcl-input-icon { font-size: 0.82rem; color: var(--jc-muted); flex-shrink: 0; }
        .jcl-input-wrap input {
          flex: 1; background: transparent; border: none; outline: none;
          font-family: 'Lato', sans-serif; font-size: 0.875rem;
          color: var(--jc-navy); padding: 10px 0;
        }
        .jcl-input-wrap input::placeholder { color: var(--jc-muted); }
        .jcl-eye-btn {
          background: none; border: none; cursor: pointer;
          color: var(--jc-muted); font-size: 0.82rem; padding: 0; flex-shrink: 0;
          transition: color 0.2s;
        }
        .jcl-eye-btn:hover { color: var(--jc-steel); }

        /* Error text */
        .jcl-error { display: block; font-size: 0.73rem; color: #c94f4f; margin-top: 5px; font-weight: 600; }

        /* Firebase error */
        .jcl-firebase-error {
          background: #fdecea; border: 1px solid #f0c0c0;
          color: #b03a3a; font-size: 0.78rem; font-weight: 600;
          border-radius: 7px; padding: 9px 12px; margin-bottom: 14px;
        }

        /* Remember + forgot row */
        .jcl-row { display: flex; align-items: center; justify-content: space-between; margin-bottom: 18px; }
        .jcl-checkbox { display: flex; align-items: center; gap: 7px; cursor: pointer; font-size: 0.82rem; color: var(--jc-txt-sec); font-weight: 600; }
        .jcl-checkbox input { accent-color: var(--jc-accent); width: 14px; height: 14px; cursor: pointer; }
        .jcl-forgot {
          font-size: 0.82rem; font-weight: 700; color: var(--jc-accent);
          cursor: pointer; background: none; border: none; padding: 0;
          transition: color 0.2s; font-family: 'Lato', sans-serif;
        }
        .jcl-forgot:hover { color: var(--jc-steel); }

        /* Submit */
        .jcl-btn {
          width: 100%;
          background: linear-gradient(135deg, var(--jc-steel) 0%, var(--jc-sky) 100%);
          color: var(--jc-white); border: none;
          padding: 11px; border-radius: 8px;
          font-family: 'Lato', sans-serif; font-size: 0.92rem; font-weight: 700;
          letter-spacing: 0.03em; cursor: pointer;
          box-shadow: 0 4px 16px rgba(30,74,110,0.25);
          transition: opacity 0.2s, transform 0.2s;
          margin-bottom: 16px;
        }
        .jcl-btn:hover { opacity: 0.9; transform: translateY(-1px); }

        /* Switch */
        .jcl-switch { text-align: center; font-size: 0.82rem; color: var(--jc-txt-sec); }
        .jcl-switch a { color: var(--jc-accent); font-weight: 700; cursor: pointer; text-decoration: none; transition: color 0.2s; }
        .jcl-switch a:hover { color: var(--jc-steel); }

        /* ── Responsive ── */
        @media (max-width: 860px) {
          /* Stack vertically, no fixed height */
          .jcl-root {
            display: flex; flex-direction: column;
            min-height: unset; height: auto;
          }
          /* Panel shrinks to content, pseudo-els clipped inside */
          .jcl-panel {
            padding: 28px 28px 24px;
            align-items: center; text-align: center;
            overflow: hidden;
            flex-shrink: 0;
          }
          .jcl-panel::before { width: 180px; height: 180px; top: -40px; right: -40px; }
          .jcl-panel::after  { display: none; }   /* remove bottom circle that overlaps form */
          .jcl-panel h2 { font-size: clamp(1.2rem, 4vw, 1.7rem); margin-bottom: 8px; }
          .jcl-panel-desc { font-size: 0.85rem; margin-bottom: 12px; max-width: 480px; }
          .jcl-tagline { margin-bottom: 0; font-size: 0.83rem; }
          .jcl-features { display: none; }
          /* Form sits below panel, fully clickable */
          .jcl-form-side {
            padding: 28px 20px 52px;
            position: relative; z-index: 1;
            flex: 1;
          }
          .jcl-card {
            max-width: 460px; width: 100%; margin: 0 auto; padding: 26px 22px;
          }
        }
        @media (max-width: 540px) {
          .jcl-panel { padding: 20px 16px 18px; }
          .jcl-panel h2 { font-size: 1.1rem; margin-bottom: 6px; }
          .jcl-panel-desc { font-size: 0.78rem; margin-bottom: 10px; }
          .jcl-tagline { font-size: 0.76rem; }
          .jcl-form-side { padding: 22px 14px 56px; }
          .jcl-card { padding: 20px 16px; border-radius: 13px; }
          .jcl-card h2 { font-size: 1.05rem; }
          .jcl-group { margin-bottom: 12px; }
          .jcl-input-wrap input { padding: 10px 0; font-size: 0.875rem; }
          .jcl-btn { padding: 13px; font-size: 0.9rem; min-height: 48px; }
          .jcl-input-wrap { min-height: 46px; }
          /* Ensure all interactive elements are tappable */
          .jcl-input-wrap, .jcl-btn, .jcl-eye-btn,
          .jcl-forgot, .jcl-checkbox, .jcl-switch a {
            touch-action: manipulation;
            -webkit-tap-highlight-color: rgba(58,143,181,0.15);
          }
        }
  

        /* HELP BTN */
      .help-btn { position: fixed; bottom: 24px; right: 24px; width: 40px; height: 40px; background: #2563eb; border-radius: 50%; border: none; color: #fff; font-weight: 700; font-size: 0.9rem; cursor: pointer; box-shadow: 0 4px 16px rgba(37,99,235,0.35); z-index: 999; transition: transform .2s; }
      .help-btn:hover { transform: scale(1.1); }

      /* WHATSAPP FLOAT BTN */
      .jc-wa-btn {
        position: fixed;
        bottom: 28px;
        right: 28px;
        width: 58px;
        height: 58px;
        background: #25D366;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        box-shadow: 0 6px 22px rgba(37, 211, 102, 0.45);
        z-index: 9999;
        cursor: pointer;
        text-decoration: none;
        transition: transform 0.25s ease, box-shadow 0.25s ease;
        animation: jcWaPulse 2.5s ease-in-out infinite;
      }
      .jc-wa-btn:hover {
        transform: scale(1.12);
        box-shadow: 0 10px 30px rgba(37, 211, 102, 0.55);
        animation: none;
      }
      .jc-wa-btn svg {
        width: 32px;
        height: 32px;
        fill: #fff;
      }
      @keyframes jcWaPulse {
        0%, 100% { box-shadow: 0 6px 22px rgba(37, 211, 102, 0.45); }
        50%       { box-shadow: 0 6px 32px rgba(37, 211, 102, 0.75), 0 0 0 8px rgba(37, 211, 102, 0.12); }
      }
      @media (max-width: 600px) {
        .jc-wa-btn { width: 50px; height: 50px; bottom: 20px; right: 20px; }
        .jc-wa-btn svg { width: 27px; height: 27px; }
      }

        /* REVEAL ANIMATION */
        .reveal { opacity: 0; transform: translateY(22px); transition: opacity .6s ease, transform .6s ease; }
        .reveal.visible { opacity: 1; transform: none; }
        .reveal-d1 { transition-delay: .1s; }
        .reveal-d2 { transition-delay: .2s; }
        .reveal-d3 { transition-delay: .3s; }


        @media (max-width: 900px) {
          .navbar { padding: 0 20px; }
          .nav-links { display: none; }
          .about-section, .mission-section, .services-section, .why-section, .testi-section, footer { padding-left: 20px; padding-right: 20px; }
          .stats-grid, .services-grid, .why-grid { grid-template-columns: 1fr 1fr; }
          .mission-card { grid-template-columns: 1fr; }
          .mission-img { min-height: 220px; }
          .footer-grid { grid-template-columns: 1fr 1fr; gap: 28px; }
          .testi-card { min-width: calc(100% - 0px); }
          .jobs-hero, .jobs-body { padding-left: 20px; padding-right: 20px; }
        }

        .jcsu-modal-overlay {
  position: fixed; top: 0; left: 0; width: 100%; height: 100%;
  background: rgba(15, 23, 42, 0.7); /* Deep slate overlay */
  backdrop-filter: blur(4px);
  display: flex; align-items: center; justify-content: center;
  z-index: 9999; padding: 20px;
}

.jcsu-modal-content {
  background: white; width: 100%; max-width: 600px;
  border-radius: 16px; overflow: hidden;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
  display: flex; flex-direction: column; max-height: 85vh;
}

.jcsu-modal-header {
  padding: 20px 24px; border-bottom: 1px solid #f1f5f9;
  display: flex; justify-content: space-between; align-items: center;
}

.jcsu-modal-header h3 { margin: 0; color: #1e293b; font-size: 1.25rem; font-weight: 700; }

.jcsu-modal-close {
  background: #f1f5f9; border: none; font-size: 22px; cursor: pointer;
  width: 32px; height: 32px; border-radius: 50%; color: #64748b;
  display: flex; align-items: center; justify-content: center; transition: 0.2s;
}

.jcsu-modal-close:hover { background: #e2e8f0; color: #0f172a; }

.jcsu-modal-body {
  padding: 24px; overflow-y: auto; color: #475569; font-size: 14px; line-height: 1.6;
}

  /* REVEAL ANIMATION */
  .reveal { opacity: 0; transform: translateY(22px); transition: opacity .6s ease, transform .6s ease; }
  .reveal.visible { opacity: 1; transform: none; }
  .reveal-d1 { transition-delay: .1s; }
  .reveal-d2 { transition-delay: .2s; }
  .reveal-d3 { transition-delay: .3s; }

  @media (max-width: 900px) {
    .navbar { padding: 0 20px; }
    .nav-links { display: none; }
    .about-section, .mission-section, .services-section, .why-section, .testi-section, footer { padding-left: 20px; padding-right: 20px; }
    .stats-grid, .services-grid, .why-grid { grid-template-columns: 1fr 1fr; }
    .mission-card { grid-template-columns: 1fr; }
    .mission-img { min-height: 220px; }
    .footer-grid { grid-template-columns: 1fr 1fr; gap: 28px; }
    .testi-card { min-width: calc(100% - 0px); }
    .jobs-hero, .jobs-body { padding-left: 20px; padding-right: 20px; }
  }
   
.jcsu-modal-body section { margin-bottom: 20px; }
.jcsu-modal-body h4 { color: #0f172a; margin-bottom: 8px; font-size: 15px; }
.jcsu-modal-body ul { padding-left: 20px; margin: 8px 0; }
.jcsu-modal-body li { margin-bottom: 4px; }

.jcsu-modal-footer {
  padding: 16px 24px; border-top: 1px solid #f1f5f9;
  display: flex; justify-content: flex-end; gap: 12px; background: #f8fafc;
}

.jcsu-modal-btn-secondary {
  background: transparent; border: 1px solid #cbd5e1; color: #64748b;
  padding: 10px 20px; border-radius: 8px; cursor: pointer; font-weight: 500;
}

.jcsu-modal-btn-secondary:hover { background: #f1f5f9; }

/* Custom Scrollbar */
.jcsu-modal-body::-webkit-scrollbar { width: 6px; }
.jcsu-modal-body::-webkit-scrollbar-track { background: #f1f5f9; }
.jcsu-modal-body::-webkit-scrollbar-thumb { background: #cbd5e1; border-radius: 10px; }


// AdminProfile CSS

.jcp-root { background: var(--jc-cloud); min-height: 100vh; padding: 40px 20px; }
.jcp-container { max-width: 900px; margin: 0 auto; }

.jcp-header { text-align: center; margin-bottom: 40px; }
.jcp-badge { 
    width: 70px; height: 70px; background: var(--jc-navy); 
    border-radius: 20px; display: flex; align-items: center; 
    justify-content: center; margin: 0 auto 15px; 
}
.jcp-header h2 { font-family: 'Raleway', sans-serif; color: var(--jc-navy); font-size: 2rem; }
.jcp-header p { color: var(--jc-txt-sec); }

.jcp-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 24px; }
@media (max-width: 768px) { .jcp-grid { grid-template-columns: 1fr; } }

.jcp-card { 
    background: #fff; border: 1.5px solid var(--jc-divider); 
    border-radius: 16px; padding: 24px; 
    box-shadow: 0 4px 12px rgba(0,0,0,0.05);
}
.jcp-card-head { display: flex; align-items: center; gap: 10px; margin-bottom: 20px; color: var(--jc-navy); }
.jcp-card-head h3 { font-size: 1.1rem; font-weight: 700; margin: 0; }

.jcp-input-group { margin-bottom: 15px; }
.jcp-input-group label { display: block; font-size: 0.85rem; font-weight: 600; color: var(--jc-txt-sec); margin-bottom: 6px; }
.jcp-input-group input { 
    width: 100%; padding: 10px; border: 1.5px solid var(--jc-divider); 
    border-radius: 8px; outline: none; transition: 0.2s;
}
.jcp-input-group input:focus { border-color: var(--jc-accent); }
.jcp-input-group input:disabled { background: var(--jc-cloud); cursor: not-allowed; }

.jcp-role-chip { 
    display: inline-block; padding: 4px 12px; background: var(--jc-mist); 
    color: var(--jc-steel); border-radius: 20px; font-size: 0.75rem; font-weight: 700; 
}

.jcp-alert { padding: 12px; border-radius: 8px; margin-bottom: 20px; font-size: 0.9rem; text-align: center; }
.jcp-alert.success { background: #dcfce7; color: #166534; border: 1px solid #bbf7d0; }
.jcp-alert.error { background: #fee2e2; color: #991b1b; border: 1px solid #fecaca; }
    
`;

export default globalCSS;