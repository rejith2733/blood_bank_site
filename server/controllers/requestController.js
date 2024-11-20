const Request = require('../models/Request');

// Create a new request
exports.createRequest = async (req, res) => {
  try {
    const newRequest = new Request(req.body);
    const savedRequest = await newRequest.save();
    res.status(201).json(savedRequest);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Get all requests
exports.getRequests = async (req, res) => {
  try {
    const requests = await Request.find();
    res.status(200).json(requests);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Delete a request
exports.deleteRequest = async (req, res) => {
  try {
    const deletedRequest = await Request.findByIdAndDelete(req.params.id);
    if (!deletedRequest) throw Error('Request not found');
    res.status(200).json(deletedRequest);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
