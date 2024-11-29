import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios"; // Make sure Axios is imported for HTTP requests
import logo from "../assets/images/taskmasterlogo.png";

export default function User_TaskEdit() {
  const navigate = useNavigate();
  const location = useLocation();

  // Validate incoming state
  const task =
    location.state?.task && typeof location.state.task === "object"
      ? location.state.task
      : {
          task_id: "",
          title: "",
          description: "",
          date: "",
        };

  const [formData, setFormData] = useState({ ...task });
  const [error, setError] = useState("");

  // Get user data from localStorage
  const userData = JSON.parse(localStorage.getItem("user")); // Get the user object from localStorage
  const userId = userData ? userData.user_id : null; // Use null or handle the case when user is not logged in

  useEffect(() => {
    if (!task || !task.task_id) {
      setError("Task not found.");
    }
  }, [task]);

  // Navbar styles
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

  // Form styles
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

  // Handle input changes with basic sanitization
  const handleInputChange = (e) => {
    const { name, value } = e.target;

    // Prevent script injection by sanitizing inputs
    const sanitizedValue = value.replace(/<script.*?>.*?<\/script>/gi, "");

    setFormData({ ...formData, [name]: sanitizedValue });
  };

  // Handle form submission to update the task
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation for special characters in title and description
    const specialCharRegex = /[!@#$%^&*(),.?":{}|<>]/g;
    if (specialCharRegex.test(formData.title)) {
      setError("Invalid title. Please check your input.");
      return;
    }
    if (specialCharRegex.test(formData.description)) {
      setError("Invalid description. Please check your input.");
      return;
    }

    // Validate other inputs
    if (!formData.title || formData.title.length < 3) {
      alert("Task title must be at least 3 characters.");
      return;
    }

    if (!formData.description || formData.description.length < 10) {
      alert("Task description must be at least 10 characters.");
      return;
    }

    if (!formData.date || new Date(formData.date) < new Date()) {
      alert("Task date cannot be in the past.");
      return;
    }

    try {
      // Send PUT request to update the task
      const response = await axios.put(
        `http://localhost:8080/task/users/${userId}/updatetask/${task.task_id}`,
        formData
      );

      if (response.status === 200) {
        alert("Task updated successfully!");
        navigate("/user-view-task"); // Redirect back to the task view page after successful update
      } else {
        setError("Failed to update task. Please try again.");
      }
    } catch (err) {
      console.error("Error updating task:", err);
      setError("An error occurred while updating the task.");
    }
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
          <button
            style={buttonStyle}
            onClick={() => navigate("/user-create-task")}
          >
            Create Task
          </button>
          <button style={buttonStyle} onClick={() => navigate("/user-profile")}>
            Profile
          </button>
          <button style={buttonStyle} onClick={() => navigate("/")}>
            Log Out
          </button>
        </div>
      </nav>

      {/* Edit Task Form */}
      <div style={formStyle}>
        <h2 style={{ textAlign: "center", marginBottom: "1rem" }}>Edit Task</h2>
        {error && <p style={{ color: "red", textAlign: "center" }}>{error}</p>}
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="title"
            value={formData.title}
            style={inputStyle}
            placeholder="Task Title"
            onChange={handleInputChange}
            required
          />
          <textarea
            name="description"
            value={formData.description}
            style={{ ...inputStyle, height: "100px" }}
            placeholder="Task Description"
            onChange={handleInputChange}
            required
          />
          <input
            type="date"
            name="date"
            value={formData.date}
            style={inputStyle}
            onChange={handleInputChange}
            required
          />
          <button type="submit" style={submitButtonStyle}>
            Save Changes
          </button>
        </form>
      </div>
    </div>
  );
}
