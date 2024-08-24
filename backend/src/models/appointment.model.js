const mongoose = require("mongoose");

const appointmentSchema = new mongoose.Schema({
    patientID: {
        type: mongoose.Schema.Types.ObjectId, ref: 'Patient',
        required: true
    },
    doctorID: {
        type: mongoose.Schema.Types.ObjectId, ref: 'Doctor',
        required: true
    },
    serviceID: {
        type: mongoose.Schema.Types.ObjectId, ref: 'Service',
    },
    medicalPackageID: {
        type: mongoose.Schema.Types.ObjectId, ref: 'MedicalPackage',
    },
    clinicID: {
        type: mongoose.Schema.Types.ObjectId, ref: 'Clinic',
        required: true
    },
    type: {
        type: String,
        required: true
    },
    time: {
        type: String,
        required: true
    },
    status: {
        type: String,
        required: true
    },
    isService: {
        type: Boolean,
        required: true
    },
    paymentMethod: {
        method: {
            type: String,
        },
        token: {
            type: String,
        },
        isPaid: {
            type: Boolean,
        },
    },
    isDeleted: {
        type: Boolean,
        required: true
    },
}, {
    collection: 'Appointment',
    timestamps: true
});

module.exports = mongoose.model('Appointment', appointmentSchema);