const mongoose = require("mongoose");

const revokedTokenSchema = new mongoose.Schema({
    token: {
        type: String,
        unique: true,
        require: true
    },
    time: {
        type: Date,
        default: Date.now,
        index: { expires: 604800 }
    }
}, {
    collection: 'RevokedToken',
    timestamps: true
});

module.exports = mongoose.model('Result', revokedTokenSchema);