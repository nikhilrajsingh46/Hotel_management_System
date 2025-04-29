"use client"

import { useState } from "react"
import "../styles/DeleteProfileModal.scss"

const DeleteProfileModal = ({ userId, onSuccess, onCancel }) => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [confirmation, setConfirmation] = useState("")

  const handleDelete = async () => {
    if (confirmation !== "DELETE") {
      setError("Please type DELETE to confirm")
      return
    }

    setLoading(true)
    setError(null)

    try {
      const response = await fetch(`http://localhost:3001/users/${userId}`, {
        method: "DELETE",
      })

      if (!response.ok) {
        throw new Error(`Failed to delete account: ${response.status}`)
      }

      onSuccess()
    } catch (err) {
      setError(err.message)
      console.error("Error deleting account:", err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="delete-profile-overlay">
      <div className="delete-profile-modal">
        <h2>Delete Your Account</h2>
        <p className="warning">Warning: This action cannot be undone. All your data will be permanently deleted.</p>

        {error && <div className="error-message">{error}</div>}

        <div className="confirmation-input">
          <label htmlFor="confirmation">Type DELETE to confirm:</label>
          <input type="text" id="confirmation" value={confirmation} onChange={(e) => setConfirmation(e.target.value)} />
        </div>

        <div className="modal-actions">
          <button className="cancel-button" onClick={onCancel} disabled={loading}>
            Cancel
          </button>
          <button className="delete-button" onClick={handleDelete} disabled={loading || confirmation !== "DELETE"}>
            {loading ? "Deleting..." : "Delete Account"}
          </button>
        </div>
      </div>
    </div>
  )
}

export default DeleteProfileModal
