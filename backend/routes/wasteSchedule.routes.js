// Import Express and create a router instance
const express = require('express');
const router = express.Router();

// Import controller functions for handling waste schedule operations
const { createSchedule, getAllSchedules, getScheduleById, updateSchedule, deleteSchedule } = require('../controllers/wasteSchedule.controller');

// Import middleware to verify the user's identity
const verifyUser = require('../util/verifyUser');

// Route to create a new waste schedule (POST request)
// Uses verifyUser middleware to check if the user is authorized
router.post('/', verifyUser, createSchedule);

// Route to get all waste schedules (GET request)
// Uses verifyUser middleware to check if the user is authorized
router.get('/', verifyUser, getAllSchedules);

// Route to get a specific waste schedule by ID (GET request with a URL parameter)
// Uses verifyUser middleware to check if the user is authorized
router.get('/:id', verifyUser, getScheduleById);

// Route to update a specific waste schedule by ID (PUT request with a URL parameter)
// Uses verifyUser middleware to check if the user is authorized
router.put('/:id', verifyUser, updateSchedule);

// Route to delete a specific waste schedule by ID (DELETE request with a URL parameter)
// Uses verifyUser middleware to check if the user is authorized
router.delete('/:id', verifyUser, deleteSchedule);

// Export the router to be used in the main application
module.exports = router;
