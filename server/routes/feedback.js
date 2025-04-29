const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const multer = require("multer");
const path = require("path");
const User = require("../models/User");
const Feedback = require("../models/Feedback");

const router = express.Router();

/* Multer Storage Configuration */
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "public/uploads/"),
  filename: (req, file, cb) => {
    const uniqueName = `${Date.now()}-${file.originalname}`;
    cb(null, uniqueName);
  },
});

const upload = multer({ storage });

/* Route: Submit Feedback */
router.post("/create", async (req, res) => {
  try {
    const { customerId, listingId, rating, comment } = req.body;

    // Validation
    if (!customerId || !listingId || !rating || !comment) {
      return res.status(400).json({ message: "All fields are required." });
    }

    if (isNaN(rating) || rating < 1 || rating > 5) {
      return res.status(400).json({ message: "Rating must be a number between 1 and 5." });
    }

    // Check if customer exists
    const user = await User.findById(customerId);
    if (!user) {
      return res.status(404).json({ message: "Customer not found." });
    }

    // Create and save new feedback
    const newFeedback = new Feedback({
      customerId,
      listingId,
      rating,
      comment,
    });

    await newFeedback.save();

    res.status(201).json({
      message: "Feedback submitted successfully.",
      feedback: newFeedback,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: "Error submitting feedback.",
      error: err.message,
    });
  }
});

/* Route: Get Feedback by Listing ID */
router.get("/feedback/:listingId", async (req, res) => {
  try {
    const { listingId } = req.params;

    // Fetch feedback for the listing and populate customer details
    const feedbacks = await Feedback.find({ listingId }).populate(
      "customerId",
      "firstName lastName email profileImagePath"
    );

    if (!feedbacks || feedbacks.length === 0) {
      return res.status(404).json({
        message: "No feedback found for this listing.",
      });
    }

    res.status(200).json(feedbacks);
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: "Error fetching feedback.",
      error: err.message,
    });
  }
});

// get all feedbacks
router.get("/all", async (req, res) => {
  try {
    const feedbacks = await Feedback.find().populate("customerId", "firstName lastName email profileImagePath");
    res.status(200).json(feedbacks);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error fetching feedbacks.", error: err.message });
  }
});

// update feedback by feedbackid
router.patch("/:feedbackId", async (req, res) => {
  try {
    const { feedbackId } = req.params;
    const { rating, comment } = req.body;

    // Validation
    if (!rating || !comment) {
      return res.status(400).json({ message: "All fields are required." });
    }

    if (isNaN(rating) || rating < 1 || rating > 5) {
      return res.status(400).json({ message: "Rating must be a number between 1 and 5." });
    }

    // Update feedback
    const updatedFeedback = await Feedback.findByIdAndUpdate(
      feedbackId,
      { rating, comment },
      { new: true }
    );

    if (!updatedFeedback) {
      return res.status(404).json({ message: "Feedback not found." });
    }

    res.status(200).json({
      message: "Feedback updated successfully.",
      feedback: updatedFeedback,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: "Error updating feedback.",
      error: err.message,
    });
  }
});


// delete feedback by feedbackid
router.delete("/:feedbackId", async (req, res) => {
  try {
    const { feedbackId } = req.params;

    // Delete feedback
    const deletedFeedback = await Feedback.findByIdAndDelete(feedbackId);

    if (!deletedFeedback) {
      return res.status(404).json({ message: "Feedback not found." });
    }

    res.status(200).json({
      message: "Feedback deleted successfully.",
      feedback: deletedFeedback,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: "Error deleting feedback.",
      error: err.message,
    });
  }
});




module.exports = router;
