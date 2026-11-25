import React, { useState, useEffect } from "react";
import { auth, db } from "../../firebase/firebaseconfig";
import { updatePassword, reauthenticateWithCredential, EmailAuthProvider } from "firebase/auth";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { User, Lock, ShieldCheck, Save, KeyRound } from "lucide-react";
import toast, { Toaster } from "react-hot-toast";
export default function Profile() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  // Form States
  const [fullname, setFullname] = useState("");
  const [passwords, setPasswords] = useState({
    current: "",
    new: "",
    confirm: ""
  });

  const [message, setMessage] = useState({ type: "", text: "" });

  useEffect(() => {
    const fetchUserData = async () => {
      if (auth.currentUser) {
        const docRef = doc(db, "Users", auth.currentUser.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const data = docSnap.data();
          setUser(data);
          setFullname(data.fullname);
        }
      }
      setLoading(false);
    };
    fetchUserData();
  }, []);

  const handleUpdateInfo = async () => {
    if (!fullname.trim()) return toast.error("Name cannot be empty");
    
    setSaving(true);
    try {
      await updateDoc(doc(db, "Users", auth.currentUser.uid), {
        fullname: fullname
      });
      // 2. Update LocalStorage so Navbar updates too
      localStorage.setItem("fullname", fullname);
      toast.success("Profile updated successfully!");
    } catch (err) {
      toast.error("Failed to update profile details.");
    }
    setSaving(false);
  };

  const handlePasswordChange = async () => {
    if (!passwords.current || !passwords.new) {
        return toast.error("Please fill all password fields");
    }
    if (passwords.new !== passwords.confirm) {
      return toast.error("New passwords do not match.");
    }
    if (passwords.new.length < 6) {
        return toast.error("Password must be at least 6 characters");
    }

    setSaving(true);
    // 3. Using toast.promise for a better loading experience
    const promise = (async () => {
      const currentUser = auth.currentUser;
      const credential = EmailAuthProvider.credential(currentUser.email, passwords.current);
      
      await reauthenticateWithCredential(currentUser, credential);
      await updatePassword(currentUser, passwords.new);
      
      setPasswords({ current: "", new: "", confirm: "" });
    })();

    toast.promise(promise, {
      loading: 'Updating password...',
      success: 'Password updated successfully!',
      error: (err) => err.message.includes("wrong-password") 
        ? "Current password is incorrect" 
        : "Failed to update password."
    });

    setSaving(false);
  };

  if (loading) return <div className="p-20 text-center">Loading Profile...</div>;

  return (
    <div className="jcp-root">
    <Toaster position="top-center" reverseOrder={false} />
      <div className="jcp-container">
        <header className="jcp-header">
          <h2>Account Settings</h2>
          <p>Manage your personal information and security</p>
        </header>

        {message.text && (
          <div className={`jcp-alert ${message.type}`}>{message.text}</div>
        )}

        <div className="jcp-grid">
          {/* Section 1: Personal Info */}
          <div className="jcp-card">
            <div className="jcp-card-head">
              <User size={18} /> <h3>Personal Information</h3>
            </div>
            <div className="jcp-input-group">
              <label>Full Name</label>
              <input type="text" value={fullname} onChange={(e) => setFullname(e.target.value)} />
            </div>
            <div className="jcp-input-group">
              <label>Email Address (Read Only)</label>
              <input type="email" value={user?.email} disabled />
            </div>
            <div className="jcp-input-group">
              <label>Role</label>
              <div className="jcp-role-chip">{user?.role?.toUpperCase()}</div>
            </div>
            <button className="jc-btn-signup" onClick={handleUpdateInfo} disabled={saving}>
              <Save size={16} /> {saving ? "Saving..." : "Update Details"}
            </button>
          </div>

          {/* Section 2: Password Update */}
          <div className="jcp-card">
            <div className="jcp-card-head">
              <KeyRound size={18} /> <h3>Security & Password</h3>
            </div>
            <div className="jcp-input-group">
              <label>Current Password</label>
              <input 
                type="password" 
                value={passwords.current} 
                onChange={(e) => setPasswords({...passwords, current: e.target.value})} 
              />
            </div>
            <div className="jcp-input-group">
              <label>New Password</label>
              <input 
                type="password" 
                value={passwords.new} 
                onChange={(e) => setPasswords({...passwords, new: e.target.value})} 
              />
            </div>
            <div className="jcp-input-group">
              <label>Confirm New Password</label>
              <input 
                type="password" 
                value={passwords.confirm} 
                onChange={(e) => setPasswords({...passwords, confirm: e.target.value})} 
              />
            </div>
            <button className="jc-btn-login" onClick={handlePasswordChange} disabled={saving}>
              <Lock size={16} /> Update Password
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}