const jwt = require('jsonwebtoken');

// Make sure JWT_SECRET is consistent between files
const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret_key'; // It's better to use environment variables

// Middleware to verify the JWT token
const verifyToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; // Extract the Bearer token

    if (!token) {
        return res.status(403).json({ message: 'No token provided', success: false });
    }

    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        req.user = decoded; // Store user info in req.user
        next(); // Proceed to the next middleware or route handler
    } catch (err) {
        res.status(401).json({ message: 'Invalid token', success: false });
    }
};

module.exports = verifyToken;