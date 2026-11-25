import React, { useState, useEffect } from "react";

function FloatingButtons() {
  const WA_NUMBER = "918999571951";
  const WA_MESSAGE = "Hello! I found you through your website and would like to know more.";
  const url = `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(WA_MESSAGE)}`;

  // --- Sub-Component: WhatsApp Button ---
  const WhatsAppButton = () => (
    <a
      href={url}
      className="jc-wa-btn"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with us on WhatsApp"
      title="Chat on WhatsApp"
    >
      <svg viewBox="0 0 32 32">
        <path
          fill="#fff"
          d="M16 .5C7.439.5.5 7.439.5 16c0 2.777.725 5.385 1.993 7.648L.5 31.5l8.09-2.118A15.435 15.435 0 0016 31.5C24.561 31.5 31.5 24.561 31.5 16S24.561.5 16 .5zm0 28.276a13.16 13.16 0 01-6.713-1.836l-.482-.286-4.797 1.256 1.279-4.675-.315-.5A13.18 13.18 0 012.724 16C2.724 9.153 8.153 3.724 16 3.724S29.276 9.153 29.276 16 23.847 28.776 16 28.776zm7.229-9.875c-.396-.198-2.344-1.157-2.708-1.288-.364-.132-.628-.198-.892.198-.264.396-1.024 1.288-1.255 1.552-.231.264-.462.297-.858.099-.396-.198-1.671-.616-3.183-1.963-1.176-1.049-1.97-2.344-2.201-2.74-.231-.396-.025-.61.173-.807.178-.177.396-.462.594-.693.198-.231.264-.396.396-.66.132-.264.066-.495-.033-.693-.099-.198-.892-2.15-1.222-2.944-.322-.773-.648-.668-.892-.68-.231-.011-.495-.014-.759-.014s-.693.099-1.057.495c-.364.396-1.387 1.354-1.387 3.302s1.42 3.83 1.618 4.094c.198.264 2.794 4.265 6.769 5.983.946.408 1.683.652 2.258.834.949.302 1.813.259 2.496.157.761-.113 2.344-.958 2.676-1.883.33-.924.33-1.717.231-1.881-.099-.165-.363-.264-.759-.462z"
        />
      </svg>
    </a>
  );

  // --- Sub-Component: Scroll To Top Button ---
  const ScrollToTop = () => {
    const [visible, setVisible] = useState(false);

    useEffect(() => {
      const onScroll = () => {
        const scrolled = window.scrollY;
        // Button appears after scrolling 300px (standard UX)
        setVisible(scrolled > 500);
      };
      window.addEventListener("scroll", onScroll, { passive: true });
      return () => window.removeEventListener("scroll", onScroll);
    }, []);

    const scrollUp = () => window.scrollTo({ top: 0, behavior: "smooth" });

    return (
      <button
        className={`jc-scroll-top${visible ? " jc-scroll-top--visible" : ""}`}
        onClick={scrollUp}
        aria-label="Scroll to top"
        title="Back to top"
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="18 15 12 9 6 15" />
        </svg>
      </button>
    );
  };

  return (
    <>
      {/* Inject Styles */}
      <style>{`
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
        .jc-wa-btn svg { width: 32px; height: 32px; }
        @keyframes jcWaPulse {
          0%, 100% { box-shadow: 0 6px 22px rgba(37, 211, 102, 0.45); }
          50% { box-shadow: 0 6px 32px rgba(37, 211, 102, 0.75), 0 0 0 8px rgba(37, 211, 102, 0.12); }
        }

        .jc-scroll-top {
          position: fixed;
          bottom: 100px; /* Positioned above the WA button */
          right: 34px;
          width: 46px;
          height: 46px;
          background: linear-gradient(135deg, #1E4A6E 0%, #2D6A96 100%);
          border: none;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 4px 16px rgba(18, 38, 63, 0.35);
          cursor: pointer;
          z-index: 9998;
          opacity: 0;
          transform: translateY(16px);
          pointer-events: none;
          transition: opacity 0.3s ease, transform 0.3s ease, box-shadow 0.25s ease;
        }
        .jc-scroll-top--visible {
          opacity: 1;
          transform: translateY(0);
          pointer-events: auto;
        }
        .jc-scroll-top:hover {
          background: linear-gradient(135deg, #12263F 0%, #1E4A6E 100%);
          box-shadow: 0 8px 24px rgba(18, 38, 63, 0.45);
          transform: translateY(-3px);
        }
        .jc-scroll-top svg { width: 22px; height: 22px; }

        @media (max-width: 600px) {
          .jc-wa-btn { width: 50px; height: 50px; bottom: 20px; right: 20px; }
          .jc-wa-btn svg { width: 27px; height: 27px; }
          .jc-scroll-top { width: 40px; height: 40px; bottom: 82px; right: 22px; }
          .jc-scroll-top svg { width: 19px; height: 19px; }
        }
      `}</style>

      {/* Render Buttons */}
      <WhatsAppButton />
      <ScrollToTop />
    </>
  );
}

export default FloatingButtons;