import Vue from 'vue'
import Router from 'vue-router'
import registrationPage from './../components/publicPages/RegistrationPage.vue'
import loginPage from './../components/publicPages/LoginPage.vue'
import homePage from './../components/publicPages/HomePage.vue'
import addCourse from './../components/memberPages/AddCourse.vue'
import myContentPage from './../components/memberPages/MyContent.vue'
import courseView from './../components/publicPages/CourseView.vue'
import searchResults from './../components/publicPages/SearchResults.vue'
import errorView from './../components/mainComponents/404.vue'

Vue.use(Router)

export default new Router({
    // mode: 'history',
    routes: [
    {
        path: '/',
        name: 'Index',
        component: homePage
    },
    {
        path: '/register',
        name: 'register',
        component: registrationPage
    },
    {
        path: '/login',
        name: 'Login',
        component: loginPage
    },
    {
        path: '/add-course',
        name: 'Add course',
        component: addCourse
    },
    {
        path: '/my-content',
        name: 'My content',
        component: myContentPage
    },
    {
        path: '/course/:courseId',
        name: 'Learning',
        component: courseView
    },
    {
        path: '/video/:videoId',
        name: 'Video',
        component: courseView
    },
    {
        path: '/search-results',
        name: 'Search results',
        component: searchResults
    },
    {
        path: '*',
        name: 'Error',
        component: errorView
    }
    ]
})
