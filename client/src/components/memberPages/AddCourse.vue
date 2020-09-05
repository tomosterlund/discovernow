<template>
  <div class="home-page__container">
      <app-header />
      <div class="add-course__container">
          <div class="inspiration-container">
              <h1>Teach the world</h1>
              <div class="inspiration-image" style="background-image: url('https://storage.needpix.com/rsynced_images/online-3412473_1280.jpg')"></div>
              <p>Join our global community of teachers, in moving the classrooms even closer to the students.</p>
          </div>
          <add-course-info v-if="this.$store.state.courseCreatorPage === 0" />
          <add-video v-if="this.$store.state.courseCreatorPage === 1" />
          <course-overview :key="this.$store.state.currentCourseObject" v-if="this.$store.state.courseCreatorPage === 2" />
          <edit-course v-if="this.$store.state.courseCreatorPage === 3" />
      </div>
  </div>
</template>

<script>
import axios from 'axios'
import appHeader from './../mainComponents/Header'
import addCourseInfo from './memberComps/AddCourseInfo'
import addVideo from './memberComps/AddVideo'
import courseOverview from './memberComps/CourseOverview'
import editCourse from './memberComps/EditCourseDetails'

export default {
    components: {
        appHeader,
        addCourseInfo,
        addVideo,
        courseOverview,
        editCourse
    },
    created() {
        axios.get(`api/content/course/${this.$store.state.currentCourse}`)
            .then(response => {
                this.$store.state.currentCourseObject = response.data.currentCourseObject;
                this.$store.state.currentCourse = response.data.currentCourseObject.courseData._id;
            })
            .catch(err => console.log(err));
    }
}
</script>

<style lang="scss" scoped>
    $darkGreen: #264653;
    $green: #2a9d8f;
    $yellow: #e9c46a;
    $orange: #f4a261;
    $darkOrange: #e76f51;
    .add-course__container {
        width: 100%;
        min-width: 900px;
        height: auto;
        min-height: 95vh;
        display: flex;
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
        background-color: rgb(222, 228, 231);
        padding: 20px;
    }

    .inspiration-container {
            width: 40%;
            min-width: 350px;
            height: 400px;
            background-color: white;
            padding: 20px;
            border-radius: 10px;
            margin: 0 30px 0 0;
            .inspiration-image {
                height: 60%;
                width: 100%;
                background-size: cover;
                border-radius: 5px;
            }
            p {
                margin: 10px 0 0 0;
                padding: 0;
            }
        }
</style>