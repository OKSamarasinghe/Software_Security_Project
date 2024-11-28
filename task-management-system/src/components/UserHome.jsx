import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/images/taskmasterlogo.png";

export default function UserHome() {
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

  const [tasks] = useState([
    { id: 1, title: "Task 1", description: "Description 1", date: "2024-11-28" },
    { id: 2, title: "Task 2", description: "Description 2", date: "2024-11-29" },
    { id: 3, title: "Task 3", description: "Description 3", date: "2024-12-01" },
    { id: 4, title: "Task 4", description: "Description 4", date: "2024-12-05" },
  ]);

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
          <button style={buttonStyle} onClick={() => navigate("/user-create-task")}>
            Create Task
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

      {/* Main Content */}
      <div style={{ padding: "2rem", textAlign: "center" }}>
        <h1>Welcome to the User Home Page</h1>
        <p>Explore your tasks and manage them efficiently.</p>

        {/* Task Cards */}
        <div style={taskContainerStyle}>
          {tasks.map((task) => (
            <div key={task.id} style={taskCardStyle}>
              <div style={taskTitleStyle}>{task.title}</div>
              <div style={taskDescriptionStyle}>{task.description}</div>
              <div style={taskDateStyle}>{task.date}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
