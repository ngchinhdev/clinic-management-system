const mongoose = require("mongoose");

const resultSchema = new mongoose.Schema({
    appointmentID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Appointment',
        required: true
    },
    serviceID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Service',
        required: true
    },
    diagnose: {
        type: String,
        required: true
    },
    images: [{
        type: String,
        required: true
    }],
    description: {
        type: String,
        required: true
    },
}, {
    collection: 'Result',
    timestamps: true
});

module.exports = mongoose.model('Result', resultSchema);