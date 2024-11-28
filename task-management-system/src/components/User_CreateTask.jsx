import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/images/taskmasterlogo.png";

export default function User_CreateTask() {
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

  const formStyle = {
    maxWidth: "500px",
    margin: "2rem auto",
    padding: "2rem",
    border: "1px solid #ccc",
    borderRadius: "8px",
    boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
  };

  const inputStyle = {
    width: "100%",
    padding: "0.5rem",
    margin: "0.5rem 0",
    border: "1px solid #ccc",
    borderRadius: "4px",
    fontSize: "1rem",
  };

  const submitButtonStyle = {
    width: "100%",
    padding: "0.5rem",
    backgroundColor: "#22c55e",
    color: "white",
    borderRadius: "4px",
    fontWeight: "bold",
    border: "none",
    cursor: "pointer",
    fontSize: "1rem",
  };

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    date: "",
  });

  const [error, setError] = useState("");

  const validateInput = (name, value) => {
    if (name === "title" || name === "description") {
      const regex = /^[a-zA-Z0-9\s.,'-]{1,100}$/; // Allow alphanumeric and limited punctuation, up to 100 characters.
      return regex.test(value);
    }
    if (name === "date") {
      const regex = /^\d{4}-\d{2}-\d{2}$/; // YYYY-MM-DD format.
      if (!regex.test(value)) return false;

      const today = new Date();
      const inputDate = new Date(value);
      today.setHours(0, 0, 0, 0); // Normalize today's date to midnight.
      return inputDate >= today; // Ensure the date is not in the past.
    }
    return true;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (validateInput(name, value)) {
      setFormData({ ...formData, [name]: value });
      setError(""); // Clear error if input becomes valid.
    } else {
      if (name === "date") {
        setError("Task date cannot be in the past.");
      } else {
        setError(`Invalid ${name}. Please check your input.`);
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { title, description, date } = formData;

    if (!title || !description || !date) {
      setError("All fields are required.");
      return;
    }

    // Final validation before submission
    if (
      !validateInput("title", title) ||
      !validateInput("description", description) ||
      !validateInput("date", date)
    ) {
      setError("Invalid input detected. Please fix errors.");
      return;
    }

    // Clear errors and simulate task creation
    setError("");
    console.log("Task Created:", formData);

    // Reset form after successful submission
    setFormData({ title: "", description: "", date: "" });

    // Notify the user
    alert("Task created successfully!");
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

      {/* Form */}
      <div style={formStyle}>
        <h2 style={{ textAlign: "center", marginBottom: "1rem" }}>Create a New Task</h2>
        {error && (
          <p style={{ color: "red", textAlign: "center", marginBottom: "1rem" }}>
            {error}
          </p>
        )}
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="title"
            placeholder="Task Title"
            style={inputStyle}
            value={formData.title}
            onChange={handleInputChange}
          />
          <textarea
            name="description"
            placeholder="Task Description"
            style={{ ...inputStyle, height: "100px" }}
            value={formData.description}
            onChange={handleInputChange}
          />
          <input
            type="date"
            name="date"
            style={inputStyle}
            value={formData.date}
            onChange={handleInputChange}
          />
          <button type="submit" style={submitButtonStyle}>
            Submit Task
          </button>
        </form>
      </div>
    </div>
  );
}
