const mongoose = require('mongoose');

const medicineSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    name: String,
    dates: [String],
    additionalData: [Number]
});

const Medicine = mongoose.model('Medicine', medicineSchema);

module.exports = Medicine;
