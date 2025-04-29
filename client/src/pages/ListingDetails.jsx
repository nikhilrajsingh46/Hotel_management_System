import { useEffect, useState } from "react";
import "../styles/ListingDetails.scss";
import { useNavigate, useParams } from "react-router-dom";
import { facilities } from "../data";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import { DateRange } from "react-date-range";
import Loader from "../components/Loader";
import Navbar from "../components/Navbar";
import { useSelector } from "react-redux";
import Footer from "../components/Footer";

const ListingDetails = () => {
  const [loading, setLoading] = useState(true);
  const [bookingSuccess, setBookingSuccess] = useState(false);
  const [bookingMessage, setBookingMessage] = useState("");
  const [feedbackList, setFeedbackList] = useState([]);
  const [newFeedback, setNewFeedback] = useState("");
  const [rating, setRating] = useState(1);
  const [submittingFeedback, setSubmittingFeedback] = useState(false);

  const { listingId } = useParams();
  const [listing, setListing] = useState(null);

  // Fetch listing details from API
  const getListingDetails = async () => {
    try {
      const response = await fetch(
        `http://localhost:3001/properties/${listingId}`,
        { method: "GET" }
      );
      const data = await response.json();
      setListing(data);
      setLoading(false);
    } catch (err) {
      console.log("Fetch Listing Details Failed", err.message);
    }
  };

  // Fetch feedbacks for a listing
  const getFeedbacks = async () => {
    try {
      const res = await fetch(
        `http://localhost:3001/feedback/feedback/${listingId}`
      );
      const data = await res.json();
      setFeedbackList(data);
    } catch (err) {
      console.log("Fetch Feedback Failed", err.message);
    }
  };

  useEffect(() => {
    getListingDetails();
    getFeedbacks();
  }, [listingId]);

  /* BOOKING CALENDAR */
  const [dateRange, setDateRange] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);

  const handleSelect = (ranges) => {
    setDateRange([ranges.selection]);
  };

  const start = new Date(dateRange[0].startDate);
  const end = new Date(dateRange[0].endDate);
  const dayCount = Math.round((end - start) / (1000 * 60 * 60 * 24));

  const customerId = useSelector((state) => state?.user?._id);
  const navigate = useNavigate();

  // Validate booking dates
  const validateDates = () => {
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Reset time to midnight for accurate comparison
    
    if (dateRange[0].startDate < today) {
      setBookingMessage("Error: Cannot book dates in the past");
      setBookingSuccess(false);
      return false;
    }
    
    if (dateRange[0].endDate < dateRange[0].startDate) {
      setBookingMessage("Error: End date cannot be before start date");
      setBookingSuccess(false);
      return false;
    }
    
    if (dayCount < 1) {
      setBookingMessage("Error: Minimum booking duration is 1 night");
      setBookingSuccess(false);
      return false;
    }
    
    return true;
  };

  // Handle booking submission
  const handleSubmit = async () => {
    if (!customerId) {
      navigate("/login");
      return;
    }

    // Validate dates before proceeding
    if (!validateDates()) {
      return;
    }

    try {
      const bookingForm = {
        customerId,
        listingId,
        hostId: listing.creator._id,
        startDate: dateRange[0].startDate.toDateString(),
        endDate: dateRange[0].endDate.toDateString(),
        totalPrice: listing.price * dayCount,
      };

      const response = await fetch("http://localhost:3001/bookings/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(bookingForm),
      });

      if (response.ok) {
        setBookingSuccess(true);
        setBookingMessage(
          `Booking successful! Your stay at ${listing.title} has been confirmed.`
        );
        setTimeout(() => {
          navigate(`/${customerId}/trips`);
        }, 3000);
      }
    } catch (err) {
      console.log("Submit Booking Failed.", err.message);
    }
  };

  // Handle feedback submission
  const handleFeedbackSubmit = async (e) => {
    e.preventDefault();
    if (!newFeedback.trim() || !customerId) {
      setBookingMessage("Please provide valid feedback and ensure you are logged in.");
      setBookingSuccess(false);
      return;
    }
  
    setSubmittingFeedback(true);
    setBookingMessage("");
  
    try {
      const res = await fetch("http://localhost:3001/feedback/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          listingId,
          customerId,
          comment: newFeedback,
          rating: rating,
        }),
      });
  
      if (res.ok) {
        setNewFeedback("");
        getFeedbacks();
        setBookingMessage("Feedback submitted successfully!");
        setBookingSuccess(true);
      } else {
        const errorData = await res.json();
        setBookingMessage(`Error: ${errorData.message || "Something went wrong!"}`);
        setBookingSuccess(false);
      }
    } catch (err) {
      console.log("Submit Feedback Failed:", err);
      setBookingMessage("An error occurred while submitting your feedback. Please try again.");
      setBookingSuccess(false);
    } finally {
      setSubmittingFeedback(false);
    }
  };

  return loading ? (
    <Loader />
  ) : (
    <>
      <div className="listing-details" style={{ color: '#000000' }}>
        {/* Error Message Display */}
        {!bookingSuccess && bookingMessage && (
          <div style={{
            color: 'red',
            padding: '10px',
            margin: '10px 0',
            border: '1px solid red',
            borderRadius: '4px',
            backgroundColor: '#ffeeee'
          }}>
            {bookingMessage}
          </div>
        )}

        {bookingSuccess && (
          <div className="booking-success-message">
            <div className="success-content">
              <h2 style={{ color: '#000000' }}>✅ Booking Confirmed!</h2>
              <p style={{ color: '#000000' }}>{bookingMessage}</p>
              <p style={{ color: '#000000' }}>Redirecting to your trips page...</p>
            </div>
          </div>
        )}

        <div className="title">
          <h1 style={{ color: '#000000' }}>{listing.title}</h1>
          <div></div>
        </div>

        <div className="photos">
          {listing.listingPhotoPaths?.map((item, idx) => (
            <img
              key={idx}
              src={`http://localhost:3001/${item.replace("public", "")}`}
              alt="listing"
            />
          ))}
        </div>

        <h2 style={{ color: '#000000' }}>
          {listing.type} in {listing.city}, {listing.province},{" "}
          {listing.country}
        </h2>
        <p style={{ color: '#000000' }}>
          {listing.guestCount} guests - {listing.bedroomCount} bedroom(s) -{" "}
          {listing.bedCount} bed(s) - {listing.bathroomCount} bathroom(s)
        </p>
        <hr />

        <div className="profile">
          <img
            src={`http://localhost:3001/${listing.creator.profileImagePath.replace(
              "public",
              ""
            )}`}
            alt="host"
          />
          <h3 style={{ color: '#000000' }}>
            Hosted by {listing.creator.firstName} {listing.creator.lastName}
          </h3>
        </div>
        <hr />

        <h3 style={{ color: '#000000' }}>Description</h3>
        <p style={{ color: '#000000' }}>{listing.description}</p>
        <hr />

        <h3 style={{ color: '#000000' }}>{listing.highlight}</h3>
        <p style={{ color: '#000000' }}>{listing.highlightDesc}</p>
        <hr />

        <div className="booking">
          <div>
            <h2 style={{ color: '#000000' }}>What this place offers?</h2>
            <div className="amenities">
              {listing.amenities[0].split(",").map((item, idx) => (
                <div className="facility" key={idx}>
                  <div className="facility_icon">
                    {facilities.find((f) => f.name === item)?.icon}
                  </div>
                  <p style={{ color: '#000000' }}>{item}</p>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h2 style={{ color: '#000000' }}>How long do you want to stay?</h2>
            <div className="date-range-calendar">
              <DateRange 
                ranges={dateRange} 
                onChange={handleSelect}
                minDate={new Date()} // Disables past dates in the calendar
              />
              <h2 style={{ color: '#000000' }}>
                ${listing.price} x {dayCount}{" "}
                {dayCount > 1 ? "nights" : "night"}
              </h2>
              <h2 style={{ color: '#000000' }}>Total price: ${listing.price * dayCount}</h2>
              <p style={{ color: '#000000' }}>Start Date: {dateRange[0].startDate.toDateString()}</p>
              <p style={{ color: '#000000' }}>End Date: {dateRange[0].endDate.toDateString()}</p>
              <button className="button" onClick={handleSubmit}>
                BOOK NOW
              </button>
            </div>
          </div>
        </div>

        <hr />

        {/* Feedback Section */}
        <div className="feedback-section" style={{ marginTop: '30px', color: '#000000' }}>
          <h2 style={{ color: '#000000' }}>Feedback</h2>

          {/* Feedback Form */}
          <form
            onSubmit={handleFeedbackSubmit}
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '15px',
              width: '100%',
              maxWidth: '500px',
              margin: '20px auto',
              padding: '15px',
              border: '1px solid #ddd',
              borderRadius: '8px',
              boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
              color: '#000000'
            }}
          >
            <textarea
              value={newFeedback}
              onChange={(e) => setNewFeedback(e.target.value)}
              placeholder="Leave your feedback..."
              rows="4"
              style={{
                padding: '10px',
                borderRadius: '5px',
                border: '1px solid #ccc',
                fontSize: '14px',
                resize: 'none',
                color: '#000000'
              }}
            ></textarea>

            <label style={{ fontSize: '14px', color: '#000000' }}>Rating</label>
            <select
              value={rating}
              onChange={(e) => setRating(Number(e.target.value))}
              style={{
                padding: '8px',
                borderRadius: '5px',
                border: '1px solid #ccc',
                fontSize: '14px',
                color: '#000000'
              }}
            >
              <option value={1}>1 - Poor</option>
              <option value={2}>2 - Fair</option>
              <option value={3}>3 - Good</option>
              <option value={4}>4 - Very Good</option>
              <option value={5}>5 - Excellent</option>
            </select>

            <button
              type="submit"
              disabled={submittingFeedback}
              style={{
                backgroundColor: '#4CAF50',
                color: 'white',
                padding: '10px',
                borderRadius: '5px',
                border: 'none',
                fontSize: '16px',
                cursor: submittingFeedback ? 'not-allowed' : 'pointer',
              }}
            >
              {submittingFeedback ? 'Submitting...' : 'Submit Feedback'}
            </button>
          </form>

          {/* Feedback List */}
          <div style={{ padding: "20px", maxWidth: "800px", margin: "0 auto" }}>
            {feedbackList.map((feedback, idx) => (
              <div
                key={idx}
                style={{
                  border: "1px solid #ddd",
                  borderRadius: "12px",
                  padding: "16px",
                  marginBottom: "20px",
                  boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                  backgroundColor: "#fff",
                  transition: "transform 0.2s",
                  display: "flex",
                  flexDirection: "column",
                  gap: "12px",
                  color: "#000000"
                }}
                onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.02)")}
                onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "12px"
                  }}
                >
                  <img
                    src={`http://localhost:3001/${feedback.customerId.profileImagePath.replace(
                      "public",
                      ""
                    )}`}
                    alt="customer"
                    style={{
                      width: "50px",
                      height: "50px",
                      borderRadius: "50%",
                      objectFit: "cover",
                      border: "2px solid #eee"
                    }}
                  />
                  <p style={{ margin: 0, fontSize: "16px", color: "#000000" }}>
                    <strong>
                      {feedback.customerId.firstName} {feedback.customerId.lastName}
                    </strong>{" "}
                    - <span style={{ color: "#ff9800" }}>{feedback.rating} ⭐</span>
                  </p>
                </div>
                <p style={{ margin: 0, fontSize: "14px", color: "#000000" }}>{feedback.comment}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default ListingDetails;