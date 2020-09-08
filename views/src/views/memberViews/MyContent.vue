<template>
    <div class="home-page__container">
        <app-header />
        <div class="page__container">
            <div class="white-container">
                <h2>My Content</h2>
                <div class="my-courses__container">
                    <div @click="goToNewCourse" class="add-course__container bg-green">
                        <div class="add-course__text">Add course</div>
                        <div class="plus-sign">+</div>
                    </div>
                    <div v-if="!queryFinished" class="course-container bg-dark" style="display: flex; flex-direction: column; justify-content: center">
                        <half-circle-spinner
                        :animation-duration="1000"
                        :size="60"
                        color="white"
                        />
                    </div>
                    <div @click="getCourseOverview(course._id)" v-for="course in this.userCourses" :key="course._id" class="course-container bg-dark">
                        <div class="text-container">
                            <h2 class="course-title">
                                Course title: {{ course.courseTitle }}
                                <unicon v-if="!course.public" name="eye-slash" fill="#f4a261" />
                            </h2>
                            <div :style="{ backgroundImage: `url('https://discover-test-files.s3.eu-central-1.amazonaws.com/${course.courseImageUrl}')` }" class="course-image__container"></div>
                            <div class="numOfVideos">Number of videos: {{ course.classIds.length }}</div>
                            <div class="creation-date">Created at: {{ course.timeStamp }}</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
import appHeader from './../../components/Header'
import { HalfCircleSpinner } from 'epic-spinners'

export default {
    data() {
        return {
            userCourses: {},
            queryFinished: false
        }
    },
    components: {
        appHeader,
        HalfCircleSpinner
    },
    created() {
        axios.get('api/content/my-content')
            .then(response => {
                this.queryFinished = true;
                this.userCourses = response.data.userCourses;
                console.log(this.userCourses);
            })
            .catch(err => console.log(err));
    },
    methods: {
        getCourseOverview(courseId) {
            console.log(courseId);
            this.$store.state.currentCourse = courseId;
            this.$store.state.courseCreatorPage = 2;
            axios.get(`api/content/course/${this.$store.state.currentCourse}`)
                .then(response => {
                    this.$store.state.currentCourseObject = response.data.currentCourseObject;
                    this.$store.state.currentCourse = response.data.currentCourseObject.courseData._id;
                    this.$router.push({ path: '/add-course' });
                })
                .catch(err => console.log(err));
        },
        goToNewCourse() {
            this.$store.state.currentCourse = '';
            this.$store.state.courseCreatorPage = 0;
            this.$router.push({ path: '/add-course' })
        }
    },
    beforeMount() {
        if (!this.$store.state.user.name) {
            this.$router.push({ path: '/' });
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

    .page__container {
        width: 100%;
        min-width: 900px;
        height: auto;
        min-height: 95vh;
        display: flex;
        flex-direction: column;
        align-items: center;
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
        background-color: rgb(222, 228, 231);
        .white-container {
            width: 90%;
            background-color: white;
            display: flex;
            flex-direction: column;
            flex-wrap: wrap;
            align-items: center;
            margin: 30px;
            border-radius: 10px;
            box-shadow: 10px 10px 50px gray;
            .my-courses__container {
                display: flex;
                justify-content: start;
                flex-wrap: wrap;
                .course-container {
                    height: 280px;
                    width: 220px;
                    box-shadow: 0px 3px 9px 0px lightgray;
                    margin: 10px;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: flex-start;
                    cursor: pointer;
                    border-radius: 5px;
                    color: white;
                    &:hover {
                        transform: scale(1.02);
                        box-shadow: 0px 5px 10px 0px gray;
                    }
                    .text-container {
                        display: flex;
                        flex-direction: column;
                        align-items: center;
                        .course-title {
                        font-size: 20px;
                        text-align: center;
                        height: 70px;
                        margin-top: 10px;
                        }
                        .numOfVideos {
                            margin: 10px 0 10px 0;
                        }
                        .creation-date {
                            color: lightgray;
                            text-transform: uppercase;
                            font-weight: 700;
                            font-size: 12px;
                        }
                    }
                    .course-image__container {
                    width: 140px;
                    height: 100px;
                    margin-right: 10px;
                    background-size: cover;
                    border-radius: 3px;
                }
                }
            }
        }
    }
    .bg-dark {
        background-color: $darkGreen;
    }
    .bg-green {
        background-color: rgb(33, 204, 33);
    }

    .add-course__container {
        height: 280px;
        width: 220px;
        box-shadow: 0px 3px 9px 0px lightgray;
        margin: 10px;
        display: flex;
        flex-direction: column;
        align-items: center;
        cursor: pointer;
        justify-content: center;
        border-radius: 5px;
        color: white;
        position: relative;
        &:hover {
            transform: scale(1.02);
            box-shadow: 0px 5px 10px 0px gray;
        }
        .plus-sign {
            font-size: 120px;
        }
        .add-course__text {
            position: absolute;
            top: 10px;
            left: 45px;
            font-size: 24px;
            font-weight: 600;
        }
    }
</style>