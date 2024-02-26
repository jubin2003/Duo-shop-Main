const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    username: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    isAdmin: {
        type: Boolean,
        default: false,
    },
    name: {
        type: String,
        required:true, // Change to true if you want it to be a required field
        default: '' // Add a default value if needed
    },
    address: String,
    pincode: String,
    landmark: String,
    phoneNumber: String,
}, {
    timestamps: true
}); 

const User = mongoose.model('User', userSchema);

module.exports = User;
