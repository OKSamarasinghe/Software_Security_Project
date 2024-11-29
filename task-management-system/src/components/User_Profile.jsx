import React from "react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/images/taskmasterlogo.png";

export default function User_Profile() {
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

  // Dummy user details for now
  const user = {
    user_id: "12345",
    first_name: "John",
    last_name: "Doe",
    email: "johndoe@example.com",
    phone_number: "+1234567890",
  };

  return (
    <div>
      {/* Navbar */}
      <nav style={navbarStyle}>
        <div style={logoStyle} onClick={() => navigate("/")}>
          <img
            src={logo}
            alt="Task Master Logo"
            style={{ width: "50px", height: "auto", marginRight: "1rem" }}
          />
        </div>

        <div style={actionStyle}>
          <button style={buttonStyle} onClick={() => navigate("/user-home")}>
            Home
          </button>
          <button style={buttonStyle} onClick={() => navigate("/user-view-task")}>
            View Tasks
          </button>
          <button style={buttonStyle} onClick={() => navigate("/user-profile")}>
            Profile
          </button>
          <button style={buttonStyle} onClick={() => navigate("/")}>
            Log Out
          </button>
        </div>
      </nav>

      {/* Profile Content */}
      <div style={{ backgroundColor: "#f3f4f6", minHeight: "100vh", display: "flex", justifyContent: "center", alignItems: "center" }}>
        <div
          style={{
            backgroundColor: "#fff",
            padding: "2rem",
            borderRadius: "8px",
            boxShadow: "0 10px 30px rgba(0, 0, 0, 0.1)",
            width: "100%",
            maxWidth: "600px",
            textAlign: "center",
          }}
        >
          <h1 style={{ fontSize: "2rem", color: "green", fontWeight: "bold", marginBottom: "1rem" }}>
            User Profile
          </h1>
          <p style={{ fontSize: "1.125rem", color: "#6b7280", marginBottom: "2rem" }}>
            Here are your profile details.
          </p>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "1rem",
              textAlign: "left",
              marginBottom: "1.5rem",
              fontSize: "1rem",
              color: "#4b5563",
            }}
          >
            <div style={{ fontWeight: "bold" }}>User ID:</div>
            <div>{user.user_id}</div>

            <div style={{ fontWeight: "bold" }}>First Name:</div>
            <div>{user.first_name}</div>

            <div style={{ fontWeight: "bold" }}>Last Name:</div>
            <div>{user.last_name}</div>

            <div style={{ fontWeight: "bold" }}>Email:</div>
            <div>{user.email}</div>

            <div style={{ fontWeight: "bold" }}>Phone Number:</div>
            <div>{user.phone_number}</div>
          </div>

          
        </div>
      </div>
    </div>
  );
}
