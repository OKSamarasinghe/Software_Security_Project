import React, { useState } from "react";
import logo from "../assets/images/taskmasterlogo.png"; // Import the logo

export default function UserSignUp() {
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    phone_number: "",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState({
    first_name: "",
    last_name: "",
    email: "",
    phone_number: "",
    password: "",
    confirmPassword: "",
  });

  const [generalError, setGeneralError] = useState("");

  const containerStyle = {
    height: "140vh",
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

  const validateInput = (name, value) => {
    switch (name) {
      case "first_name":
      case "last_name":
        if (!/^[A-Za-z]{2,30}$/.test(value)) {
          return "Only letters are allowed, with a minimum of 2 and a maximum of 30 characters.";
        }
        break;
      case "email":
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
          return "Invalid email format.";
        }
        break;
      case "phone_number":
        if (!/^\+?\d{10,15}$/.test(value)) {
          return "Phone number must be 10-15 digits and can include a leading '+'.";
        }
        break;
      case "password":
        if (
          !/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(
            value
          )
        ) {
          return "Password must be at least 8 characters long, include an uppercase letter, a number, and a special character.";
        }
        break;
      case "confirmPassword":
        if (value !== formData.password) {
          return "Passwords do not match.";
        }
        break;
      default:
        break;
    }
    return "";
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    const validationError = validateInput(name, value);
    setError({ ...error, [name]: validationError });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate all fields
    const validationErrors = {};
    Object.keys(formData).forEach((key) => {
      validationErrors[key] = validateInput(key, formData[key]);
    });

    if (Object.values(validationErrors).some((err) => err)) {
      setError(validationErrors);
      setGeneralError("Please fix the errors above.");
      return;
    }

    // Clear errors
    setError({});
    setGeneralError("");

    // Proceed with form submission
    console.log("Form submitted:", formData);
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
          User Sign Up
        </h2>
        <p style={{ fontSize: "0.875rem", color: "#6b7280", marginBottom: "1rem" }}>
          Create an account to get started.
        </p>

        {/* General Error */}
        {generalError && <p style={{ color: "red", fontSize: "0.875rem" }}>{generalError}</p>}

        {/* Sign Up Form */}
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="first_name"
            placeholder="First Name"
            value={formData.first_name}
            onChange={handleChange}
            required
            style={inputStyle}
          />
          {error.first_name && (
            <p style={{ color: "red", fontSize: "0.75rem" }}>{error.first_name}</p>
          )}
          <input
            type="text"
            name="last_name"
            placeholder="Last Name"
            value={formData.last_name}
            onChange={handleChange}
            required
            style={inputStyle}
          />
          {error.last_name && (
            <p style={{ color: "red", fontSize: "0.75rem" }}>{error.last_name}</p>
          )}
          <input
            type="email"
            name="email"
            placeholder="Enter your email"
            value={formData.email}
            onChange={handleChange}
            required
            style={inputStyle}
          />
          {error.email && (
            <p style={{ color: "red", fontSize: "0.75rem" }}>{error.email}</p>
          )}
          <input
            type="text"
            name="phone_number"
            placeholder="Phone Number"
            value={formData.phone_number}
            onChange={handleChange}
            required
            style={inputStyle}
          />
          {error.phone_number && (
            <p style={{ color: "red", fontSize: "0.75rem" }}>{error.phone_number}</p>
          )}
          <input
            type="password"
            name="password"
            placeholder="Enter password"
            value={formData.password}
            onChange={handleChange}
            required
            style={inputStyle}
          />
          {error.password && (
            <p style={{ color: "red", fontSize: "0.75rem" }}>{error.password}</p>
          )}
          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm password"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
            style={inputStyle}
          />
          {error.confirmPassword && (
            <p style={{ color: "red", fontSize: "0.75rem" }}>{error.confirmPassword}</p>
          )}
          <button type="submit" style={buttonStyle}>
            Sign Up
          </button>
        </form>

        <p style={{ marginTop: "1rem", fontSize: "0.875rem" }}>
          Already have an account?{" "}
          <a href="/" style={linkStyle}>
            Sign in
          </a>
        </p>
      </div>
    </div>
  );
}
