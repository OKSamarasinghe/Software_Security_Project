import React from "react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/images/taskmasterlogo.png";

export default function AdminHome() {
  const navigate = useNavigate();

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
        <li
            style={menuItemStyle}
            onClick={() => navigate("/admin-home")}
          >
            Admin Home
          </li>
          <li
            style={menuItemStyle}
            onClick={() => navigate("/admin-user-management")}
          >
            User Management
          </li>
          <li
            style={menuItemStyle}
            onClick={() => navigate("/admin-task-management")}
          >
            Task Management
          </li>
          <li
            style={menuItemStyle}
            onClick={() => navigate("/admin-management")}
          >
            Admins
          </li>
        </ul>

        {/* Profile and Logout Buttons */}
        <div style={actionStyle}>
          <button style={buttonStyle} onClick={() => navigate("/admin-profile")}>
            Profile
          </button>
          <button
            style={buttonStyle}
            onClick={() => navigate("/admin-signin")}
          >
            Log Out
          </button>
        </div>
      </nav>

      {/* Placeholder content */}
      <div style={{ padding: "2rem", textAlign: "center" }}>
        <h1>Welcome to the Admin Home Page</h1>
        <p>Select an option from the navigation menu to manage the system.</p>
      </div>
    </div>
  );
}
