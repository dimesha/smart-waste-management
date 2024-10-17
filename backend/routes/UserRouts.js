// Import Express and create a router instance
const express = require('express');
const router = express.Router();

// Import controller functions for handling user-related operations
const { login, register, getAllUsers } = require('../controllers/user.controller');

// Import middleware to verify the token (user authentication)
const verifyToken = require('../util/verifyUser');

// Route for user login (POST request)
// Does not require token verification as it is used to authenticate users
router.post('/login', login);

// Route for user registration (POST request)
// Does not require token verification as it is used to register new users
router.post('/register', register);

// Route to get all users (GET request)
// Token verification is optional in this case (you can add `verifyToken` if user authentication is needed)
router.get('/', getAllUsers);

// Export the router to be used in the main application
module.exports = router;
