import { useState, useEffect } from "react";
import React from "react";
import { useNavigate } from "react-router-dom";
import { collection, getDocs,query,where } from "firebase/firestore";
import { db } from "../firebase/firebaseconfig";
import Footer from "../components/Footer";
import { clients } from "../components/Clients_Data";
import { Helmet } from "react-helmet-async";

const AVATAR_COLORS = ["#1E4A6E", "#2D6A96", "#3A8FB5", "#12263F", "#1a5c82", "#245f87"];

export default function Clients() {
  const navigate = useNavigate();
  const [testimonials, setTestimonials] = useState([]);
  const [loadingTesti, setLoadingTesti] = useState(true);

  useEffect(() => {
  const fetchTestimonials = async () => {
    try {
      const reviewsRef = collection(db, "reviews");

      
      // Also filtering by "client" to show the right reviews for this page
      const q = query(
        reviewsRef, 
        where("status", "==", "approved"),
        where("category", "==", "client") 
      );

      const querySnapshot = await getDocs(q);
      
      const data = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));

      // Ensure we don't crash if data is empty, then double for infinite scroll
      if (data.length > 0) {
        setTestimonials([...data, ...data]);
      } else {
        setTestimonials([]);
      }
      
    } catch (error) {
     
      console.error("Error fetching testimonials:", error);
    } finally {
      setLoadingTesti(false);
    }
  };

  fetchTestimonials();
}, []);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add("visible"); });
    }, { threshold: 0.1 });
    document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [testimonials]);

  

  return (
    <>
      <Helmet>
        <title>Corporate Partnerships | JobChoice Consulting</title>
        <meta name="description" content="Our network of corporate partners and executive search services." />
      </Helmet>

      <div className="jccl-root">
        <style>{`
          :root {
            --color-1: #f0fdf4; /* Light Mint */
            --color-2: #eff6ff; /* Light Sky */
            --color-3: #fffbeb; /* Light Gold */
            --color-4: #faf5ff; /* Light Lavender */
          }


          .jccl-root { font-family: 'Raleway', sans-serif; background: #f0f4f8; color: #12263F; overflow-x: hidden; }

          /* ── Hero ── */
          .jccl-hero {
            background: linear-gradient(135deg, #12263F 0%, #1E4A6E 100%);
            padding: 100px 20px 80px;
            text-align: center;
            color: white;
          }

          /* ── Cards Section ── */
          .jccl-cards-section {
            position: relative;
            padding: 70px 0 90px;
            overflow: hidden;
          }


          .jccl-cards-bg {
            position: absolute;
            inset: 0;
            background-image: url('https://images.unsplash.com/photo-1604328698692-f76ea9498e76?w=1600&q=80');
            background-size: cover;
            background-position: center center;
            filter: blur(2px) brightness(0.52) sepia(0.25) saturate(1.2);
            transform: scale(1.03);
            z-index: 0;
          }

          .jccl-cards-overlay {
            position: absolute;
            inset: 0;
            background: linear-gradient(135deg, rgba(40,22,10,0.35) 0%, rgba(60,35,15,0.28) 100%);
            z-index: 1;
          }

          .jccl-cards-title {
            position: relative;
            z-index: 2;
            text-align: center;
            color: rgba(255, 235, 210, 0.92);
            font-size: 0.85rem;
            font-weight: 800;
            letter-spacing: 0.18em;
            text-transform: uppercase;
            margin-bottom: 40px;
            text-shadow: 0 2px 10px rgba(0,0,0,0.5);
          }

          /* ── Grid ── */
          .jccl-grid {
            position: relative;
            z-index: 2;
            display: grid;
            grid-template-columns: repeat(6, 1fr);
            grid-auto-flow: dense; /* This fills in gaps automatically */
            gap: 22px;
            max-width: 1300px;
            margin: 0 auto;
            padding: 0 28px;
          }

          .flip-card {
            background-color: transparent;
            width: 100%;
            height: 150px;
            perspective: 1000px;
            cursor: pointer;
          }
          
          
          /* Row 1: Rectangles (Span 2 columns) 
             Target cards 1, 2, and 3 to fill the 6-column row */
          .flip-card:nth-child(1),
          .flip-card:nth-child(2),
          .flip-child:nth-child(3) {
            grid-column: span 2;
          }
          
          /* Row 2: Squares (Span 1 column)
            Target cards 4 through 9 (6 cards total) to fill the 6-column row */
          .flip-card:nth-child(n+4):nth-child(-n+9) {
            grid-column: span 1;
          }
          
          /* Row 3: Rectangles again
            Target cards 10, 11, and 12 */
          .flip-card:nth-child(n+10):nth-child(-n+12) {
            grid-column: span 2;
          }


          .flip-card-inner {
            position: relative;
            width: 100%;
            height: 100%;
            text-align: center;
            transition: transform 0.8s cubic-bezier(0.4, 0, 0.2, 1);
            transform-style: preserve-3d;
          }

          .flip-card:hover .flip-card-inner { transform: rotateY(180deg); }

          .flip-card-front, .flip-card-back {
            position: absolute;
            width: 100%;
            height: 100%;
            backface-visibility: hidden;
            border-radius: 18px;
            transition: border-color 0.3s, box-shadow 0.3s, transform 0.3s;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            padding: 12px;
          }

          /* ── Solid white front ── */
          .flip-card-front {
            background: #dbf0ff;
            border: 2px solid rgba(210, 175, 130, 0.4);
            box-shadow: 0 4px 6px rgba(0,0,0,0.07), 0 10px 30px rgba(80,45,10,0.18);
          }
          .flip-card:hover .flip-card-front {
            border-color: rgba(180, 120, 50, 0.75);
            box-shadow: 0 8px 12px rgba(0,0,0,0.1), 0 20px 50px rgba(80,45,10,0.28);
            transform: translateY(-4px);
          }

          /* Logo fills the card nicely */
          .flip-card-front img {
            width: 80%;
            height: 75%;
            object-fit: contain;
            display: block;
          }

          /* ── Solid navy back ── */
          .flip-card-back {
            background: linear-gradient(145deg, #12263F 0%, #1a3a5c 50%, #1E4A6E 100%);
            border: 3px solid rgba(130, 162, 210, 0.35);
            color: white;
            transform: rotateY(180deg);
            text-align: left;
            align-items: flex-start;
            box-shadow: 0 10px 30px rgba(0,0,0,0.35);
            padding: 18px;
          }
          .flip-card-back::before {
            content: '';
            position: absolute;
            top: 0; left: 16px; right: 16px;
            height: 3px;
            background: linear-gradient(90deg, rgba(248, 248, 248, 0.8), rgba(255, 255, 255, 0.82), transparent);
            border-radius: 0 0 4px 4px;
          }
          .flip-card:hover .flip-card-back {
            border-color: rgb(35, 123, 255);
          }

          /* ── Testimonials ── */
          .jccl-testi { background: #12263F; padding: 80px 0; overflow: hidden; position: relative; }
          .jccl-track { display: flex; gap: 25px; width: max-content; animation: scroll 35s linear infinite; }
          @keyframes scroll { from { transform: translateX(0); } to { transform: translateX(-50%); } }
          .jccl-testi-card { width: 340px; background: white; padding: 30px; border-radius: 18px; flex-shrink: 0; box-shadow: 0 10px 30px rgba(0,0,0,0.2); }
          .jccl-testi-card:hover { transform: translateY(-5px); transition: 0.3s; }
          
          /* ── CTA ── */
          .jccl-cta { padding: 100px 20px; text-align: center; background: #f0f4f8; }
          .jccl-cta-box { max-width: 850px; margin: 0 auto; background: white; padding: 60px 40px; border-radius: 30px; box-shadow: 0 20px 50px rgba(18,38,63,0.05); }
          .jccl-cta-btn { padding: 16px 40px; border-radius: 50px; border: none; background: #12263F; color: white; font-weight: 800; cursor: pointer; font-size: 1.1rem; transition: 0.3s; margin-top: 25px; }
          .jccl-cta-btn:hover { background: #3A8FB5; transform: translateY(-3px); box-shadow: 0 10px 20px rgba(58,143,181,0.3); }
          .testi-av{margin-left:-50px}
          .reveal { opacity: 0; transform: translateY(30px); transition: 0.8s ease-out; }
          .reveal.visible { opacity: 1; transform: translateY(0); }

          /* ── Responsive ── */
          @media (max-width: 1200px) {
            .jccl-grid { grid-template-columns: repeat(4, 1fr); gap: 15px; }
          }
          @media (max-width: 900px) {
            .jccl-grid { grid-template-columns: repeat(3, 1fr); gap: 12px; }
            .flip-card {grid-column: span 1 !important;}
          }
          @media (max-width: 600px) {
            .jccl-grid { grid-template-columns: repeat(2, 1fr); gap: 10px; padding: 0 12px; }
            .flip-card { height: 160px; }
            .flip-card-front, .flip-card-back { padding: 8px; }
            .flip-card-back p { font-size: 0.7rem !important; line-height: 1.3; }
            .jccl-cards-section { padding: 40px 0 60px; }
          }
        `}</style>

        {/* ── HERO ── */}
        <section className="jccl-hero" id="clients">
          <h1 style={{ fontSize: '3rem', fontWeight: 900, marginBottom: '15px' }}>Our Trusted Partners</h1>
          <p style={{ opacity: 0.8, maxWidth: '600px', margin: '0 auto' }}>
            Bridging the gap between India's top talent and leading enterprises across every sector.
          </p>
        </section>

        {/* ── CARDS ── */}
        <section className="jccl-cards-section">
          <div className="jccl-cards-bg" />
          <div className="jccl-cards-overlay" />

          <div className="jccl-cards-title">Our Clients &amp; Partners</div>

          <div className="jccl-grid">
            {clients.map((client, i) => { 
              // Logic to determine if this index belongs to a "Rectangle" row
              // This is a simplified pattern: 0-2 (Rect), 3-8 (Square), 9-11 (Rect)...
              const isRectangle = [0, 1, 2, 9, 10, 11, 18, 19, 20].includes(i);
              return(
              <div key={i} className="flip-card reveal" style={{ gridColumn: isRectangle ? "span 2" : "span 1" }}>
                <div className="flip-card-inner">

                  {/* Front — logo fills the card */}
                  <div className="flip-card-front">
                    <img
                      src={client.logo}
                      alt={client.name}
                    />
                  </div>

                  {/* Back */}
                  <div className="flip-card-back">
                    <p style={{ fontSize: '0.80rem', color: '#e0e6ed', lineHeight: '1.2' }}>{client.desc}</p>
                    <div style={{ marginTop: 'auto', display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#4CAF50' }} />
                      <span style={{ fontSize: '0.7rem', fontWeight: 700, color: '#4CAF50' }}>Verified Partner</span>
                    </div>
                  </div>

                </div>
              </div>
            )})}
          </div>
        </section>

        {/* ── TESTIMONIALS ── */}
        <section className="jccl-testi">
          <div style={{ textAlign: 'center', marginBottom: '40px', color: 'white' }}>
            <h2 style={{ fontSize: '2.2rem', fontWeight: 900 }}>What Our Clients Say</h2>
          </div>
          <div className="jccl-track">
            {loadingTesti ? (
              <div className="text-white p-5">Loading testimonials...</div>
            ) : (
              testimonials.map((t, i) => (
              <div key={i} className="jccl-testi-card">
                <div style={{ color: '#f5a623', marginBottom: '15px', fontSize: '1.2rem' }}>{"★".repeat(t.stars)}</div>
                <p style={{ fontSize: '0.9rem', fontStyle: 'italic', color: '#444', lineHeight: '1.6' }}>"{t.content}"</p>
                <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginTop: '20px', borderTop: '1px solid #9c9c9c', paddingTop: '20px' }}>
                  <div style={{ background: t.color, color: 'white', width: '40px', height: '40px', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold' }}>{t.avatar}</div>
                  <div className="testi-av" style={{ background: AVATAR_COLORS[i % AVATAR_COLORS.length] }}>
                  {t.name.split(" ").map((n) => n[0]).join("")}
                </div>
                  <div>
                    <div style={{ fontSize: '0.9rem', fontWeight: 800 }}>{t.name}</div>
                    <div style={{ fontSize: '0.75rem', color: '#777' }}>{t.role}</div>
                  </div>
                </div>
              </div>
            ))
          )}
          </div>
        </section>

        {/* ── CTA ── */}
        <section className="jccl-cta">
          <div className="jccl-cta-box reveal">
            <h2 style={{ fontSize: '2.5rem', fontWeight: 900, marginBottom: '15px', color: '#12263F' }}>Ready to Partner with Us?</h2>
            <p style={{ color: '#5E7185', fontSize: '1.1rem', maxWidth: '600px', margin: '0 auto' }}>
              Join 500+ successful companies that rely on our recruitment expertise. Let's find the talent your business deserves.
            </p>
            <button className="jccl-cta-btn" onClick={() => navigate("/contact")}>Get in Touch Today →</button>
          </div>
        </section>

        <Footer />
      </div>
    </>
  );
}