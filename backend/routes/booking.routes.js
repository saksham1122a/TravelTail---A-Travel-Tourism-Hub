const express = require("express");
const router = express.Router();
const {
  createBooking,
  getBookings,
  deleteBooking,
} = require("../controllers/booking.controller");
const { protect, admin } = require("../middleware/auth.middleware");

router.route("/").post(protect, createBooking).get(protect, admin, getBookings);
router.route("/:id").delete(protect, admin, deleteBooking);

module.exports = router;
