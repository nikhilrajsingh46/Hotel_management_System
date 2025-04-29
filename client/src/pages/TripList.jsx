import { useEffect, useState } from "react";
import "../styles/List.scss";
import Loader from "../components/Loader";
import Navbar from "../components/Navbar";
import { useDispatch, useSelector } from "react-redux";
import { setTripList } from "../redux/state";
import ListingCard from "../components/ListingCard";
import Footer from "../components/Footer";
import { useNavigate } from "react-router-dom";

const TripList = () => {
  const [loading, setLoading] = useState(true);
  const userId = useSelector((state) => state?.user?._id);
  const tripList = useSelector((state) => state?.user?.tripList);
  const [deleteSuccess, setDeleteSuccess] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const getTripList = async () => {
    try {
      const response = await fetch(
        `http://localhost:3001/users/${userId}/trips`,
        {
          method: "GET",
        }
      );

      const data = await response.json();
      dispatch(setTripList(data));
      setLoading(false);
    } catch (err) {
      console.log("Fetch Trip List failed!", err.message);
    }
  };

  useEffect(() => {
    if (!userId) {
      navigate("/login");
      return;
    }
    getTripList();
  }, [userId]);

  const handleDeleteSuccess = () => {
    setDeleteSuccess(true);
    setTimeout(() => {
      setDeleteSuccess(false);
    }, 3000);
    getTripList(); // Refresh the list after deletion
  };

  return loading ? (
    <Loader />
  ) : (
    <>
      {/* <Navbar /> */}
      <h1 className="title-list">Your Trip List</h1>

      {deleteSuccess && (
        <div className="delete-success-message">
          Booking has been successfully cancelled
        </div>
      )}

      <div className="list">
        {tripList?.length === 0 ? (
          <div className="empty-list">
            <h2>You haven't booked any trips yet</h2>
            <p>Explore properties and book your next adventure!</p>
          </div>
        ) : (
          tripList?.map((trip) => (
            <ListingCard
              key={trip._id}
              listingId={trip.listingId._id}
              creator={trip.hostId._id}
              listingPhotoPaths={trip.listingId.listingPhotoPaths}
              city={trip.listingId.city}
              province={trip.listingId.province}
              country={trip.listingId.country}
              category={trip.listingId.category}
              startDate={trip.startDate}
              endDate={trip.endDate}
              totalPrice={trip.totalPrice}
              booking={true}
              bookingId={trip._id}
              onDeleteSuccess={handleDeleteSuccess}
            />
          ))
        )}
      </div>
      {/* <Footer /> */}
    </>
  );
};

export default TripList;
