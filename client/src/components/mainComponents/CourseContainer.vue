<template>
  <div class="course-container">
        <div class="text-container">
            <h2 class="course-title">
                {{ course.courseTitle }}
            </h2>
            <div :style="{ backgroundImage: `url('https://discover-test-files.s3.eu-central-1.amazonaws.com/${course.courseImageUrl}')` }" class="course-image__container"></div>
            <div class="numOfVideos">Number of videos: {{ course.classIds.length }}</div>
            <div class="creation-date">Created at: {{ course.timeStamp }}</div>
        </div>
    </div>
</template>

<script>
export default {
    props: ['course']
}
</script>

<style lang="scss" scoped>
    $darkGreen: #264653;
    $green: #2a9d8f;
    $yellow: #e9c46a;
    $orange: #f4a261;
    $darkOrange: #e76f51;

    .course-container {
        height: 270px;
        min-width: 220px;
        box-shadow: 0px 3px 9px 0px lightgray;
        margin: 15px;
        display: flex;
        flex-direction: column;
        align-items: center;
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
            height: 40px;
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
</style>