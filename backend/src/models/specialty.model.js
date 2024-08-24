const mongoose = require("mongoose");

const specialtySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    isHidden: {
        type: Boolean,
        default: false
    },
    isDeleted: {
        type: Boolean,
        default: false
    },
}, {
    collection: 'Specialty',
    timestamps: true
});

module.exports = mongoose.model('Specialty', specialtySchema);