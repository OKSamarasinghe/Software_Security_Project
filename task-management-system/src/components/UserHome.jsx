import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import logo from "../assets/images/taskmasterlogo.png";

export default function UserHome() {
  const navigate = useNavigate();

  const [tasks, setTasks] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    // Function to fetch tasks from the API
    const fetchTasks = async () => {
      try {
        const response = await axios.get("http://localhost:8080/task/gettasks"); // Replace with your API endpoint
        setTasks(response.data); // Assuming response.data contains the array of tasks
      } catch (error) {
        console.error("Error fetching tasks:", error);
        setError("Failed to load tasks. Please try again later.");
      }
    };

    fetchTasks();
  }, []); // Empty dependency array ensures this runs once on component mount

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

  const taskContainerStyle = {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
    gap: "1rem",
    padding: "2rem",
  };

  const taskCardStyle = {
    backgroundColor: "white",
    padding: "1rem",
    borderRadius: "8px",
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
    textAlign: "left",
  };

  const taskTitleStyle = {
    fontWeight: "bold",
    marginBottom: "0.5rem",
    fontSize: "1.2rem",
  };

  const taskDescriptionStyle = {
    color: "#555",
    marginBottom: "0.5rem",
  };

  const taskDateStyle = {
    color: "#999",
    fontSize: "0.9rem",
  };

  return (
    <div>
      {/* Navbar */}
      <nav style={navbarStyle}>
        {/* Logo */}
        <div style={logoStyle} onClick={() => navigate("/")}>
          <img
            src={logo}
            alt="Task Master Logo"
            style={{ width: "50px", height: "auto", marginRight: "1rem" }}
          />
        </div>

        {/* Action Buttons */}
        <div style={actionStyle}>
          <button
            style={buttonStyle}
            onClick={() => navigate("/user-create-task")}
          >
            Create Task
          </button>
          <button
            style={buttonStyle}
            onClick={() => navigate("/user-view-task")}
          >
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

      {/* Main Content */}
      <div style={{ padding: "2rem", textAlign: "center" }}>
        <h1>Welcome to the User Home Page</h1>
        <p>Explore your tasks and manage them efficiently.</p>

        {/* Error Message */}
        {error && <p style={{ color: "red" }}>{error}</p>}

        {/* Task Cards */}
        <div style={taskContainerStyle}>
          {tasks.length > 0 ? (
            tasks.map((task) => (
              <div key={task.id} style={taskCardStyle}>
                <div style={taskTitleStyle}>{task.title}</div>
                <div style={taskDescriptionStyle}>{task.description}</div>
                <div style={taskDateStyle}>{task.date}</div>
              </div>
            ))
          ) : (
            <p>No tasks available.</p>
          )}
        </div>
      </div>
    </div>
  );
}
