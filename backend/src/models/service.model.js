const { default: mongoose } = require("mongoose");

const serviceSchema = new mongoose.Schema({
    specialtyID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Specialty',
        required: true
    },
    name: {
        type: String,
        trim: true,
        required: true
    },
    image: {
        type: String,
        trim: true,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    discountPrice: {
        type: Number,
        required: false
    },
    shortDescription: {
        type: String,
        trim: true,
        required: true
    },
    details: {
        type: String,
        trim: true,
        required: true
    },
    orderCount: {
        type: Number,
        default: 0
    },
    isHidden: {
        type: Boolean,
        default: false
    },
    isDeleted: {
        type: Boolean,
        default: false
    }
}, {
    collection: 'Service',
    timestamps: true
}
);

module.exports = mongoose.model('Service', serviceSchema);