const mongoose = require("mongoose");

const contractSchema = new mongoose.Schema({
    doctorID: {
        type: mongoose.Schema.Types.ObjectId, ref: 'Doctor',
    },
    hospitalID: {
        type: mongoose.Schema.Types.ObjectId, ref: 'Hospital',
    },
    startDate: {
        type: Date,
        required: true
    },
    endDate: {
        type: Date,
        required: true
    },
    detail: {
        type: String,
        required: true
    },
    isDeleted: {
        type: Boolean,
        default: false
    },
}, {
    collection: 'Contract',
    timestamps: true
});

module.exports = mongoose.model('Contract', contractSchema);