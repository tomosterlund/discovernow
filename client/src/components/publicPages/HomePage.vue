<template>
  <div class="home-page__container">
      <app-header />
      <div class="home-page__container">
          <div class="landing-page__greeting">
              <div class="left-container">
                <div class="intro-text">
                    Welcome to Discover now. It is our quest, to bring educators and learners together, in order to make great education available for everyone - for free!
                    <span @click="scrollToCourses">
                        <rounded-button style="margin-top: 10px;" buttonText="Start learning now" />
                    </span>
                </div>
              </div>
              <div class="right-container">
                <h1>Discover the world</h1>
                <h3>Right where you are</h3>
                <div :style="{ backgroundImage: `url('https://storage.needpix.com/rsynced_images/online-3412473_1280.jpg')` }" class="image-container"></div>
              </div>
          </div>
          <div class="white-container" style="min-height: 100px;">
              <h2 class="container-title">Find your course</h2>
              <select v-model="selectedSubject" value="Other" class="select-input" id="subjects">
                <option value="Maths">Maths</option>
                <option value="Languages">Languages</option>
                <option value="Science">Science</option>
                <option value="Geography">Geography</option>
                <option value="Social studies">Social studies</option>
                <option value="Tech">Tech</option>
                <option value="Music">Music</option>
                <option value="Other">Other</option>
                </select>
              <div class="my-courses__container" style="margin-top: 75px">
                    <span v-if="pendingSubjectQuery">
                        <course-container-spinner />
                    </span>
                    <span @click="getCourseView(course._id)" v-for="course in this.subjectCourses" :key="course._id">
                        <course-container :course="course" />
                    </span>
              </div>
          </div>
          <div class="white-container">
              <h2 class="container-title">Latest courses</h2>
                <div class="my-courses__container">
                    <span v-if="!queryFinished">
                        <course-container-spinner />
                    </span>
                    <span v-if="!queryFinished">
                        <course-container-spinner />
                    </span>
                    <span v-if="!queryFinished">
                        <course-container-spinner />
                    </span>
                    <span v-if="!queryFinished">
                        <course-container-spinner />
                    </span>
                    <span v-if="!queryFinished">
                        <course-container-spinner />
                    </span>
                    <span v-if="!queryFinished">
                        <course-container-spinner />
                    </span>
                    <span @click="getCourseView(course._id)" v-for="course in this.latestCourses" :key="course._id">
                        <course-container :course="course" />
                    </span>
                </div>
          </div>
      </div>
  </div>
</template>

<script>
import axios from 'axios'
import appHeader from './../mainComponents/Header'
import courseContainer from './../mainComponents/CourseContainer'
import courseContainerSpinner from './../mainComponents/CourseContainerSpinner'
import roundedButton from './../mainComponents/RoundedButton'

export default {
    data() {
        return {
            latestCourses: {},
            queryFinished: false,
            selectedSubject: 'Music',
            subjectCourses: {},
            pendingSubjectQuery: false
        }
    },
    components: {
        appHeader,
        courseContainer,
        courseContainerSpinner,
        roundedButton
    },
    created() {
        axios.get('api/content/latest-courses')
            .then(response => {
                this.queryFinished = true;
                const responseCourses = response.data.latestCourses;
                this.latestCourses = responseCourses;
            })
            .catch(err => console.log(err));
        this.pendingSubjectQuery = true;
        const subjectToFetch = this.selectedSubject;
        axios.get(`api/content/get-courses/${subjectToFetch}`)
            .then(response => {
                console.log(response);
                this.pendingSubjectQuery = false;
                this.subjectCourses = response.data.subjectCourses;
            })
            .catch(err => console.log(err));
    },
    methods: {
        getCourseView(courseId) {
            console.log(courseId);
            this.$router.push({ path: `/course/${courseId}` });
        },
        scrollToCourses() {
            window.scrollTo(0, 400);
        }
    },
    watch: {
        selectedSubject() {
            this.pendingSubjectQuery = true;
            const subjectToFetch = this.selectedSubject;
            axios.get(`api/content/get-courses/${subjectToFetch}`)
                .then(response => {
                    console.log(response);
                    this.pendingSubjectQuery = false;
                    this.subjectCourses = response.data.subjectCourses;
                })
                .catch(err => console.log(err));
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
    html {
        scroll-behavior: smooth;
    }
    .home-page__container {
        width: 100%;
        height: auto;
        min-height: 95vh;
        display: flex;
        flex-direction: column;
        align-items: center;
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
        background-color: rgb(222, 228, 231);
        min-width: 900px;
        .landing-page__greeting {
            width: 90%;
            height: 300px;
            max-width: 1250px;
            border-radius: 10px;
            display: flex;
            box-shadow: 10px 8px 30px gray;
            background-color: white;
            margin-top: 20px;
            overflow: hidden;
            .left-container {
                width: 35%;
                height: 100%;
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
                .intro-text {
                    text-align: center;
                    font-size: 19.5px;
                    letter-spacing: 0.03rem;
                    padding: 2rem;
                }
                .top-image {
                    height: 42.5%;
                    width: 95%;
                    background-size: cover;
                    margin-bottom: 5%;
                    opacity: 80%;
                }
                .bottom-image {
                    height: 42.5%;
                    width: 95%;
                    background-size: cover;
                }
            }
            .right-container {
                width: 65%;
                height: 100%;
                display: flex;
                align-items: center;
                justify-content: center;
                position: relative;
                h1 {
                    position: absolute;
                    top: 90px;
                    font-size: 50px;
                    font-weight: 700;
                    opacity: 100%;
                    z-index: 2;
                }
                h3 {
                    position: absolute;
                    top: 150px;
                    font-size: 25px;
                    opacity: 100%;
                    z-index: 2;
                }
                .image-container {
                    height: 90%;
                    width: 98%;
                    background-size: cover;
                    background-color: transparent;
                    opacity: 0.35;
                    z-index: 1;
                }
            }
        }
        .white-container {
            position: relative;
            width: 90%;
            max-width: 1250px;
            height: auto;
            background-color: white;
            display: flex;
            flex-direction: column;
            align-items: center;
            margin: 30px;
            border-radius: 10px;
            box-shadow: 10px 10px 50px gray;
            .container-title {
                position: absolute;
                top: 5px;
                left: 15px;
                color: rgb(65, 59, 59);
                text-transform: uppercase;
                font-size: 25px;
                font-weight: 700;
            }
            .select-input {
                position: absolute;
                top: 40px;
                left: 15px;
                width: 350px;
                padding: 0.4rem;
                border-top: 0;
                border-left: 0;
                border-right: 0;
                border-bottom: 1px solid black;
                border: 1px solid $orange;
                outline: none;
                box-shadow: 0px 1px 3px 0px $darkOrange;
                margin: 0;
                cursor: pointer;
                &:focus {
                    border: 1px solid $orange;
                    outline: none;
                    box-shadow: 3px 4px 4px $darkOrange;
                }
            }
            .my-courses__container {
                overflow-y: scroll;
                scrollbar-width: none; /* Firefox */
                -ms-overflow-style: none;  /* Internet Explorer 10+ */
                display: flex;
                margin-top: 30px;
                width: 100%;
            }
        }
        .my-courses__container::-webkit-scrollbar { /* WebKit */
            width: 0;
            height: 0;
        }
    }
</style>