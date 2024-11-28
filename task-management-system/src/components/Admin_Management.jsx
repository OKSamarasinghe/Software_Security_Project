import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/images/taskmasterlogo.png";

export default function Admin_Management() {
  const navigate = useNavigate();

  // Sample admin data
  const [admins, setAdmins] = useState([
    { admin_id: 1, email: "admin1@example.com" },
    { admin_id: 2, email: "admin2@example.com" },
    { admin_id: 3, email: "admin3@example.com" },
  ]);

  // Function to delete an admin
  const handleDelete = (adminId) => {
    const updatedAdmins = admins.filter((admin) => admin.admin_id !== adminId);
    setAdmins(updatedAdmins);
  };

  // Styles
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

  const tableContainerStyle = {
    marginTop: "2rem",
    padding: "1rem",
    borderRadius: "8px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    backgroundColor: "#ffffff",
  };

  const tableStyle = {
    width: "100%",
    borderCollapse: "collapse",
  };

  const thStyle = {
    padding: "1rem",
    textAlign: "left",
    backgroundColor: "#22c55e",
    color: "#fff",
    fontWeight: "bold",
    borderBottom: "2px solid #ddd",
  };

  const tdStyle = {
    padding: "1rem",
    borderBottom: "1px solid #ddd",
    fontSize: "1rem",
  };

  const deleteButtonStyle = {
    padding: "0.5rem 1rem",
    backgroundColor: "#ef4444",
    color: "white",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
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

      {/* Admin Management Table */}
      <div style={tableContainerStyle}>
        <h1 style={{ textAlign: "center", color: "#333" }}>Admin Management</h1>
        <table style={tableStyle}>
          <thead>
            <tr>
              <th style={thStyle}>Admin ID</th>
              <th style={thStyle}>Email</th>
            </tr>
          </thead>
          <tbody>
            {admins.map((admin) => (
              <tr key={admin.admin_id}>
                <td style={tdStyle}>{admin.admin_id}</td>
                <td style={tdStyle}>{admin.email}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
