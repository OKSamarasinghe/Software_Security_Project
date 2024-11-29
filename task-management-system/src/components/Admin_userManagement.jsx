import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import logo from "../assets/images/taskmasterlogo.png";

export default function Admin_userManagement() {
  const navigate = useNavigate();

  // State to store users fetched from the backend
  const [users, setUsers] = useState([]);

  // Fetch users from the backend when the component mounts
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get("http://localhost:8080/user/getusers"); // Update with your backend URL
        console.log("Users fetched from backend:", response.data); // Debugging logs
        setUsers(response.data); // Set the fetched data to state
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, []);

  // Function to delete a user
  const handleDelete = async (userId) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this user?");
    if (!confirmDelete) return;

    try {
      await axios.delete(`http://localhost:8080/user/deleteuser/${userId}`); // Adjust endpoint for deleting a user
      setUsers((prevUsers) => prevUsers.filter((user) => user.user_id !== userId));
      alert("User deleted successfully!");
    } catch (error) {
      console.error("Error deleting user:", error);
      alert("Failed to delete the user.");
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

      {/* User Management Table */}
      <div style={{ padding: "2rem" }}>
        <h1>User Management</h1>
        <table style={tableStyle}>
          <thead>
            <tr>
              <th style={thStyle}>User ID</th>
              <th style={thStyle}>First Name</th>
              <th style={thStyle}>Last Name</th>
              <th style={thStyle}>Email</th>
              <th style={thStyle}>Phone Number</th>
              <th style={thStyle}>Action</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.user_id}>
                <td style={tdStyle}>{user.user_id}</td>
                <td style={tdStyle}>{user.first_name}</td>
                <td style={tdStyle}>{user.last_name}</td>
                <td style={tdStyle}>{user.email}</td>
                <td style={tdStyle}>{user.phone_number}</td>
                <td style={tdStyle}>
                  <button
                    style={deleteButtonStyle}
                    onClick={() => handleDelete(user.user_id)}
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
