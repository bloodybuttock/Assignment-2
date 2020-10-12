const mongoose = require('mongoose');

const barrackSchema = new mongoose.Schema({
    _userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    barrackName:{
        type: String,
        default: 'barrack',
    },
    name: String,
    lastTrained: {
        type: Number,
        default: Date.now(),
    },
});

module.exports = mongoose.model('barrack', barrackSchema);