"use client"

import { useState } from "react"
import "../styles/UpdateProfileForm.scss"

const UpdateProfileForm = ({ user, onSuccess, onCancel }) => {
  const [formData, setFormData] = useState({
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
  })
  const [profileImage, setProfileImage] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setProfileImage(e.target.files[0])
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    try {
      const formDataToSend = new FormData()
      formDataToSend.append("firstName", formData.firstName)
      formDataToSend.append("lastName", formData.lastName)
      formDataToSend.append("email", formData.email)

      if (profileImage) {
        formDataToSend.append("profileImage", profileImage)
      }

      const response = await fetch(`http://localhost:3001/users/${user._id}/update`, {
        method: "PUT",
        body: formDataToSend,
      })

      if (!response.ok) {
        throw new Error(`Failed to update profile: ${response.status}`)
      }

      const updatedUser = await response.json()
      onSuccess(updatedUser)
    } catch (err) {
      setError(err.message)
      console.error("Error updating profile:", err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="update-profile-overlay">
      <div className="update-profile-form">
        <h2>Update Your Profile</h2>

        {error && <div className="error-message">{error}</div>}

        <form onSubmit={handleSubmit}>
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

          <div className="form-group">
            <label htmlFor="profileImage">Profile Image</label>
            <input type="file" id="profileImage" name="profileImage" onChange={handleImageChange} accept="image/*" />
            <small>Leave empty to keep current image</small>
          </div>

          <div className="form-actions">
            <button type="button" className="cancel-button" onClick={onCancel} disabled={loading}>
              Cancel
            </button>
            <button type="submit" className="submit-button" disabled={loading}>
              {loading ? "Updating..." : "Update Profile"}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default UpdateProfileForm
