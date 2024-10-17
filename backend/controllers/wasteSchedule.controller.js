// Import WasteModel for waste schedule and UserModel for user data
const WasteModel = require('../models/wasteShedule.model');
const UserModel = require('../models/userSchema');

// Controller function to create a new waste collection schedule
const createSchedule = async (req, res) => {
    try {
        const userId = req.user.userId; // Extract userId from the authenticated user's data
        const { wasteType, selectedDate, selectedTime } = req.body; // Destructure the request body

        // Fetch the user by ID to get their address
        const getUser = await UserModel.findById(userId);
        if (!getUser) {
            return res.status(404).json({ status: 'failed', message: 'User not found' }); // Return error if user is not found
        }

        const address = getUser.Address; // Extract address from the user details

        // Check if the selected date and time are already booked for a schedule
        const existingSchedule = await WasteModel.findOne({ selectedDate, selectedTime });
        if (existingSchedule) {
            return res.status(409).json({ status: 'failed', message: 'Selected date and time are already booked. Please choose another time.' });
        }

        // Create new waste schedule data
        const data = new WasteModel({
            userId,
            wasteType,
            selectedDate,
            selectedTime,
            address
        });

        // Save the newly created schedule to the database
        const savedData = await data.save();

        // Return success response with the saved schedule data
        return res.status(200).json({ status: 'success', message: 'Schedule created successfully', data: savedData });

    } catch (error) {
        // Catch and return any internal server errors
        return res.status(500).json({ status: 'failed', message: 'Internal server error', error: error.message });
    }
};

// Controller function to retrieve all schedules
const getAllSchedules = async (req, res) => {
    try {
        // Fetch all schedules from the database
        const getScheduls = await WasteModel.find();
        
        // Return success response with all schedules
        res.status(200).json({ status: 'success', message: 'Schedules fetched successfully', data: getScheduls });
    } catch (error) {
        // Catch and return any internal server errors
        return res.status(500).json({ status: 'failed', message: 'Internal server error', error: error.message });
    }
};

// Controller function to retrieve a specific schedule by ID
const getScheduleById = async (req, res) => {
    try {
        const { id } = req.params; // Extract the schedule ID from the URL parameters

        // Fetch the schedule by its ID
        const getSchedule = await WasteModel.findById(id);

        // Return success response with the specific schedule data
        res.status(200).json({ status: 'success', message: 'Schedule fetched successfully', data: getSchedule });
    } catch (error) {
        // Catch and return any internal server errors
        return res.status(500).json({ status: 'failed', message: 'Internal server error', error: error.message });
    }
};

// Controller function to update an existing schedule by ID
const updateSchedule = async (req, res) => {
    try {
        const { id } = req.params; // Extract the schedule ID from the URL parameters
        const { wasteType, selectedDate, selectedTime } = req.body; // Destructure the request body

        // Update the schedule with new details and return the updated schedule
        const updateSchedule = await WasteModel.findByIdAndUpdate(id, {
            $set: {
                wasteType, 
                selectedDate, 
                selectedTime
            }
        }, { new: true }); // The `new: true` option ensures the updated document is returned

        // Return success response with the updated schedule data
        res.status(200).json({ status: 'success', message: 'Schedule updated successfully', data: updateSchedule });

    } catch (error) {
        // Catch and return any internal server errors
        return res.status(500).json({ status: 'failed', message: 'Internal server error', error: error.message });
    }
};

// Controller function to delete a schedule by ID
const deleteSchedule = async (req, res) => {
    try {
        const { id } = req.params; // Extract the schedule ID from the URL parameters

        // Find and delete the schedule by its ID
        const deleteSchedule = await WasteModel.findByIdAndDelete(id);

        // Return success response after successful deletion
        res.status(200).json({ status: 'success', message: 'Schedule deleted successfully', data: deleteSchedule });

    } catch (error) {
        // Catch and return any internal server errors
        return res.status(500).json({ status: 'failed', message: 'Internal server error', error: error.message });
    }
};

// Export the controller functions as a module
module.exports = {
    createSchedule, 
    getAllSchedules, 
    getScheduleById, 
    updateSchedule, 
    deleteSchedule
};
