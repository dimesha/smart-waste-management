const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const wasteScheduleSchema = new Schema({
    wasteType: [
        { type: String, required: true }  // Ensure wasteType is provided
    ],
    address: {
        type: String,
        required: true  // Address is required
    },
    selectedDate: {
        type: Date,
        required: true  // Selected date is required
    },
    selectedTime: {
        type: String,
        required: true  // Selected time is required
    },
    userId: {
        type: String,
        required: true  // User ID is required
    }
}, { timestamps: true });  // Automatically add createdAt and updatedAt fields

// Export the model
module.exports = model('WasteSchedule', wasteScheduleSchema);
