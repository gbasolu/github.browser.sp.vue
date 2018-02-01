<template>
  <md-list>
    <md-list-item v-for="(link,index) in sidebarLinks"
        :ref="link.name" :key="link.name" :to="link.path" v-on:click="closeMenu()" :id="link.name + `-menu-link`">
      <md-icon>{{link.icon}}</md-icon>
      <span class="md-list-item-text">{{link.label}}</span>
    </md-list-item>
  </md-list>
</template>
<script>
  import { mapGetters } from 'vuex'
  export default {
    props: {
      sidebarLinks: {
        type: Array,
        default: () => []
      }
    },
    components: {
    },
    computed: {
      ...mapGetters({
        isUserAuthenticated: 'isAuthenticated'
      })
    },
    data () {
      return {
        activeLinkIndex: 0
      }
    },
    methods: {
      closeMenu () {
        this.$emit('closeSideBar')
      },
      findActiveLink () {
        this.sidebarLinks.find((element, index) => {
          let found = element.path === this.$route.path
          if (found) {
            this.activeLinkIndex = index
          }
          return found
        })
      }
    },
    mounted () {
      this.$sidebar.updateSidebarLinks(this.isUserAuthenticated)
      this.findActiveLink()
    },
    watch: {
      $route: function (newRoute, oldRoute) {
        this.findActiveLink()
      },
      isUserAuthenticated () {
        this.$sidebar.updateSidebarLinks(this.isUserAuthenticated)
        // this.findActiveLink()
      },
      sidebarLinks () {
        this.findActiveLink()
      }
    }
  }
</script>
<style>

</style>
