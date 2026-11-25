import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PublicLayout from "../Layouts/PublicLayout";
import AdminLayout from "../Layouts/AdminLayout";

// Pages
import Home from "../Pages/Home";
import About from "../Pages/About";
import Jobs from "../Pages/Jobs";
import Services from "../Pages/Services";
import Contact from "../Pages/Contact";
import Login from "../Pages/Login";
import Signup from "../Pages/SignUp";

// Admin Pages
import AdminAddJob from "../Pages/Admin/ManageJobs";
// import AdminSettings from "../Pages/Admin/AdminSettings";
import AdminApplications from "../Pages/Admin/ManageApplications";
import AdminRoute from "./Adminroutes";
import FetchHR from "../Pages/Admin/ManageHR";


// HR Pages
import HRRoute from "./HRroutes";
import HRLayout from "../Layouts/HRLayout";
import ManageFeedbacks from "../Pages/Admin/Managefeedbacks";
import Clients from "../Pages/Clients";
import UserProfile from "../Pages/User";
import Reviews from "../Pages/Admin/ManageReviews";
import Profile from "../Pages/Admin/AdminProfile";
import AuthAction from "../components/AuthAction";
import ResetPassword from "../components/ResetPassword";

// import HRDashboard from "../Pages/HRModule/HRdashboard";

function AppRoutes() {
  return (
    <Routes>
      {/* ---------------- PUBLIC ROUTES ---------------- */}
      <Route element={<PublicLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/services" element={<Services />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/clients" element={<Clients/>}/>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/jobs" element={<Jobs />} />
        <Route path="/profile" element={<UserProfile />} />
        <Route path="/auth-action" element={<AuthAction/>}/>
        <Route path="/reset-password" element={<ResetPassword/>}/>
      </Route>

      {/* ---------------- ADMIN ROUTES ---------------- */}
      <Route
        path="/admin/*"
        element={
          <AdminRoute>
            <AdminLayout />
          </AdminRoute>
        }
      >
        <Route index element={<AdminAddJob />} />
        <Route path="applications" element={<AdminApplications />} />
        <Route path="feedbacks" element={<ManageFeedbacks/>}/>
        <Route path="addHR" element={<FetchHR/>} />
        <Route path="Reviews" element={<Reviews/>}/>
        <Route path="Profile" element={<Profile/>}/>
      </Route>

      {/* ---------------- HR ROUTES ---------------- */}
      <Route
        path="/hr/*"
        element={
          <HRRoute>
            <HRLayout/>  {/* reuse AdminLayout, but menu shows HR items */}
          </HRRoute>
        }>
        <Route index element={<AdminApplications/>}/>
        <Route path="jobs" element={<AdminAddJob/>}/>
        <Route path="Profile" element={<Profile/>}/>
      </Route>
    </Routes>
  );
}

export default AppRoutes;