<template>
  <div class="video-container">
      <video ref="videoRef" width="600" controls></video>
      <div class="video-info__container">
          <div class="left-container">
            <div class="author-image" :style="{ backgroundImage: `url('https://discover-test-files.s3.eu-central-1.amazonaws.com/${courseAuthor.imageUrl}')` }"></div>
            <div class="video-info__text-container">
                <span class="video-title">{{ title }}</span>
                <div class="timestamp">{{ this.timestamp }}</div>
            </div>
          </div>
          <div class="right-container">
              {{ views }} views
          </div>
      </div>
      <video-texts :courseDescription="courseData.description" :description="description" style="width: 100%" />
  </div>
</template>

<script>
import axios from 'axios'
import videoTexts from '@/components/VideoTexts.vue'

export default {
    data() {
        return {
            timestamp: '',
            views: 0,
            title: '',
            description: '',
            routeParam: this.$route.params.videoId
        }
    },
    components: { videoTexts },
    props: ['courseAuthor', 'courseVideos', 'courseData'],
    mounted() {
        this.$refs.videoRef.src = `https://discover-test-files.s3.eu-central-1.amazonaws.com/${this.$store.state.currentVideo}`;
        function numberWithCommas(x) {
            return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        }
        for (let video of this.$store.state.currentWatchedCourse.courseVideos) {
            if (video.videoUrl === this.$store.state.currentVideo) {
                this.timestamp = video.timeStamp;
                this.title = video.title;
                this.description = video.description;
                this.views = numberWithCommas(video.views);
            }
        }
        axios.post(`api/content/video/${this.$store.state.currentVideo}`)
            .then(result => console.log(result))
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

    .video-container {
        height: 100%;
        width: 100%;
        display: flex;
        flex-direction: column;
        margin: 0px 0 0 0;
        video {
            width: 100%;
            height: 350px;
            background-color: black;
        }
        .video-info__container {
            display: flex;
            padding: 10px;
            width: 100%;
            justify-content: space-between;
            .left-container {
            display: flex;
            align-items: center;
                .author-image {
                    background-size: cover;
                    width: 60px;
                    height: 60px;
                    border-radius: 50%;
                    box-shadow: 0px 8px 8px 0px lightgray;
                }
                .video-info__text-container {
                    margin-left: 10px;
                    .video-title {
                        font-size: 23px;
                        font-weight: 500;
                        border-bottom: 3px solid $orange;
                        padding: 0;
                        margin: 0;
                        width: auto;
                    }
                    .timestamp {
                        text-transform: uppercase;
                        font-size: 14px;
                        font-weight: 700;
                        color: rgb(107, 103, 109);
                        margin-top: 8px;
                    }
                }
            }
            .right-container {
                font-size: 20px;
                color: rgb(132, 136, 141);
                font-weight: 500;
            }
        }
        .video-description {
            margin: 20px 0 0 80px;
        }
    }
</style>