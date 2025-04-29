"use client"
import axios from "axios"

const ReservationsList = ({ reservations, onRefresh }) => {
  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" })
  }

  const handleDelete = async (reservationId) => {
    if (!window.confirm("Are you sure you want to delete this reservation?")) return

    try {
      await axios.delete(`http://localhost:3001/bookings/${reservationId}`)
      onRefresh()
    } catch (err) {
      console.error("Error deleting reservation:", err)
    }
  }

  return (
    <div className="reservations-list">
      <div className="data-table">
        <table>
          <thead>
            <tr>
              <th>Guest</th>
              <th>Property</th>
              <th>Dates</th>
              <th>Total Price</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {reservations.map((reservation) => (
              <tr key={reservation._id}>
                <td>
                  {reservation.customerId.firstName} {reservation.customerId.lastName}
                </td>
                <td>
                  {reservation.listingId.title} - {reservation.listingId.city}, {reservation.listingId.country}
                </td>
                <td>
                  {formatDate(reservation.startDate)} - {formatDate(reservation.endDate)}
                </td>
                <td>${reservation.totalPrice}</td>
                <td>
                  <div className="table-actions">
                    <button className="delete-btn" onClick={() => handleDelete(reservation._id)}>
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default ReservationsList
