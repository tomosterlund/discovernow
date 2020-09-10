<template>
  <div class="course-container">
        <div class="text-container">
            <h2 class="course-title">
                {{ course.courseTitle }}
            </h2>
            <div :style="{ backgroundImage: `url('${AWS_BUCKET}${course.courseImageUrl}')` }" class="course-image__container"></div>
            <div class="numOfVideos">Number of videos: {{ course.classIds.length }}</div>
            <div class="creation-date">Created at: {{ course.timeStamp }}</div>
        </div>
    </div>
</template>

<script>
export default {
    props: ['course'],
    data() {
        return {
            AWS_BUCKET: process.env.VUE_APP_AWS_BUCKET
        }
    }
}
</script>

<style lang="scss" scoped>
    .course-container {
        height: 270px;
        width: 220px;
        box-shadow: 0px 3px 9px 0px lightgray;
        margin: 15px;
        cursor: pointer;
        background-color: $darkGreen;
        border-radius: 5px;
        color: white;
        padding: 0.3rem;
        &:hover {
            transform: scale(1.025);
            box-shadow: 0px 5px 10px 0px gray;
        }
        .text-container {
            display: flex;
            flex-direction: column;
            align-items: center;
            .course-title {
            font-size: 20px;
            text-align: center;
            margin: 10px 0 20px 0;
            height: 50px;
            max-width: 200px;
            overflow: hidden;
            text-overflow: ellipsis;
            }
            .numOfVideos {
                margin: 30px 0 10px 0;
            }
            .creation-date {
                color: lightgray;
                text-transform: uppercase;
                font-weight: 700;
                font-size: 12px;
            }
        }
        .course-image__container {
        width: 100px;
        height: 100px;
        margin-right: 10px;
        background-size: cover;
        border-radius: 3px;
        }
    }
    @media (max-width: 900px) {
        .course-container {
            width: 150px;
            height: 220px;
            position: relative;
            .course-title {
                margin: 0;
            }
            .numOfVideos {
                position: absolute;
                bottom: 0px;
                font-size: 14px;
                color: lightgray;
            }
            .creation-date { display: none }
        }
    }
</style>