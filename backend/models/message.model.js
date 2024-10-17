const mongoose = require('mongoose');
const {Schema, model} = mongoose

const messageSchema = new Schema({
    content: {
        type: String,
        required: true
    },
    userId:{
        type: String,
    }
}, {timestamps: true})

module.exports = model('collectedConfirm', messageSchema)