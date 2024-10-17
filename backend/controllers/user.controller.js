// Import JWT for token handling and UserModel for database interaction
const jwt = require('jsonwebtoken');
const UserModel = require('../models/userSchema');
const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret_key'; // Secret key for JWT, defaulting to a hardcoded string if not in environment variables

// Register a new user
const register = async (req, res) => {
    // Destructure the request body to extract user details
    const {
        firstName,
        address,
        email,
        password,
        img,
    } = req.body;

    console.log(req.body); // Log the request body for debugging

    try {
        // Create a new user in the database
        await UserModel.create({
            Name: firstName,
            Address: address,
            Email: email,
            Password: password,
            img
        });

        // Respond with success if user creation was successful
        res.status(200).send({ message: 'User created', success: true });
    } catch (err) {
        console.log(err); // Log any errors for debugging
        res.status(500).send({ message: 'User not created', success: false }); // Respond with failure if user creation failed
    }
};

// Login an existing user
const login = async (req, res) => {
    const { email, password } = req.body; // Destructure email and password from the request body

    try {
        // Check if the user exists in the database
        const user = await UserModel.findOne({ Email: email });
        if (!user) {
            return res.status(400).json({ message: 'Invalid email or password', success: false }); // Return error if user is not found
        }

        // Validate the user's password
        if (user.Password !== password) {
            return res.status(400).json({ message: 'Invalid email or password', success: false }); // Return error if password doesn't match
        }

        // Generate a JWT token for the user
        const token = jwt.sign(
            { userId: user._id, email: user.Email, isAdmin: user.isAdmin }, // Payload data
            JWT_SECRET, // Secret key for signing the token
            { expiresIn: '1d' } // Token expiration set to 1 day
        );

        // Prepare user data to return
        const userData = {
            _id: user._id,
            Name: user.Name,
            Address: user.Address,
            Email: user.Email,
            isAdmin: user.isAdmin,
            img: user.img
        };

        // Send the JWT token and user data in the response
        res.status(200).json({ message: 'Login successful', token, success: true, data: userData });
    } catch (err) {
        console.log(err); // Log any errors for debugging
        res.status(500).json({ message: 'Server error', success: false }); // Return server error if login process fails
    }
};

// Fetch all users from the database
const getAllUsers = async (req, res) => {
    try {
        // Retrieve all users from the database
        const response = await UserModel.find();

        // Send the retrieved users in the response
        res.status(200).send({ message: 'fetch', data: response, success: true });
    } catch (err) {
        console.log(err); // Log any errors for debugging
        res.status(500).send({ message: 'not fetch', success: false }); // Respond with failure if data retrieval failed
    }
};

// Export the controller functions
module.exports = { login, getAllUsers, register };
