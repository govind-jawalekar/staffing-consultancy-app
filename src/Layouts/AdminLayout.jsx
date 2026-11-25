import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import AdminSidebar from "../components/AdminSidebar";
import AdminNavbar from "../components/AdminNavbar";

const AdminLayout = () => {
  const [showSidebar, setShowSidebar] = useState(false);

  const toggleSidebar = () => setShowSidebar(!showSidebar);

  return (
    <div className="container-fluid min-vh-100 p-0">
      {/* 1. Mobile Overlay: Only visible when sidebar is toggled open on mobile */}
      {showSidebar && (
        <div 
          className="position-fixed w-100 h-100 bg-dark opacity-50 d-md-none" 
          style={{ zIndex: 1040, top: 0, left: 0 }}
          onClick={toggleSidebar}
        />
      )}

      {/* 2. Custom CSS for Desktop/Mobile behavior */}
      <style>{`
        .sidebar-container {
          width: 280px;
          z-index: 1050;
          transition: left 0.3s ease-in-out;
          position: fixed;
          top: 0;
          height: 100vh;
        }

        /* Mobile logic: start hidden (left -280) */
        @media (max-width: 767px) {
          .sidebar-container {
            left: ${showSidebar ? "0" : "-280px"};
          }
          .main-content-wrapper {
            margin-left: 0 !important;
          }
        }

        /* Desktop logic: always visible (left 0) */
        @media (min-width: 768px) {
          .sidebar-container {
            left: 0;
          }
          .main-content-wrapper {
            margin-left: 280px;
          }
        }
      `}</style>

      <div className="d-flex">
        {/* Sidebar Wrapper */}
        <div className="sidebar-container shadow">
          <AdminSidebar />
        </div>

        {/* Main Content Area */}
        <div className="main-content-wrapper flex-grow-1 min-vh-100 d-flex flex-column w-100">
          <AdminNavbar toggleSidebar={toggleSidebar} />
          <main className="flex-grow-1 p-3 p-md-4 bg-light">
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;