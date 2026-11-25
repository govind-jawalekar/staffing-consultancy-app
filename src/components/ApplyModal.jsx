import React, { useState,useEffect } from "react";
import { db,auth } from "../firebase/firebaseconfig";
import { collection, addDoc, serverTimestamp,query,where,getDocs } from "firebase/firestore";
import toast from "react-hot-toast";
import "../components/ApplyModal.css";
import { CheckCircle, Ghost, LogIn } from "lucide-react";
import { useNavigate } from "react-router-dom";

const ApplyModal = ({ job, show, onClose }) => {
  const navigate=useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    experience:"",
    noticeperiod:"",
    resumeLink: "",
  });

  const [hasApplied, setHasApplied] = useState(false); // New state
  const [checkingStatus, setCheckingStatus] = useState(true); // Loader for the check
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const checkStatus = async () => {
      const user = auth.currentUser;
      if (!user) {
        setCheckingStatus(false);
        setHasApplied(false); // They haven't applied because they aren't logged in
        return;
      }
     
      if (job?.id && show) {
        // Set basic info
        setFormData((prev) => ({
          ...prev,
          name: user.displayName || "",
          email: user.email || "",
        }));

        try {
          setCheckingStatus(true);
          // Query Firestore for existing application
          const q = query(
            collection(db, "applications"),
            where("userId", "==", user.uid),
            where("jobId", "==", job.id)
          );
          
          const querySnapshot = await getDocs(q);
          if (!querySnapshot.empty) {
            setHasApplied(true);
          } else {
            setHasApplied(false);
          }
        } catch (error) {
          console.error("Error checking status:", error);
          toast.error("Error verifying application status");
        } finally {
          setCheckingStatus(false);
        }
      }
    };

    if (show) checkStatus();
  }, [show, job?.id]);

  if (!show) return null;

  // ✅ Handle Input Change
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // ✅ Validate Form
  const validate = () => {
    let newErrors = {};

    if (!formData.phone) {
      newErrors.phone = "Phone number is required";
    } else if (!/^[0-9]{10}$/.test(formData.phone)) {
      newErrors.phone = "Enter valid 10 digit phone number";
    }

    if (!formData.experience) {
        newErrors.experience = "Experience is required";
      } else if (formData.experience < 0) {
        newErrors.experience = "Experience cannot be negative";
      }

    if (!formData.noticeperiod) {
        newErrors.noticeperiod = "Notice period is required";
      } else if (formData.noticeperiod < 0) {
        newErrors.noticeperiod = "Notice period cannot be negative";
      }

    if (!formData.resumeLink) {
      newErrors.resumeLink = "Resume link is required";
    } else if (!/^https?:\/\/.+\..+/.test(formData.resumeLink)) {
      newErrors.resumeLink = "Enter valid URL (https://...)";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };


  
  // ✅ Submit Handler
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate()){
      toast.error("Please fill all required fields correctly");
      return;
    } 

    const user = auth.currentUser;
    if (!user) {
      toast.error("Login before applying.");
      return;
    }
    // Expires Application Data After 90 Days Automatically deletes
    const expireDate = new Date();
    expireDate.setDate(expireDate.getDate() + 90);

    const submitApplication = async () => {
      setLoading(true);
      try {
        await addDoc(collection(db, "applications"), {
          ...formData,
          jobId: job.id,
          jobTitle: job.title,
          company: job.company,
          userId: user.uid,
          status: "pending",
          createdAt: serverTimestamp(),
          expireDate: expireDate,
        });
        onClose(); // Close modal on success
      } catch (error) {
        console.error(error);
        throw error; // Let toast.promise catch this
      } finally {
        setLoading(false);
      }
    };

    // 🚀 Professional Toast Feedback
    toast.promise(submitApplication(), {
      loading: "Submitting your application...",
      success: <b>Applied successfully to {job.company}!</b>,
      error: <b>Failed to submit. Please try again.</b>,
    });
  };

  return (
    <div className="modal-overlay">
    <style>{`
       .lucid-ghost {
          animation: float 3s ease-in-out infinite;
        }

        @keyframes float {
          0% { transform: translateY(0px); }
          50% { transform: translateY(-15px); }
          100% { transform: translateY(0px); }
        }
    `}</style>
      <div className="modal-box bg-white p-4 rounded-4 shadow">
        <h5 className="fw-bold mb-3">Apply for {job.title}</h5>
        {checkingStatus ? (
          <div className="text-center py-4">
            <div className="spinner-border spinner-border-sm text-primary mb-2"></div>
            <p className="small text-muted">Verifying status...</p>
          </div>
        ) : !auth.currentUser ? ( 
          /* 2. STATE: NOT LOGGED IN */
          <div className="text-center py-4">
            <div className="mb-3 animate-bounce lucid-ghost">
              <Ghost size={60} style={{color:'#2D6A96'}} strokeWidth={1.5} />
            </div>
            <h4 className="fw-bold">Who goes there?</h4>
            <p className="text-muted">
              We'd love to send your resume to <strong style={{color:'#2D6A96'}}>{job.company}</strong>, 
              but we need to know who you are first!
            </p>
            
            <div className="d-grid gap-2 mt-4">
              <button 
                className="btn btn-dark d-flex align-items-center justify-content-center gap-2" 
                style={{ background: 'linear-gradient(135deg, #1E4A6E 0%, #2D6A96 100%)' }}
                onClick={() => navigate("/login")}
              >
                <LogIn size={18} /> Sign In to Apply
              </button>
              <button className="btn btn-link text-muted sm" onClick={onClose}>
                Maybe later
              </button>
            </div>
          </div>
        ) : hasApplied ? (
          /* 3. STATE: ALREADY APPLIED */
          <div className="text-center py-4">
            <div className="mb-3 text-success" style={{ fontSize: "2rem" }}><CheckCircle size={40}/></div>
            <p className="fw-bold">Already Applied!</p>
            <p className="small text-muted">You have already submitted an application for this role.</p>
            <button className="btn  w-50 mt-3 text-light"
               style={{ background: 'linear-gradient(135deg, #1E4A6E 0%, #2D6A96 100%)' }}
             onClick={onClose}>Close</button>
          </div>
        ) : (
          /* 4. STATE: SHOW FORM */
        <form onSubmit={handleSubmit} noValidate>

          {/* Name */}
          <div className="mb-3">
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              className="form-control"
              value={formData.name}
              readOnly
            />
          </div>




          {/* Email */}
          <div className="mb-3">
            <input
              type="email"
              name="email"
              placeholder="Email Address"
              className="form-control"
              value={formData.email}
              readOnly
            />
          </div>

          {/* Phone */}
          <div className="mb-3">
            <input
              type="text"
              name="phone"
              placeholder="Phone Number"
              className={`form-control ${errors.phone && "is-invalid"}`}
              value={formData.phone}
              onChange={handleChange}
            />
            {errors.phone && (
              <div className="text-danger small mt-1">
                {errors.phone}
              </div>
            )}
          </div>

          {/* Experience */}
          <div className="mb-3">
            <input type="number" 
                name="experience"
                placeholder="Experience (in years)"
                className={`form-control ${errors.experience ? "is-invalid" : ""}`}
                value={formData.experience}
                onChange={handleChange}
                min="0"
                max="50"
            />
            {errors.experience && (
              <div className="text-danger small mt-1">
                {errors.experience}
              </div>
            )}
          </div>

          {/* Notice Period */}
          <div className="mb-3">
            <input
              type="number"
              name="noticeperiod"
              placeholder="Notice Period (in days)"
              className={`form-control ${errors.noticeperiod ? "is-invalid" : ""}`}
              value={formData.noticeperiod}
              onChange={handleChange}
              min="0"
              max="365"
            />
            {errors.noticeperiod && (
              <div className="text-danger small mt-1">
                {errors.noticeperiod}
              </div>
            )}
        </div>

          {/* Resume Link */}
          <div className="mb-3">
            <input
              type="text"
              name="resumeLink"
              placeholder="Paste Resume Google Drive Link"
              className={`form-control ${errors.resumeLink && "is-invalid"}`}
              value={formData.resumeLink}
              onChange={handleChange}
            />
            {errors.resumeLink && (
              <div className="text-danger small mt-1">
                {errors.resumeLink}
              </div>
            )}
          </div>

          {/* Buttons */}
          <div className="d-flex justify-content-end gap-2">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={onClose}
              disabled={loading}
            >
              Cancel
            </button>

            <button
              type="submit"
              className="btn btn-dark"
              disabled={loading}
            >
              {loading ? "Submitting..." : "Submit Application"}
            </button>
          </div>
        </form>
      )}
      </div>
    </div>
  );
};

export default ApplyModal;