import React from "react";
import logo from "../assets/images/taskmasterlogo.png"; // Import the logo
import { Link } from "react-router-dom";  // Import Link from react-router-dom


export default function SignIn() {
  const containerStyle = {
    height: "100vh",
    backgroundColor: "#f3f4f6",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  };

  const cardStyle = {
    backgroundColor: "white",
    padding: "2rem",
    borderRadius: "8px",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
    width: "100%",
    maxWidth: "400px",
    textAlign: "center",
  };

  const inputStyle = {
    width: "100%",
    padding: "0.5rem 1rem",
    margin: "0.5rem 0",
    borderRadius: "4px",
    border: "1px solid #d1d5db",
    fontSize: "1rem",
  };

  const buttonStyle = {
    width: "100%",
    padding: "0.75rem 1rem",
    backgroundColor: "#22c55e",
    color: "white",
    fontSize: "1rem",
    fontWeight: "bold",
    borderRadius: "4px",
    border: "none",
    cursor: "pointer",
    marginTop: "1rem",
  };

  const linkStyle = {
    color: "#22c55e",
    textDecoration: "none",
    fontWeight: "bold",
  };

  const forgotPasswordStyle = {
    fontSize: "0.875rem",
    color: "#22c55e",
    textDecoration: "none",
    marginLeft: "auto",
    display: "block",
    textAlign: "right",
  };

  return (
    <div style={containerStyle}>
      <div style={cardStyle}>
      <a href="/admin-signin" style={forgotPasswordStyle}>
            Admin Login
          </a>
        {/* Logo */}
        <img
          src={logo}
          alt="Task Master Logo"
          style={{ marginBottom: "-1rem", width: "100px", height: "auto" }}
        />
        {/* Heading */}
        <h2 style={{ fontSize: "1.5rem", fontWeight: "bold", marginBottom: "0.5rem" }}>
          Task Management System
        </h2>
        <p style={{ fontSize: "0.875rem", color: "#6b7280", marginBottom: "1rem" }}>
          Welcome! Please enter your details.
        </p>
        {/* Form */}
        <form>
          <input
            type="email"
            placeholder="Enter your email"
            required
            style={inputStyle}
          />
          <input
            type="password"
            placeholder="Enter password"
            required
            style={inputStyle}
          />
          <a href="#" style={forgotPasswordStyle}>
            Forgot password?
          </a>
          
          <button type="submit" style={buttonStyle}>
            Sign in
          </button>
        </form>
        <p style={{ marginTop: "1rem", fontSize: "0.875rem" }}>
          Don’t have an account?{" "}
          <a href="/signup" style={linkStyle}>
            Sign up
          </a>
        </p>
      </div>
    </div>
  );
}
