const router = require("express").Router();
const Booking = require("../models/Booking");
const User = require("../models/User");
const Listing = require("../models/Listing");
const Feedback = require("../models/Feedback");

/* GET TRIP LIST */
router.get("/:userId/trips", async (req, res) => {
  try {
    const { userId } = req.params;
    const trips = await Booking.find({ customerId: userId })
                               .populate("customerId hostId listingId");

    if (!trips || trips.length === 0) {
      return res.status(404).json({ message: "No trips found." });
    }

    res.status(200).json(trips);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to retrieve trips", error: err.message });
  }
});

/* ADD LISTING TO WISHLIST */
router.patch("/:userId/:listingId", async (req, res) => {
  try {
    const { userId, listingId } = req.params;
    const user = await User.findById(userId);
    const listing = await Listing.findById(listingId).populate("creator");

    if (!user || !listing) {
      return res.status(404).json({ message: "User or Listing not found." });
    }

    const favoriteListing = user.wishList.find((item) => item._id.toString() === listingId);

    if (favoriteListing) {
      user.wishList = user.wishList.filter((item) => item._id.toString() !== listingId);
      await user.save();
      return res.status(200).json({ message: "Listing removed from wishlist.", wishList: user.wishList });
    } else {
      user.wishList.push(listing);
      await user.save();
      return res.status(200).json({ message: "Listing added to wishlist.", wishList: user.wishList });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to update wishlist", error: err.message });
  }
});

/* POST FEEDBACK */
router.post("/:userId/:listingId/feedback", async (req, res) => {
  try {
    const { userId, listingId } = req.params;
    const { rating, comment } = req.body;

    if (!rating || !comment) {
      return res.status(400).json({ message: "Rating and comment are required." });
    }

    const existingFeedback = await Feedback.findOne({ customerId: userId, listingId });

    if (existingFeedback) {
      existingFeedback.rating = rating;
      existingFeedback.comment = comment;
      await existingFeedback.save();

      return res.status(200).json({ message: "Feedback updated successfully.", feedback: existingFeedback });
    } else {
      const newFeedback = new Feedback({ customerId: userId, listingId, rating, comment });
      await newFeedback.save();

      return res.status(201).json({ message: "Feedback submitted successfully.", feedback: newFeedback });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error submitting feedback.", error: err.message });
  }
});

/* GET FEEDBACK BY LISTING */
router.get("/:listingId/feedback", async (req, res) => {
  try {
    const { listingId } = req.params;
    const feedbacks = await Feedback.find({ listingId }).populate("customerId");

    if (!feedbacks || feedbacks.length === 0) {
      return res.status(404).json({ message: "No feedback found for this listing." });
    }

    res.status(200).json(feedbacks);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to fetch feedback", error: err.message });
  }
});

/* GET RESERVATION LIST */
router.get("/:userId/reservations", async (req, res) => {
  try {
    const { userId } = req.params;
    const reservations = await Booking.find({ hostId: userId }).populate("customerId hostId listingId");

    if (!reservations || reservations.length === 0) {
      return res.status(404).json({ message: "No reservations found." });
    }

    res.status(200).json(reservations);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to retrieve reservations", error: err.message });
  }
});

// get reservation by user id
router.get("/reservation/:userId", async (req, res) => {
  try {
    const { userId } = req.params;
    const reservations = await Booking.find({ customerId: userId }).populate("customerId hostId listingId");

    if (!reservations || reservations.length === 0) {
      return res.status(404).json({ message: "No reservations found." });
    }

    res.status(200).json(reservations);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to retrieve reservations", error: err.message });
  }
});

/* GET USER PROFILE */
router.get("/:userId/profile", async (req, res) => {
  try {
    const { userId } = req.params;
    const user = await User.findById(userId).select("-password -refreshToken");

    if (!user) {
      return res.status(404).json({ message: "User not found!" });
    }

    res.status(200).json(user);
  } catch (err) {
    console.error("Error fetching user profile:", err);
    res.status(500).json({ message: "Failed to fetch profile", error: err.message });
  }
});

/* UPDATE USER PROFILE */
router.patch("/:userId/profile", async (req, res) => {
  try {
    const { userId } = req.params;
    const { firstName, lastName, email, profileImagePath } = req.body;

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { firstName, lastName, email, profileImagePath },
      { new: true }
    ).select("-password -refreshToken");

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found!" });
    }

    res.status(200).json(updatedUser);
  } catch (err) {
    console.error("Error updating user profile:", err);
    res.status(500).json({ message: "Failed to update profile", error: err.message });
  }
});

/* DELETE USER */
router.delete("/:userId", async (req, res) => {
  try {
    const { userId } = req.params;
    const deletedUser = await User.findByIdAndDelete(userId);

    if (!deletedUser) {
      return res.status(404).json({ message: "User not found!" });
    }

    res.status(200).json({ message: "User deleted successfully!" });
  } catch (err) {
    console.error("Error deleting user:", err);
    res.status(500).json({ message: "Failed to delete user", error: err.message });
  }
});

/* GET USER DETAILS */
router.get("/:userId/userdetails", async (req, res) => {
  try {
    const { userId } = req.params;
    const user = await User.findById(userId).select("-password -refreshToken");

    if (!user) {
      return res.status(404).json({ message: "User not found!" });
    }

    res.status(200).json(user);
  } catch (err) {
    console.error("Error fetching user:", err);
    res.status(500).json({ message: "Failed to fetch user", error: err.message });
  }
});

/* GET ALL USERS */
router.get("/", async (req, res) => {
  try {
    const users = await User.find().select("-password -refreshToken");

    if (!users || users.length === 0) {
      return res.status(404).json({ message: "No users found." });
    }

    res.status(200).json(users);
  } catch (err) {
    console.error("Error fetching users:", err);
    res.status(500).json({ message: "Failed to fetch users", error: err.message });
  }
});

module.exports = router;
