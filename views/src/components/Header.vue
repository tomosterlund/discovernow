<template>
    <span style="width: 100%">
        <div class="header-main__container">
            <div class="header-left__container">
                <v-icon @click="drawer = !drawer" class="icon-hover d-sm-flex d-md-none" large dark color="#fff" elevation="24" left>mdi-menu</v-icon>
                <div class="header__page-title">discover n<i class="fa fa-search" aria-hidden="true"></i>w</div>
                <div class="input-container hidden-sm-and-down d-md-flex">
                    <input
                    ref="searchField"
                    @keyup.enter="searchForCourse"
                    v-model="searchInput.input" type="text"
                    placeholder="Search for courses"
                    >
                    <unicon @click="searchForCourse" class="unicon-search" name="search" fill="white" />
                </div>
            </div>
            <div class="header-right__container">
                <nav class="hidden-sm-and-down d-md-flex">
                    <ul>
                        <li v-if="this.$store.state.user"><div :style="userImageCss" class="user-image"></div></li>
                        <li><router-link to="/">Home</router-link></li>
                        <li v-if="this.$store.state.user"><router-link to="/my-content">My content</router-link></li>
                        <li v-if="this.$store.state.user">
                            <i @click="goToNewCourse" class="fa fa-plus-circle" aria-hidden="true"></i>
                        <li v-if="!this.$store.state.user"><router-link to="/register">Register</router-link></li>
                        <li v-if="!this.$store.state.user"><router-link to="/login">Login</router-link></li>
                        <li v-if="this.$store.state.user" @click="getSignOut">Sign out</li>
                    </ul>
                </nav>
            </div>
        </div>
        <v-navigation-drawer class="d-sm-flex d-md-none d-lg-none d-xl-none" v-model="drawer" app>
          <v-icon @click="drawer = !drawer" large right class="icon-hover">
              mdi-close
          </v-icon>
          <v-list>
              <span v-if="!this.$store.state.user">
                <v-list-item v-for="item in listItemsHeaderPublic" :key="item.text" class="icon-hover" router :to="item.route">
                        <v-icon left>mdi-{{ item.icon }}</v-icon>
                        <v-list-item-title class="ml-2">{{ item.text }}</v-list-item-title>
                </v-list-item>
              </span>
              <span v-if="this.$store.state.user">
                <v-list-item v-for="item in listItemsHeaderMembers" :key="item.text" class="icon-hover" router :to="item.route">
                        <v-icon left>mdi-{{ item.icon }}</v-icon>
                        <v-list-item-title class="ml-2">{{ item.text }}</v-list-item-title>
                </v-list-item>
                <v-list-item @click="getSignOut" class="icon-hover">
                        <v-icon left>mdi-logout</v-icon>
                        <v-list-item-title class="ml-2">Sign out</v-list-item-title>
                </v-list-item>
              </span>
              <div class="input-container-drawer">
                    <input
                    ref="searchField"
                    @keyup.enter="searchForCourse"
                    v-model="searchInput.input" type="text"
                    placeholder="Search for courses"
                    class="drawer-input"
                    >
                    <unicon @click="searchForCourse" class="unicon-search" name="search" fill="black" />
                </div>
                <div v-if="courseData" class="course-info__container" style="margin-top: 40px">
                    <div class="course-image" :style="{ backgroundImage: `url('https://discover-test-files.s3.eu-central-1.amazonaws.com/${courseData.courseImageUrl}')` }"></div>
                    <div class="course-title">{{ courseData.courseTitle }}</div>
                </div>
                <span v-if="courseData">
                    <div @click="goToVideo(video)" v-for="(video, index) in courseVideos" :key="video._id" class="video-summary__container">
                        {{ index + 1 }}. {{ video.title }}
                    </div>
                </span>
          </v-list>
      </v-navigation-drawer>
    </span>
</template>

<script>
import axios from 'axios'

