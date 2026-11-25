import { useState } from "react";
import React from "react";
import {getAuth,signInWithEmailAndPassword,setPersistence,browserLocalPersistence, browserSessionPersistence,signOut,sendEmailVerification,sendPasswordResetEmail} from "firebase/auth";
import { getFirestore, doc, getDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { CircleCheckBig } from "lucide-react";



export default function Login() {
  const navigate = useNavigate();

  const [email, setEmail]             = useState("");
  const [password, setPassword]       = useState("");
  const [remember, setRemember]       = useState(false);
  const [showPwd, setShowPwd]         = useState(false);
  const [errors, setErrors]           = useState({});
  const [firebaseError, setFirebaseError] = useState("");

  const auth=getAuth();
  const db = getFirestore();
  // ✅ Validation
  const validate = () => {
    let newErrors = {};
    if (!email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Enter valid email address";
    }
    if (!password) {
      newErrors.password = "Password is required";
    } else if (password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // ✅ Login Handler
  const handleLogin = async () => {
    setFirebaseError("");

    if (!validate()) return;
    
    try {
      await setPersistence(
        auth,
        remember ? browserLocalPersistence : browserSessionPersistence
      );

      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );

      
      const user = userCredential.user;
      
      await user.reload();
      // 🔐 Block login if email not verified
      if (!user.emailVerified) {
        setFirebaseError("Please verify your email before logging in.");
        // await signOut(auth);
        return;
      }

      // 🔥 Check Firestore User
      const docRef = doc(db, "Users", user.uid);
      const docSnap = await getDoc(docRef);

      if (!docSnap.exists()) {
        setFirebaseError("User not registered in system.");
        await signOut(auth);
        return;
      }

      const role = docSnap.data().role;

      localStorage.setItem("role", role);
      localStorage.setItem("email", user.email);

      if (role === "hr") navigate("/hr");
      else if (role === "admin") navigate("/admin");
      else  navigate("/");   

    } catch (error) {
  console.error("Login Error:", error);

  const errorMessages = {
    "auth/invalid-email": "Please enter a valid email address.",
    "auth/user-not-found": "We couldn't find an account with this email.",
    "auth/wrong-password": "The password you entered is incorrect.",
    "auth/invalid-credential": "Email or password is incorrect.",
    "auth/too-many-requests": "Too many login attempts. Please try again later.",
    "auth/network-request-failed": "Network error. Check your internet connection.",
    "auth/user-disabled": "Your account has been disabled. Contact support.",
  };

  setFirebaseError(
    errorMessages[error.code] || "Something went wrong. Please try again."
  );
}
  };

  // Resend EmailVerification 
    const resendVerification = async () => {
  try {
    const user = auth.currentUser;

    if (!user) {
      alert("Please login first.");
      return;
    }

    await sendEmailVerification(user);

    alert("Verification email sent. Check your inbox.");

  } catch (error) {
    console.error(error);
    alert("Failed to send verification email.");
  }
};

  // ✅ Forgot Password
  const handleForgotPassword = async () => {
    if (!email) {
      alert("Please enter your email first.");
      return;
    }

    const actionCodeSettings = {
      // This MUST match the route you created in your React Router
      url: 'https://jobchoiceconsulting.com/reset-password', 
      handleCodeInApp: true,
    };

    try {
      await sendPasswordResetEmail(auth, email, actionCodeSettings);
      alert("Check your inbox! We've sent a link to reset your password.");
    } catch (error) {
      console.error(error);
      alert(error.message);
    }
  };

  return (
    <div className="jcl-root">
     <style>{`
      .error-text {
        color: red;
        font-size: 15px;
        margin-top: 4px;
        display: block;
      }
     `}</style>

      {/* LEFT PANEL */}
      <div className="jcl-panel">
        <div className="jcl-panel-chip">✦ Welcome Back</div>
        <h2>Your Next Career<br />Move Starts <span>Here</span></h2>
        <p className="jcl-panel-desc">
          Log in to access your personalized dashboard, track applications,
          and connect with top recruiters across India.
        </p>
        <div className="jcl-tagline">Right Candidate. Right Company. Right Time.</div>
        <div className="jcl-features">
          {[
            "Access thousands of curated job opportunities",
            "Track your applications in real-time",
            "Connect directly with expert consultants",
            "Get personalised career guidance",
          ].map((f, i) => (
            <div key={i} className="jcl-feature">
              <div className="jcl-feature-dot"><CircleCheckBig size={18}/></div>
              <span>{f}</span>
            </div>
          ))}
        </div>
      </div>

      {/* ── RIGHT FORM ── */}
      <div className="jcl-form-side">
        <div className="jcl-card">

          {/* Logo */}
          <div className="jcl-logo">
            <div className="jcl-logo-icon">💼</div>
            <div className="jcl-logo-text">Job<span>Choice</span></div>
          </div>

          <h2>Welcome Back</h2>
          <p className="jcl-sub">Login to access your account</p>
          <div className="jcl-divider" />

          {/* Email */}
          <div className="jcl-group">
            <label>Email Address</label>
            <div className="jcl-input-wrap">
              <span className="jcl-input-icon">✉️</span>
              <input
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            {errors.email && <small className="jcl-error">{errors.email}</small>}
          </div>

          {/* Password */}
          <div className="jcl-group">
            <label>Password</label>
            <div className="jcl-input-wrap">
              <span className="jcl-input-icon">🔒</span>
              <input
                type={showPwd ? "text" : "password"}
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button className="jcl-eye-btn" onClick={() => setShowPwd(v => !v)}>
                {showPwd ? "🙈" : "👁️"}
              </button>
            </div>
            {errors.password && <small className="jcl-error">{errors.password}</small>}
          </div>

          {/* Remember + Forgot */}
          <div className="jcl-row">
            <label className="jcl-checkbox">
              <input
                type="checkbox"
                checked={remember}
                onChange={(e) => setRemember(e.target.checked)}
              />
              <span>Remember me</span>
            </label>
            <button className="jcl-forgot" onClick={handleForgotPassword}>Forgot password?</button>
          </div>
           
           {firebaseError === "Please verify your email before logging in." && (
              <button onClick={resendVerification} className="btn btn-link text-decoration-none">
                Resend Verification Email
              </button>
            )}

          {/* Firebase error */}
          {firebaseError && (
            <div className="jcl-firebase-error">{firebaseError}</div>
          )}

          {/* Submit */}
          <button className="jcl-btn" onClick={handleLogin}>
            Sign In →
          </button>

          <p className="jcl-switch">
            Don't have an account?{" "}
            <a onClick={() => navigate("/Signup")}>Sign up</a>
          </p>
        </div>
      </div>
    </div>
  );
}