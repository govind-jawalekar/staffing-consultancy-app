import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { applyActionCode, getAuth, onAuthStateChanged } from "firebase/auth";
import { doc, updateDoc } from "firebase/firestore"; 
import { db } from "../firebase/firebaseconfig"; // Ensure this path is correct
import ResetPassword from "./ResetPassword";
import { CgDanger } from "react-icons/cg";
import { CircleCheckBig } from "lucide-react";

export default function AuthAction() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);

  const mode = searchParams.get("mode");
  const oobCode = searchParams.get("oobCode");
  const auth = getAuth();

  useEffect(() => {
    if (mode === "verifyEmail") {
      handleEmailVerification();
    } else if (mode === "resetPassword") {
      setLoading(false);
    }
  }, [mode]);

  const handleEmailVerification = async () => {
    try {
      // 1. Verify the code with Firebase Auth
      await applyActionCode(auth, oobCode);

      // 2. Update Firestore status
      // We check if a user is currently logged in to get their UID
      onAuthStateChanged(auth, async (user) => {
        if (user) {
          const userRef = doc(db, "Users", user.uid);
          await updateDoc(userRef, {
            emailVerified: true
          });
        }
      });

      setIsError(false);
      setMessage("Your email has been verified successfully! You can now access all JobChoice features.");
      
      // Auto-redirect after 4 seconds
      setTimeout(() => navigate("/login"), 4000);
    } catch (error) {
      setIsError(true);
      setMessage("This verification link is invalid or has already been used.");
    } finally {
      setLoading(false);
    }
  };

//   if (loading) {
//     return (
//       <div className="d-flex justify-content-center align-items-center vh-100">
//         <div className="spinner-border text-primary" role="status"/>
//           <p className="d-block mt-3 ms-3">Loading...</p>
        
//       </div>
//     );
//   }

  if (mode === "resetPassword") {
    return <ResetPassword oobCode={oobCode} />;
  }

  return (
    <div className="container d-flex justify-content-center align-items-center vh-100 ">
      <div className="card shadow-lg border-2 border-rounded " style={{ maxWidth: "500px", width: "100%" }}>
        <div className="card-body p-5 text-center">
          <div className="mb-4">
            {isError ? (
              <span style={{ fontSize: "50px" }}><CgDanger className="text-danger" size={45}/></span>
            ) : (
              <span style={{ fontSize: "50px" }}> <CircleCheckBig className="text-success " size={40}/></span>
            )}
          </div>
          
          <h2 className="fw-bold mb-3" style={{color:'#2D6A96'}}>Email Verification</h2>
          
          <div className={`alert ${isError ? "alert-danger" : "alert-success"} mb-4`} role="alert">
            {message}
          </div>

          <button 
            className="btn btn-primary w-50 py-2 fw-semibold" style={{ background: 'linear-gradient(135deg, #1E4A6E 0%, #2D6A96 100%)' }}
            onClick={() => navigate("/login")}
          >
            Return to Login
          </button>
        </div>
      </div>
    </div>
  );
}