export default {
    data() {
        return {
            state: '',
            serverUrl: 'api/base/registration',
            searchInput: {
                input: ''
            },
            drawer: false,
            listItemsHeaderPublic: [
                { text: 'Find courses', icon: 'teach', route: '/' },
                { text: 'Register', icon: 'account-plus', route: '/register' },
                { text: 'Sign in', icon: 'login', route: '/login' },
            ],
            listItemsHeaderMembers: [
                { text: 'Find courses', icon: 'teach', route: '/' },
                { text: 'Add content', icon: 'plus', route: '/add-course' },
                { text: 'My content', icon: 'folder', route: '/my-content' },
            ]
        }
    },
    computed: {
        userImageCss: function() {
            return {
                backgroundImage: `url('${process.env.VUE_APP_AWS_BUCKET}${this.$store.state.user.imageUrl}')`
            }
        }
    },
    methods: {
        getSignOut() {
            axios.get('/api/base/signout')
                .then(response => {
                    console.log(response);
                    this.$store.state.courseCreatorPage = 0;
                    this.$store.state.currentCourse = '';
                    this.$store.state.currentCourseObject = {};
                    this.$store.state.user = null;
                    this.state = null;
                    this.$router.push({ path: '/login' });
                })
        },
        goToNewCourse() {
            this.$store.state.currentCourse = '';
            this.$store.state.courseCreatorPage = 0;
            this.$router.push({ path: '/add-course' })
        },
        searchForCourse() {
            this.$store.commit('lastSearchInput', this.searchInput.input);
            axios.post('/api/content/find-course', this.searchInput)
                .then(response => {
                    this.$store.dispatch('lastSearchResults', response.data.matchingCourses);
                    return this.$router.push({ path: '/search-results' });
                })
                .catch(error => console.log(error));
        },
        goToVideo(video) {
            this.$store.state.currentVideo = `${video.videoUrl}`;
            this.$router.push({ path: `/video/${video._id}` });
        }
    },
    created() {
        if (this.$store.state.user.name) {
            this.state = this.$store.state.user.name || null;
        }
        if (!this.$store.state.user.name) {
            axios.get('/api/base/verified')
                .then(response => {
                    this.$store.state.user = response.data.user;
                    this.state = this.$store.state.user.name || null;
                    console.log(response.data.user);
                })
                .catch(err => console.log(err));
        }
    },
    props: ['courseData', 'courseVideos']
}
</script>

<style lang="scss" scoped>
    .header-main__container {
        margin: 0;
        height: 50px;
        width: 100%;
        background-color: $darkGreen;
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
        display: flex;
        align-items: center;
        justify-content: space-between;
        .header-left__container {
            margin-left: 10px;
            display: flex;
            align-items: center;
            .header__page-title {
                font-weight: 700;
                font-size: 22px;
                color: $yellow;
                padding-left: 10px;
                i {
                    color: $darkOrange;
                    font-size: 17px;
                    margin-left: 2px;
                    margin-right: 0px;
                }
            }
            .input-container {
                margin-left: 30px;
                display: flex;
                align-items: center;
                input {
                    outline: none;
                    width: 200px;
                    border-radius: 3px;
                    padding: 0.3rem;
                    background-color: #4f7383;
                    color: black;
                    &:focus {
                        background-color: snow;
                        animation-name: focusInput;
                        animation-duration: 0.27s;
                        animation-iteration-count: 1;
                        animation-fill-mode: forwards;
                        &::placeholder {
                            color: gray;
                        }
                    }
                    &::placeholder {
                        color: lightgray;
                    }
                }
                @keyframes focusInput {
                    100% {
                        width: 350px;
                    }
                }
                .unicon-search {
                    margin: 0px 0 0 7px;
                    cursor: pointer;
                    &:hover {
                        transform: scale(1.15);
                    }
                }
            }
        }
        .header-right__container {
            nav {
                margin: 0;
                ul {
                    margin: 0 20px 0 0;
                    padding: 0;
                    list-style: none;
                    display: flex;
                    align-items: center;
                    li {
                        padding: 0.3rem;
                        margin: 8px;
                        color: rgb(235, 230, 230);
                        font-weight: 500;
                        letter-spacing: 0.02rem;
                        display: flex;
                        align-items: center;
                        cursor: pointer;
                        a {
                            color: inherit;
                            text-decoration: none;
                        }
                        &:hover {
                            animation: changeLi;
                            animation-duration: 0.3s;
                            animation-iteration-count: 1;
                            animation-fill-mode: forwards;
                        }
                        .user-image {
                            margin: 0 0 0 8px;
                            height: 28px;
                            width: 28px;
                            background-size: cover;
                            border-radius: 50%;
                        }
                    }
                }
            }
        }
    }

    @keyframes changeLi {
        0% {
            color:rgb(235, 230, 230);
        }
        100% {
            color: $darkOrange;
        }
    } 

    .input-container-drawer {
        display: flex;
        width: 100%;
        align-items: center;
        input {
            width: 80%;
            border: 1px solid black;
            border-radius: 2px;
            padding: 0.4rem;
            margin: 10px 0 0 5px;
        }
        .unicon-search {
            margin: 10px 0 0 7px;
            cursor: pointer;
            &:hover {
                transform: scale(1.15);
            }
        }
    }

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
</style>