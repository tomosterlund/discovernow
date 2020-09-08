<template>
  <div class="home-page__container">
      <app-header />
      <div class="course-page__container">
          <div class="content-container">
              <video-comp :courseAuthor="courseAuthor" :courseVideos="courseVideos" :courseData="courseData" :key="this.$store.state.currentVideo" />
          </div>
          <course-nav :courseData="courseData" :courseVideos="courseVideos" class="sidenav-container"/>
      </div>
  </div>
</template>

<script>
import axios from 'axios'
import appHeader from './../../components/Header'
import courseNav from './publicComps/CourseNav'
import videoComp from './publicComps/VideoComp'

export default {
    data() {
        return {
            routeParam: this.$route.params.courseId,
            courseData: {},
            courseVideos: {},
            courseAuthor: {}
        }
    },
    components: {
        appHeader,
        courseNav,
        videoComp
    },
    created() {
        if (!this.$route.params.videoId) {
            const routeParam = this.$route.params.courseId;
            axios.get('/api/content/course/' + routeParam)
                .then(response => {
                    console.log('makes it here' + this.$route.params.courseId)
                    console.log(response.data)
                    console.log('Makes it here..')
                    this.courseData = response.data.currentCourseObject.courseData;
                    this.courseVideos = response.data.currentCourseObject.courseVideos;
                    this.courseAuthor = response.data.currentCourseObject.courseAuthor;
                    this.$store.state.currentWatchedCourse = response.data.currentCourseObject;
                    this.$store.state.currentVideoObject = response.data.currentCourseObject.currentVideo;
                    return this.$store.state.currentVideo = this.courseVideos[0].videoUrl;
                })
                .catch(err => console.log(err));
        } else if (this.$route.params.videoId) {
            axios.get(`/api/content/video/${this.$route.params.videoId}`)
                .then(response => {
                    console.log(response.data);
                    this.courseData = response.data.currentCourseObject.courseData;
                    this.courseVideos = response.data.currentCourseObject.courseVideos;
                    this.courseAuthor = response.data.currentCourseObject.courseAuthor;
                    this.$store.state.currentWatchedCourse = response.data.currentCourseObject;
                    this.$store.state.currentVideoObject = response.data.currentCourseObject.currentVideo;
                    this.$store.state.currentVideo = response.data.currentCourseObject.currentVideo.videoUrl;
                })
                .catch(err => console.log(err));
        }
    },
}
</script>

<style lang="scss" scoped>
    $darkGreen: #264653;
    $green: #2a9d8f;
    $yellow: #e9c46a;
    $orange: #f4a261;
    $darkOrange: #e76f51;

    .home-page__container {
        min-height: 100vh;
                background-color: rgb(222, 228, 231);

    }

    .course-page__container {
        width: 100%;
        min-width: 900px;
        display: flex;
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
        background-color: rgb(222, 228, 231);
        .content-container {
            width: 70%;
            min-height: 92vh;
        }
        .sidenav-container {
            min-height: 92vh;
            width: 30%;
        }
    }
</style>