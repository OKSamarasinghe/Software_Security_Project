import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import logo from "../assets/images/taskmasterlogo.png";

export default function Admin_taskManagement() {
  const navigate = useNavigate();

  // State to hold tasks fetched from the backend
  const [tasks, setTasks] = useState([]);

  // Fetch tasks from the backend
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axios.get("http://localhost:8080/task/gettask");
        console.log("Tasks fetched from backend:", response.data); // Check if user_id is present
        setTasks(response.data);
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    };
  
    fetchTasks();
  }, []);

  // Function to delete a task
  const handleDelete = async (taskId) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this task?");
    if (!confirmDelete) return;

    try {
      await axios.delete(`http://localhost:8080/task/deletetask/${taskId}`); // Replace with your delete API
      setTasks((prevTasks) => prevTasks.filter((task) => task.task_id !== taskId)); // Update tasks in state
      alert("Task deleted successfully!");
    } catch (error) {
      console.error("Error deleting task:", error);
      alert("Failed to delete the task.");
    }
  };

  // Styles
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

  const menuStyle = {
    display: "flex",
    gap: "2rem",
    listStyle: "none",
    margin: 0,
    padding: 0,
  };

  const menuItemStyle = {
    cursor: "pointer",
    fontWeight: "bold",
    textDecoration: "none",
    color: "white",
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

  const tableStyle = {
    width: "100%",
    borderCollapse: "collapse",
    marginTop: "2rem",
  };

  const thStyle = {
    borderBottom: "1px solid #ddd",
    padding: "0.75rem",
    textAlign: "left",
    backgroundColor: "#f3f4f6",
    fontWeight: "bold",
  };

  const tdStyle = {
    borderBottom: "1px solid #ddd",
    padding: "0.75rem",
  };

  const deleteButtonStyle = {
    padding: "0.5rem 1rem",
    backgroundColor: "#ef4444",
    color: "white",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
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

        <ul style={menuStyle}>
          <li style={menuItemStyle} onClick={() => navigate("/admin-home")}>
            Admin Home
          </li>
          <li style={menuItemStyle} onClick={() => navigate("/admin-user-management")}>
            User Management
          </li>
          <li style={menuItemStyle} onClick={() => navigate("/admin-task-management")}>
            Task Management
          </li>
          <li style={menuItemStyle} onClick={() => navigate("/admin-management")}>
            Admins
          </li>
        </ul>

        <div style={actionStyle}>
          <button style={buttonStyle} onClick={() => navigate("/admin-profile")}>
            Profile
          </button>
          <button style={buttonStyle} onClick={() => navigate("/admin-signin")}>
            Log Out
          </button>
        </div>
      </nav>

      {/* Task Management Table */}
      <div style={{ padding: "2rem" }}>
        <h1>Task Management</h1>
        <table style={tableStyle}>
          <thead>
            <tr>
              <th style={thStyle}>User ID</th>
              <th style={thStyle}>Task ID</th>
              <th style={thStyle}>Title</th>
              <th style={thStyle}>Description</th>
              <th style={thStyle}>Date</th>
              <th style={thStyle}>Action</th>
            </tr>
          </thead>
          <tbody>
  {tasks.map((task) => (
    <tr key={task.task_id}>
      <td style={tdStyle}>{task.user_id || "Unknown User"}</td> {/* Fetch from response */}
      <td style={tdStyle}>{task.task_id}</td>
      <td style={tdStyle}>{task.title}</td>
      <td style={tdStyle}>{task.description}</td>
      <td style={tdStyle}>{task.date}</td>
      <td style={tdStyle}>
        <button
          style={deleteButtonStyle}
          onClick={() => handleDelete(task.task_id)}
        >
          Delete
        </button>
      </td>
    </tr>
  ))}
</tbody>
        </table>
      </div>
    </div>
  );
}
