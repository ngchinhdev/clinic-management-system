const { default: mongoose } = require("mongoose");

const medicineCategorySchema = new mongoose.Schema({

    name: {
        type: String,
        trim: true,
        required: true
    },
    isDeleted: {
        type: Boolean,
        default: false
    }
}, {
    collection: 'MedicineCategory',
    timestamps: true
}
);

module.exports = mongoose.model('MedicineCategory', medicineCategorySchema);