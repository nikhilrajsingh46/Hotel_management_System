import express from "express";

const router = express.Router();
import Services from "../models/services.js";  // Corrected to import Services model
import User from "../models/User.js";  // Corrected to import User model

/* CREATE SERVICE */
router.post("/create", async (req, res) => {
  try {
    const { userId, serviceName, description, status } = req.body;

    // Validation: Check that required fields are provided
    if (!userId || !serviceName || !description) {
      return res.status(400).json({ message: "All fields are required!" });
    }

    // Check if user exists
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found!" });
    }

    // Validate status if provided (only if it's not undefined)
    const validStatuses = ["Pending", "In Progress", "Completed", "Cancelled"];
    if (status && !validStatuses.includes(status)) {
      return res.status(400).json({ message: "Invalid status!" });
    }

    // If status is not provided, it defaults to "Pending"
    const newService = new Services({
      user: userId,  // changed userId to user (refers to User model)
      serviceName,
      description,
      status: status || "Pending",  // Default to "Pending" if no status is provided
    });

    await newService.save();
    res.status(201).json(newService); // Created service

  } catch (err) {
    console.error(err.stack);
    res.status(500).json({ message: "Failed to create service!", error: err.message });
  }
});

// get all services
router.get("/getall", async (req, res) => {
  try {
    const services = await Services.find().populate("user", "name email"); // Populate user details
    res.status(200).json(services); // OK
  } catch (err) {
    console.error(err.stack);
    res.status(500).json({ message: "Failed to retrieve services!", error: err.message });
  }
});

// get service by user id
router.get("/userid/:userId", async (req, res) => {
  try {
    const { userId } = req.params;
    const services = await Services.find({ user: userId }).populate("user", "name email"); // Populate user details
    if (!services || services.length === 0) {
      return res.status(404).json({ message: "No services found for this user." });
    }
    res.status(200).json(services); // OK
  } catch (err) {
    console.error(err.stack);
    res.status(500).json({ message: "Failed to retrieve services!", error: err.message });
  }
});

// cancel service by id
router.patch("/cancel/:serviceId", async (req, res) => {
  try {
    const { serviceId } = req.params;
    const service = await Services.findById(serviceId);
    if (!service) {
      return res.status(404).json({ message: "Service not found!" });
    }

    // Update the status to "Cancelled"
    service.status = "Cancelled";
    await service.save();
    res.status(200).json({ message: "Service cancelled successfully!", service }); // OK
  } catch (err) {
    console.error(err.stack);
    res.status(500).json({ message: "Failed to cancel service!", error: err.message });
  }
});

// delete service by id
router.delete("/delete/:serviceId", async (req, res) => {
  try {
    const { serviceId } = req.params;
    const service = await Services.findByIdAndDelete(serviceId);
    if (!service) {
      return res.status(404).json({ message: "Service not found!" });
    }
    res.status(200).json({ message: "Service deleted successfully!" }); // OK
  } catch (err) {
    console.error(err.stack);
    res.status(500).json({ message: "Failed to delete service!", error: err.message });
  }
});

// update status by id
router.patch("/update/:serviceId", async (req, res) => {
  try {
    const { serviceId } = req.params;
    const { status } = req.body;

    // Validate status if provided
    const validStatuses = ["Pending", "In Progress", "Completed", "Cancelled"];
    if (status && !validStatuses.includes(status)) {
      return res.status(400).json({ message: "Invalid status!" });
    }

    const service = await Services.findById(serviceId);
    if (!service) {
      return res.status(404).json({ message: "Service not found!" });
    }

    // Update the status
    service.status = status || service.status; // Only update if a new status is provided
    await service.save();
    res.status(200).json({ message: "Service status updated successfully!", service }); // OK
  } catch (err) {
    console.error(err.stack);
    res.status(500).json({ message: "Failed to update service!", error: err.message });
  }
});


export default router;
