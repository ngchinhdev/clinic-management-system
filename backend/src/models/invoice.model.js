const mongoose = require("mongoose");

const invoiceSchema = new mongoose.Schema({
    patientID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Patient',
        required: true
    },
    serviceID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Service',
    },
    appointmentID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Appointment',
    },
    prescriptionID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Prescription',
        required: true
    },
    totalPrice: {
        type: Number,
        required: true
    },
    isDeleted: {
        type: Boolean,
        default: false
    },
}, {
    collection: 'Invoice',
    timestamps: true
});

module.exports = mongoose.model('Invoice', invoiceSchema);