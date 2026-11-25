import React, { useState, useEffect } from "react";
import { db } from "../firebase/firebaseconfig";
import { collection, addDoc, query, where, serverTimestamp, onSnapshot } from "firebase/firestore";

const AVATAR_COLORS = ["#1E4A6E", "#2D6A96", "#3A8FB5", "#12263F", "#1a5c82", "#245f87"];

export default function TestimonialsSection() {
  const [modalOpen, setModalOpen] = useState(false);
  const [hoveredStar, setHoveredStar] = useState(0);
  const [selectedStar, setSelectedStar] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name: "", role: "", review: "" });
  const [reviews, setReviews] = useState([]);

  // Real-time listener for approved reviews
  useEffect(() => {
    const reviewsRef = collection(db, "reviews");
    const q = query(reviewsRef, where("status", "==", "approved"),
                                where("category", "==", "candidate")
  );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setReviews(data);
    });

    return () => unsubscribe(); // Cleanup on unmount
  }, []);

  // Submit review
  const handleSubmit = async () => {
    if (!form.name || !selectedStar || !form.review) return;
    
    

    await addDoc(collection(db, "reviews"), {
      name: form.name,
      role: form.role,
      content: form.review,
      stars: selectedStar,
      status: "pending", // Admin will approve separately
      category: "candidate",
      createdAt: serverTimestamp(),
    });

    setSubmitted(true);
    setTimeout(() => {
      setModalOpen(false);
      setSubmitted(false);
      setForm({ name: "", role: "", review: "" });
      setSelectedStar(0);
      setHoveredStar(0);
    }, 2200);
  };

  return (
    <section className="testi-section">
      <h2 className="section-title reveal">What Our Placed Students Say</h2>
      <p className="section-sub reveal">Don't just take our word for it — hear from our satisfied students</p>

      <button className="testi-add-btn" onClick={() => setModalOpen(true)}>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 5v14M5 12h14"/>
        </svg>
        Add Your Review
      </button>

      {/* Reviews Marquee */}
      <div className="testi-marquee-outer">
        <div className="testi-marquee-track">
          {reviews.map((t, i) => (
            <div key={t.id} className="testi-card">
              <div className="testi-qq">❝❝</div>
              <div className="testi-stars">{"★".repeat(t.stars)}</div>
              <p className="testi-body">{t.content}</p>
              <div className="testi-author">
                <div className="testi-av" style={{ background: AVATAR_COLORS[i % AVATAR_COLORS.length] }}>
                  {t.name.split(" ").map((n) => n[0]).join("")}
                </div>
                <div>
                  <div className="testi-name">{t.name}</div>
                  <div className="testi-role">{t.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Review Modal */}
      {modalOpen && (
        <div className="testi-modal-backdrop" onClick={(e) => e.target === e.currentTarget && setModalOpen(false)}>
          <div className="testi-modal">
            <button className="testi-modal-close" onClick={() => setModalOpen(false)}>✕</button>

            {submitted ? (
              <div className="testi-success">
                <div className="testi-success-icon">🎉</div>
                <h4>Thank You!</h4>
                <p>Your review has been submitted successfully.</p>
              </div>
            ) : (
              <>
                <h3>Share Your Experience</h3>
                <p className="testi-modal-sub">We'd love to hear about your experience.</p>

                <div className="testi-star-row">
                  {[1,2,3,4,5].map((s) => (
                    <button
                      key={s}
                      className={`testi-star-btn${s <= (hoveredStar || selectedStar) ? " lit" : ""}`}
                      onMouseEnter={() => setHoveredStar(s)}
                      onMouseLeave={() => setHoveredStar(0)}
                      onClick={() => setSelectedStar(s)}
                      aria-label={`Rate ${s} star${s > 1 ? "s" : ""}`}
                    >★</button>
                  ))}
                </div>

                <div className="testi-field">
                  <label>Your Name *</label>
                  <input
                    type="text"
                    placeholder="e.g. Alex Johnson"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                  />
                </div>

                <div className="testi-field">
                  <label>Your Role / Company</label>
                  <input
                    type="text"
                    placeholder="e.g. Software Engineer at Acme Corp"
                    value={form.role}
                    onChange={(e) => setForm({ ...form, role: e.target.value })}
                  />
                </div>

          
                <div className="testi-field">
                  <label>Your Review *</label>
                  <textarea
                    rows={4}
                    placeholder="Tell us about your experience..."
                    value={form.review}
                    onChange={(e) => setForm({ ...form, review: e.target.value })}
                  />
                </div>

                <button
                  className="testi-submit-btn"
                  onClick={handleSubmit}
                  disabled={!form.name || !selectedStar || !form.review}
                >
                  Submit Review
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </section>
  );
}