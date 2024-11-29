import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // For navigation
import axios from "axios"; // For API requests
import DOMPurify from "dompurify"; // For sanitizing data
import logo from "../assets/images/taskmasterlogo.png"; // Import the logo

export default function Admin_SignIn() {
  const navigate = useNavigate(); // Hook for navigation

  // State for form inputs and error messages
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  // Form submit handler
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Sanitize email and password before sending to backend
    const sanitizedEmail = DOMPurify.sanitize(email);
    const sanitizedPassword = DOMPurify.sanitize(password);

    try {
      const response = await axios.post("http://localhost:8080/admin/login", {
        email: sanitizedEmail,
        password: sanitizedPassword,
      });

      if (response.status === 200) {
        // Store admin data in localStorage
        const adminData = {
          admin_id: response.data.admin_id,
          email: response.data.email,
        };

        localStorage.setItem("admin", JSON.stringify(adminData)); // Save sanitized admin data

        setErrorMessage("");
        navigate("/admin-home"); // Redirect to Admin Home
      }
    } catch (error) {
      if (error.response && error.response.status === 401) {
        setErrorMessage(DOMPurify.sanitize("Incorrect email or password."));
      } else {
        setErrorMessage(DOMPurify.sanitize("Something went wrong. Please try again later."));
      }
    }
  };

  const containerStyle = {
    height: "100vh",
    backgroundColor: "#f3f4f6",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  };

  const cardStyle = {
    backgroundColor: "white",
    padding: "3.5rem",
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

  const errorStyle = {
    color: "red",
    fontSize: "0.875rem",
    marginBottom: "1rem",
  };

  return (
    <div style={containerStyle}>
      <div style={cardStyle}>
        {/* Logo */}
        <img
          src={logo}
          alt="Task Master Logo"
          style={{ marginBottom: "-1rem", width: "100px", height: "auto" }}
        />
        {/* Heading */}
        <h2 style={{ fontSize: "1.5rem", fontWeight: "bold", marginBottom: "0.5rem" }}>
          Admin Sign In
        </h2>
        <p style={{ fontSize: "0.875rem", color: "#6b7280", marginBottom: "1rem" }}>
          Welcome! Please enter your details.
        </p>
        {/* Form */}
        <form onSubmit={handleSubmit}>
          {errorMessage && <p style={errorStyle}>{errorMessage}</p>}
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={inputStyle}
          />
          <input
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
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
          <a href="/admin-signup" style={linkStyle}>
            Sign up
          </a>
        </p>
      </div>
    </div>
  );
}
