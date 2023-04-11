const mongoose = require('mongoose');


const recentTrackSchema = mongoose.model('recentTrackSchema', {
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    id: {
        type: id,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    album: {
        type: String,
        required: true
    },
    artists: {
        type: String,
        require: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = recentTrackSchema;  