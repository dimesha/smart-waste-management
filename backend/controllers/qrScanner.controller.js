// Import necessary models
const QRmodel = require('../models/qrScanner.model');
const UserModel = require('../models/userSchema');
const Message = require('../models/message.model');

// Controller function to create a new QR code
const createQR = async (req, res) => {
    try {
        // Check if the user is an admin before proceeding
        if (!req.user.isAdmin) {
            return res.status(401).json({ status: 'failed', message: 'You are not authorized to perform this action' });
        }

        // Destructure the necessary fields from the request body
        const { location, wasteType, weight, level, owner } = req.body;
        const userId = req.user.userId;

        // Find the user (collector) by their ID
        const getCollector = await UserModel.findById(userId);
        if (!getCollector) {
            return res.status(404).json({ status: 'failed', message: 'User not found' });
        }

        const collectorName = getCollector.Name; // Get the name of the collector

        // Create the QR code data
        const qrData = {
            location,
            wasteType,
            weight,
            level,
            owner,
            collector: collectorName
        };

        // Create the QR code in the database
        const createQR = await QRmodel.create(qrData);
        if (!createQR) {
            return res.status(404).json({ status: 'failed', message: 'QR code not created' });
        }

        // Find the owner of the waste by name
        const getUser = await UserModel.findOne({ Name: owner });
        if (!getUser) {
            return res.status(404).json({ status: 'failed', message: 'User not found' });
        }

        const OwnerId = getUser._id; // Get the ID of the owner

        // Create a message about the waste collection
        const message = `Your garbage of type ${wasteType} weighing ${weight}Kg at ${level}% level has been collected by ${collectorName}.`;

        const messageData = {
            content: message,
            userId: OwnerId
        };

        // Save the message in the database
        const createMessage = await Message.create(messageData);
        if (!createMessage) {
            return res.status(404).json({ status: 'failed', message: 'Message not created' });
        }

        // Both QR code and message creation succeeded, send one response
        return res.status(200).json({
            status: 'success',
            message: 'QR code and message created successfully',
            qrData: createQR,
            messageData: createMessage
        });

    } catch (error) {
        // Catch any internal server errors and return an appropriate response
        return res.status(500).json({ status: 'failed', message: 'Internal server error', error: error.message });
    }
}

// Controller function to retrieve all QR codes
const getQR = async (req, res) => {
    try {
        // Ensure the user is an admin
        if (!req.user.isAdmin) {
            return res.status(401).json({ status: 'failed', message: 'You are not authorized to perform this action' });
        }

        // Fetch all QR codes from the database
        const getQR = await QRmodel.find();
        if (!getQR) {
            return res.status(404).json({ status: 'failed', message: 'QR code not found' });
        }

        // Return the list of QR codes
        return res.status(200).json({ status: 'success', message: 'QR code retrieved successfully', data: getQR });

    } catch (error) {
        // Catch and return any internal server errors
        return res.status(500).json({ status: 'failed', message: 'Internal server error', error: error.message });
    }
}

// Controller function to retrieve QR codes by waste type
const getQRByType = async (req, res) => {
    try {
        const { type } = req.params;  // Extract "type" parameter from the URL

        // Ensure the user is an admin
        if (!req.user.isAdmin) {
            return res.status(401).json({ status: 'failed', message: 'You are not authorized to perform this action' });
        }

        // Find QR codes based on the wasteType
        const getQR = await QRmodel.find({ wasteType: type });

        // If no QR codes found, return 404
        if (!getQR || getQR.length === 0) {
            return res.status(404).json({ status: 'failed', message: 'No QR codes found for the given waste type' });
        }

        // Return the found QR codes
        return res.status(200).json({ status: 'success', message: 'QR codes retrieved successfully', data: getQR });

    } catch (error) {
        // Catch and return any internal server errors
        return res.status(500).json({ status: 'failed', message: 'Internal server error', error: error.message });
    }
}

// Controller function to retrieve QR codes by the collector's name
const getQrByCollecctor = async (req, res) => {
    try {
        // Ensure the user is an admin
        if (!req.user.isAdmin) {
            return res.status(401).json({ status: 'failed', message: 'You are not authorized to perform this action' });
        }

        const getUserId = req.user.userId;  // Get the current user's ID
        const getCollector = await UserModel.findById(getUserId);  // Fetch the collector's information

        if (!getCollector) {
            return res.status(404).json({ status: 'failed', message: 'Collector not found' });
        }

        const collectorName = getCollector.Name;  // Get the collector's name

        // Fetch QR codes created by this collector
        const getQR = await QRmodel.find({ collector: collectorName });

        if(!getQR){
            return res.status(404).json({ status: 'failed', message: 'QR code not found' });
        }

        // Return the found QR codes
        return res.status(200).json({ status: 'success', message: 'QR code retrieved successfully', data: getQR });

    }catch (error) {
        // Catch and return any internal server errors
        return res.status(500).json({ status: 'failed', message: 'Internal server error', error: error.message });
    }
}

// Controller function to update a QR code (to be implemented)
const updateQR = async (req, res) => {
    try {
        // Logic for updating a QR code will go here

    } catch (error) {
        // Catch any errors and return an appropriate response
    }
}

// Controller function to delete a QR code
const deleteQR = async (req, res) => {
    try {
        // Ensure the user is an admin
        if (!req.user.isAdmin) {
            return res.status(401).json({ status: 'failed', message: 'You are not authorized to perform this action' });
        }

        // Find and delete the QR code by its ID
        const deleteQR = await QRmodel.findByIdAndDelete(req.params.id);
        if (!deleteQR) {
            return res.status(404).json({ status: 'failed', message: 'QR code not found' });
        }

        // Return a success message upon deletion
        res.status(200).json({ status: 'success', message: 'QR code deleted successfully' });

    } catch (error) {
        // Catch and return any internal server errors
        return res.status(500).json({ status: 'failed', message: 'Internal server error', error: error.message });
    }
}


const getAllWaste = async (req, res) => {
    try {
        const getQR = await QRmodel.find();
        res.json(getQR);

    } catch (error) {
        console.log("Error in getAll waste", error)
    }
}

const getMessage = async (req, res) => {
    try {
        // Logic for retrieving the message will go here

        const { id } = req.params;

        // Fetch the QR code by its ID
        const getMessage = await Message.find({userId: id});

        if (!getQR) {
            return res.status(404).json({ status: 'failed', message: 'QR code not found' });
        }

        // Return the found QR code
        return res.status(200).json({ status: 'success', message: 'QR code retrieved successfully', data: getMessage });


    } catch (error) {
        // Catch any errors and return an appropriate response
    }
}

// Export all controller functions as a module
module.exports = {
    createQR,
    getQR,
    updateQR,
    deleteQR,
    getQRByType,
    getAllWaste,

    getQrByCollecctor,
    getMessage
}
