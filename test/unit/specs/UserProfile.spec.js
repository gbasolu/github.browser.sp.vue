import Vue from 'vue'
import Vuex from 'vuex'
import 'babel-polyfill'

import VueMaterial from 'vue-material'
import 'vue-material/dist/vue-material.min.css'
import 'vue-material/dist/theme/default.css' // This line here

import resources from 'vue-resource'

import routerInit from '@/modules/authRouter/init'

import GitHubUser from '@/components/GitHubUser'
import createPersistedState from 'vuex-persistedstate'
import { state, getters, mutations } from '@/store/init.js'

Vue.use(Vuex)
Vue.use(VueMaterial)
Vue.use(resources)

// chai.use(chaiHttp);
describe(
  'UserProfile.vue',
  () => {
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
      const Constructor = Vue.extend(GitHubUser)
      const vm = new Constructor({ store, router }).$mount()
      expect(vm.$el.querySelector('.githubUser h1').textContent)
      .to.equal('GitHub user profile')
    })

    it('should render github user login input field', () => {
      const Constructor = Vue.extend(GitHubUser)
      const vm = new Constructor({ store, router }).$mount()
      expect(vm.$el.querySelectorAll('#githubLoginName').length)
      .to.equal(1)
    })

    it(
      'should be linked the field in vm.$data with the input field',
      async () => {
        const Constructor = Vue.extend(GitHubUser)
        let userName = 'gbasolu'
        const vm = new Constructor({ store, router }).$mount()
        vm.$data.githubLoginName = userName
        const resolvingPromise = new Promise((resolve) => {
          Vue.nextTick(() => {
            // Testing if the UI has been updated
            resolve(vm.$el.querySelector('#githubLoginName').value)
          })
        })
        const result = await resolvingPromise

        expect(result.toString()).to.equal(userName)
      }
    )

    it('should render github user profile for "gbasolu"',
      async () => {
        const Constructor = Vue.extend(GitHubUser)
        let userName = 'gbasolu'
        const vm = new Constructor({ store, router }).$mount()
        vm.$data.githubLoginName = userName
        const resolvingPromise = new Promise((resolve) => {
          Vue.nextTick(() => {
            // Testing if the UI has been updated
            resolve(vm.$el.querySelector('#githubLoginName').value)
          })
        })
        await resolvingPromise

        vm.$el.querySelector(`#loadUserDataButton`).click()

        const resolvingPromiseClick = new Promise((resolve) => {
          // Testing if the UI has been updated
          setTimeout(() => {
            resolve(vm.$el.querySelector('#user_profile_login').textContent)
          }, 1500)
        })
        const resultLogin = await resolvingPromiseClick

        expect(resultLogin.toString()).to.equal(userName)
      }
    )

    it('should NOT render github user profile for "gbasolu1234567890"',
      async () => {
        const Constructor = Vue.extend(GitHubUser)
        let userName = 'gbasolu1234567890'
        const vm = new Constructor({ store, router }).$mount()
        vm.$data.githubLoginName = userName
        const resolvingPromise = new Promise((resolve) => {
          Vue.nextTick(() => {
            // Testing if the UI has been updated
            resolve(vm.$el.querySelector('#githubLoginName').value)
          })
        })
        await resolvingPromise

        vm.$el.querySelector(`#loadUserDataButton`).click()

        const resolvingPromiseClick = new Promise((resolve) => {
          // Testing if the UI has been updated
          setTimeout(() => {
            resolve(vm.$el.querySelector('#githubLoginNameHelperText').textContent)
            // resolve(vm.$el.querySelectorAll('#user_profile_login').length)
          }, 1500)
        })
        const resultLogin = await resolvingPromiseClick

        expect(resultLogin.toString()).to.equal(`Error in lookup the user with nick: "${userName}". Please double check it!`)
      }
    )

    // Test user-repository-short count
    it('should render github user repositories in profile for "gbasolu"',
      async () => {
        const Constructor = Vue.extend(GitHubUser)
        let userName = 'gbasolu'
        const vm = new Constructor({ store, router }).$mount()
        vm.$data.githubLoginName = userName
        const resolvingPromise = new Promise((resolve) => {
          Vue.nextTick(() => {
            // Testing if the UI has been updated
            resolve(vm.$el.querySelector('#githubLoginName').value)
          })
        })
        await resolvingPromise

        vm.$el.querySelector(`#loadUserDataButton`).click()

        const resolvingPromiseClick = new Promise((resolve) => {
          // Testing if the UI has been updated
          setTimeout(() => {
            resolve(vm.$el.querySelectorAll('.user-repository-short').length)
          }, 1500)
        })
        const resultLogin = await resolvingPromiseClick
        // console.log(resultLogin)
        expect(resultLogin >= 4).to.equal(true)
      }
    )
  }
)
