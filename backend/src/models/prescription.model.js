const { default: mongoose } = require("mongoose");

const prescriptionSchema = new mongoose.Schema({
    advice: {
        type: String,
        trim: true,
        required: true
    },
    medicines: [{
        medicineImportID: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'MedicineImport',
            required: true,
        },
        quantity: {
            type: Number,
            required: true
        },
        dosage: {
            type: String,
            trim: true,
            required: true
        },
        isDeleted: {
            type: Boolean,
            default: false
        }
    }]
}, {
    collection: 'Prescription',
    timestamps: true
}
);

module.exports = mongoose.model('Prescription', prescriptionSchema);