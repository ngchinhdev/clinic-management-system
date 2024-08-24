const mongoose = require("mongoose");

const patientSchema = new mongoose.Schema({
    userID: {
        type: mongoose.Schema.Types.ObjectId, ref: 'User',
        required: true
    },
    patientCode: {
        type: String,
        required: true
    },
    occupation: {
        type: String
    },
    insuranceCode: {
        type: String
    },
    ethnic: {
        type: String
    },
    healthInformation: [{
        type: {
            type: String
        },
        data: {
            type: Number
        },
        unit: {
            type: String
        },
        date: {
            type: String
        },
        note: {
            type: String
        },
    }]
}, {
    collection: 'Patient',
    timestamps: true
});

module.exports = mongoose.model('Patient', patientSchema);