<template>
  <div class="video-container">
      <video ref="videoRef" width="600" controls></video>
      <div class="video-info__container">
          <div class="left-container">
            <v-skeleton-loader
            type="list-item-avatar-two-line"
            width="500"
            v-if="!this.$store.state.loadingDone"
            >
            </v-skeleton-loader>
            <div v-if="this.$store.state.loadingDone" class="author-image" :style="{ backgroundImage: `url('${AWS_BUCKET}${courseAuthor.imageUrl}')` }"></div>
            <div v-if="this.$store.state.loadingDone" class="video-info__text-container">
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
            routeParam: this.$route.params.videoId,
            AWS_BUCKET:process.env.VUE_APP_AWS_BUCKET
        }
    },
    components: { videoTexts },
    props: ['courseAuthor', 'courseVideos', 'courseData'],
    mounted() {
        this.$refs.videoRef.src = `${process.env.VUE_APP_AWS_BUCKET}${this.$store.state.currentVideo}`;
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
        axios.post(`/api/content/video/${this.$store.state.currentVideo}`)
            .then(result => console.log(result))
            .catch(err => console.log(err));
    }
}
</script>

<style lang="scss" scoped>
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