const { default: mongoose } = require("mongoose");

const clinicCapacitySchema = new mongoose.Schema({
    doctorID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Doctor',
        required: true
    },
    clinicID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Clinic',
        required: true
    },
    appointmentIDs: {
        type: Array,
        trim: true,
        required: true
    },
    isDeleted: {
        type: Boolean,
        default: false
    }
}, {
    collection: 'ClinicCapacity',
    timestamps: true
}
);

module.exports = mongoose.model('ClinicCapacity', clinicCapacitySchema);