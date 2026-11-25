import React,{useState,useEffect} from "react";
import { useNavigate,Link } from "react-router-dom";
import { db } from "../firebase/firebaseconfig"; 
import {doc,getDoc,getFirestore} from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { LogOut, Menu, User } from "lucide-react";

function AdminNavbar({ toggleSidebar }) {
  const navigate = useNavigate();
  const auth=getAuth();
  const email = localStorage.getItem("email");
  const role = localStorage.getItem("role"); // Use this to differentiate Admin/HR

  const [displayName, setDisplayName] = useState("");

  useEffect(() => {
    const fetchName = async () => {
      // 1. Check if we already saved the name in localStorage to save API calls
      const savedName = localStorage.getItem("fullname");
      if (savedName) {
        setDisplayName(savedName);
        return;
      }

      // 2. If not in storage, fetch from Firestore
      if (auth.currentUser) {
        const docRef = doc(db, "Users", auth.currentUser.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists() && docSnap.data().fullname) {
          const name = docSnap.data().fullname;
          setDisplayName(name);
          localStorage.setItem("fullname", name); // Cache it
        }
      }
    };

    fetchName();
  }, [db, auth.currentUser]);

  // Logic to determine which initial to show
  const getInitial = () => {
    if (displayName) return displayName.charAt(0).toUpperCase();
    if (email) return email.charAt(0).toUpperCase();
    return "U";
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <nav className="navbar navbar-expand-lg bg-white shadow-sm px-3 border-bottom" style={{ height: "68px" }}>
      <div className="container-fluid d-flex align-items-center justify-content-between">
        
        <div className="d-flex align-items-center">
          {/* Hamburger Menu - Visible only on Mobile */}
          <button className="btn btn-light d-md-none me-3" onClick={toggleSidebar}>
            <Menu size={24} />
          </button>
          
          <span className="navbar-brand fw-bold text-dark m-0">
            {role === "admin" ? "Admin Panel" : "HR Panel"}
          </span>
        </div>

        <div className="dropdown">
          <div
            className="rounded-circle bg-primary text-white d-flex align-items-center justify-content-center fw-semibold shadow-sm"
            style={{ width: "40px", height: "40px", cursor: "pointer" }}
            data-bs-toggle="dropdown"
          >
            {getInitial()}
          </div>
          <ul className="dropdown-menu dropdown-menu-end shadow border-0 mt-2">
            <li className="px-3 py-2">
              <div className="fw-bold text-dark">{displayName || "User"}</div>
              <div className="small text-muted" style={{ fontSize: "0.75rem" }}>{email}</div>
            </li>
            <li><hr className="dropdown-divider" /></li>
            <li>
              <Link className="dropdown-item d-flex align-items-center gap-2" to={role === "admin" ? "/admin/profile" : "/hr/profile"}>
                <User size={16} /> My Profile
              </Link>
            </li>
            <li>
              <button className="dropdown-item d-flex align-items-center gap-2 text-danger" onClick={handleLogout}>
                <LogOut size={16} /> Logout
              </button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default AdminNavbar;