import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import ReCAPTCHA from "react-google-recaptcha";
import logo from "../assets/images/taskmasterlogo.png"; // Your logo path

export default function SignIn() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [recaptchaToken, setRecaptchaToken] = useState(null);

  useEffect(() => {
    // Push a new state to prevent going back
    window.history.pushState(null, null, window.location.href);

    const handleBackButton = (event) => {
      event.preventDefault();
      window.history.pushState(null, null, window.location.href);
    };

    window.addEventListener("popstate", handleBackButton);

    return () => {
      window.removeEventListener("popstate", handleBackButton);
    };
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!recaptchaToken) {
      setError("Please complete the reCAPTCHA to continue.");
      return;
    }

    try {
      const response = await axios.post("http://localhost:8080/user/login", {
        email: formData.email,
        password: formData.password,
      });

      if (response.status === 200) {
        localStorage.setItem("user", JSON.stringify(response.data));
        setError("");
        navigate("/user-home");
      } else {
        setError("Invalid email or password.");
      }
    } catch (error) {
      console.error("Login API error:", error);
      setError("Something went wrong. Please try again.");
    }
  };

  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#f3f4f6",
      }}
    >
      <div
        style={{
          backgroundColor: "white",
          padding: "3.5rem",
          borderRadius: "8px",
          boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
          width: "100%",
          maxWidth: "400px",
          textAlign: "center",
        }}
      >
        <a
          href="/admin-signin"
          style={{
            fontSize: "0.875rem",
            color: "#22c55e",
            textDecoration: "none",
            marginLeft: "auto",
            display: "block",
            textAlign: "right",
          }}
        >
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
            style={{
              width: "100%",
              padding: "0.5rem 1rem",
              margin: "0.5rem 0",
              borderRadius: "4px",
              border: "1px solid #d1d5db",
              fontSize: "1rem",
            }}
          />
          <input
            type="password"
            name="password"
            placeholder="Enter password"
            value={formData.password}
            onChange={handleChange}
            required
            style={{
              width: "100%",
              padding: "0.5rem 1rem",
              margin: "0.5rem 0",
              borderRadius: "4px",
              border: "1px solid #d1d5db",
              fontSize: "1rem",
            }}
          />
          <ReCAPTCHA
            sitekey="6LdfZo0qAAAAAMmi3pjIUIfbSyf3gIp-kUJlag2e"
            onChange={(token) => setRecaptchaToken(token)}
            onExpired={() => setRecaptchaToken(null)}
          />
          <a
            href="#"
            style={{
              fontSize: "0.875rem",
              color: "#22c55e",
              textDecoration: "none",
              marginLeft: "auto",
              display: "block",
              textAlign: "right",
            }}
          >
            Forgot password?
          </a>
          <button
            type="submit"
            style={{
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
            }}
          >
            Sign in
          </button>
        </form>
        <p style={{ marginTop: "1rem", fontSize: "0.875rem" }}>
          Don’t have an account?{" "}
          <a
            href="/signup"
            style={{
              color: "#22c55e",
              textDecoration: "none",
              fontWeight: "bold",
            }}
          >
            Sign up
          </a>
        </p>
      </div>
    </div>
  );
}
