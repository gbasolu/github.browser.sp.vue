import Vue from 'vue'
import Vuex from 'vuex'
import 'babel-polyfill'

import VueMaterial from 'vue-material'
import 'vue-material/dist/vue-material.min.css'
import 'vue-material/dist/theme/default.css' // This line here

import resources from 'vue-resource'

import routerInit from '@/modules/authRouter/init'

import Home from '@/components/Home'
import createPersistedState from 'vuex-persistedstate'
import { state, getters, mutations } from '@/store/init.js'

Vue.use(Vuex)
Vue.use(VueMaterial)
Vue.use(resources)

describe('Home.vue', () => {
  var store
  var router
  beforeEach(() => {
    store = new Vuex.Store({
      plugins: [createPersistedState({ storage: window.localStorage })],
      state,
      mutations,
      getters
    })
    mutations.setUserAuthToken(state, '9f73bd8f0d7a8a4bfa229135e2fa1a81aa9a1ed8')
    router = routerInit(store)
  })
  it('should render correct contents', () => {
    const Constructor = Vue.extend(Home)
    const vm = new Constructor({ store, router }).$mount()
    expect(vm.$el.querySelector('.home h1').textContent)
    .to.equal('Welcome to Your GitHub Users Explorer')
  })
})
