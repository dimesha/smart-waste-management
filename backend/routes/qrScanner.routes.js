// Import Express and create a router instance
const express = require('express');
const router = express.Router();

const verifyUser = require('../util/verifyUser')


// Import controller functions for handling QR code operations
const { createQR, getQR, updateQR, deleteQR, getQRByType, getQrByCollecctor, getMessage ,getAllWaste} = require('../controllers/qrScanner.controller');


router.get('/get-all-waste', getAllWaste)


// Route to create a new QR code (POST request)
// Uses verifyUser middleware to check if the user is authorized
router.post('/', verifyUser, createQR);

// Route to get all QR codes (GET request)
// Uses verifyUser middleware to check if the user is authorized
router.get('/', verifyUser, getQR);

// Route to get QR codes by waste type (GET request with a URL parameter)
// Uses verifyUser middleware to check if the user is authorized
router.get('/type/:type', verifyUser, getQRByType);

router.get('/message/:id', verifyUser, getMessage)

// Route to get QR codes by the current collector (GET request)
// Uses verifyUser middleware to check if the user is authorized
router.get('/collector', verifyUser, getQrByCollecctor);

// Route to update a specific QR code by ID (PUT request)
// Uses verifyUser middleware to check if the user is authorized
router.put('/:id', verifyUser, updateQR);

// Route to delete a specific QR code by ID (DELETE request)
// Uses verifyUser middleware to check if the user is authorized
router.delete('/:id', verifyUser, deleteQR);



// Export the router to be used in the main application
module.exports = router;
