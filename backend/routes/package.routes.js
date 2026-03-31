const express = require("express");
const router = express.Router();
const {
  getPackages,
  getPackageById,
  createPackage,
  updatePackage,
  deletePackage,
} = require("../controllers/package.controller");
const { protect, admin } = require("../middleware/auth.middleware");

router.route("/").get(getPackages).post(protect, admin, createPackage);
router
  .route("/:id")
  .get(getPackageById)
  .put(protect, admin, updatePackage)
  .delete(protect, admin, deletePackage);

module.exports = router;
