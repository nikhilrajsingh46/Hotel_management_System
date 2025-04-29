"use client"

import { useEffect, useState } from "react"
import axios from "axios"
import CreateService from "./CreateService"

const ServicePage = ({ userId }) => {
  const [services, setServices] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [activeView, setActiveView] = useState("history")

  // Fetch user's service requests
  const fetchServices = async () => {
    try {
      setLoading(true)
      const response = await axios.get(`http://localhost:3001/services/userid/${userId}`)
      setServices(response.data)
      setError(null)
    } catch (err) {
      console.error("Error fetching services:", err)
      setError("Failed to load service requests. Please try again later.")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (userId) {
      fetchServices()
    }
  }, [userId])

  // Cancel a service
  const cancelService = async (serviceId) => {
    try {
      if (!serviceId) {
        console.error("Invalid service ID")
        return
      }
      console.log("Cancelling service with ID:", serviceId)
      await axios.patch(`http://localhost:3001/services/cancel/${serviceId}`)
      console.log('Service cancelled successfully')
      fetchServices() // Refresh the list after cancellation
    } catch (error) {
      console.error('Error cancelling service:', error)
      alert('Failed to cancel the service.')
    }
  }

  // Delete a cancelled service
  const deleteService = async (serviceId) => {
    if (!serviceId) {
      console.error("Missing service ID")
      return
    }
    try {
      await axios.delete(`http://localhost:3001/services/delete/${serviceId}`)
      fetchServices()
    } catch (error) {
      console.error('Error deleting service:', error)
      alert('Failed to delete service.')
    }
  }

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleString()
  }

  const styles = {
    // styles remain same...
    container: { fontFamily: "Arial, sans-serif" },
    header: { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" },
    title: { margin: "0" },
    viewToggle: { display: "flex", gap: "10px" },
    button: { padding: "8px 16px", border: "none", borderRadius: "5px", backgroundColor: "#eee", cursor: "pointer", fontWeight: "bold", transition: "background-color 0.3s ease" },
    actionButton: { padding: "6px 12px", marginRight: "5px", border: "none", borderRadius: "5px", cursor: "pointer", fontWeight: "bold" },
    cancelButton: { backgroundColor: "#ffc107", color: "white" },
    deleteButton: { backgroundColor: "#dc3545", color: "white" },
    activeButton: { backgroundColor: "#007BFF", color: "white" },
    table: { width: "100%", borderCollapse: "collapse", marginTop: "20px" },
    th: { backgroundColor: "#f2f2f2", padding: "10px", textAlign: "left", borderBottom: "1px solid #ddd" },
    td: { padding: "10px", borderBottom: "1px solid #ddd" },
    statusBadge: { padding: "5px 10px", borderRadius: "20px", display: "inline-block", fontWeight: "bold", fontSize: "0.8rem" },
    pending: { backgroundColor: "#FFF3CD", color: "#856404" },
    inProgress: { backgroundColor: "#D1ECF1", color: "#0C5460" },
    completed: { backgroundColor: "#D4EDDA", color: "#155724" },
    cancelled: { backgroundColor: "#F8D7DA", color: "#721C24" },
    noServices: { textAlign: "center", padding: "20px", backgroundColor: "#f8f9fa", borderRadius: "5px", marginTop: "20px" },
    refreshButton: { marginLeft: "10px", padding: "5px 10px", backgroundColor: "#6c757d", color: "white", border: "none", borderRadius: "5px", cursor: "pointer" },
    error: { color: "red", padding: "10px", backgroundColor: "#f8d7da", borderRadius: "5px", marginBottom: "15px" },
  }

  const getStatusStyle = (status) => {
    switch (status) {
      case "Pending": return { ...styles.statusBadge, ...styles.pending }
      case "In Progress": return { ...styles.statusBadge, ...styles.inProgress }
      case "Completed": return { ...styles.statusBadge, ...styles.completed }
      case "Cancelled": return { ...styles.statusBadge, ...styles.cancelled }
      default: return styles.statusBadge
    }
  }

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h2 style={styles.title}>Room Service Requests</h2>
        <div style={styles.viewToggle}>
          <button
            style={activeView === "history" ? { ...styles.button, ...styles.activeButton } : styles.button}
            onClick={() => setActiveView("history")}
          >
            View History
          </button>
          <button
            style={activeView === "create" ? { ...styles.button, ...styles.activeButton } : styles.button}
            onClick={() => setActiveView("create")}
          >
            Request Service
          </button>
          {activeView === "history" && (
            <button style={styles.refreshButton} onClick={fetchServices} title="Refresh service list">
              ↻
            </button>
          )}
        </div>
      </div>

      {error && <div style={styles.error}>{error}</div>}

      {activeView === "create" ? (
        <CreateService
          userId={userId}
          onServiceCreated={() => {
            setActiveView("history")
            fetchServices()
          }}
        />
      ) : (
        <>
          {loading ? (
            <p>Loading service requests...</p>
          ) : services.length > 0 ? (
            <table style={styles.table}>
              <thead>
                <tr>
                  <th style={styles.th}>Service</th>
                  <th style={styles.th}>Description</th>
                  <th style={styles.th}>Status</th>
                  <th style={styles.th}>Requested On</th>
                  <th style={styles.th}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {services.map((service) => (
                  <tr key={service.id}>
                    <td style={styles.td}>{service.serviceName}</td>
                    <td style={styles.td}>{service.description}</td>
                    <td style={styles.td}>
                      <span style={getStatusStyle(service.status)}>{service.status}</span>
                    </td>
                    <td style={styles.td}>{formatDate(service.createdAt)}</td>
                    <td style={styles.td}>
                      {service.status !== "Cancelled" && (
                        <button
                          style={{ ...styles.actionButton, ...styles.cancelButton }}
                          onClick={() => {
                            if (window.confirm("Are you sure you want to cancel this service?", service.serviceName, service.id)) {
                              cancelService(service._id)
                            }
                          }}
                        >
                          Cancel
                        </button>
                      )}
                      {service.status === "Cancelled" && (
                        <button
                          style={{ ...styles.actionButton, ...styles.deleteButton }}
                          onClick={() => {
                            if (window.confirm("Are you sure you want to delete this cancelled service?")) {
                              deleteService(service._id)
                            }
                          }}
                        >
                          Delete
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div style={styles.noServices}>
              <p>You haven't requested any services yet.</p>
              <button style={styles.button} onClick={() => setActiveView("create")}>
                Request Your First Service
              </button>
            </div>
          )}
        </>
      )}
    </div>
  )
}

export default ServicePage
