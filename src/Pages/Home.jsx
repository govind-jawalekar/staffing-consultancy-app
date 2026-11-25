import react,{ useEffect, useRef, useState } from "react";
import HeroSlider from "../components/HeroSlider";
import TestimonialsSection from "../components/TestimonialSection";
import Footer from "../components/Footer";
import { useNavigate } from "react-router-dom";
import { clients } from "../components/Clients_Data";
import {
  Award, Briefcase, Building2, ChartColumnIncreasingIcon,
  ClipboardList, Clock, DollarSign, GraduationCap,
  Handshake, RecycleIcon, TargetIcon, UserCheck2Icon, Users,
} from "lucide-react";
import { Helmet } from "react-helmet-async";

function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll(".reveal");
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => {
        if (e.isIntersecting) e.target.classList.add("visible");
      }),
      { threshold: 0.1 }
    );
    els.forEach((el) => { el.classList.remove("visible"); obs.observe(el); });
    return () => obs.disconnect();
  }, []);
}

const stats = [
  { icon: <Users size={30} className="text-primary" />,                     num: "100+", label: "Job Seekers Placed" },
  { icon: <Building2 size={30} className="text-primary" />,                 num: "500+",    label: "Partner Companies" },
  { icon: <Award size={30} className="text-primary" />,                     num: "5+",     label: "Years of Experience" },
  { icon: <ChartColumnIncreasingIcon size={30} className="text-primary" />, num: "92%",     label: "Success Rate" },
];

const services = [
  { icon: <TargetIcon size={30} className="text-primary" />,    label: "Career Placement Services (For Candidates)",  desc: "We support job seekers in finding the right career opportunities. Our goal is to align passion with profession." },
  { icon: <GraduationCap size={40} className="text-primary" />, label: "Corporate Training & IT Skill Development",   desc: "We provide customized corporate training programs designed to enhance productivity, technical skills, and overall workforce performance." },
  { icon: <Handshake size={40} className="text-primary" />,     label: "Permanent Recruitment (Direct Placement)",    desc: "We specialize in full-time hiring across various industries. We ensure quality hiring with minimal risk and maximum efficiency." },
  { icon: <ClipboardList size={40} className="text-primary" />, label: "Contract Staffing",                           desc: "For businesses requiring workforce flexibility, we provide skilled professionals on a contract basis." },
  { icon: <DollarSign size={30} className="text-primary" />,    label: "Payroll Staffing (Employees on Our Payroll)", desc: "If organizations prefer employees to be on third-party payroll, we offer complete payroll management solutions." },
  { icon: <Building2 size={30} className="text-primary" />,     label: "Vendor Management & Bulk Hiring",             desc: "We act as a trusted recruitment vendor for organizations with high-volume or ongoing hiring needs." },
  { icon: <Briefcase size={30} className="text-primary" />,     label: "Executive & Mid-Level Hiring",                desc: "We assist in recruiting supervisory, managerial, and leadership roles." },
];

const whyCards = [
  { icon: <Award size={40} className="text-primary" />,          title: "Experienced Professionals",   desc: "Experienced and dedicated recruitment professionals" },
  { icon: <GraduationCap size={40} className="text-primary" />,  title: "Strong Talent Database",       desc: "Strong database of skilled and untapped talent" },
  { icon: <UserCheck2Icon size={40} className="text-primary" />, title: "Accurate Candidate Screening", desc: "Accurate candidate screening including soft skill assessment" },
  { icon: <RecycleIcon size={40} className="text-primary" />,    title: "Replacement Guarantee",        desc: "Replacement guarantee (if candidate leaves within agreed period)" },
  { icon: <Handshake size={40} className="text-primary" />,      title: "End-to-End Hiring Support",    desc: "End-to-end hiring support with minimal hassle" },
  { icon: <Clock size={40} className="text-primary" />,          title: "Timely Delivery",              desc: "Timely delivery of hiring mandates" },
];

