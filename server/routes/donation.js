const express = require("express");
const router = express.Router();

// Controllers
const {
  createDonation,
  getDonations,
  getDonationById,
  updateDonation,
  deleteDonation
} = require("../controllers/donation");

// Route to create a new donation
router.route("/").post(createDonation);

// Route to get all donations
router.route("/").get(getDonations);

// Route to get a specific donation by ID
router.route("/:id").get(getDonationById);

// Route to update a specific donation by ID
router.route("/:id").put(updateDonation);

// Route to delete a specific donation by ID
router.route("/:id").delete(deleteDonation);

module.exports = router;
