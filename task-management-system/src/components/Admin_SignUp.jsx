import React, { useState } from "react";
import logo from "../assets/images/taskmasterlogo.png"; // Import the logo

export default function Admin_SignUp() {
  // State for form inputs and error messages
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  // Styles
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

  const errorStyle = {
    color: "red",
    fontSize: "0.875rem",
    marginBottom: "1rem",
  };

  // Email validation regex
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  // Password validation regex (minimum 8 characters, one uppercase, one number, one special character)
  const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate email
    if (!emailRegex.test(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    // Validate password
    if (!passwordRegex.test(password)) {
      setError("Password must be at least 8 characters, including an uppercase letter, a number, and a special character.");
      return;
    }

    // Check if passwords match
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    // Reset error and simulate successful signup
    setError("");
    alert("Admin account successfully created!");

    // You can add your logic for submitting the form data to the backend here.
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
          Admin Sign Up
        </h2>
        <p style={{ fontSize: "0.875rem", color: "#6b7280", marginBottom: "1rem" }}>
          Create your admin account.
        </p>

        {/* Error message */}
        {error && <p style={errorStyle}>{error}</p>}

        {/* Form */}
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Enter your email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={inputStyle}
          />
          <input
            type="password"
            placeholder="Enter password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={inputStyle}
          />
          <input
            type="password"
            placeholder="Confirm password"
            required
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            style={inputStyle}
          />

          <button type="submit" style={buttonStyle}>
            Sign up
          </button>
        </form>

        <p style={{ marginTop: "1rem", fontSize: "0.875rem" }}>
          Already have an account?{" "}
          <a href="/admin-signin" style={linkStyle}>
            Sign in
          </a>
        </p>
      </div>
    </div>
  );
}
