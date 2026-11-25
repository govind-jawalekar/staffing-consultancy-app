import { useState, useEffect } from "react";
import { auth } from "../firebase/firebaseconfig";
import { verifyPasswordResetCode, confirmPasswordReset } from "firebase/auth";
import { useSearchParams, useNavigate } from "react-router-dom";
import { CgDanger } from "react-icons/cg";
import { CircleCheckBig, LockKeyhole } from "lucide-react";

export default function ResetPassword() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const [newPassword, setNewPassword] = useState("");
  const [status, setStatus] = useState("verifying"); // verifying, ready, success, error
  const [loading, setLoading] = useState(false);
  const oobCode = searchParams.get("oobCode");

  useEffect(() => {
    if (oobCode) {
      verifyPasswordResetCode(auth, oobCode)
        .then(() => setStatus("ready"))
        .catch(() => setStatus("error"));
    } else {
      setStatus("error");
    }
  }, [oobCode]);

  const handleReset = async (e) => {
    e.preventDefault();
    setLoading(true); // ✅ Fixed: Set loading to true
    try {
      await confirmPasswordReset(auth, oobCode, newPassword);
      setStatus("success");
      setTimeout(() => navigate("/login"), 3000);
    } catch (error) {
      console.error(error);
      alert("Error resetting password. Link may have expired.");
      setStatus("error");
    } finally {
      setLoading(false);
    }
  };

  // ✅ Unified Loader (Matches AuthAction)
  if (status === "verifying") {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Verifying...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="container d-flex justify-content-center align-items-center vh-100 jcl-root">
      <div className="card shadow-lg border-0" style={{ maxWidth: "500px", width: "100%" }}>
        <div className="card-body p-5 text-center">
          
          {/* ICON HEADER */}
          <div className="mb-4">
            {status === "error" && <span style={{ fontSize: "50px" }}><CgDanger className="text-danger" size={45}/> </span>}
            {status === "success" && <span style={{ fontSize: "50px" }}><CircleCheckBig className="text-success " size={40}/></span>}
            {status === "ready" && <span style={{ fontSize: "50px" }}><LockKeyhole className="text-dark" size={40}/></span>}
          </div>

          <h2 className="fw-bold mb-3 fs-4" style={{color:'#2D6A96'}}>Reset Password</h2>

          {/* STATUS MESSAGES */}
          {status === "error" && (
            <div className="alert alert-danger mb-4">
              Invalid or expired link. Please request a new password reset.
            </div>
          )}

          {status === "success" && (
            <div className="alert alert-success mb-4">
              Password updated successfully! Redirecting to login...
            </div>
          )}

          {/* RESET FORM */}
          {status === "ready" && (
            <form onSubmit={handleReset}>
              <p className="text-muted mb-4">Please enter a new secure password for your account.</p>
              <div className="text-start mb-3">
                <label className="form-label fw-semibold">New Password</label>
                <input
                  type="password"
                  className="form-control py-2"
                  placeholder="Minimum 6 characters"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  required
                  minLength={6}
                />
              </div>
              <button 
                type="submit" 
                className="btn  w-50 py-2 mt-2 text-light fw-semibold" style={{ background: 'linear-gradient(135deg, #1E4A6E 0%, #2D6A96 100%)' }}
                disabled={loading}
              >
                {loading ? "Updating..." : "Update Password "}
              </button>
            </form>
          )}

          {/* ACTION BUTTONS */}
          {(status === "error" || status === "success") && (
            <button 
              className="btn  w-50 py-2 mt-2 text-light fw-semibold" style={{ background: 'linear-gradient(135deg, #1E4A6E 0%, #2D6A96 100%)' }}
              onClick={() => navigate("/login")}
            >
              Return to Login
            </button>
          )}
          
        </div>
      </div>
    </div>
  );
}