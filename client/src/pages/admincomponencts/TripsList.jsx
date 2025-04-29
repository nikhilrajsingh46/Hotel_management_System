import React, { useEffect, useState } from 'react';
import axios from 'axios';

const TripsList = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchBookings = async () => {
    try {
      const res = await axios.get('http://localhost:3001/bookings');
      setBookings(res.data);
    } catch (error) {
      console.error('Error fetching bookings:', error);
    } finally {
      setLoading(false);
    }
  };

  

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3001/bookings/delete/${id}`);
      setBookings(bookings.filter((booking) => booking._id !== id));
      alert('Booking deleted successfully!');
    } catch (error) {
      console.error('Error deleting booking:', error);
      alert('Failed to delete booking!');
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  if (loading) return <div style={styles.loading}>Loading...</div>;

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Bookings List</h2>
      <table style={styles.table}>
        <thead>
          <tr style={styles.tableHeaderRow}>
            <th style={styles.tableHeader}>#</th>
            <th style={styles.tableHeader}>Listing</th>
            <th style={styles.tableHeader}>Host</th>
            <th style={styles.tableHeader}>Start Date</th>
            <th style={styles.tableHeader}>End Date</th>
            <th style={styles.tableHeader}>Total Price</th>
            <th style={styles.tableHeader}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {bookings.map((booking, index) => (
            <tr key={booking._id}>
              <td style={styles.tableCell}>{index + 1}</td>
              <td style={styles.tableCell}>
                {booking.listingId?.title} ({booking.listingId?.city}, {booking.listingId?.country})
              </td>
              <td style={styles.tableCell}>
                {booking.hostId?.firstName} {booking.hostId?.lastName}
              </td>
              <td style={styles.tableCell}>{booking.startDate}</td>
              <td style={styles.tableCell}>{booking.endDate}</td>
              <td style={styles.tableCell}>${booking.totalPrice}</td>
              <td style={styles.tableCell}>
               
                <button
                  onClick={() => handleDelete(booking._id)}
                  style={{ ...styles.button, ...styles.deleteButton }}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
          {bookings.length === 0 && (
            <tr>
              <td colSpan="7" style={styles.noData}>
                No bookings found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

// Internal Styles
const styles = {
  container: {
    padding: '20px',
    fontFamily: 'Arial, sans-serif',
  },
  heading: {
    fontSize: '24px',
    fontWeight: 'bold',
    marginBottom: '20px',
  },
  loading: {
    textAlign: 'center',
    padding: '50px',
    fontSize: '18px',
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
  },
  tableHeaderRow: {
    backgroundColor: '#f2f2f2',
  },
  tableHeader: {
    border: '1px solid #ccc',
    padding: '10px',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  tableCell: {
    border: '1px solid #ccc',
    padding: '10px',
    textAlign: 'center',
  },
  button: {
    padding: '5px 10px',
    margin: '0 5px',
    borderRadius: '5px',
    border: 'none',
    cursor: 'pointer',
    color: '#fff',
  },
  cancelButton: {
    backgroundColor: '#f0ad4e', // orange
  },
  deleteButton: {
    backgroundColor: '#d9534f', // red
  },
  noData: {
    textAlign: 'center',
    padding: '20px',
    fontStyle: 'italic',
    color: '#777',
  },
};

export default TripsList;
