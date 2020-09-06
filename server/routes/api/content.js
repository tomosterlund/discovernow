const express = require('express');
const router = express.Router();
const User = require('./../../models/User');
const Course = require('./../../models/Course');
const Video = require('./../../models/Video');

router.post('/video/:videoUrl', async (req, res) => {
    const videoUrl = req.params.videoUrl;
    try {
        const watchedVideo = await Video.findOne({ videoUrl });
        watchedVideo.views += 1;
        watchedVideo.save();
        res.json({ increasedViewsByOne: true });
    } catch (error) {
        console.log(error);
    }
})

router.get('/video/:videoId', async (req, res) => {
    const videoId = req.params.videoId;
    try {
        const video = await Video.findOne({ _id: videoId });
        const currentCourse = await Course.findOne({ _id: video.courseId }).lean();
        const courseAuthor = await User.findById(currentCourse.courseAuthorId).lean();
        const courseVideos = await Video.find({ _id: [...currentCourse.classIds] }).sort({ order: 1 });
        res.json({ currentCourseObject: {
        courseData: currentCourse,
        courseVideos: courseVideos,
        courseAuthor: courseAuthor,
        currentVideo: video
    } })
    } catch (error) {
        console.log(error);
    }
});

router.get('/get-courses/:subject', async (req, res) => {
    const subject = req.params.subject;
    try {
        const subjectCourses = await Course.find({ courseSubject: subject, public: true })
        .sort({ createdAt: -1 })
        .limit(10)
        .lean();
        res.json({ subjectCourses });
    } catch (error) {
        console.log(error);
    }
})

router.post('/find-course', async (req, res) => {
    const searchInput = req.body.input;
    const matchingCourses = await Course.find({ courseTitle: {$regex: searchInput, $options: 'i'}, public: true }).lean();
    console.log(matchingCourses);
    res.json({matchingCourses});
})

module.exports = router;