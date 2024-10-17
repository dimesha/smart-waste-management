const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    Name: { type: String, required: true, unique: true },
    Address: { type: String, required: true },
    Email: { type: String, required: true },
    Password: { type: String, required: true },
    img: { type: String, default:'https://i.pinimg.com/564x/0d/64/98/0d64989794b1a4c9d89bff571d3d5842.jpg' },
    isAdmin: { type: Boolean, default: false },
});

const User = mongoose.model('User', userSchema);

module.exports = User;
