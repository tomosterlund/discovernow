<template>
  <div class="nav-container">
      <div class="course-info__container">
          <div v-if="this.$store.state.loadingDone" class="course-image" :style="{ backgroundImage: `url('https://discover-test-files.s3.eu-central-1.amazonaws.com/${courseData.courseImageUrl}')` }"></div>
          <div v-if="this.$store.state.loadingDone" class="course-title">{{ courseData.courseTitle }}</div>
          <v-skeleton-loader
            v-if="!this.$store.state.loadingDone"
            type="image"
            height="60"
            width="60"
            style="margin: 10px;">
            </v-skeleton-loader>
      </div>
      <span v-if="this.$store.state.loadingDone">
        <div @click="goToVideo(video)" v-for="(video, index) in courseVideos" :key="video._id" class="video-summary__container">
            {{ index + 1 }}. {{ video.title }}
        </div>
      </span>
      <span v-if="!this.$store.state.loadingDone">
        <v-skeleton-loader
            type="paragraph"
            v-for="n in 4"
            :key="n"
            style="margin: 0 0 20px 10px; width: 80%"
            >
        </v-skeleton-loader>
      </span>
  </div>
</template>

<script>
export default {
    props: ['courseVideos', 'courseData'],
    methods: {
        goToVideo(video) {
            this.$store.state.currentVideo = `${video.videoUrl}`;
            this.$router.push({ path: `/video/${video._id}` });
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

    .nav-container {
        border-left: 1px solid gray;
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        .course-info__container {
            width: 100%;
            height: 80px;
            display: flex;
            align-items: center;
            .course-image {
                height: 60px;
                width: 60px;
                border-radius: 4px;
                background-size: cover;
                margin: 0 0 0 10px;
            }
            .course-title {
                padding: 10px;
                font-size: 20px;
                font-weight: 800px;
            }
        }
        .video-summary__container {
            height: 50px;
            width: 100%;
            border-bottom: 1px solid gray;
            padding: 0.5rem;
            display: flex;
            align-items: center;
            font-weight: 500;
            cursor: pointer;
            &:hover {
                background-color: $darkGreen;
                color: white;
            }
        }
    }
</style>