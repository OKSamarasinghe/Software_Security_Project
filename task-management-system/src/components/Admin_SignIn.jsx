import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import DOMPurify from "dompurify";
import logo from "../assets/images/taskmasterlogo.png";
import ReCAPTCHA from "react-google-recaptcha";

export default function Admin_SignIn() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [recaptchaToken, setRecaptchaToken] = useState(null);

  useEffect(() => {
    // Prevent back navigation by pushing a new state
    window.history.pushState(null, null, window.location.href);

    const handlePopState = (event) => {
      event.preventDefault();
      window.history.pushState(null, null, window.location.href);
    };

    window.addEventListener("popstate", handlePopState);

    return () => {
      window.removeEventListener("popstate", handlePopState);
    };
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!recaptchaToken) {
      setErrorMessage("Please complete the reCAPTCHA.");
      return;
    }

    const sanitizedEmail = DOMPurify.sanitize(email);
    const sanitizedPassword = DOMPurify.sanitize(password);

    try {
      const response = await axios.post("http://localhost:8080/admin/login", {
        email: sanitizedEmail,
        password: sanitizedPassword,
      });

      if (response.status === 200) {
        const adminData = {
          admin_id: response.data.admin_id,
          email: response.data.email,
        };
        localStorage.setItem("admin", JSON.stringify(adminData));
        setErrorMessage("");
        navigate("/admin-home");
      }
    } catch (error) {
      if (error.response && error.response.status === 401) {
        setErrorMessage(DOMPurify.sanitize("Incorrect email or password."));
      } else {
        setErrorMessage(
          DOMPurify.sanitize("Something went wrong. Please try again later.")
        );
      }
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
          Admin Sign In
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
        <form onSubmit={handleSubmit}>
          {errorMessage && (
            <p
              style={{
                color: "red",
                fontSize: "0.875rem",
                marginBottom: "1rem",
              }}
            >
              {errorMessage}
            </p>
          )}
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
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
            href="/admin-signup"
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
