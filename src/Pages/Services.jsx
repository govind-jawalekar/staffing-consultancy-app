/**
 * Services page — standalone route for /services.
 * Displays technical and non-technical service cards.
 */
import React from "react";
import { useNavigate } from "react-router-dom";
import Footer from "../components/Footer";
import { Helmet } from "react-helmet-async";


/**
 * Services page — JobChoice Consulting
 * Alternating image + content sections, no accordion
 */


const services = [
  
  { 
    id:"placement", 
    title: "Career Placement Services",
    subtitle: "For Candidates",
    desc: "We support job seekers in finding the right career opportunities. Our goal is to align passion with profession.",
    image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&q=80",
    points: ["Career counseling","Resume screening & guidance","Interview preparation","Placement assistance","Industry exposure support"],
  },
  {
    id:"training", 
    title: "Corporate Training & IT Skill Development",
    subtitle: "Customized Training Programs",
    desc: "Customized corporate training programs designed to enhance productivity, technical skills, and overall workforce performance.",
    image: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=800&q=80",
    subsections: [
      { label: "Soft Skills & Professional Development", items: ["Communication & Presentation Skills","Workplace Readiness","Leadership & Team Management","Personality Development","Corporate Etiquette"] },
      { label: "IT & Technical Training", items: ["Full Stack Development","MERN / MEAN Stack","Java & Python Development","Frontend & Backend Technologies","Database & Cloud Fundamentals"] },
      { label: "Campus-to-Corporate Programs", items: ["Final year student training","Industry-oriented bootcamps","Placement readiness programs"] },
    ],
  },
  {
    id:"recruitment", 
    title: "Permanent Recruitment",
    subtitle: "Direct Placement",
    desc: "We specialize in full-time hiring across various industries — ensuring quality hiring with minimal risk and maximum efficiency.",
    image: "https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=800&q=80",
    points: ["Role-specific talent sourcing","Pre-screened and assessed candidates","Soft-skill evaluation","Interview coordination","Replacement support (as per agreement)","Faster turnaround time"],
  },

  {
    id:"staffing", 
    title: "Contract Staffing",
    subtitle: "Flexible Workforce Solutions",
    desc: "For businesses requiring workforce flexibility, we provide skilled professionals on a contract basis — scale teams without long-term obligations.",
    image: "https://images.unsplash.com/photo-1553877522-43269d4ea984?w=800&q=80",
    points: ["Short-term & long-term contracts","Project-based hiring","Immediate deployment","Flexible workforce solutions"],
  },
  {
    id:"payroll", 
    title: "Payroll Staffing",
    subtitle: "Employees on Our Payroll",
    desc: "Complete payroll management solutions for organizations that prefer third-party payroll. You manage performance — we manage employment responsibilities.",
    image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&q=80",
    points: ["Employees hired under JobChoice Consulting payroll","Salary processing","Statutory compliance management","Offer letters & documentation","Attendance & payroll coordination","HR support & formalities handling"],
  },
  {
    id:"bulkhiring", 
    title: "Vendor Management & Bulk Hiring",
    subtitle: "Your Long-Term Hiring Partner",
    desc: "We act as a trusted recruitment vendor for organizations with high-volume or ongoing hiring needs. We become your long-term hiring partner.",
    image: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=800&q=80",
    points: ["Mass hiring drives","Campus recruitment support","Multi-location hiring","Dedicated recruitment team","Continuous hiring support","Faster mandate closure"],
  },
  {
    id:"executive", 
    title: "Executive & Mid-Level Hiring",
    subtitle: "Leadership & Managerial Roles",
    desc: "We assist in recruiting supervisory, managerial, and leadership roles with a strategic and confidential approach.",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&q=80",
    points: ["Detailed candidate profiling","Industry mapping","Background verification (if required)","Confidential hiring process","Strategic talent acquisition"],
  },
];

export default function Services() {
  const navigate=useNavigate();

  return (
    <>
      <Helmet>
        <title>Our Services | Placement , Training & Corporate Hiring</title>
        <meta name="description" content="Professional recruitment services including ATS resume building, interview coaching for freshers, and bulk hiring for companies." />
      </Helmet>
    
    <div className="jcs-root" id="services">
     

      {/* ── HERO ── */}
      <section className="jcs-hero">
        <div className="jcs-hero-chip">✦ Our Services</div>
        <h1>End-to-End <span>Recruitment Solutions</span></h1>
        <p>
          At JobChoice Consulting, we provide end-to-end recruitment, staffing, payroll, and
          corporate training solutions across multiple industries — delivering the right talent,
          at the right time, with the right strategy.
        </p>
      </section>

      {/* ── SERVICE SECTIONS ── */}
      {services.map((svc, i) => (
        <React.Fragment key={i}>
          <div style={{ background: i % 2 !== 0 ? "var(--jc-cloud)" : "var(--jc-white)" }} id={svc.id}>
            <div className={`jcs-svc-wrap${i % 2 !== 0 ? " alt" : ""}`}>

              {/* Image */}
              <div className="jcs-img-wrap">
                <img src={svc.image} alt={svc.title} loading="lazy" />
                <div className="jcs-img-overlay" />
              </div>
             

              {/* Content */}
              <div className="jcs-content">
                <div className="jcs-content-label">{svc.subtitle}</div>
                <h2>{svc.title}</h2>
                <p className="jcs-content-desc">{svc.desc}</p>

                {svc.points && (
                  <ul className="jcs-points">
                    {svc.points.map((pt, j) => <li key={j}>{pt}</li>)}
                  </ul>
                )}

                {svc.subsections && (
                  <div className="jcs-subsections">
                    {svc.subsections.map((sub, j) => (
                      <div key={j}>
                        <div className="jcs-sub-label">{sub.label}</div>
                        <ul className="jcs-points">
                          {sub.items.map((item, k) => <li key={k}>{item}</li>)}
                        </ul>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
            
          </div>
          

          {/* Thin separator between sections */}
          {i < services.length - 1 && (
            <div className="jcs-sep-wrap" style={{ background: i % 2 !== 0 ? "var(--jc-cloud)" : "var(--jc-white)" }}>
              <div className="jcs-sep" />
            </div>
          )}
        </React.Fragment>
      ))}

      {/* ── CTA ── */}
      <div className="jcs-cta">
        <div className="jcs-cta-box">
          <h3>Ready to Find the Right Talent?</h3>
          <p>
            Let JobChoice Consulting be your trusted recruitment partner. Explore open
            opportunities or get in touch with our team today.
          </p>
           <button className="jcs-cta-btn" onClick={() => navigate("/jobs")}>
            View Job Opportunities →
          </button>
           
         
        </div>
      </div>

      <Footer/>
    </div>
  </>
  );
}