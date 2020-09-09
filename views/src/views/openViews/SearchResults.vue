<template>
    <div class="search-results__page-container">
        <app-header />
        <h1>Showing results for: "{{ lastSearchInput }}"</h1>
        <div class="courses-container">
            <div v-for="course in searchResults" :key="course._id" @click="goToCourse(course._id)" class="course-container">
                <div :style="{ backgroundImage: `url('https://discover-test-files.s3.eu-central-1.amazonaws.com/${course.courseImageUrl}')` }" class="image-container"></div>
                <div class="course-info__container">
                    <h2>
                        {{ course.courseTitle }}
                    </h2>
                    <div class="course-author">
                        With: {{ course.courseAuthorName }}
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import appHeader from './../../components/Header'

export default {
    computed: {
        searchResults() {
            return this.$store.getters.lastSearchResults;
        },
        lastSearchInput() {
            return this.$store.getters.lastSearchInput;
        }
    },
    components: {
        appHeader
    },
    methods: {
        goToCourse(courseId) {
            return this.$router.push({ path: `/course/${courseId}` });
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

    .search-results__page-container {
        width: 100%;
        height: auto;
        min-height: 100vh;
        display: flex;
        flex-direction: column;
        align-items: center;
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
        background-color: rgb(222, 228, 231);
        h1 {
            font-size: 25px;
            font-weight: 600;
            margin-top: 20px;
        }
        .courses-container {
            display: flex;
            flex-direction: column;
            align-items: center;
            .course-container {
                width: 500px;
                height: fit-content;
                background-color: white;
                box-shadow: 10px 8px 20px gray;
                margin: 20px 0 0 0;
                padding: 1rem;
                border-radius: 5px;
                display: flex;
                align-items: center;
                &:hover {
                    cursor: pointer;
                    transform: scale(1.015);
                }
                .image-container {
                    height: 80px;
                    width: 80px;
                    background-size: cover;
                    border-radius: 4px;
                }
                .course-info__container {
                    margin-left: 20px;
                    h2 {
                        font-size: 25px;
                    }
                    .course-author {
                        font-size: 16px;
                        text-transform: uppercase;
                        color: gray;
                        font-weight: 600;
                    }
                }
            }
        }
    }
    @media (max-width: 900px) {
        .course-container {
            max-width: 320px;
        }
        h2 {
            font-size: 20px !important;
        }
        .course-author {
            font-size: 14px !important;
        }
    }
</style>