import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/images/taskmasterlogo.png";

export default function User_ViewTask() {
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

  const tableStyle = {
    width: "80%",
    margin: "2rem auto",
    borderCollapse: "collapse",
  };

  const thTdStyle = {
    border: "1px solid #ccc",
    padding: "0.5rem",
    textAlign: "center",
  };

  const [tasks, setTasks] = useState([
    { id: 1, title: "Task 1", description: "Description 1", date: "2024-11-28" },
    { id: 2, title: "Task 2", description: "Description 2", date: "2024-11-29" },
  ]);

  const handleDelete = (taskId) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this task?");
    if (confirmDelete) {
      setTasks(tasks.filter((task) => task.id !== taskId));
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
          <button style={buttonStyle} onClick={() => navigate("/user-create-task")}>
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

      {/* Table */}
      <div style={{ textAlign: "center", marginTop: "2rem" }}>
        <h1>View Tasks</h1>
        <table style={tableStyle}>
          <thead>
            <tr>
              <th style={thTdStyle}>Task ID</th>
              <th style={thTdStyle}>Title</th>
              <th style={thTdStyle}>Description</th>
              <th style={thTdStyle}>Date</th>
              <th style={thTdStyle}>Action</th>
            </tr>
          </thead>
          <tbody>
            {tasks.map((task) => (
              <tr key={task.id}>
                <td style={thTdStyle}>{task.id}</td>
                <td style={thTdStyle}>{task.title}</td>
                <td style={thTdStyle}>{task.description}</td>
                <td style={thTdStyle}>{task.date}</td>
                <td style={thTdStyle}>
                  <button
                    style={buttonStyle}
                    onClick={() => navigate(`/user-task-edit`, { state: { task } })}
                  >
                    Edit
                  </button>
                  <button
                    style={{ ...buttonStyle, backgroundColor: "#f56565", color: "white" }}
                    onClick={() => handleDelete(task.id)}
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
