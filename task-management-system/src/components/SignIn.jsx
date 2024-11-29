import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate for routing
import logo from "../assets/images/taskmasterlogo.png";
import axios from "axios";

export default function SignIn() {
  const navigate = useNavigate();

  // Hardcoded user credentials for testing
  const hardcodedUser = {
    email: "user@gmail.com",
    password: "User@1234",
  };

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");

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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Email validation regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // Password validation regex (at least one uppercase, one lowercase, one digit, one special character, min length 8)
    const passwordRegex =
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    // Check if email is valid
    if (!emailRegex.test(formData.email)) {
      setError("Invalid email format.");
      return;
    }

    // Check if password is valid
    if (!passwordRegex.test(formData.password)) {
      setError(
        "Password must be at least 8 characters long, include one uppercase letter, one lowercase letter, one number, and one special character."
      );
      return;
    }

    try {
      const response = await axios.post("http://localhost:8080/user/login", {
        email: formData.email,
        password: formData.password,
      });

      if (response.status === 200) {
        const userData = {
          user_id: response.data.user_id,
          email: response.data.email,
        };

        localStorage.setItem("user", JSON.stringify(userData)); // Store user data in localStorage

        setError(""); // Clear any errors
        navigate("/user-home"); // Redirect to user home page
      } else {
        setError("Invalid email or password.");
      }
    } catch (error) {
      console.error("Login API error:", error);
      setError("Something went wrong. Please try again.");
    }
  };

  return (
    <div style={containerStyle}>
      <div style={cardStyle}>
        <a href="/admin-signin" style={forgotPasswordStyle}>
          Admin Login
        </a>
        <img
          src={logo}
          alt="Task Master Logo"
          style={{ marginBottom: "-1rem", width: "100px", height: "auto" }}
        />
        <h2
          style={{
            fontSize: "1.5rem",
            fontWeight: "bold",
            marginBottom: "0.5rem",
          }}
        >
          Task Management System
        </h2>
        <p
          style={{
            fontSize: "0.875rem",
            color: "#6b7280",
            marginBottom: "1rem",
          }}
        >
          Welcome! Please enter your details.
        </p>
        {error && <p style={{ color: "red", fontSize: "0.875rem" }}>{error}</p>}
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            name="email"
            placeholder="Enter your email"
            value={formData.email}
            onChange={handleChange}
            required
            style={inputStyle}
          />
          <input
            type="password"
            name="password"
            placeholder="Enter password"
            value={formData.password}
            onChange={handleChange}
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