export default function Home() {
  useReveal();
  const navigate = useNavigate();

  /* ─────────────────────────────────────────────────────────────
     INFINITE CENTRE-SNAP CAROUSEL
     Strategy: render  [clones-B | real cards | clones-A]
       - Start scrolled to the first real card (offset = REAL_COUNT)
       - Auto-advance through real cards, then seamlessly into clones-A
       - When a clone-A card comes into view, silently jump to the
         matching real card — user never sees the seam
  ───────────────────────────────────────────────────────────── */
  const REAL_COUNT  = services.length;
  // We render: REAL_COUNT clones at start + REAL_COUNT real + REAL_COUNT clones at end
  // Absolute index of first REAL card = REAL_COUNT
  const OFFSET      = REAL_COUNT;

  const scrollRef   = useRef(null);
  const idxRef      = useRef(OFFSET);   // starts pointing at first real card
  const intervalRef = useRef(null);
  const isTeleporting = useRef(false);  // suppress checkScroll during silent jump
  const [activeIndex, setActiveIndex] = useState(0); // 0-based real index for dots

  /* ── Centre a card by absolute index (includes clones) ── */
  const scrollToCard = (absIdx, el, smooth = true) => {
    const track = el || scrollRef.current;
    if (!track) return;
    const cards = track.querySelectorAll(".jch-svc-card");
    if (!cards[absIdx]) return;
    const card   = cards[absIdx];
    const trackW = track.offsetWidth;
    const cardW  = card.offsetWidth;
    track.scrollTo({
      left: card.offsetLeft - (trackW - cardW) / 2,
      behavior: smooth ? "smooth" : "instant",
    });
  };

  /* ── Silently jump from a clone back to the matching real card ── */
  const teleportToReal = (absIdx, el) => {
    const realAbs = ((absIdx - OFFSET) % REAL_COUNT + REAL_COUNT) % REAL_COUNT + OFFSET;
    isTeleporting.current = true;
    scrollToCard(realAbs, el, false);
   idxRef.current = realAbs - 1;  // e.g. sets to 6 (OFFSET - 1)
// Next tick: 6 + 1 = 7 = OFFSET → card 0 gets focus correctly ✅
    // Allow checkScroll again after browser has painted the new position
    requestAnimationFrame(() => {
      requestAnimationFrame(() => { isTeleporting.current = false; });
    });
  };

  /* ── On manual scroll: update active dot + handle edge teleport ── */
  const checkScroll = () => {
    if (isTeleporting.current) return;
    const el = scrollRef.current;
    if (!el) return;

    const cards   = el.querySelectorAll(".jch-svc-card");
    const midView = el.scrollLeft + el.offsetWidth / 2;
    let closest = 0, minDist = Infinity;
    cards.forEach((card, i) => {
      const dist = Math.abs(card.offsetLeft + card.offsetWidth / 2 - midView);
      if (dist < minDist) { minDist = dist; closest = i; }
    });

    idxRef.current = closest;

    // If user manually scrolled into a clone zone, teleport back
    const isInCloneBefore = closest < OFFSET;
    const isInCloneAfter  = closest >= OFFSET + REAL_COUNT;
    if (isInCloneBefore || isInCloneAfter) {
      teleportToReal(closest, el);
      return;
    }

    setActiveIndex(closest - OFFSET);
  };

  /* ── Auto-advance every 3.5 s ── */
  const startInterval = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      const el = scrollRef.current;
      if (!el) return;

      const next = idxRef.current + 1;
      idxRef.current = next;

      // If we just entered the after-clones zone, scroll smoothly to clone
      // (user sees continuous motion), then teleport to real card
      const isInCloneAfter = next >= OFFSET + REAL_COUNT;

      scrollToCard(next, el, true);
      setActiveIndex((next - OFFSET) % REAL_COUNT);

      if (isInCloneAfter) {
        // Wait for smooth scroll to finish (~400 ms), then silently jump back
        setTimeout(() => teleportToReal(next, el), 0);
      }
    }, 3500);
  };

  const pauseInterval = () => clearInterval(intervalRef.current);

  /* ── On mount: jump to first real card without animation ── */
  useEffect(() => {
    const el = scrollRef.current;
    if (el) scrollToCard(OFFSET, el, false);
    startInterval();
    return () => clearInterval(intervalRef.current);
  }, []);

  // startInterval + mount scroll handled in the useEffect inside scroll logic block

  return (
    <>
      <Helmet>
        <title>JobChoice Consultancy | Job Consultancy for Freshers & Professionals</title>
        <meta name="description" content="Leading job consultancy providing placement services for freshers and experienced candidates. Partner with us for expert hiring solutions." />
        <meta name="keywords" content="job consultancy, hiring freshers, recruitment agency, corporate staffing" />
      </Helmet>

      <div className="jch-root" id="home">

        {/* ── HERO SLIDER ── */}
        <HeroSlider navigate={navigate} />

        {/* ── ABOUT / STATS ── */}
        <section className="jch-about">
          <div className="jch-section-label reveal">Who We Are</div>
          <h2 className="jch-section-title reveal">JobChoice Consulting</h2>
          <p className="jch-section-sub reveal">
            A leading recruitment and placement firm dedicated to connecting talented professionals
            with their dream careers across India's top companies.
          </p>
          <div className="jch-stats-grid">
            {stats.map((s, i) => (
              <div key={i} className={`jch-stat-card reveal reveal-d${i}`}>
                <div className="jch-stat-icon">{s.icon}</div>
                <div className="jch-stat-num">{s.num}</div>
                <div className="jch-stat-label">{s.label}</div>
              </div>
            ))}
          </div>
        </section>

        {/* ── MISSION ── */}
        <div style={{ background: "var(--jc-white)" }}>
          <div className="jch-mission">
            <div className="reveal">
              <div className="jch-section-label" style={{ justifyContent: "flex-start" }}>Our Mission</div>
              <h2>Bridging Talent &amp; Opportunity</h2>
              <p>
                At JobChoice Consulting, we believe everyone deserves a fulfilling career.
                Our mission is to bridge the gap between talented individuals and organizations
                seeking exceptional talent.
              </p>
              <p>
                We provide comprehensive career services including job placement, career counseling,
                resume building, and interview preparation to ensure your success in the competitive job market.
              </p>
              <p style={{ fontFamily: "'Raleway', sans-serif", fontWeight: 800, fontStyle: "italic", color: "var(--jc-accent)", marginBottom: 0, fontSize: "0.97rem" }}>
                Right Candidate. Right Company. Right Time.
              </p>
            </div>
            <div className="jch-mission-img reveal reveal-d1">
              <img src="https://images.pexels.com/photos/5439379/pexels-photo-5439379.jpeg" alt="Our Mission – Helping professionals build successful careers." />
            </div>
          </div>
        </div>

        {/* ── SERVICES — CENTRE-SNAP SCROLL ── */}
        <section className="jch-services">
          <div className="jch-services-header">
            <div className="jch-services-header-left">
              <div className="jch-services-label">What We Offer</div>
              <h2>Our <span>Services</span></h2>
              <p className="jch-services-sub">End-to-end recruitment, staffing &amp; training solutions</p>
            </div>
          </div>

          <div className="jch-svc-track-wrap">
            <div
              className="jch-svc-track"
              ref={scrollRef}
              onScroll={checkScroll}
              onMouseEnter={pauseInterval}
              onMouseLeave={startInterval}
              onTouchStart={pauseInterval}
              onTouchEnd={startInterval}
            >
              {/* 3 sets: [clones-before | real cards | clones-after] */}
              {[...services, ...services, ...services].map((svc, i) => {
                const realIdx  = (i - OFFSET + REAL_COUNT * 10) % REAL_COUNT;
                const isReal   = i >= OFFSET && i < OFFSET + REAL_COUNT;
                const isActive = isReal && activeIndex === (i - OFFSET);
                return (
                  <div
                    key={i}
                    className={`jch-svc-card${isActive ? " active" : ""}`}
                    onClick={() => {
                      const absIdx = isReal ? i : OFFSET + realIdx;
                      idxRef.current = absIdx;
                      setActiveIndex(realIdx);
                      scrollToCard(absIdx);
                      startInterval();
                    }}
                  >
                    <div className="jch-svc-icon-wrap">{svc.icon}</div>
                    <h4>{svc.label}</h4>
                    <p>{svc.desc}</p>
                    <button
                      className="jch-svc-link"
                      onClick={(e) => { e.stopPropagation(); navigate("/services"); }}
                    >
                      Learn More →
                    </button>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Dot indicators */}
          <div className="jch-svc-dots">
            {services.map((_, i) => (
              <button
                key={i}
                className={`jch-svc-dot${activeIndex === i ? " active" : ""}`}
                onClick={() => {
                  const absIdx = OFFSET + i;
                  idxRef.current = absIdx;
                  setActiveIndex(i);
                  scrollToCard(absIdx);
                  startInterval();
                }}
              />
            ))}
          </div>

          <div className="jch-svc-cta">
            <button className="jch-svc-cta-btn" onClick={() => navigate("/services")}>
              View All Services →
            </button>
          </div>
        </section>

        {/* ── OUR CLIENTS ── */}
        <section className="jch-clients">
          <div className="jch-clients-header">
            <div className="jch-section-label reveal">Our Clients</div>
            <h2 className="jch-section-title reveal">Trusted by Leading Companies</h2>
            <p className="jch-section-sub reveal" style={{ marginBottom: 0 }}>
              We are proud to partner with some of India's top organisations across industries.
            </p>
          </div>
          <div className="jch-clients-marquee">
            <div className="jch-clients-track">
              {[...clients, ...clients].map((c, i) => (
                <div key={i} className="jch-client-logo">
                  <div className="jch-client-logo-img">
                    <img src={c.logo} alt={c.name} />
                  </div>

                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── WHY US ── */}
        <section className="jch-why">
          <div className="jch-section-label reveal">Why Choose Us</div>
          <h2 className="jch-section-title reveal">Why Choose JobChoice Consulting?</h2>
          <p className="jch-section-sub reveal">
            We provide unmatched service and support to help you achieve your career goals.
          </p>
          <div className="jch-why-grid">
            {whyCards.map((w, i) => (
              <div key={i} className={`jch-why-card reveal reveal-d${i % 3}`}>
                <div className="jch-why-icon">{w.icon}</div>
                <h4>{w.title}</h4>
                <p>{w.desc}</p>
              </div>
            ))}
          </div>
        </section>

        <TestimonialsSection />
        <Footer navigate={navigate} />
      </div>
    </>
  );
}