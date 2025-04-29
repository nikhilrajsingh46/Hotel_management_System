"use client"

import { useState } from "react"
import axios from "axios"

const UsersList = ({ users, onRefresh }) => {
  const [editingUser, setEditingUser] = useState(null)
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
  })

  const handleEdit = (user) => {
    setEditingUser(user)
    setFormData({
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
    })
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!editingUser) return

    try {
      await axios.put(`http://localhost:3001/auth/${editingUser._id}`, formData)
      setEditingUser(null)
      onRefresh()
    } catch (err) {
      console.error("Error updating user:", err)
    }
  }

  const handleDelete = async (userId) => {
    if (!window.confirm("Are you sure you want to delete this user?")) return

    try {
      await axios.delete(`http://localhost:3001/users/${userId}`)
      onRefresh()
    } catch (err) {
      console.error("Error deleting user:", err)
    }
  }

  return (
    <div className="users-list">
      {editingUser ? (
        <div className="edit-form-container">
          <h3>Edit User</h3>
          <form onSubmit={handleSubmit} className="edit-form">
            <div className="form-group">
              <label htmlFor="firstName">First Name</label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="lastName">Last Name</label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required />
            </div>
            <div className="form-actions">
              <button type="button" className="cancel-btn" onClick={() => setEditingUser(null)}>
                Cancel
              </button>
              <button type="submit" className="save-btn">
                Save Changes
              </button>
            </div>
          </form>
        </div>
      ) : (
        <div className="data-table">
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user._id}>
                  <td>
                    <div className="user-info">
                      <div className="user-avatar">
                        {user.profileImagePath ? (
                          <img
                            src={`http://localhost:3001/uploads/${user.profileImagePath}`}
                            alt={`${user.firstName} ${user.lastName}`}
                          />
                        ) : (
                          <div className="avatar-placeholder">
                            {user.firstName.charAt(0)}
                            {user.lastName.charAt(0)}
                          </div>
                        )}
                      </div>
                      <span>
                        {user.firstName} {user.lastName}
                      </span>
                    </div>
                  </td>
                  <td>{user.email}</td>
                  <td>{user.role}</td>
                  <td>
                    <div className="table-actions">
                      <button className="edit-btn" onClick={() => handleEdit(user)}>
                        Edit
                      </button>
                      <button className="delete-btn" onClick={() => handleDelete(user._id)}>
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}

export default UsersList;
