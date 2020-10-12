const mongoose = require('mongoose');

const marketSchema = new mongoose.Schema({
    _userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    marketName:{
        type: String,
        default: 'market',
    },
    name: String,
    lastCollected: {
        type: Number,
        default: Date.now(),
    },
});

module.exports = mongoose.model('Market', marketSchema);