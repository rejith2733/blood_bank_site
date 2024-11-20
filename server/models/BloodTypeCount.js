// models/BloodTypeCount.js
const mongoose = require('mongoose');

const BloodTypeCountSchema = new mongoose.Schema({
  bloodType: {
    type: String,
    required: true,
  },
  count: {
    type: Number,
    required: true,
  },
});

module.exports = mongoose.model('BloodTypeCount', BloodTypeCountSchema);
