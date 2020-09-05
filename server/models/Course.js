const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const courseSchema = new Schema({
    courseTitle: {
        type: String,
        required: true
    },
    courseSubject: {
        type: String,
        required: true
    },
    courseImageUrl: {
        type: String,
        required: true
    },
    courseAuthorId: {
        type: String,
        required: true
    },
    courseAuthorName: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    classIds: {
        type: Array,
    },
    timeStamp: {
        type: String,
        required: true
    },
    public: {
        type: Boolean,
        required: true
    }
}, { timestamps: true });

const courseModel = mongoose.model('Course', courseSchema);

module.exports = courseModel;