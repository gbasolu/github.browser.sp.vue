<template>
  <div class="md-layout">
    <div class="md-layout-item">
      <br/>
      <p class="md-title" id="logoutTitle">You have been logged out.</p>
      <p class="md-title">To login in once more you can click on the following link:</p>
      <br/>
      <br/>
      <md-button class="md-raised md-primary" to="/admin/login">Login</md-button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Logout',
  mounted () {
    this.$store.commit('resetUserData')
  },
  data () {
    return {
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
