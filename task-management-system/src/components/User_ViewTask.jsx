import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/images/taskmasterlogo.png";

export default function User_ViewTask() {
  const navigate = useNavigate();
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch tasks from the API
    fetch("http://localhost:8080/task/gettasks")
      .then((response) => response.json())
      .then((data) => {
        setTasks(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching tasks:", error);
        setLoading(false);
      });
  }, []);

  const handleDelete = (task_id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this task?"
    );
    if (confirmDelete) {
      // Call API to delete task
      fetch(`http://localhost:8080/task/delete/${task_id}`, {
        method: "DELETE",
      })
        .then((response) => {
          if (response.ok) {
            setTasks(tasks.filter((task) => task.id !== task_id)); // Update local state after deletion
          } else {
            alert("Failed to delete task");
          }
        })
        .catch((error) => console.error("Error deleting task:", error));
    }
  };

  // Styling for the component
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

      {/* Table */}
      <div style={{ textAlign: "center", marginTop: "2rem" }}>
        <h1>View Tasks</h1>

        {loading ? (
          <p>Loading tasks...</p> // Loading state
        ) : (
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
              {tasks.length > 0 ? (
                tasks.map((task) => (
                  <tr key={task.id}>
                    <td style={thTdStyle}>{task.id}</td>
                    <td style={thTdStyle}>{task.title}</td>
                    <td style={thTdStyle}>{task.description}</td>
                    <td style={thTdStyle}>{task.date}</td>
                    <td style={thTdStyle}>
                      <button
                        style={buttonStyle}
                        onClick={() =>
                          navigate(`/user-task-edit`, { state: { task } })
                        }
                      >
                        Edit
                      </button>
                      <button
                        style={{
                          ...buttonStyle,
                          backgroundColor: "#f56565",
                          color: "white",
                        }}
                        onClick={() => handleDelete(task.id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" style={thTdStyle}>
                    No tasks available
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
