import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import loginPage from './../views/openViews/LoginPage.vue'
import registrationPage from './../views/openViews/RegistrationPage.vue'
import courseView from './../views/openViews/CourseView.vue'
import searchResults from './../views/openViews/SearchResults.vue'
import myContentPage from './../views/memberViews/MyContent.vue'
import addCourse from './../views/memberViews/AddCourse.vue'
import errorView from './../components/404.vue'

Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/login',
    name: 'Login',
    component: loginPage
  },
  {
    path: '/register',
    name: 'Registration',
    component: registrationPage
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
    path: '/my-content',
    name: 'My content',
    component: myContentPage
  },
  {
    path: '/add-course',
    name: 'Add course',
    component: addCourse
  },
  {
    path: '*',
    name: 'Error',
    component: errorView
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
