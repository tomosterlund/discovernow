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
import vuetify from './plugins/vuetify';
Vue.use(ToggleButton)

Vue.config.productionTip = false

router.beforeEach((to, from, next) => {
  console.log('global before each');
  next();
})

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
