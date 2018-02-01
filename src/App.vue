<template>
  <div id="app">
    <div class="page-container">
      <md-app md-mode="reveal">
        <md-app-toolbar class="md-primary">
          <md-button class="md-icon-button" @click="menuVisible = !menuVisible" id="menuSwitchButton">
            <md-icon>menu</md-icon>
          </md-button>
          <span class="md-title">{{toolbarTitle}}</span>
        </md-app-toolbar>

        <md-app-drawer :md-active.sync="menuVisible" id="menuContainer">
          <md-toolbar class="md-transparent" md-elevation="0" id="navigation-menu-title">Navigation</md-toolbar>
          <side-bar :sidebar-links="$sidebar.sidebarLinks" v-on:closeSideBar="closeSideBarMenu"></side-bar>
        </md-app-drawer>

        <md-app-content>
          <router-view/>
        </md-app-content>
      </md-app>
    </div>
  </div>
</template>

<script>
export default {
  name: 'app',
  computed: {
    sidebarItems () {
      return [{
        icon: 'move_to_inbox',
        label: 'a'
      }]
    }
  },
  methods: {
    closeSideBarMenu () {
      this.menuVisible = false
    }
  },
  data: function () {
    return {
      toolbarTitle: 'Github Viewer',
      menuVisible: false
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 0px;
}

.md-app {
  height: auto;
  border: 1px solid rgba(0, 0, 0, 0.12);
}

.md-drawer {
  width: 230px;
  max-width: calc(100vw - 125px);
}

</style>
