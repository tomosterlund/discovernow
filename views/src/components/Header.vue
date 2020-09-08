<template>
  <div class="header-main__container">
      <div class="header-left__container">
          <div class="header__page-title">discover n<i class="fa fa-search" aria-hidden="true"></i>w</div>
          <div class="input-container">
              <input @keyup.enter="searchForCourse" v-model="searchInput.input" type="text" placeholder="Search for courses">
              <unicon @click="searchForCourse" class="unicon-search" name="search" fill="white" />
          </div>
      </div>
      <div class="header-right__container">
          <nav>
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
            }
        }
    },
    computed: {
        userImageCss: function() {
            return {
                backgroundImage: `url('https://discover-test-files.s3.eu-central-1.amazonaws.com/${this.$store.state.user.imageUrl}')`
            }
        }
    },
    methods: {
        getSignOut() {
            axios.get('api/base/signout')
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
            axios.post('api/content/find-course', this.searchInput)
                .then(response => {
                    this.$store.dispatch('lastSearchResults', response.data.matchingCourses);
                    return this.$router.push({ path: '/search-results' });
                })
                .catch(error => console.log(error));
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
    }
}
</script>

<style lang="scss" scoped>
    $darkGreen: #264653;
    $green: #2a9d8f;
    $yellow: #e9c46a;
    $orange: #f4a261;
    $darkOrange: #e76f51;

    .header-main__container {
        margin: 0;
        height: 50px;
        width: 100%;
        min-width: 900px;
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
                    margin-left: 7px;
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
</style>