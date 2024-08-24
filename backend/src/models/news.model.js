const { default: mongoose } = require("mongoose");

const newsSchema = new mongoose.Schema({
    specialtyID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Specialty',
        required: true
    },
    title: {
        type: String,
        trim: true,
        required: true
    },
    shortDescription: {
        type: String,
        trim: true,
        required: true
    },
    image: {
        type: String,
        trim: true,
        required: true
    },
    content: {
        type: String,
        trim: true,
        required: true
    },
    author: {
        type: String,
        trim: true,
        required: true
    },
    viewCount: {
        type: Number,
        required: true
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
    collection: 'News',
    timestamps: true
}
);

module.exports = mongoose.model('News', newsSchema);