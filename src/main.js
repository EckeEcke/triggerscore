import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './App.vue'
import './index.css'
import './assets/tailwind.css'
import './components/Movielist.vue'
import Movielist from './components/Movielist.vue'
import AllMovies from './components/AllMovies.vue'
import Detailpage from './components/Detailpage.vue'
import Searchresults from './components/Searchresults'
import About from './components/About'
import FAQ from './components/FAQ'
import Contact from './components/Contact'
import Stats from './components/Stats'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import store from './store'

library.add(fas)

Vue.component('font-awesome-icon', FontAwesomeIcon)

Vue.use(VueRouter)
Vue.config.productionTip = false

const router = new VueRouter({
  mode: 'history',
  routes: [
    {
     path: "/", 
     name: "home",
     component: Movielist
    },
    {
      path: "/all",
      name: "all",
      component: AllMovies
    },
    {
     path: "/movie/:id", 
     name: "movie",
     params: true,
     component: Detailpage
    },
    {
      path: "/about",
      name: "about",
      component: About
    },
    {
      path: "/faq",
      name: "faq",
      component: FAQ
    },
    {
      path: "/search",
      name: "search",
      component: Searchresults
    },
    {
      path: "/contact",
      name: "contact",
      component: Contact
    },
    {
      path: "/stats",
      name: "stats",
      component: Stats
    } 
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
  router: router,
  store: store,
}).$mount('#app')
