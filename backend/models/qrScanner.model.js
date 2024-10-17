const mongoose = require('mongoose');
const {Schema, model} = mongoose;

const qrScannerSchema = new Schema({
    location:{type: String},
    wasteType: {type: String},
    weight: {type: Number},
    level: {type: Number},
    owner: {type: String},
    collector: {type: String},
    status: {
        type: String
    },
    
}, {timestamps: true});

module.exports = model('qrScanner', qrScannerSchema);