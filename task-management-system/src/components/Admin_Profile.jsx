import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/images/taskmasterlogo.png";

export default function Admin_Profile() {
  const navigate = useNavigate();

  // State to hold admin details
  const [adminDetails, setAdminDetails] = useState({
    admin_id: null,
    email: "",
  });

  // Fetch admin details from localStorage when the component mounts
  useEffect(() => {
    const adminData = JSON.parse(localStorage.getItem("admin"));

    console.log("Admin data from localStorage:", adminData); // Log to verify data

    if (adminData) {
      setAdminDetails(adminData); // Set the admin details from localStorage
    } else {
      navigate("/admin-signin"); // Redirect to login if no admin data found
    }
  }, [navigate]);

  // Styles (as you've already defined)
  const navbarStyle = {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "1rem 2rem",
    backgroundColor: "#22c55e",
    color: "white",
    fontSize: "1rem",
  };

  const logoStyle = {
    display: "flex",
    alignItems: "center",
    cursor: "pointer",
  };

  const menuStyle = {
    display: "flex",
    gap: "2rem",
    listStyle: "none",
    margin: 0,
    padding: 0,
  };

  const menuItemStyle = {
    cursor: "pointer",
    fontWeight: "bold",
    textDecoration: "none",
    color: "white",
  };

  const actionStyle = {
    display: "flex",
    alignItems: "center",
    gap: "1rem",
  };

  const buttonStyle = {
    padding: "0.5rem 1rem",
    backgroundColor: "white",
    color: "#22c55e",
    borderRadius: "4px",
    fontWeight: "bold",
    border: "none",
    cursor: "pointer",
  };

  const profileStyle = {
    padding: "2rem",
    textAlign: "center",
    border: "1px solid #ddd",
    borderRadius: "8px",
    maxWidth: "400px",
    margin: "2rem auto",
    backgroundColor: "#f3f4f6",
  };

  const detailStyle = {
    fontSize: "1.2rem",
    fontWeight: "bold",
    marginBottom: "1rem",
  };

  const labelStyle = {
    color: "#555",
    fontWeight: "bold",
  };

  return (
    <div>
      {/* Navbar */}
      <nav style={navbarStyle}>
        {/* Logo */}
        <div style={logoStyle} onClick={() => navigate("/")}>
          <img
            src={logo}
            alt="Task Master Logo"
            style={{ width: "50px", height: "auto", marginRight: "1rem" }}
          />
        </div>

        {/* Menu */}
        <ul style={menuStyle}>
          <li style={menuItemStyle} onClick={() => navigate("/admin-home")}>
            Admin Home
          </li>
          <li style={menuItemStyle} onClick={() => navigate("/admin-user-management")}>
            User Management
          </li>
          <li style={menuItemStyle} onClick={() => navigate("/admin-task-management")}>
            Task Management
          </li>
          <li style={menuItemStyle} onClick={() => navigate("/admin-management")}>
            Admins
          </li>
        </ul>

        {/* Profile and Logout Buttons */}
        <div style={actionStyle}>
          <button style={buttonStyle} onClick={() => navigate("/admin-profile")}>
            Profile
          </button>
          <button style={buttonStyle} onClick={() => navigate("/admin-signin")}>
            Log Out
          </button>
        </div>
      </nav>

      {/* Profile Details */}
      <div style={profileStyle}>
        <h1>Admin Profile</h1>
        <p style={detailStyle}>
          <span style={labelStyle}>Admin ID:</span> {adminDetails.admin_id}
        </p>
        <p style={detailStyle}>
          <span style={labelStyle}>Email:</span> {adminDetails.email}
        </p>
      </div>
    </div>
  );
}
