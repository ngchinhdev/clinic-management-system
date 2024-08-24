const { default: mongoose } = require("mongoose");

const medicineSchema = new mongoose.Schema({
    medicineCategoryID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'MedicineCategory',
        required: true
    },
    medicineCode: {
        type: String,
        trim: true,
        required: true
    },
    name: {
        type: String,
        trim: true,
        required: true
    },
    ingredients: {
        type: String,
        trim: true,
        required: true
    },
    unit: {
        type: String,
        trim: true,
        required: true
    },
    sideEffects: {
        type: String,
        trim: true,
        required: true
    },
    type: {
        type: String,
        trim: true,
        required: true
    },
    instruction: {
        type: String,
        trim: true,
        required: true
    },
    note: {
        type: String,
        trim: true,
        required: true
    },
    isDeleted: {
        type: Boolean,
        default: false
    }

}, {
    collection: 'Medicine',
    timestamps: true
}
);

module.exports = mongoose.model('Medicine', medicineSchema);