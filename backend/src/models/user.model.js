const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: true
    },
    phoneNumber: {
        type: String,
    },
    email: {
        type: String,
    },
    dateOfBirth: {
        type: String,
    },
    address: {
        province: {
            type: String,
        },
        district: {
            type: String,
        },
        ward: {
            type: String,
        },
        street: {
            type: String,
        },
    },
    gender: {
        type: String,
    },
    password: {
        type: String,
        required: true
    },
    avatar: {
        type: String,
    },
    citizenIdentificationNumber: {
        type: Number,
    },
    isActivated: {
        type: Boolean,
        required: true
    },
    isDeleted: {
        type: Boolean,
        default: false
    },
}, {
    collection: 'User',
    timestamps: true
});

module.exports = mongoose.model('User', userSchema);