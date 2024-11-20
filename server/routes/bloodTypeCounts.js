// routes/bloodTypeCounts.js
const express = require('express');
const router = express.Router();
const {
  createOrUpdateBloodTypeCounts,
  getBloodTypeCounts,
  getBloodTypeCountById,
  updateBloodTypeCount,
  deleteBloodTypeCount
} = require('../controllers/bloodTypeCount');

// Route to create or update blood type counts
router.route('/').post(createOrUpdateBloodTypeCounts);

// Route to get all blood type counts
router.route('/').get(getBloodTypeCounts);

// Route to get a specific blood type count by ID
router.route('/:id').get(getBloodTypeCountById);

// Route to update a specific blood type count by ID
router.route('/:id').put(updateBloodTypeCount);

// Route to delete a specific blood type count by ID
router.route('/:id').delete(deleteBloodTypeCount);

module.exports = router;
