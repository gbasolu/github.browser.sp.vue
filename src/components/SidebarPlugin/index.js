import Sidebar from './SideBar.vue'

const SidebarStore = {
  showSidebar: false,
  sidebarLinks: [],
  sidebarLinksArray: [
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
  ],
  displaySidebar (value) {
    this.showSidebar = value
  },
  updateSidebarLinks (isUserAuthenticated = false) {
    // In base allo stato di autenticazione viene aggiornata la lista delle voci visualizzate
    this.sidebarLinks =
      this.sidebarLinksArray.filter(
        menuData => {
          var retVal = (!menuData.filter) ||
                        (!!isUserAuthenticated && !!menuData.filter.authenticated) ||
                        (!isUserAuthenticated && !menuData.filter.authenticated)
          return retVal
        })
  }
}

const SidebarPlugin = {
  install (Vue) {
    Vue.mixin({
      data () {
        return {
          sidebarStore: SidebarStore
        }
      }
    })

    Object.defineProperty(Vue.prototype, '$sidebar', {
      get () {
        return this.$root.sidebarStore
      }
    })
    Vue.component('side-bar', Sidebar)
  }
}

export default SidebarPlugin
