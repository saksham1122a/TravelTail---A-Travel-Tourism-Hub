const express = require("express");
const router = express.Router();
const {
  getDestinations,
  getDestinationById,
  createDestination,
  updateDestination,
  deleteDestination,
} = require("../controllers/destination.controller");
const { protect, admin } = require("../middleware/auth.middleware");

router.route("/").get(getDestinations).post(protect, admin, createDestination);
router
  .route("/:id")
  .get(getDestinationById)
  .put(protect, admin, updateDestination)
  .delete(protect, admin, deleteDestination);

module.exports = router;
