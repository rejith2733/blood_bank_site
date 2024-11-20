const mongoose = require('mongoose');

const DonationSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    required: true,
  },
  bloodType: {
    type: String,
    required: true,
  },
  lastDonationDate: {
    type: Date,
    required: true,
  },
}, {
  timestamps: true,
});

module.exports = mongoose.model('Donation', DonationSchema);
