import { useState } from "react";
import React from "react";
import { auth, db } from "../firebase/firebaseconfig";
import { createUserWithEmailAndPassword,signOut,sendEmailVerification,updateProfile } from "firebase/auth";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { Eye, EyeClosedIcon, LockKeyhole, Mail, User } from "lucide-react";

export default function Signup() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    fullname: "",
    email: "",
    password: "",
    confirm: "",
  });

  const [agreed, setAgreed]   = useState(false);
  const [loading, setLoading] = useState(false);
  const [showPwd, setShowPwd] = useState(false);
  const [showCfm, setShowCfm] = useState(false);
  const [errors, setErrors] = useState({});
  const [showTerms, setShowTerms] = useState(false);

 const handleAcceptTerms = () => {
  setAgreed(true);
  setShowTerms(false);
};
 

  const update = (k) => (e) => setForm({ ...form, [k]: e.target.value });

  

  // ✅ Submit Handler — Firebase logic unchanged
  const handleSubmit = async () => {

  let newErrors = {};

  if (!form.fullname) newErrors.fullname = "Full name is required";
  if (!form.email) newErrors.email = "Email is required";
  if (!form.password) newErrors.password = "Password is required";
  if (!form.confirm) newErrors.confirm = "Confirm your password";

  if (form.password !== form.confirm) {
    newErrors.confirm = "Passwords do not match";
  }

  if (!agreed) {
    newErrors.agreed = "You must accept terms";
  }

  if (Object.keys(newErrors).length > 0) {
    setErrors(newErrors);
    return;
  }

  try {
    setLoading(true);
    setErrors({});

    const userCredential = await createUserWithEmailAndPassword(
      auth,
      form.email,
      form.password
    );

    const user = userCredential.user;
    await updateProfile(user, {
      displayName: form.fullname
    });

    await sendEmailVerification(user);

    await setDoc(doc(db, "Users", user.uid), {
      fullname: form.fullname,
      email: form.email,
      role: "candidate",
      createdAt: serverTimestamp(),
      emailVerified: false
    });

    await signOut(auth);

    alert("Account created. Please verify your email.");
    navigate("/login");

  } catch (error) {

    let firebaseError = {};

    if (error.code === "auth/email-already-in-use") {
      firebaseError.email = "This email is already registered";
    }

    if (error.code === "auth/invalid-email") {
      firebaseError.email = "Invalid email format";
    }

    if (error.code === "auth/weak-password") {
      firebaseError.password = "Password must be at least 6 characters";
    }

    setErrors(firebaseError);

  } finally {
    setLoading(false);
  }
};

  return (
    <div className="jcsu-root">
      <style>{`
          .form-error{color:#e63946; font-size:13px; margin-top:4px;font-weight:500;}
      `}</style>

      {/* ── LEFT PANEL ── */}
      <div className="jcsu-panel">
        <div className="jcsu-panel-chip">✦ Join Us Today</div>
        <h2>Begin Your Career<br /><span>Journey</span> With Us</h2>
        <p className="jcsu-panel-desc">
          Create your free account and unlock access to thousands of curated
          job opportunities across India's top companies.
        </p>
        <div className="jcsu-tagline">Right Candidate. Right Company. Right Time.</div>
        <div className="jcsu-features">
          {[
            "Free access to curated job listings",
            "Direct connection with expert consultants",
            "Personalised career guidance & counseling",
            "Resume screening & interview preparation",
          ].map((f, i) => (
            <div key={i} className="jcsu-feature">
              <div className="jcsu-feature-dot">✔</div>
              <span>{f}</span>
            </div>
          ))}
        </div>
      </div>

      {/* ── RIGHT FORM ── */}
      <div className="jcsu-form-side">
        <div className="jcsu-card">

          {/* Logo */}
          <div className="jcs-logo">
            <div className="jcs-logo-icon">💼</div>
            <div className="jcsu-logo-text">Job<span>Choice</span></div>
          </div>

          <h2>Create Account</h2>
          <p className="jcsu-sub">Start your career journey with us</p>
          <div className="jcs-divider" />

          {/* Full Name */}
          <div className="jcsu-group">
            <label>Full Name</label>
            <div className="jcsu-input-wrap">
              <span className="jcsu-input-icon"><User size={16}/></span>
              <input
                type="text"
                placeholder="John Doe"
                value={form.fullname}
                onChange={update("fullname")}
              />
              
            </div>
          </div>
          {errors.fullname && ( <p className="form-error">{errors.fullname}</p>)}

          {/* Email */}
          <div className="jcsu-group">
  <label>Email Address</label>

  <div style={{ display: "flex", gap: "10px" }}>
    <div className="jcsu-input-wrap" style={{ flex: 1 }}>
      <span className="jcsu-input-icon">
        <Mail size={16} />
      </span>

      <input
        type="email"
        placeholder="you@example.com"
        value={form.email}
        onChange={update("email")}
      />
      
    </div>
  </div>
   {errors.email && ( <p className="form-error">{errors.email}</p>)}
  
 </div>

          {/* Password */}
          <div className="jcsu-group">
            <label>Password</label>
            <div className="jcsu-input-wrap">
              <span className="jcsu-input-icon"><LockKeyhole size={16}/></span>
              <input
                type={showPwd ? "text" : "password"}
                placeholder="Create a strong password"
                value={form.password}
                onChange={update("password")}
              />
              <button className="jcsu-eye-btn" onClick={() => setShowPwd(v => !v)}>
                {showPwd ? <EyeClosedIcon size={16}/> : <Eye size={16}/>}
              </button>
              
            </div>
            
          </div>
          {errors.password && ( <p className="form-error">{errors.password}</p>)}

          {/* Confirm Password */}
          <div className="jcsu-group">
            <label>Confirm Password</label>
            <div className="jcsu-input-wrap">
              <span className="jcsu-input-icon"><LockKeyhole size={16}/></span>
              <input
                type={showCfm ? "text" : "password"}
                placeholder="Re-enter your password"
                value={form.confirm}
                onChange={update("confirm")}
              />
              <button className="jcsu-eye-btn" onClick={() => setShowCfm(v => !v)}>
                {showCfm ? <EyeClosedIcon size={16}/> : <Eye size={16}/>}
              </button>
              
            </div>
            {errors.confirm && ( <p className="form-error">{errors.confirm}</p>)}
          </div>

          {/* Terms */}
          <label className="jcsu-terms">
            <input
              type="checkbox"
              checked={agreed}
              onChange={(e) => setAgreed(e.target.checked)}
            />
            <span>
              I agree to the{" "}
              <span className="jcsu-terms-link" onClick={() => setShowTerms(true)} style={{cursor: 'pointer'}}>
              Terms of Service
            </span>
              {" "}and{" "}
              <span className="jcsu-terms-link">Privacy Policy</span>
            </span>
          </label>

          {/* Submit */}
          <button
            className="jcsu-btn"
            onClick={handleSubmit}
            disabled={loading || !form.fullname || !form.email || !form.password || !form.confirm || !agreed}
          >
            {loading ? "Creating Account..." : "Create Account →"}
          </button>

          <p className="jcsu-switch">
            Already have an account?{" "}
            <a onClick={() => navigate("/login")}>Sign in</a>
          </p>
        </div>
      </div>
      {/* ── TERMS & CONDITIONS MODAL ── */}
        {showTerms && (
          <div className="jcsu-modal-overlay" onClick={() => setShowTerms(false)}>
            <div className="jcsu-modal-content" onClick={(e) => e.stopPropagation()}>
              <div className="jcsu-modal-header">
                <h3>Terms & Conditions</h3>
                <button className="jcsu-modal-close" onClick={() => setShowTerms(false)}>&times;</button>
              </div>
              
              <div className="jcsu-modal-body">
                <p className="jcsu-modal-intro">Welcome to <strong>JobChoice Consulting</strong>. By accessing our services, you agree to comply with the following terms and conditions. Please read them carefully.</p>
                
                <section>
                  <h4>1. Services</h4>
                  <p>JobChoice Consulting provides recruitment, staffing, payroll, and corporate training services. We act as an intermediary between employers and candidates and do not guarantee job placement or hiring outcomes.</p>
                </section>

                <section>
                  <h4>2. Candidate Terms</h4>
                  <ul>
                    <li>Candidates must provide accurate and complete information.</li>
                    <li>Any misrepresentation may lead to disqualification.</li>
                    <li>Registration fees (if applicable) are non-refundable unless stated otherwise.</li>
                    <li>Placement is subject to employer selection and requirements.</li>
                  </ul>
                </section>

                <section>
                  <h4>3. Client Terms</h4>
                  <ul>
                    <li>Clients agree to provide clear job requirements and timely feedback.</li>
                    <li>Service fees and payment terms will be as agreed upon before engagement.</li>
                    <li>Replacement policies apply as per the signed agreement.</li>
                    <li>JobChoice Consulting is not responsible for employee performance after hiring.</li>
                  </ul>
                </section>

                <section>
                  <h4>4. Payment Terms</h4>
                  <p>All payments must be made as per agreed timelines. Delay in payment may result in service suspension. Fees once paid are non-refundable unless specified in writing.</p>
                </section>

                <section>
                  <h4>5. Confidentiality</h4>
                  <p>Both parties agree to maintain confidentiality of all shared information, including candidate data, business details, and internal processes.</p>
                </section>

                <section>
                  <h4>6. Limitation of Liability</h4>
                  <p>JobChoice Consulting shall not be liable for any direct or indirect loss arising from hiring decisions, employment termination, or candidate performance.</p>
                </section>

                <section>
                  <h4>7. Code of Conduct</h4>
                  <p>All users are expected to maintain professional and ethical behavior while interacting with our team and services.</p>
                </section>

                <section>
                  <h4>8. Modifications</h4>
                  <p>JobChoice Consulting reserves the right to update or modify these terms at any time without prior notice.</p>
                </section>

                <section>
                  <h4>9. Governing Law</h4>
                  <p>These terms shall be governed by the laws of India, and any disputes shall be subject to the jurisdiction of the appropriate courts.</p>
                </section>

                <div className="jcsu-modal-contact">
                  <p><strong>10. Contact Us</strong></p>
                  <p>For any queries regarding these Terms & Conditions, please contact us at: <strong>JobChoice Consulting</strong></p>
                </div>
              </div>

              <div className="jcsu-modal-footer">
                <button className="jcsu-modal-btn-secondary" onClick={() => setShowTerms(false)}>Close</button>
                <button className="jcsu-btn" style={{margin: 0, padding: '10px 20px'}} onClick={handleAcceptTerms}>
                  I Accept Terms & Conditions
                </button>
              </div>
            </div>
          </div>
        )}
    </div>
  );
}