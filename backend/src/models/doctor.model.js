const mongoose = require("mongoose");

const doctorSchema = new mongoose.Schema({
    userID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    specialtyID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Specialty',
        required: true
    },
    title: {
        type: String,
        required: true
    },
    practicingCertificate: {
        type: String,
        required: true
    },
    yearsExperience: {
        type: Number,
        required: true
    },
    detail: {
        type: String,
        required: true
    },
    isInternal: {
        type: Boolean,
        required: true
    },
}, {
    collection: 'Doctor',
    timestamps: true
});

module.exports = mongoose.model('Doctor', doctorSchema);