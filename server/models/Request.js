const mongoose = require('mongoose');

const requestSchema = new mongoose.Schema({
  Name: { type: String, required: true },
  bloodType: { type: String, required: true },
  location: { type: String, required: true },
  contactInfo: { type: String, required: true },
});

module.exports = mongoose.model('Request', requestSchema);
