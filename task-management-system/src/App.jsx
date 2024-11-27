import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import SignIn from "./components/SignIn";
import UserSignUp from "./components/User_SignUp"; // User Sign Up page
import Admin_SignIn from "./components/Admin_SignIn"; // Admin Sign In page
import Admin_SignUp from "./components/Admin_SignUp"; // Admin Sign Up page
import AdminHome from "./components/AdminHome"; // Admin Home page
import Admin_userManagement from "./components/Admin_userManagement"; // Admin User Management page
import Admin_taskManagement from "./components/Admin_taskManagement"; // Admin Task Management page
import Admin_Management from "./components/Admin_Management"; // Admin Management page
import Admin_Profile from "./components/Admin_Profile"; // Admin Profile page

function App() {
  return (
    <Router>
      <Routes>
        {/* User Routes */}
        <Route path="/" element={<SignIn />} />
        <Route path="/signup" element={<UserSignUp />} />

        {/* Admin Routes */}
        <Route path="/admin-signin" element={<Admin_SignIn />} />
        <Route path="/admin-signup" element={<Admin_SignUp />} />
        <Route path="/admin-home" element={<AdminHome />} />
        <Route path="/admin-user-management" element={<Admin_userManagement />} />
        <Route path="/admin-task-management" element={<Admin_taskManagement />} />
        <Route path="/admin-management" element={<Admin_Management />} />
        <Route path="/admin-profile" element={<Admin_Profile />} />
        <Route path="/admin-home" element={<AdminHome />} />
      </Routes>
    </Router>
  );
}

export default App;
