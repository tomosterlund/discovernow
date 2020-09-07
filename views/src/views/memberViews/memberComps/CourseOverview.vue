<template>
    <div class="course-overview__container">
        <div class="course-info__container">
            <div :style="courseImageCss" class="course-image__container"></div>
            <div class="text-container">
                <h2 @click="getCourseView" class="course-title">
                    Course title: {{ this.$store.state.currentCourseObject.courseData.courseTitle }}
                </h2>
                <div class="numOfVideos">Number of videos: {{ this.$store.state.currentCourseObject.courseData.classIds.length }}</div>
                <div class="creation-date">Created at: {{ this.$store.state.currentCourseObject.courseData.timeStamp }}</div>
                <unicon @click="$store.state.courseCreatorPage = 3" class="unicon-class" name="edit" fill="black" />
            </div>
        </div>
        <div class="course-videos__list">
            <h2>Videos in this course:</h2>
            <draggable v-model="videoList">
                <div v-for="(video, index) in videoList" :key="video._id" class="video-container">
                    <div class="video-title">{{ index + 1 }}. {{ video.title }}</div>
                    <div class="video__button-container">
                        <unicon name="edit" height="20" width="20" fill="white" class="unicon-class" />
                        <unicon @click="deleteVideo(video._id)" name="trash" width="20" height="20" fill="white" class="unicon-class" />
                    </div>
                </div>
            </draggable>
        </div>
        <div v-if="this.saveVerification" class="verification-box">The new order was saved!</div>
        <div class="button-container">
            <span @click="addMoreContent">
                <app-button buttonText="Add a video" />
            </span>
            <button @click="saveOrder" class="save-order__button">Save video order</button>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
import draggable from 'vuedraggable'
import appButton from './../../../components/AppButton'

export default {
    data() {
        return {
            currentCourse: {
                title: this.$store.state.currentCourseObject.courseData.courseTitle,
                numOfVideos: this.$store.state.currentCourseObject.courseData.classIds.length,
                creationDate: this.$store.state.currentCourseObject.courseData.timeStamp,
                courseImageUrl: this.$store.state.currentCourseObject.courseData.courseImageUrl
            },
            videoList: {},
            newVideoArr: [],
            saveVerification: false
        }
    },
    methods: {
        addMoreContent() {
            this.$store.state.courseCreatorPage = 1;
        },
        saveOrder() {
            let fd = new FormData();
            fd.append('videoArr', JSON.stringify(this.newVideoArr));
            fd.append('courseId', JSON.stringify(this.$store.state.currentCourseObject.courseData._id));
            axios.post('api/content/save-course-order', fd)
                .then(response => {
                    console.log(response);
                    if (response.data.changedOrder === true) {
                        this.saveVerification = true;
                        setTimeout(() => {
                            this.saveVerification = false;
                        }, 3000)
                    }
                })
                .catch(err => console.log(err));
        },
        deleteVideo(videoId) {
            axios.delete(`api/content/delete-video/${videoId}`)
                .then(response => {
                    this.$store.state.currentCourseObject = response.data.currentCourseObject;
                })
                .catch(err => console.log(err));
        },
        getCourseView(courseId) {
            console.log(courseId);
            this.$router.push({ path: `/course/${this.$store.state.currentCourseObject.courseData._id}` })
        },
    },
    computed: {
        courseImageCss: function() {
            return {
                backgroundImage: `url('https://discover-test-files.s3.eu-central-1.amazonaws.com/${this.$store.state.currentCourseObject.courseData.courseImageUrl}')`
            }
        }
    },
    components: {
        draggable,
        appButton
    },
    created() {
        this.videoList = this.$store.state.currentCourseObject.courseVideos;
    },
    watch: {
        videoList() {
            this.newVideoArr = [];
            for (let video of this.videoList) {
                this.newVideoArr.push(video._id);
            }
        }
    }
}
</script>

<style lang="scss" scoped>
    $darkGreen: #264653;
    $green: #2a9d8f;
    $yellow: #e9c46a;
    $orange: #f4a261;
    $darkOrange: #e76f51;

    
        .course-overview__container {
            width: 56%;
            min-width: 400px;
            padding: 10px;
            display: flex;
            flex-direction: column;
            align-items: center;
            background-color: white;
            border-radius: 10px;
            .course-info__container {
                display: flex;
                justify-content: flex-start;
                width: 80%;
                height: auto;
                border-bottom: 1px solid gray;
                padding: 0.5rem;
                .course-image__container {
                    width: 140px;
                    height: 100px;
                    margin-right: 10px;
                    background-size: cover;
                    border-radius: 3px;
                    box-shadow: 0px 2px 4px 0px lightgray;
                }
                .course-title {
                    font-size: 20px;
                    text-decoration: underline;
                    color: rgb(82, 82, 211);
                    cursor: pointer;
                    &:hover {
                        opacity: 0.8;
                    }
                }
                .creation-date {
                    color: gray;
                    text-transform: uppercase;
                    font-weight: 700;
                    font-size: 14px;
                }
            }
            .course-videos__list {
                margin-top: 30px;
                width: 80%;
                .video-container {
                    height: 40px;
                    display: flex;
                    justify-content: space-between;
                    align-content: center;
                    cursor: pointer;
                    background-color: $darkGreen;
                    color: white;
                    font-weight: 500;
                    margin-bottom: 5px;
                    border-radius: 5px;
                    padding: 0.3rem;
                    .video__button-container {
                        display: flex;
                        align-items: center;
                        button {
                            background-color: inherit;
                            color: white;
                            border: 0;
                            outline: none;
                            font-size: 20px;
                            i {
                                &:hover {
                                color: red;
                                transform: scale(1.2);
                            }
                            }
                        }
                    }
                }
            }
            .button-container {
                display: flex;
                justify-content: space-around;
                margin-top: 20px;
                width: 100%;
            }
            .save-order__button {
                padding: 0.5rem;
                font-weight: 600;
                font-size: 16px;
                background-color: $darkGreen;
                color: white;
                border: 1px solid $darkGreen;
                outline: none;
                cursor: pointer;
                border-radius: 3px;
                &:hover {
                    animation: orderButtonHover;
                    animation-iteration-count: 1;
                    animation-duration: 0.3s;
                    animation-fill-mode: forwards;
                }
            }
        }

    @keyframes orderButtonHover {
        0% {
            color: white;
            background-color: $darkGreen;
        }
        100% {
            color: $darkGreen;
            background-color: white;
            transform: scale(1.04);
        }
    }

    .verification-box {
        background-color: rgb(142, 212, 221);
        margin-top: 10px;
        padding: 0.5rem;
        border-radius: 3px;
    }

    .unicon-class {
        margin-right: 10px;
        cursor: pointer;
        &:hover {
            transform: scale(1.2);
        }
    }
</style>