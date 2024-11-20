const BloodTypeCount = require('../models/BloodTypeCount');

// Create or update blood type counts in bulk
exports.createOrUpdateBloodTypeCounts = async (req, res, next) => {
  const counts = req.body.counts;

  try {
    for (const [bloodType, count] of Object.entries(counts)) {
      await BloodTypeCount.findOneAndUpdate(
        { bloodType },
        { count },
        { upsert: true, new: true }
      );
    }
    res.status(200).json({ success: true, data: counts });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

// Get all blood type counts
exports.getBloodTypeCounts = async (req, res, next) => {
  try {
    const counts = await BloodTypeCount.find();
    res.status(200).json({ success: true, data: counts });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

// Get a specific blood type count by ID
exports.getBloodTypeCountById = async (req, res, next) => {
  try {
    const count = await BloodTypeCount.findById(req.params.id);
    if (!count) {
      return res.status(404).json({ success: false, error: "Count not found" });
    }
    res.status(200).json({ success: true, data: count });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

// Update a specific blood type count by ID
exports.updateBloodTypeCount = async (req, res, next) => {
  try {
    const count = await BloodTypeCount.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!count) {
      return res.status(404).json({ success: false, error: "Count not found" });
    }
    res.status(200).json({ success: true, data: count });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

// Delete a specific blood type count by ID
exports.deleteBloodTypeCount = async (req, res, next) => {
  try {
    const count = await BloodTypeCount.findByIdAndDelete(req.params.id);
    if (!count) {
      return res.status(404).json({ success: false, error: "Count not found" });
    }
    res.status(200).json({ success: true, data: {} });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};
