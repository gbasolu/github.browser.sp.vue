<template>
  <div class="home" style="min-height:500px" >
    <h1>{{ msg }}</h1>
    <p id="authTokenHeader" v-if="this.$store.getters.getUserAuthToken">Your Auth Token is: {{this.$store.getters.getUserAuthToken}}</p>
    <p class="home-message" v-if="!this.$store.getters.getUserAuthToken">You need to login using your Github Personal Auth Token</p>
    <p class="home-message" v-if="this.$store.getters.getUserAuthToken">You can go and look for data of a github user from the menu</p>
  </div>
</template>

<script>
export default {
  name: 'Home',
  data () {
    return {
      msg: 'Welcome to Your GitHub Users Explorer'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1 {
  font-weight: normal;
}
</style>
