import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './App.vue'
import './index.css'
import './assets/tailwind.css'
import './components/Movielist.vue'
import Movielist from './components/Movielist.vue'
import Detailpage from './components/Detailpage.vue'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(fas)

Vue.component('font-awesome-icon', FontAwesomeIcon)

Vue.use(VueRouter)
Vue.config.productionTip = false

const router = new VueRouter({
  mode: 'history',
  routes: [
    {path: "/", 
     name: "home",
     component: Movielist},
    {path: "/movie/:id", 
     name: "movie",
     params: true,
     component: Detailpage}
  ],
  scrollBehavior (to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { x: 0, y: 0 }
    }
  }
})

new Vue({
  render: h => h(App),
  router: router
}).$mount('#app')
