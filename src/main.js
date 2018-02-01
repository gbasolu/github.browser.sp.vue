// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
// import router from './router'
import VueMaterial from 'vue-material'
import 'vue-material/dist/vue-material.min.css'
import 'vue-material/dist/theme/default.css' // This line here

// store setup
import store from './store/init'

// router setup
import routerInit from './modules/authRouter/init'
import resources from 'vue-resource'

// Sidebar
import SideBar from '@/components/SidebarPlugin'

Vue.use(SideBar)

Vue.use(resources)
Vue.use(VueMaterial)

Vue.config.productionTip = false

// Inizializzazione del router
const router = routerInit(store)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  template: '<App/>',
  components: { App }
})
