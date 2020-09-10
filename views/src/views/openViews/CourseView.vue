<template>
  <div class="home-page__container">
      <app-header :courseData="courseData" :courseVideos="courseVideos" />
      <div class="course-page__container">
          <div class="content-container">
              <video-comp :loadingDone="loadingDone" :courseAuthor="courseAuthor" :courseVideos="courseVideos" :courseData="courseData" :key="this.$store.state.currentVideo" />
          </div>
          <course-nav :courseData="courseData" :courseVideos="courseVideos" class="sidenav-container hidden-sm-and-down"/>
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
            courseAuthor: {},
            loadingDone: false
        }
    },
    components: {
        appHeader,
        courseNav,
        videoComp
    },
    created() {
        this.$store.commit('loadingDone');
        if (!this.$route.params.videoId) {
            const routeParam = this.$route.params.courseId;
            axios.get('/api/content/course/' + routeParam)
                .then(response => {
                    this.$store.commit('loadingDone');
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
                    this.$store.commit('loadingDone');
                    this.loadingDone = true;
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
    .home-page__container {
        min-height: 100vh;
                background-color: rgb(222, 228, 231);

    }

    .course-page__container {
        width: 100%;
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
    @media (max-width: 900px) {
        .content-container {
            min-width: 100%;
            width: 100%;
        }
    }
</style>