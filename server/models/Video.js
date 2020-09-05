const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const videoSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    videoUrl: {
        type: String,
        required: true
    },
    authorId: {
        type: String,
        required: true
    },
    courseId: {
        type: String,
        required: true
    },
    timeStamp: {
        type: String,
        required: true
    },
    views: {
        type: Number,
        required: true
    },
    order: {
        type: Number,
        required: true
    }
}, { timestamps: true });

const videoModel = mongoose.model('Video', videoSchema);

module.exports = videoModel;