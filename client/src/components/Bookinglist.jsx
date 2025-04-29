import React, { useState, useEffect, useRef } from 'react';
import { Delete, Payment as PaymentIcon } from '@mui/icons-material';
import { useDispatch } from 'react-redux';
import { setTripList } from '../redux/state'; // Adjust import path if needed
import PaymentEsewa from './PaymentEsewa';

const BookingList = ({ userId }) => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedBookingForPayment, setSelectedBookingForPayment] = useState(null);
  const dispatch = useDispatch();
  const formRef = useRef(null); // New form ref

  // Fetch bookings
  useEffect(() => {
    const fetchBookings = async () => {
      try {
        setLoading(true);
        const response = await fetch(`http://localhost:3001/users/reservation/${userId}`);
        
        if (!response.ok) {
          throw new Error('Failed to fetch bookings');
        }
        
        const data = await response.json();
        setBookings(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error('Error fetching bookings:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (userId) {
      fetchBookings();
    }
  }, [userId]);

  // Handle booking deletion
  const handleDeleteBooking = async (bookingId) => {
    if (!window.confirm('Are you sure you want to cancel this booking?')) return;
    
    try {
      const response = await fetch(`http://localhost:3001/bookings/${bookingId}`, { 
        method: 'DELETE' 
      });
      
      if (response.ok) {
        const updatedBookings = bookings.filter(booking => booking._id !== bookingId);
        setBookings(updatedBookings);
        dispatch(setTripList(updatedBookings));
      } else {
        throw new Error('Failed to delete booking');
      }
    } catch (err) {
      console.error('Error deleting booking:', err);
      alert('Failed to delete booking. Please try again.');
    }
  };

  // Handle payment success
  const handlePaymentSuccess = async (bookingId, transactionId) => {
    try {
      const response = await fetch(`http://localhost:3001/bookings/${bookingId}/payment`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          paymentStatus: 'Paid',
          transactionId
        })
      });
      
      if (response.ok) {
        setBookings(prevBookings => 
          prevBookings.map(booking => 
            booking._id === bookingId 
            ? { ...booking, paymentStatus: 'Paid', transactionId } 
            : booking
          )
        );
        setSelectedBookingForPayment(null);
      }
    } catch (err) {
      console.error('Error updating payment status:', err);
    }
  };

  if (loading) return <div>Loading bookings...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!bookings.length) return <div>No bookings found</div>;

  return (
    <div className="booking-list">
      <h2>Your Bookings</h2>

      {selectedBookingForPayment ? (
        <div className="payment-modal">
          <div className="payment-modal-content">
            <button 
              className="close-modal" 
              onClick={() => setSelectedBookingForPayment(null)}
            >
              &times;
            </button>

            {/* PaymentEsewa Form */}
            <PaymentEsewa 
              ref={formRef} 
              amount={selectedBookingForPayment.totalPrice} 
            />

            {/* Submit button */}
            <button 
              className="submit-payment-button" 
              onClick={() => formRef.current?.submit()}
              style={{ marginTop: '20px', padding: '10px 20px', backgroundColor: '#4CAF50', color: 'white', border: 'none', cursor: 'pointer' }}
            >
              Proceed to Pay
            </button>
          </div>
        </div>
      ) : null}

      <table className="booking-table">
        <thead>
          <tr>
            <th>Property</th>
            <th>Location</th>
            <th>Dates</th>
            <th>Price</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {bookings.map((booking) => (
            <tr key={booking._id}>
              <td>
                {booking.listing?.title || 'Unnamed Property'}
                {booking.listing?.listingPhotoPaths && booking.listing.listingPhotoPaths[0] && (
                  <img 
                    src={`http://localhost:3001/${booking.listing.listingPhotoPaths[0].replace('public', '')}`}
                    alt="Property" 
                    className="booking-thumbnail"
                    style={{ width: '50px', height: '50px', objectFit: 'cover', marginLeft: '10px' }}
                  />
                )}
              </td>
              <td>
                {booking.listing?.city}, {booking.listing?.province}, {booking.listing?.country}
              </td>
              <td>
                {new Date(booking.startDate).toLocaleDateString()} - {new Date(booking.endDate).toLocaleDateString()}
              </td>
              <td>${booking.totalPrice}</td>
              <td>{booking.paymentStatus || 'Pending'}</td>
              <td>
                <div className="booking-actions">
                  {booking.paymentStatus !== 'Paid' && (
                    <button 
                      className="pay-button"
                      onClick={() => setSelectedBookingForPayment(booking)}
                      title="Pay with eSewa"
                      style={{ marginRight: '10px', backgroundColor: '#2196F3', color: 'white', padding: '5px 10px', border: 'none', cursor: 'pointer' }}
                    >
                      <PaymentIcon /> Pay
                    </button>
                  )}
                  <button 
                    className="delete-button"
                    onClick={() => handleDeleteBooking(booking._id)}
                    title="Cancel Booking"
                    style={{ backgroundColor: '#f44336', color: 'white', padding: '5px 10px', border: 'none', cursor: 'pointer' }}
                  >
                    <Delete /> Cancel
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default BookingList;
