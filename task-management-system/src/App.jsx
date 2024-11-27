import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import SignIn from "./components/SignIn";
import UserSignUp from "./components/User_SignUp"; // Make sure this is correct
import Admin_SignIn from "./components/Admin_SignIn"; // Admin Sign In page
import Admin_SignUp from "./components/Admin_SignUp"; // Admin Sign Up page

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
      </Routes>
    </Router>
  );
}

export default App;
