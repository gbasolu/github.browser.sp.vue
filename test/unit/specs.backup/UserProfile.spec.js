// Vuex needs polyfill
import Vue from 'vue'
import Vuex from 'vuex'
import chai, { expect, should } from 'chai'
import chaiAsPromised from 'chai-as-promised'
import 'babel-polyfill'

import VueMaterial from 'vue-material'
import 'vue-material/dist/vue-material.min.css'
import 'vue-material/dist/theme/default.css' // This line here

import resources from 'vue-resource'

import GitHubUser from '@/components/GitHubUser'
import createPersistedState from 'vuex-persistedstate'
import { state, getters, mutations } from '@/store/init.js'

// import { shallow, createLocalVue } from 'vue-test-utils'
// const localVue = createLocalVue()
// localVue.use(Vuex)

should()
chai.use(chaiAsPromised)
Vue.use(Vuex)
Vue.use(VueMaterial)
Vue.use(resources)

describe(
  'UserProfile.vue',
  () => {
    var store
    // var props
    beforeEach(() => {
      // props = {}

      console.log(mutations)
      store = new Vuex.Store({
        plugins: [createPersistedState({ storage: window.localStorage })],
        state,
        mutations,
        getters
      })
      // store = new Vuex.Store( { state: { module: state }, getters, actions, mutations } );
    })

    it('should render correct contents', () => {
      const Constructor = Vue.extend(GitHubUser)
      const vm = new Constructor({ store }).$mount()
      expect(vm.$el.querySelector('.githubUser h1').textContent)
      .to.equal('GitHub user profile')
    })

    /**
    it('renders a $store.state value return from computed', () => {
      const wrapper = shallow(store, {
        computed: {
          value_2: () => 'value_2'
        },
        localVue
      })
      expect(wrapper.find('.state-2')
        .text().trim()).toEqual('value_2')
    })
    **/
    /**
    it('should have a name of test', () => {
      const Constructor = Vue.extend(GitHubUser)
      const component = new Constructor({ store, props }).$mount()

      expect(component.$options.name).toBe('test')
    })
    **/
  }
)
