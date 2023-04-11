const mongoose = require('mongoose');


const recentTrackSchema = mongoose.model('recentTrackSchema', {
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    name: {
        type: String,
        required: true
    },
    id: {
        type: String,
        require: true
    },
    album: {
        type: String,
        required: true
    },
    artists:{
        type: String,
        require: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = recentTrackSchema;  