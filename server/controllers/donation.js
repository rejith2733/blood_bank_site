const Donation = require("../models/Donation"); // Assuming you have a Donation model

// Create a new donation
exports.createDonation = async (req, res) => {
  try {
    const donation = await Donation.create(req.body);
    res.status(201).json({
      success: true,
      data: donation
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: "Server Error"
    });
  }
};

// Get all donations
exports.getDonations = async (req, res) => {
  try {
    const donations = await Donation.find();
    res.status(200).json({
      success: true,
      data: donations
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: "Server Error"
    });
  }
};

// Get a specific donation by ID
exports.getDonationById = async (req, res) => {
  try {
    const donation = await Donation.findById(req.params.id);

    if (!donation) {
      return res.status(404).json({
        success: false,
        error: "Donation not found"
      });
    }

    res.status(200).json({
      success: true,
      data: donation
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: "Server Error"
    });
  }
};

// Update a specific donation by ID
exports.updateDonation = async (req, res) => {
  try {
    const donation = await Donation.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });

    if (!donation) {
      return res.status(404).json({
        success: false,
        error: "Donation not found"
      });
    }

    res.status(200).json({
      success: true,
      data: donation
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: "Server Error"
    });
  }
};

// Delete a specific donation by ID
exports.deleteDonation = async (req, res) => {
  try {
    const donation = await Donation.findByIdAndDelete(req.params.id);

    if (!donation) {
      return res.status(404).json({
        success: false,
        error: "Donation not found"
      });
    }

    res.status(200).json({
      success: true,
      data: {}
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: "Server Error"
    });
  }
};
