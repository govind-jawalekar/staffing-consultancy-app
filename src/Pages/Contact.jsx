import React, { useState,useEffect } from "react";
import {  FileText,  MailIcon,  Phone,  User } from "lucide-react";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase/firebaseconfig";
import Footer from "../components/Footer";
import { Helmet } from "react-helmet-async";
import { FaClock, FaEnvelope, FaInstagram, FaLinkedin, FaMapMarkerAlt, FaPhoneAlt } from "react-icons/fa";
import { useLocation } from "react-router-dom";

export default function Contact() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const update = (k) => (e) => {
    setForm({ ...form, [k]: e.target.value });
    // Clear error on change
    setErrors({ ...errors, [k]: "" });
  };

  const validate = () => {
    const newErrors = {};

    if (!form.name.trim()) newErrors.name = "Full Name is required.";
    if (!form.email.trim()) {
      newErrors.email = "Email Address is required.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      newErrors.email = "Enter a valid email address.";
    }
    if (!form.message.trim()) newErrors.message = "Message cannot be empty.";

    // Optional: phone validation
    if (form.phone && !/^\+?\d{10,15}$/.test(form.phone)) {
      newErrors.phone = "Enter a valid phone number.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validate()) return; // stop submission if validation fails

    try {
      await addDoc(collection(db, "feedbacks"), {
        ...form,
        createdAt: serverTimestamp(),
        status: "pending",
      });
      setSubmitted(true);
    } catch (error) {
      console.error("Error saving feedback:", error);
      alert("Something went wrong. Please try again.");
    }
  };

  const infoCards = [
    { icon: <FaMapMarkerAlt size={window.innerWidth < 768 ? 18 : 32}  style={{color:'#3A8FB5'}}/>, title: "Our Office", lines: ["Office No. 17, 3rd FloorKedar Empire Near Nal Stop Metro Station Erandwane Pune, Maharashtra – 411004"] },
    { icon: <FaPhoneAlt size={window.innerWidth < 768 ? 18 : 28} style={{color:'#3A8FB5'}}/>, title: "Phone", lines: ["+91 89995719651"] },
    { icon: <FaEnvelope size={window.innerWidth < 768 ? 18 : 28} style={{color:'#3A8FB5'}}/>, title: "Email", lines: ["hr@jobchoiceconsulting.com"] },
    { icon: <FaClock size={window.innerWidth < 768 ? 18 : 28} style={{color:'#3A8FB5'}} />, title: "Business Hours", lines: ["Monday-Saturday: 10:00am-7:30pm"] },
  ];

  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      const el = document.querySelector(location.hash);
      if (el) {
        setTimeout(() => {
          el.scrollIntoView({ behavior: "smooth" });
        }, 100);
      }
    }
  }, [location]);

  return (
    <>
      <Helmet>
        <title>Contact Us | Get in Touch for Job Inquiries</title>
        <meta name="description" content="Have questions? Contact our expert consultants today for career guidance or partnership opportunities." />
      </Helmet>
    
    <div className="jcc-root" id="contact">

      {/* HERO */}
      <section className="jcc-hero">
        <div className="jcc-hero-chip">✦ Get In Touch</div>
        <h1>Contact <span>JobChoice Consulting</span></h1>
        <p>Have a question or ready to start your career journey? We'd love to hear from you.</p>
      </section>

      <div className="jcc-body">

        {/* INFO CARDS */}
        <div className="jcc-info-grid">
          {infoCards.map((c) => (
            <div key={c.title} className="jcc-info-card">
              <div className="jcc-info-icon">{c.icon}</div>
              <h4>{c.title}</h4>
              {c.lines.map((l) => <p key={l}>{l}</p>)}
            </div>
          ))}
        </div>

        {/* MAIN ROW */}
        <div className="jcc-main">

          {/* FORM */}
          <div className="jcc-form-card">
            <h2>Send Us a Message</h2>
            <p className="jcc-form-sub">Fill out the form and our team will get back to you within 24 hours.</p>
            <div className="jcc-form-divider" />

            {submitted ? (
              <div className="jcc-success">
                <div className="jcc-success-icon">🎉</div>
                <h3>Message Sent!</h3>
                <p>Thanks for reaching out. We'll get back to you within 24 hours.</p>
                <button className="jcc-reset-btn" onClick={() => {
                  setSubmitted(false);
                  setForm({ name: "", email: "", phone: "", subject: "", message: "" });
                  setErrors({});
                }}>
                  Send Another Message
                </button>
              </div>
            ) : (
              <>
                <div className="jcc-form-row">
                  <div className="jcc-form-group">
                    <label>Full Name <span className="jcc-req">*</span></label>
                    <div className="jcc-input-wrap">
                      <span className="jcc-input-icon"><User size={18}/></span>
                      <input type="text" placeholder="Name" value={form.name} onChange={update("name")} />
                    </div>
                    {errors.name && <p className="jcc-error">{errors.name}</p>}
                  </div>

                  <div className="jcc-form-group">
                    <label>Email Address <span className="jcc-req">*</span></label>
                    <div className="jcc-input-wrap">
                      <span className="jcc-input-icon"><MailIcon size={18}/></span>
                      <input type="email" placeholder="Email" value={form.email} onChange={update("email")} />
                    </div>
                    {errors.email && <p className="jcc-error">{errors.email}</p>}
                  </div>
                </div>

                <div className="jcc-form-row">
                  <div className="jcc-form-group">
                    <label>Phone Number</label>
                    <div className="jcc-input-wrap">
                      <span className="jcc-input-icon"><Phone size={18} /></span>
                      <input type="tel" placeholder="+91 9876543210" value={form.phone} onChange={update("phone")} />
                    </div>
                    {errors.phone && <p className="jcc-error">{errors.phone}</p>}
                  </div>

                  <div className="jcc-form-group">
                    <label>Subject</label>
                    <div className="jcc-input-wrap">
                      <span className="jcc-input-icon"><FileText size={18}/></span>
                      <select value={form.subject} onChange={update("subject")} className="jcc-select">
                        <option value="">Select Subject</option>
                        <option value="job-inquiry">Job Inquiry</option>
                        <option value="candidate-support">Candidate Support</option>
                        <option value="recruitment-services">Recruitment Services</option>
                        <option value="partnership">Business Partnership</option>
                        <option value="feedback">General Feedback</option>
                        <option value="other">Other</option>
                      </select>
                    </div>
                  </div>
                </div>

                <div className="jcc-form-group">
                  <label>Message <span className="jcc-req">*</span></label>
                  <textarea
                    className="jcc-textarea"
                    placeholder="Tell us more about what you're looking for..."
                    value={form.message}
                    onChange={update("message")}
                    rows={5}
                  />
                  {errors.message && <p className="jcc-error">{errors.message}</p>}
                </div>

                <button
                  className="jcc-submit-btn"
                  onClick={handleSubmit}
                  disabled={!form.name || !form.email || !form.message}
                >
                  Send Message →
                </button>
              </>
            )}
          </div>

          {/* SIDE PANEL */}
          <div className="jcc-side">

            {/* Map */}
            <div className="jcc-map">
              <iframe
                title="JobChoice Consulting"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3596.3025485479247!2d73.82488187496253!3d18.5059619825847!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc2bf4b26a3952f%3A0x967b4ed85ecac9fa!2sJobChoice%20Consulting!5e1!3m2!1sen!2sin!4v1773745378303!5m2!1sen!2sin"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
              ></iframe>
            </div>

            {/* Social */}
            <div className="jcc-social-card">
              <h4>Follow Us</h4>
              <p>Join our community and grow with us</p>
              <div className="jcc-socials">
                {[
                  { label: <FaLinkedin size={window.innerWidth < 768 ? 18 : 32} style={{color:'#2769ab'}}/>, name: "LinkedIn" ,url:"https://www.linkedin.com/company/jobchoiceconsulting" },
                  { label: <FaInstagram size={window.innerWidth < 768 ? 18 : 32} style={{color:'#ab3027'}}/>, name: "Instagram" ,url:"https://www.instagram.com/jobchoice_consulting/?utm_source=ig_web_button_share_sheet" },
                
                ].map((s) => (
                  <a href={s.url} key={s.name} title={s.name}>{s.label}</a>
                ))}
              </div>
            </div>

          </div>
        </div>
      </div>
      <style>{`
        .jcc-error { color: red; font-size: 0.85rem; margin-top: 4px; }
      `}</style>
      <Footer/>
    </div>
  </>
  );
}