import Vue from 'vue'
import App from './App.vue'
import router from './router'
import { store } from './store'

import Vuelidate from 'vuelidate'
Vue.use(Vuelidate)


import Unicon from 'vue-unicons'
import { uniTrash, uniEdit, uniEyeSlash, uniPlusSquare, uniArrowDown, uniSearch  } from 'vue-unicons/src/icons'
Unicon.add([uniTrash, uniEdit, uniEyeSlash, uniPlusSquare, uniArrowDown, uniSearch ])
Vue.use(Unicon)

import ToggleButton from 'vue-js-toggle-button'
Vue.use(ToggleButton)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
