import React from "react";
import Footer from "../components/Footer";
import { Helmet } from "react-helmet-async";
import { AwardIcon, Building2, ChartColumnIncreasingIcon, CircleCheckBig, HandshakeIcon, RocketIcon, Stars, TextAlignCenter, Users } from "lucide-react";
import { GiStarShuriken } from "react-icons/gi";



const mission = [
  "To be a preferred recruitment partner for corporates and job seekers.",
  "To provide quality talent through structured assessment and screening.",
  "To build long-term relationships based on trust, transparency, and performance.",
  "To create career opportunities that align passion with profession.",
];

const usp = [
  { text: "Experienced and dedicated recruitment professionals" },
  { text: "Strong database of skilled and untapped talent" },
  { text: "Accurate candidate screening including soft skill assessment" },
  { text: "Replacement guarantee (if candidate leaves within agreed period)" },
  { text: "End-to-end hiring support with minimal hassle" },
  { text: "Timely delivery of hiring mandates" },
  { text: "Transparent communication throughout the process" },
  { text: "Reducing your recruitment overhead by providing pre-vetted candidates that fit your budget and timeline." },
  {text : "Offering expert advice on Pune’s local market trends, salary benchmarks, and talent availability."},
];

export default function About() {
  return (
    <>
      <Helmet>
        <title>About Us | Our Mission to Bridge the Talent Gap</title>
        <meta name="description" content="Learn about our journey as a premier job consultancy. We connect high-potential talent with industry-leading organizations." />
      </Helmet>

      <div className="jca-root" id="about">

        {/* ── HERO ── */}
        <section className="jca-hero">
          <div className="jca-hero-inner">
            <div className="jca-hero-chip">✦ About Us</div>
            <h1 style={{color:'#d0def3'}}><span>JobChoice</span> Consulting </h1>
            <p className="jca-hero-desc">
              JobChoice Consulting is a professional recruitment and placement firm specializing in
              permanent, contract, and temporary staffing solutions across India.
              Founded with a vision to bridge the gap between talented professionals and top organizations,
              we serve industries including IT, BPO, KPO, Banking, Finance, Manufacturing, Media,
              and other emerging sectors.
            </p>
            <p className="jca-hero-desc">
              We believe that the right talent is the backbone of every successful organization. Our
              expertise lies in accurate candidate mapping, detailed assessment, and delivering the right
              opportunity at the right time.
            </p>
            <p className="jca-hero-desc">At JobChoice Consulting, our focus is simple:</p>
            <div className="jca-tagline" >Right Candidate. Right Company. Right Time.</div>
            <p className="jca-hero-desc" style={{ marginTop: "20px", marginBottom: 0 }}>
              We are committed to delivering consistent performance, transparent processes, and long-term
              value to both clients and candidates. Our major strength lies in our people, our growing
              database of skilled professionals, and our dedication to ethical recruitment practices.
            </p>
          </div>
        </section>

        {/* ── STATS ── */}
        
        {/* ── ABOUT + VISION ── */}
    <section className="jca-vision-section">
    <div className="jca-container">
      <div className="jca-vision-flex">
        
        {/* Left Side: Image */}
        <div className="jca-vision-image">
          <img 
            src="https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg" 
            alt="Our Vision" 
          />
          <div className="jca-image-overlay"></div>
        </div>

        {/* Right Side: Text Content */}
        <div className="jca-vision-content">
          <div className="jca-vision-label">Future Focused</div>
          <h2>Our <span>Vision</span></h2>
          <p className="jca-main-para">
            To become a trusted and customer-centric recruitment partner by delivering 
            excellence through our people, processes, and strategies.
          </p>
          <ul className="jca-vision-list">
            <li><Stars size={18} className="text-primary"/> Excellence in people</li>
            <li><RocketIcon size={18} className="text-primary"/> Strategic Processes</li>
            <li><HandshakeIcon size={18} className="text-primary"/> Customer-Centric Approach</li>
          </ul>
        </div>

    </div>
  </div>
</section>
        {/* ── MISSION ── */}
        <section className="jca-mission-section">
          <div className="jca-mission-inner">
            <div className="jca-mission-header">
          
              <h2>Our Mission</h2>
              <p>To be a preferred recruitment partner — built on trust, quality, and long-term value.</p>
            </div>
            <div className="jca-mission-grid">
              {mission.map((m, i) => (
                <div key={i} className="jca-mission-item">
                  <div className="jca-mission-dot" />
                  <p>{m}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── USP ── */}
        <section className="jca-usp-section">
          <div className="jca-usp-inner">
            <div className="jca-usp-header">
              <h2>Why Hire Through JobChoice Consulting?</h2>
              <p>In a competitive recruitment market, JobChoice Consulting stands apart because:</p>
            </div>
            <div className="jca-usp-grid">
              {usp.map((u, i) => (
                <div key={i} className="jca-usp-item">
                  <div className="jca-usp-icon"><CircleCheckBig size={18} style={{color:"#00aeff"}} /></div>
                  <p>{u.text}</p>
                </div>
              ))}
            </div>
            <div className="jca-usp-tagline">
              <p>Our promise to every client and candidate —</p>
              <strong>We don't just fill positions — <em>We build successful professional relationships.</em></strong>
            </div>
          </div>
        </section>

        <Footer />
      </div>
    </>
  );
}