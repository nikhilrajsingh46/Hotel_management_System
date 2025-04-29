import React, { useState } from 'react';
import axios from 'axios';

const ChangePasswordForm = ({ userId }) => {
  const [passwords, setPasswords] = useState({
    currentPassword: '',
    newPassword: '',
    confirmNewPassword: '',
  });

  const handleChange = (e) => {
    setPasswords({ ...passwords, [e.target.name]: e.target.value });
  };

  const handlePasswordUpdate = async (e) => {
    e.preventDefault();
    if (passwords.newPassword !== passwords.confirmNewPassword) {
      alert("New passwords don't match.");
      return;
    }

    try {
      await axios.put(`http://localhost:3001/auth/${userId}/change-password`, {
        currentPassword: passwords.currentPassword,
        newPassword: passwords.newPassword,
      });
      alert('Password updated!');
      setPasswords({ currentPassword: '', newPassword: '', confirmNewPassword: '' });
    } catch (err) {
      console.error(err);
      alert('Failed to update password.');
    }
  };

  const formStyle = {
    maxWidth: "400px",
    margin: "50px auto",
    padding: "30px",
    border: "1px solid #ccc",
    borderRadius: "8px",
    backgroundColor: "#f9f9f9",
    boxShadow: "0 0 10px rgba(0,0,0,0.1)",
  };

  const inputStyle = {
    width: "100%",
    padding: "12px 15px",
    fontSize: "16px",
    border: "1px solid #ddd",
    borderRadius: "4px",
    marginBottom: "20px",
    boxSizing: "border-box",
  };

  const labelStyle = {
    display: "block",
    marginBottom: "8px",
    fontWeight: "500",
    color: "#333",
    fontSize: "16px",
  };

  const buttonStyle = {
    width: "100%",
    padding: "12px",
    fontSize: "16px",
    backgroundColor: "#007bff",
    color: "#fff",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
  };

  return (
    <form onSubmit={handlePasswordUpdate} style={formStyle}>
      <label style={labelStyle}>Current Password</label>
      <input
        style={inputStyle}
        type="password"
        name="currentPassword"
        value={passwords.currentPassword}
        onChange={handleChange}
        required
      />

      <label style={labelStyle}>New Password</label>
      <input
        style={inputStyle}
        type="password"
        name="newPassword"
        value={passwords.newPassword}
        onChange={handleChange}
        required
      />

      <label style={labelStyle}>Confirm New Password</label>
      <input
        style={inputStyle}
        type="password"
        name="confirmNewPassword"
        value={passwords.confirmNewPassword}
        onChange={handleChange}
        required
      />

      <button type="submit" style={buttonStyle}>Change Password</button>
    </form>
  );
};

export default ChangePasswordForm;
