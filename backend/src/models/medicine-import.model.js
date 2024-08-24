const { default: mongoose } = require("mongoose");

const medicineImportSchema = new mongoose.Schema({
    medicineID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Medicine',
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },
    purchaseDate: {
        type: String,
        trim: true,
        required: true
    },
    manufacturingDate: {
        type: String,
        trim: true,
        required: true
    },
    expiryDate: {
        type: String,
        trim: true,
        required: true
    },
    purchasePrice: {
        type: Number,
        required: true
    },
    sellingPrice: {
        type: Number,
        required: true
    },
    origin: {
        type: String,
        trim: true,
        required: true
    },
    isDeleted: {
        type: Boolean,
        default: false
    }
}, {
    collection: 'MedicineImport',
    timestamps: true
}
);

module.exports = mongoose.model('MedicineImport', medicineImportSchema);