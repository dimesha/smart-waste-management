// Import Express to create an application instance
const express = require('express');
const app = express(); // Initialize the Express application

// Load environment variables from a .env file
require('dotenv').config();

// Import the User model and database configuration
const User = require('./models/userSchema');
const dbconfig = require('./config/dbConfig');

// Import the CORS middleware to allow cross-origin requests
const cors = require('cors');

// Middleware to parse incoming JSON requests
app.use(express.json());

// Middleware to enable CORS (Cross-Origin Resource Sharing) for handling requests from different domains
app.use(cors());

// Import route handlers for users, QR codes, and waste schedules
const User_routes = require('./routes/UserRouts');
const QR_routes = require('./routes/qrScanner.routes');
const Waste_router = require('./routes/wasteSchedule.routes');

// Mount the route handlers under specific base paths
app.use('/api/user', User_routes); // Routes for user-related operations
app.use('/api/qr', QR_routes);     // Routes for QR code-related operations
app.use('/api/waste', Waste_router); // Routes for waste schedule-related operations

// Define the port the server will listen on, using the environment variable or default to 5001
const port = process.env.PORT || 5001;

// Start the server and log a message to the console when it is running
app.listen(port, () => console.log(`Nodemon Server started at port ${port} 🌍`));
