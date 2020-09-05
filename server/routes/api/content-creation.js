const express = require('express');
const router = express.Router();
const User = require('./../../models/User');
const Course = require('./../../models/Course');
const Video = require('./../../models/Video');
const fileHandler = require('./../../util/file-handler');

const getDate = () => {
    let d = new Date();
    let date = d.getDate();
    let month = d.getMonth();
    let monthsArr = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    let year = d.getFullYear();
    return fullDate = `${date} ${monthsArr[month]} ${year}`;
}

router.post('/create-course', async (req, res) => {
    let courseImageUrl = '';

    if (req.file) {
        courseImageUrl = req.file.filename;
    } else if (!req.file) {
        courseImageUrl = 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7c/User_font_awesome.svg/768px-User_font_awesome.svg.png';
    }

    const parsedBody = JSON.parse(req.body.course);
    const title = parsedBody.title;
    const subject = parsedBody.subjects;
    const description = parsedBody.description;
    const authorId = req.session.user._id;
    const authorName = req.session.user.name;
    const timeStamp = getDate();
    const public = parsedBody.public;
    const course = new Course({
        courseTitle: title,
        courseSubject: subject,
        courseImageUrl: courseImageUrl,
        courseAuthorId: authorId,
        courseAuthorName: authorName,
        description: description,
        timeStamp: timeStamp,
        public: public
    })
    try {
        await course.save();
        const currentCourse = await Course.findOne({ courseTitle: title }).lean();
        console.log('Saved course')
        res.json({ savedCourse: true, currentCourse: currentCourse });
    } catch (error) {
        console.log(error);
    }
});

router.post('/add-video', async (req, res) => {
    let videoUrl = '';

    if (req.file) {
        videoUrl = req.file.filename;
    } else if (!req.file) {
        videoUrl = 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7c/User_font_awesome.svg/768px-User_font_awesome.svg.png';
    }

    const parsedBody = JSON.parse(req.body.videoData);
    const title = parsedBody.title;
    const description = parsedBody.description;
    const courseId = parsedBody.courseId;
    const timeStamp = getDate();
    const order = parseInt(parsedBody.order);
    const video = new Video({
        title: title,
        description: description,
        videoUrl: videoUrl,
        authorId: req.session.user._id,
        courseId: courseId,
        timeStamp: timeStamp,
        views: 0,
        order: order
    })
    try {
        const savedVideo = await video.save();
        const currentCourse = await Course.findOne({ _id: savedVideo.courseId });
        currentCourse.classIds.push(savedVideo._id);
        const updatedCourse = await currentCourse.save();
        const currentCourseVideoIds = [...updatedCourse.classIds];
        const courseVideos = await Video.find({ _id: [...currentCourseVideoIds] }).lean();
        res.json({ postedVideo: true, currentCourseObject: {
            courseData: updatedCourse,
            courseVideos: courseVideos
        } })
    } catch (error) {
        console.log(error)
    }
});

router.get('/my-content', async (req, res) => {
    const userId = req.session.user._id;
    try {
        const userCourses = await Course.find({ courseAuthorId: userId }).lean();
        res.json({ foundCourses: true, userCourses: userCourses });
    } catch (error) {
        console.log(error);
    }
});

router.get('/course/:courseId', async (req, res) => {
    const courseId = req.params.courseId;
    try {
        const currentCourse = await Course.findOne({ _id: courseId }).lean();
        const currentCourseVideoIds = [...currentCourse.classIds];
        const courseVideos = await Video.find({ _id: [...currentCourseVideoIds] }).sort({ order: 1 }).lean();
        const courseAuthor = await User.findById(currentCourse.courseAuthorId);
        res.json({ postedVideo: true, currentCourseObject: {
            courseData: currentCourse,
            courseVideos: courseVideos,
            courseAuthor: courseAuthor,
            currentVideo: courseVideos[0]
        } })
    } catch (error) {
        console.log(error);
    }
});

router.get('/latest-courses', async (req, res) => {
    try {
        const latestCourses = await Course.find({ public: true }).sort({ createdAt: -1 }).limit(10).lean();
        res.json({ latestCourses });
    } catch (error) {
        console.log(error);
    }
})

router.post('/save-course-order', async (req, res) => {
    const parsedVideosArr = JSON.parse(req.body.videoArr);
    try {
        for (let videoId of parsedVideosArr) {
            let video = await Video.findById(videoId);
            video.order = parsedVideosArr.indexOf(videoId) + 1;
            await video.save();
        }
        res.json({ changedOrder: true });
    } catch (error) {
        console.log(error);
    }
})

router.delete('/delete-video/:videoId', async (req, res) => {
    const videoId = req.params.videoId;
    try {
        const video = await Video.findById(videoId).lean();
        const updatedCourse = await Course.findOne({ _id: video.courseId });
        const videoIds = updatedCourse.classIds;
        const indexOfVideo = videoIds.indexOf(videoId);
        updatedCourse.classIds.splice(indexOfVideo, 1);
        updatedCourse.save();
        const deleteVideo = await Video.findByIdAndDelete(videoId);
        fileHandler.deleteFile(video.videoUrl);
        const currentCourseVideoIds = [...updatedCourse.classIds];
        const courseVideos = await Video.find({ _id: [...currentCourseVideoIds] }).sort({ order: 1 }).lean();
        const courseAuthor = await User.findById(updatedCourse.courseAuthorId);
        res.json({ deletedVideo: true, currentCourseObject: {
            courseData: updatedCourse,
            courseVideos: courseVideos,
            courseAuthor: courseAuthor,
        } })
    } catch (error) {
        console.log(error);
    }
});

router.post('/edit-course', async (req, res) => {
    const parsedBody = JSON.parse(req.body.course);
    try {
        const currentCourse = await Course.findOne({ _id: parsedBody._id });
        let courseImageUrl = '';

        if (req.file) {
            fileHandler.deleteFile(currentCourse.courseImageUrl);
            currentCourse.courseImageUrl = req.file.filename;
        } else if (!req.file) {
            currentCourse.courseImageUrl = currentCourse.courseImageUrl;
        }

        currentCourse.courseTitle = parsedBody.title;
        currentCourse.courseSubject = parsedBody.subjects;
        currentCourse.description = parsedBody.description;
        currentCourse.public = parsedBody.public;
        const currentCourseVids = currentCourse.classIds;
        await currentCourse.save();
        const courseVideos = await Video.find({ _id: [...currentCourseVids] }).lean();
        console.log('Saved course')
        res.json({ savedCourse: true, currentCourseObject: {
            courseData: currentCourse,
            courseVideos: courseVideos
        } });
    } catch (error) {
        console.log(error);
    }
});

router.delete('/delete-course/:courseId', async (req, res) => {
    const courseId = req.params.courseId;
    try {
        const courseToDelete = await Course.findById(courseId).lean();
        const videosToDelete = await Video.find({ _id: [...courseToDelete.classIds] }).lean();
        const videoUrls = [];
        for (let video of videosToDelete) {
            videoUrls.push(video.videoUrl);
        }
        fileHandler.deleteFile(courseToDelete.courseImageUrl);
        const deleteCourse = await Course.findByIdAndDelete(courseId);
        for (let vid of videoUrls) {
            let videoToDel = await Video.findOneAndDelete({ videoUrl: vid });
            fileHandler.deleteFile(vid);
        }
        res.json({ courseDeleted: true });
    } catch (error) {
        console.log(error);
    }
})

module.exports = router;