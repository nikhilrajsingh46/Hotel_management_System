import { useState, useEffect } from 'react';
import '../styles/ListingCard.scss';
import { ArrowForwardIos, ArrowBackIosNew, Favorite, Delete } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { setWishList, setTripList } from '../redux/state';

const ListingCard = ({
  listingId,
  creator,
  listingPhotoPaths,
  city,
  province,
  country,
  category,
  type,
  price,
  startDate,
  endDate,
  totalPrice,
  booking,
  bookingId,
  onDeleteSuccess,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [feedbackText, setFeedbackText] = useState('');
  const [feedbackList, setFeedbackList] = useState([]);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const wishList = user?.wishList || [];
  const tripList = user?.tripList || [];

  const isLiked = wishList?.find((item) => item?._id === listingId);

  // SLIDER
  const goToPrevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + listingPhotoPaths.length) % listingPhotoPaths.length);
  };

  const goToNextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % listingPhotoPaths.length);
  };

  // PATCH WISHLIST
  const patchWishList = async () => {
    if (user?._id !== creator._id) {
      const response = await fetch(`http://localhost:3001/users/${user?._id}/${listingId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
      });
      const data = await response.json();
      dispatch(setWishList(data.wishList));
    }
  };

  // DELETE BOOKING
  const handleDeleteBooking = async (e) => {
    e.stopPropagation();
    if (!bookingId) return;
    setIsDeleting(true);

    try {
      const response = await fetch(`http://localhost:3001/bookings/${bookingId}`, { method: 'DELETE' });
      if (response.ok) {
        const updatedTripList = tripList.filter((trip) => trip._id !== bookingId);
        dispatch(setTripList(updatedTripList));
        if (onDeleteSuccess) onDeleteSuccess();
      } else {
        alert('Failed to delete booking. Please try again.');
      }
    } catch (err) {
      console.error('Error deleting booking:', err);
      alert('An error occurred while deleting the booking.');
    } finally {
      setIsDeleting(false);
    }
  };

  // SUBMIT FEEDBACK
  const handleFeedbackSubmit = async (e) => {
    e.stopPropagation();
    if (!feedbackText.trim() || !user) return;

    try {
      const response = await fetch(`http://localhost:3001/users/feedback`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: user._id,
          listingId,
          comment: feedbackText,
        }),
      });
      const newFeedback = await response.json();
      setFeedbackList((prev) => [newFeedback, ...prev]);
      setFeedbackText('');
    } catch (error) {
      console.error('Error submitting feedback:', error);
      alert('Could not add feedback. Try again.');
    }
  };

  // FETCH FEEDBACKS
  const fetchFeedbacks = async () => {
    try {
      const response = await fetch(`http://localhost:3001/feedbacks/${listingId}`);
      const data = await response.json();
      // Ensure feedbackList is always an array
      setFeedbackList(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error('Error fetching feedbacks:', error);
      // Set empty array on error
      setFeedbackList([]);
    }
  };

  useEffect(() => {
    fetchFeedbacks();
  }, [listingId]);

  return (
    <div
      className="listing-card"
      onClick={() => {
        navigate(`/properties/${listingId}`);
      }}>
      <div className="slider-container">
        <div className="slider" style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
          {listingPhotoPaths?.map((photo, index) => (
            <div key={index} className="slide">
              <img src={`http://localhost:3001/${photo?.replace('public', '')}`} alt={`photo ${index + 1}`} />
              <div className="prev-button" onClick={(e) => { e.stopPropagation(); goToPrevSlide(); }} title="Previous image">
                <ArrowBackIosNew sx={{ fontSize: '15px', color: '#1a3a5f' }} />
              </div>
              <div className="next-button" onClick={(e) => { e.stopPropagation(); goToNextSlide(); }} title="Next image">
                <ArrowForwardIos sx={{ fontSize: '15px', color: '#1a3a5f' }} />
              </div>
            </div>
          ))}
        </div>
      </div>

      <h3>{city}, {province}, {country}</h3>
      <p>{category}</p>

      {!booking ? (
        <>
          <p>{type}</p>
          <p><span>${price}</span> per night</p>
        </>
      ) : (
        <>
          <p>{startDate} - {endDate}</p>
          <p><span>${totalPrice}</span> total</p>
        </>
      )}

      <button className="favorite" onClick={(e) => { e.stopPropagation(); patchWishList(); }} disabled={!user}>
        {isLiked ? <Favorite sx={{ color: 'red' }} /> : <Favorite sx={{ color: 'white' }} />}
      </button>

      {booking && bookingId && (
        <button className="delete-booking" onClick={handleDeleteBooking} disabled={isDeleting} title="Cancel Booking">
          <Delete sx={{ color: 'white' }} />
        </button>
      )}

      
    </div>
  );
};

export default ListingCard;