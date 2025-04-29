const router = require('express').Router();
const mongoose = require('mongoose');
const Booking = require('../models/Booking');

/* CREATE BOOKING */
router.post('/create', async (req, res) => {
  try {
    const { customerId, hostId, listingId, startDate, endDate, totalPrice } = req.body;

    // Validation
    if (!customerId || !hostId || !listingId || !startDate || !endDate || !totalPrice) {
      return res.status(400).json({ message: "All fields are required!" });
    }

    // Convert to ObjectIds if necessary
    const customerObjectId = mongoose.Types.ObjectId(customerId);
    const hostObjectId = mongoose.Types.ObjectId(hostId);
    const listingObjectId = mongoose.Types.ObjectId(listingId);

    const newBooking = new Booking({
      customerId: customerObjectId,
      hostId: hostObjectId,
      listingId: listingObjectId,
      startDate,
      endDate,
      totalPrice
    });

    await newBooking.save();
    res.status(200).json(newBooking);
  } catch (err) {
    console.error(err.stack);
    res.status(500).json({ message: 'Failed to create booking!', error: err.message });
  }
});

/* DELETE BOOKING */
router.delete('/:bookingId', async (req, res) => {
  try {
    const { bookingId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(bookingId)) {
      return res.status(400).json({ message: "Invalid booking ID!" });
    }

    const deletedBooking = await Booking.findByIdAndDelete(bookingId);

    if (!deletedBooking) {
      return res.status(404).json({ message: `Booking with ID ${bookingId} not found!` });
    }

    res.status(200).json({ message: 'Booking deleted successfully!' });
  } catch (err) {
    console.error(err.stack);
    res.status(500).json({ message: 'Failed to delete booking!', error: err.message });
  }
});

/* GET ALL BOOKINGS */
router.get('/', async (req, res) => {
  try {
    const bookings = await Booking.find()
      .populate('customerId', 'firstName lastName')
      .populate('listingId', 'title city country')
      .populate('hostId', 'firstName lastName');

    res.status(200).json(bookings);
  } catch (err) {
    console.error(err.stack);
    res.status(500).json({ message: 'Failed to fetch bookings!', error: err.message });
  }
});

/* GET BOOKING BY ID */
router.get('/:bookingId', async (req, res) => {
  try {
    const { bookingId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(bookingId)) {
      return res.status(400).json({ message: "Invalid booking ID!" });
    }

    const booking = await Booking.findById(bookingId)
      .populate('customerId', 'firstName lastName')
      .populate('listingId', 'title city country')
      .populate('hostId', 'firstName lastName');

    if (!booking) {
      return res.status(404).json({ message: 'Booking not found!' });
    }

    res.status(200).json(booking);
  } catch (err) {
    console.error(err.stack);
    res.status(500).json({ message: 'Failed to fetch booking!', error: err.message });
  }
});

/* GET BOOKINGS BY CUSTOMER ID */
router.get('/customer/:customerId', async (req, res) => {
  try {
    const { customerId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(customerId)) {
      return res.status(400).json({ message: "Invalid customer ID!" });
    }

    const bookings = await Booking.find({ customerId })
      .populate('customerId', 'firstName lastName')
      .populate('listingId', 'title city country')
      .populate('hostId', 'firstName lastName');

    if (!bookings || bookings.length === 0) {
      return res.status(404).json({ message: `No bookings found for customer with ID ${customerId}` });
    }

    res.status(200).json(bookings);
  } catch (err) {
    console.error(err.stack);
    res.status(500).json({ message: 'Failed to fetch bookings!', error: err.message });
  }
});

// deletebooking by listingId
router.delete('/delete/:listingId', async (req, res) => {
  try {
    const { listingId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(listingId)) {
      return res.status(400).json({ message: "Invalid listing ID!" });
    }

    const deletedBooking = await Booking.deleteMany({ listingId });

    if (!deletedBooking) {
      return res.status(404).json({ message: `No bookings found for listing with ID ${listingId}` });
    }

    res.status(200).json({ message: 'Bookings deleted successfully!' });
  } catch (err) {
    console.error(err.stack);
    res.status(500).json({ message: 'Failed to delete bookings!', error: err.message });
  }
});

module.exports = router;
