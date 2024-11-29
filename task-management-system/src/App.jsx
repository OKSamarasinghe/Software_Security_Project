import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

// User Components
import SignIn from "./components/SignIn"; // User Sign In
import UserSignUp from "./components/User_SignUp"; // User Sign Up
import UserHome from "./components/UserHome"; // User Home
import User_CreateTask from "./components/User_CreateTask"; // User Create Task
import User_ViewTask from "./components/User_ViewTask"; // User View Task
import User_TaskEdit from "./components/User_TaskEdit"; // User Edit Task
import User_Profile from "./components/User_Profile"; // User Profile

// Admin Components
import Admin_SignIn from "./components/Admin_SignIn"; // Admin Sign In
import Admin_SignUp from "./components/Admin_SignUp"; // Admin Sign Up
import AdminHome from "./components/AdminHome"; // Admin Home
import Admin_userManagement from "./components/Admin_userManagement"; // Admin User Management
import Admin_taskManagement from "./components/Admin_taskManagement"; // Admin Task Management
import Admin_Management from "./components/Admin_Management"; // Admin Miscellaneous Management
import Admin_Profile from "./components/Admin_Profile"; // Admin Profile

function App() {
  return (
    <Router>
      <Routes>
        {/* Default Route */}
        <Route path="/" element={<SignIn />} />

        {/* User Routes */}
        <Route path="/signup" element={<UserSignUp />} />
        <Route path="/user-home" element={<UserHome />} />
        <Route path="/user-create-task" element={<User_CreateTask />} />
        <Route path="/user-view-task" element={<User_ViewTask />} />
        <Route path="/user-task-edit" element={<User_TaskEdit />} /> {/* Added Route */}
        <Route path="/user-profile" element={<User_Profile />} />

        {/* Admin Routes */}
        <Route path="/admin-signin" element={<Admin_SignIn />} />
        <Route path="/admin-signup" element={<Admin_SignUp />} />
        <Route path="/admin-home" element={<AdminHome />} />
        <Route path="/admin-user-management" element={<Admin_userManagement />} />
        <Route path="/admin-task-management" element={<Admin_taskManagement />} />
        <Route path="/admin-management" element={<Admin_Management />} />
        <Route path="/admin-profile" element={<Admin_Profile />} />
      </Routes>
    </Router>
  );
}

export default App;
