import Vue from 'vue'
import vueResource from 'vue-resource'
import App from './App.vue'
import router from './router/index'
import { store } from './store/store'
import Vuelidate from 'vuelidate'

import Unicon from 'vue-unicons'
import { uniTrash, uniEdit, uniEyeSlash, uniPlusSquare, uniArrowDown, uniSearch  } from 'vue-unicons/src/icons'
Unicon.add([uniTrash, uniEdit, uniEyeSlash, uniPlusSquare, uniArrowDown, uniSearch ])
Vue.use(Unicon)

import ToggleButton from 'vue-js-toggle-button'
Vue.use(ToggleButton)

Vue.use(vueResource)
Vue.use(Vuelidate)

new Vue({
  el: '#app',
  store,
  router,
  render: h => h(App)
})
