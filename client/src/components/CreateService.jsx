"use client"

import { useState } from "react"
import axios from "axios"

const CreateService = ({ userId, onServiceCreated }) => {
  const [serviceName, setServiceName] = useState("")
  const [description, setDescription] = useState("")
  const [status, setStatus] = useState("Pending") // Default to 'Pending'
  const [errorMessage, setErrorMessage] = useState("")
  const [successMessage, setSuccessMessage] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Styles
  const styles = {
    form: {
      maxWidth: "100%",
    },
    formGroup: {
      marginBottom: "20px",
    },
    label: {
      display: "block",
      marginBottom: "5px",
      fontWeight: "bold",
    },
    select: {
      width: "100%",
      padding: "10px",
      borderRadius: "5px",
      border: "1px solid #ddd",
      fontSize: "16px",
    },
    textarea: {
      width: "100%",
      padding: "10px",
      borderRadius: "5px",
      border: "1px solid #ddd",
      fontSize: "16px",
      minHeight: "100px",
      resize: "vertical",
    },
    button: {
      padding: "10px 20px",
      backgroundColor: "#007BFF",
      color: "white",
      border: "none",
      borderRadius: "5px",
      cursor: "pointer",
      fontSize: "16px",
      fontWeight: "bold",
    },
    disabledButton: {
      opacity: 0.7,
      cursor: "not-allowed",
    },
    error: {
      color: "red",
      marginBottom: "15px",
      padding: "10px",
      backgroundColor: "#f8d7da",
      borderRadius: "5px",
    },
    success: {
      color: "green",
      marginBottom: "15px",
      padding: "10px",
      backgroundColor: "#d4edda",
      borderRadius: "5px",
    },
  }

  // Handler for submitting the form
  const handleSubmit = async (e) => {
    e.preventDefault() // Prevent default form submission

    if (!serviceName || !description) {
      setErrorMessage("Please fill in all required fields")
      return
    }

    setIsSubmitting(true)

    // Data to be sent in the POST request
    const serviceData = {
      userId,
      serviceName,
      description,
      status,
    }

    try {
      // Sending POST request using axios
      const response = await axios.post("http://localhost:3001/services/create", serviceData)
      setSuccessMessage("Service requested successfully!")
      setErrorMessage("")

      // Clear form after successful creation
      setServiceName("")
      setDescription("")
      setStatus("Pending")

      // Call the callback if provided
      if (onServiceCreated) {
        setTimeout(() => {
          onServiceCreated()
        }, 1500) // Give user time to see success message
      }
    } catch (error) {
      setErrorMessage("Failed to create service: " + (error.response?.data?.message || error.message))
      setSuccessMessage("")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="create-service-form">
      <h3>Request a New Service</h3>

      {/* Display error message */}
      {errorMessage && <div style={styles.error}>{errorMessage}</div>}

      {/* Display success message */}
      {successMessage && <div style={styles.success}>{successMessage}</div>}

      <form onSubmit={handleSubmit} style={styles.form}>
        <div style={styles.formGroup}>
          <label htmlFor="serviceName" style={styles.label}>
            Service Type*
          </label>
          <select
            id="serviceName"
            value={serviceName}
            onChange={(e) => setServiceName(e.target.value)}
            required
            style={styles.select}
          >
            <option value="">Select a service</option>
            <option value="Cleaning">Cleaning</option>
            <option value="Laundry">Laundry</option>
            <option value="Grocery Shopping">Grocery Shopping</option>
            <option value="Meal Preparation">Meal Preparation</option>
            <option value="Transportation">Transportation</option>
            <option value="Childcare">Childcare</option>
            <option value="Pet Care">Pet Care</option>
            <option value="Gardening">Gardening</option>
            <option value="Handyman Services">Handyman Services</option>
            <option value="Personal Shopping">Personal Shopping</option>
          </select>
        </div>

        <div style={styles.formGroup}>
          <label htmlFor="description" style={styles.label}>
            Description*
          </label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            placeholder="Please provide details about your service request..."
            style={styles.textarea}
          ></textarea>
        </div>

        <button
          type="submit"
          style={isSubmitting ? { ...styles.button, ...styles.disabledButton } : styles.button}
          disabled={isSubmitting}
        >
          {isSubmitting ? "Submitting..." : "Submit Request"}
        </button>
      </form>
    </div>
  )
}

export default CreateService
