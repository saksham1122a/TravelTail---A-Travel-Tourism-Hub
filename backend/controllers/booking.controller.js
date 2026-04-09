const Booking = require("../models/booking.model");

// @desc    Create new booking
// @route   POST /api/bookings
// @access  Private
exports.createBooking = async (req, res) => {
  try {
    const { 
      itemType, 
      itemName, 
      destinationName, 
      amount, 
      paymentMethod, 
      customerName, 
      customerEmail 
    } = req.body;

    const booking = await Booking.create({
      user: req.user._id,
      itemType,
      itemName,
      destinationName,
      amount,
      paymentMethod,
      customerName,
      customerEmail
    });

    res.status(201).json(booking);
  } catch (error) {
    res.status(400).json({ message: "Booking failed", error: error.message });
  }
};

// @desc    Get all bookings (Admin only)
// @route   GET /api/bookings
// @access  Private/Admin
exports.getBookings = async (req, res) => {
  try {
    const bookings = await Booking.find()
      .populate('user', 'firstName lastName email')
      .sort({ createdAt: -1 });
    res.status(200).json(bookings);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

// @desc    Delete booking
// @route   DELETE /api/bookings/:id
// @access  Private/Admin
exports.deleteBooking = async (req, res) => {
  try {
    const booking = await Booking.findByIdAndDelete(req.params.id);
    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }
    res.status(200).json({ message: "Booking deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};
