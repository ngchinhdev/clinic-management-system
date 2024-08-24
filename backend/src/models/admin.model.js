const mongoose = require("mongoose");

const adminSchema = new mongoose.Schema({
    userID: {
        type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true
    },
    level: {
        type: String,
        enum: ['ADMIN', 'DOCTOR'],
        required: true
    },
}, {
    collection: 'Admin',
    timestamps: true
});

module.exports = mongoose.model('Admin', adminSchema);