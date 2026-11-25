import React from 'react';
import { Users, Briefcase, FileText, Settings, MessageSquare, MessageCircleDashedIcon, LogOut, User } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import Logo from "../assets/Transparentlogofile2.png";
import { useNavigate } from 'react-router-dom';

// ... keep imports same
const AdminSidebar = () => {
  const navigate=useNavigate();
  const location = useLocation();
  const role = localStorage.getItem("role");

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  const adminMenu = [
    { name: 'Jobs', icon: <Briefcase size={20} />, path: '/admin' },
    { name: 'Applications', icon: <FileText size={20} />, path: '/admin/applications' },
    { name: 'Feedbacks', icon: <MessageSquare size={20} />, path: '/admin/feedbacks' },
    { name: 'HRs', icon: <Users size={20} />, path: '/admin/addHR' },
    { name: 'Reviews', icon: <MessageCircleDashedIcon size={20} />, path: '/admin/Reviews' },
  ];

  const hrMenu = [{ name: 'Applications', icon: <FileText size={20} />, path: '/hr' },{ name: 'Jobs', icon: <Briefcase size={20} />, path: '/hr/jobs' }];
  const menuItems = role === "hr" ? hrMenu : adminMenu;

  return (
    <nav
      className="d-flex flex-column flex-shrink-0 p-3 h-100" // Changed min-height to h-100
      style={{
        width: "280px",
        background: "#6e8ea5"
      }}
    >
      <div className="ps-3 mb-4">
        <img src={Logo} alt="Logo" style={{ width: "160px", objectFit: "contain" }} />
      </div>

      <ul className="nav nav-pills flex-column mb-auto">
        {menuItems.map((item) => (
          <li className="nav-item mb-2" key={item.name}>
            <Link
              to={item.path}
              className={`nav-link d-flex align-items-center gap-3 py-3 ${
                location.pathname === item.path ? "active bg-primary" : "text-white opacity-75"
              }`}
            >
              {item.icon} {item.name}
            </Link>
          </li>
        ))}
      </ul>
      <button className="dropdown-item text-dark fw-semibold ms-3" onClick={handleLogout}>
      <LogOut size={18}/> Logout
      </button>
      <Link className="dropdown-item text-dark fw-semibold ms-3 mt-2" to={role === "admin" ? "/admin/profile" : "/hr/profile"}><User size={18} /> Profile</Link>
      

      <hr className="border-light"/>
      <div className="ps-3 text-light">
        <small>{role === "hr" ? "HR Panel" : "Admin Panel"}<br />© 2026 JobChoice Consulting</small>
      </div>
    </nav>
  );
};

export default AdminSidebar;