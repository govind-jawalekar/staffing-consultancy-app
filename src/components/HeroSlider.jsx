import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import React from "react";

const slides = [
  {
    bg: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1600&q=80",
    chip: "Career Opportunities",
    title: "Find Your Dream Career",
    sub: "Connect with top companies and unlock opportunities tailored to your skills.",
    btn: "Explore Jobs",
    to: "/jobs",
    ghost: "Learn More",
    ghostTo: "/about",
  },
  {
    bg: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=1600&q=80",
    chip: "10,000+ Professionals",
    title: "Launch Your Career Today",
    sub: "Join thousands of professionals who found their dream job through JobChoice Consulting.",
    btn: "Get Started",
    to: "/signup",
    ghost: "Our Services",
    ghostTo: "/services",
  },
  {
    bg: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=1600&q=80",
    chip: "Expert Guidance",
    title: "Expert Career Guidance",
    sub: "Personalized support from industry professionals every step of the way.",
    btn: "Our Services",
    to: "/services",
    ghost: "Contact Us",
    ghostTo: "/contact",
  },
];

export default function HeroSlider() {
  const navigate = useNavigate();
  const [cur, setCur] = useState(0);
  const timerRef = useRef(null);

  const go = (n) => setCur((n + slides.length) % slides.length);

  useEffect(() => {
    timerRef.current = setInterval(() => go(cur + 1), 4500);
    return () => clearInterval(timerRef.current);
  }, [cur]);

  // Touch / swipe support
  const touchStartX = useRef(null);
  const handleTouchStart = (e) => { touchStartX.current = e.touches[0].clientX; };
  const handleTouchEnd = (e) => {
    if (touchStartX.current === null) return;
    const diff = touchStartX.current - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 40) go(cur + (diff > 0 ? 1 : -1));
    touchStartX.current = null;
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Raleway:wght@700;800&family=Lato:wght@400;600;700&display=swap');

        :root {
          --jc-navy:   #12263F;
          --jc-steel:  #1E4A6E;
          --jc-sky:    #2D6A96;
          --jc-accent: #3A8FB5;
          --jc-mist:   #E8F1F8;
          --jc-white:  #FFFFFF;
        }

        /* ── Slider shell ── */
        .hero-slider {
          position: relative;
          height: 580px;
          overflow: hidden;
        }

        /* ── Slides ── */
        .slide {
          position: absolute; inset: 0;
          opacity: 0; transition: opacity .8s ease;
          display: flex; align-items: center; justify-content: center;
          flex-direction: column; text-align: center;
          background-size: cover; background-position: center;
        }
        .slide.active { opacity: 1; }

        /* Navy-to-sky gradient overlay */
        .slide-overlay {
          position: absolute; inset: 0;
          background: linear-gradient(
            160deg,
            rgba(18,38,63,0.75) 0%,
            rgba(30,74,110,0.58) 55%,
            rgba(45,106,150,0.42) 100%
          );
        }

        /* ── Slide content ── */
        .slide-content {
          position: relative; z-index: 2;
          padding: 0 40px; max-width: 820px;
          width: 100%; margin: 0 auto;
        }

        /* Chip label */
        .slide-chip {
          display: inline-block;
          background: rgba(58,143,181,0.25);
          border: 1px solid rgba(58,143,181,0.55);
          color: var(--jc-mist);
          font-family: 'Lato', sans-serif;
          font-size: 0.75rem; font-weight: 700;
          letter-spacing: 0.12em; text-transform: uppercase;
          padding: 5px 14px; border-radius: 20px;
          margin-bottom: 18px; backdrop-filter: blur(4px);
        }

        .slide-content h1 {
          font-family: 'Raleway', sans-serif;
          font-size: clamp(1.7rem, 5vw, 3.6rem); font-weight: 800;
          color: var(--jc-white); line-height: 1.1; letter-spacing: -0.5px;
          margin-bottom: 16px; text-shadow: 0 2px 16px rgba(18,38,63,0.4);
        }

        .slide-content p {
          font-family: 'Lato', sans-serif;
          font-size: clamp(0.9rem, 2vw, 1.05rem);
          color: rgba(232,241,248,0.90); margin-bottom: 34px;
          line-height: 1.65; max-width: 560px;
          margin-left: auto; margin-right: auto;
        }

        .slide-btns {
          display: flex; align-items: center;
          justify-content: center; gap: 14px; flex-wrap: wrap;
        }

        /* Primary CTA */
        .hero-btn {
          background: linear-gradient(135deg, var(--jc-steel) 0%, var(--jc-sky) 100%);
          color: var(--jc-white); border: none;
          padding: 13px 36px; border-radius: 8px;
          font-family: 'Lato', sans-serif; font-size: 1rem; font-weight: 700;
          letter-spacing: 0.03em; cursor: pointer;
          box-shadow: 0 4px 20px rgba(18,38,63,0.45);
          transition: transform .2s, box-shadow .2s, opacity .2s;
        }
        .hero-btn:hover { transform: translateY(-2px); box-shadow: 0 8px 28px rgba(18,38,63,0.55); opacity: 0.92; }

        /* Ghost secondary CTA */
        .hero-btn-ghost {
          background: transparent; color: var(--jc-white);
          border: 1.5px solid rgba(255,255,255,0.55);
          padding: 12px 28px; border-radius: 8px;
          font-family: 'Lato', sans-serif; font-size: 1rem; font-weight: 600;
          cursor: pointer; transition: background .2s, border-color .2s;
          backdrop-filter: blur(4px);
        }
        .hero-btn-ghost:hover { background: rgba(255,255,255,0.12); border-color: rgba(255,255,255,0.85); }

        /* ── Arrows ── */
        .slider-arrow {
          position: absolute; top: 50%; transform: translateY(-50%); z-index: 10;
          background: rgba(18,38,63,0.35); backdrop-filter: blur(8px);
          border: 1px solid rgba(58,143,181,0.45); color: var(--jc-white);
          width: 46px; height: 46px; border-radius: 50%;
          font-size: 1.4rem; display: flex; align-items: center; justify-content: center;
          cursor: pointer; transition: background .2s, border-color .2s;
        }
        .slider-arrow:hover { background: rgba(30,74,110,0.65); border-color: rgba(58,143,181,0.85); }
        .slider-prev { left: 24px; }
        .slider-next { right: 24px; }

        /* ── Dots ── */
        .slider-dots {
          position: absolute; bottom: 28px; left: 50%;
          transform: translateX(-50%); display: flex; gap: 8px; z-index: 10;
        }
        .dot {
          width: 8px; height: 8px; border-radius: 50%;
          background: rgba(232,241,248,0.40); cursor: pointer;
          border: none; padding: 0; transition: all .25s;
        }
        .dot.active { background: var(--jc-accent); transform: scale(1.4); box-shadow: 0 0 8px rgba(58,143,181,0.75); }

        /* ── Progress bar ── */
        .slider-progress { position: absolute; bottom: 0; left: 0; height: 3px; background: rgba(18,38,63,0.30); width: 100%; z-index: 10; }
        .slider-progress-bar { height: 100%; background: linear-gradient(90deg, var(--jc-steel), var(--jc-accent)); transition: width 4.5s linear; }

        /* ── Responsive ── */
        @media (max-width: 768px) {
          .hero-slider { height: 480px; }
          .slide-content { padding: 0 24px; }
          .slide-content h1 { margin-bottom: 12px; }
          .slide-content p { margin-bottom: 26px; }
          .hero-btn { padding: 11px 28px; font-size: 0.93rem; }
          .hero-btn-ghost { padding: 10px 20px; font-size: 0.93rem; }
          .slider-arrow { width: 38px; height: 38px; font-size: 1.15rem; }
          .slider-prev { left: 12px; }
          .slider-next { right: 12px; }
        }
        @media (max-width: 480px) {
          .hero-slider { height: 430px; }
          .slide-content { padding: 0 18px; }
          .slide-chip { font-size: 0.68rem; margin-bottom: 12px; }
          .slider-arrow { display: none; }
          .slider-dots { bottom: 18px; gap: 6px; }
          .dot { width: 7px; height: 7px; }
          .hero-btn { width: 100%; max-width: 240px; }
          .hero-btn-ghost { display: none; }
          .slide-btns { flex-direction: column; align-items: center; }
        }
      `}</style>

      <div
        className="hero-slider"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        {slides.map((s, i) => (
          <div
            key={i}
            className={`slide${cur === i ? " active" : ""}`}
            style={{ backgroundImage: `url('${s.bg}')` }}
          >
            <div className="slide-overlay" />
            <div className="slide-content">
              <span className="slide-chip">{s.chip}</span>
              <h1>{s.title}</h1>
              <p>{s.sub}</p>
              <div className="slide-btns">
                <button className="hero-btn" onClick={() => navigate(s.to)}>
                  {s.btn}
                </button>
                <button className="hero-btn-ghost" onClick={() => navigate(s.ghostTo)}>
                  {s.ghost}
                </button>
              </div>
            </div>
          </div>
        ))}

        <button className="slider-arrow slider-prev" onClick={() => go(cur - 1)} aria-label="Previous slide">
          &#8249;
        </button>
        <button className="slider-arrow slider-next" onClick={() => go(cur + 1)} aria-label="Next slide">
          &#8250;
        </button>

        <div className="slider-dots">
          {slides.map((_, i) => (
            <button
              key={i}
              className={`dot${cur === i ? " active" : ""}`}
              onClick={() => setCur(i)}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>

        {/* Progress bar */}
        <div className="slider-progress">
          <div className="slider-progress-bar" key={cur} style={{ width: "100%" }} />
        </div>
      </div>
    </>
  );
}