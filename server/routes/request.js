const express = require('express');
const router = express.Router();
const { createRequest, getRequests, deleteRequest } = require('../controllers/requestController');

// Create a new request
router.post('/', createRequest);

// Get all requests
router.get('/', getRequests);

// Delete a request
router.delete('/:id', deleteRequest);

module.exports = router;
