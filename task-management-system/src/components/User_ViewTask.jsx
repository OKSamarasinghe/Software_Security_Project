import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/images/taskmasterlogo.png";

export default function User_ViewTask() {
  const navigate = useNavigate();
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Get user data from localStorage
  const userData = JSON.parse(localStorage.getItem("user")); // Get the user object from localStorage
  const userId = userData ? userData.user_id : null; // Use null or handle the case when user is not logged in

  useEffect(() => {
    if (!userId) {
      setError("User not logged in. Please log in to view tasks.");
      setLoading(false);
      return;
    }

    // Fetch tasks for the user from the API
    fetch(`http://localhost:8080/task/users/${userId}/tasks`)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        setTasks(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching tasks:", error);
        setError("Failed to load tasks. Please try again later.");
        setLoading(false);
      });
  }, [userId]);

  const handleDelete = (task_id) => {
    console.log("Deleting task with ID:", task_id);
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this task?"
    );
    if (confirmDelete) {
      fetch(`http://localhost:8080/task/deletetask/${task_id}`, {
        method: "DELETE",
      })
        .then((response) => {
          if (response.ok) {
            setTasks((prevTasks) =>
              prevTasks.filter((task) => task.task_id !== task_id)
            );
            alert("Task deleted successfully!");
          } else {
            console.error("Failed to delete task:", response.statusText);
            alert("Failed to delete task. Please try again.");
          }
        })
        .catch((error) => {
          console.error("Error deleting task:", error);
          alert("Failed to delete task. Please try again.");
        });
    }
  };

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

      <div style={{ textAlign: "center", marginTop: "2rem" }}>
        <h1>View Tasks</h1>

        {loading ? (
          <p>Loading tasks...</p>
        ) : error ? (
          <p style={{ color: "red" }}>{error}</p>
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
                  <tr key={task.task_id}>
                    <td style={thTdStyle}>{task.task_id}</td>
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
                        onClick={() => handleDelete(task.task_id)}
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
