// Vuex needs polyfill
import Vue from 'vue'
import Vuex from 'vuex'
import chai, { expect, should } from 'chai'
import chaiAsPromised from 'chai-as-promised'
import 'babel-polyfill'
// import { polyfill } from 'es6-promise'
import SideBar from '@/components/SidebarPlugin'
should()
chai.use(chaiAsPromised)

// polyfill()

Vue.use(Vuex)

var notAuthSidebarLinksArray = [
  {
    name: 'home',
    label: 'Home',
    path: '/home',
    icon: 'home'
  },
  {
    name: 'sign-in',
    label: 'Sign In',
    icon: 'fingerprint',
    path: '/admin/login',
    filter: {
      authenticated: false // TO see ONLY if NOT authenticated
    }
  }
]

var authSidebarLinksArray = [
  {
    name: 'home',
    label: 'Home',
    path: '/home',
    icon: 'home'
  },
  {
    name: 'github-user',
    label: 'Github User',
    icon: 'person',
    path: '/github/user/select',
    filter: {
      authenticated: true // TO see ONLY if authenticated
    }
  },
  {
    name: 'sign-out',
    label: 'Log Out',
    icon: 'exit_to_app',
    path: '/admin/logout',
    filter: {
      authenticated: true // TO see ONLY if authenticated
    }
  }
]
/**
beforeEach(function () {
  // Instancing needed objects for each test
  const Constructor = Vue.extend(SideBar)
  vm = new Constructor({
    propsData: {
      rowData: mockRowData,
      columns: SharedConfig.columns
    }
  }).$mount()
})
**/
describe('SidebarPlugin.vue - Not logged', () => {
  it('should render correct menu contents', () => {
    const Constructor = Vue.extend(SideBar)
    const vm = new Constructor({
      propsData: {
        'sidebar-links': notAuthSidebarLinksArray
      }
    }).$mount()
    console.log(vm.$el.querySelector('#navigation-menu-title').textContent)
    expect(vm.$el.querySelector('#navigation-menu-title').textContent)
    .to.equal('Welcome to Your GitHub Users Explorer')
  })
})

describe('SidebarPlugin.vue - Logged', () => {
  it('should render correct menu contents', () => {
    const Constructor = Vue.extend(SideBar)
    const vm = new Constructor({
      propsData: {
        'sidebar-links': authSidebarLinksArray
      }
    }).$mount()
    console.log(vm.$el.querySelector('#navigation-menu-title').textContent)
    expect(vm.$el.querySelector('#navigation-menu-title').textContent)
    .to.equal('Welcome to Your GitHub Users Explorer')
  })
})
