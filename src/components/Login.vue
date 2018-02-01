<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <div id="authDiv">
      <md-field>
        <label>Type the GitHub Personal Access Token here!</label>
        <md-input v-model="personalAccessToken" id="personalAccessToken"></md-input>
        <span class="md-helper-text">{{helperText}}</span>
      </md-field>
       <md-button class="md-raised md-primary" v-on:click="storeAuthToken()" id="loginButton">Login</md-button>
    </div>
  </div>
</template>

<script>
import { GraphQLClient } from 'graphql-request'
export default {
  name: 'HelloWorld',
  methods: {
    storeAuthToken () {
      if (this.personalAccessToken) {
        // Test against GitHub
        try {
          // Test if auth token is valid
          const client = new GraphQLClient(this.$store.getters.getApiEndPoint, {
            headers: {
              Authorization: `Bearer ${this.personalAccessToken}`
            }
          })
          const query = `query {
            user(login:"gbasolu") {
              name
            }
          }
          `
          client.request(query).then(data => {
            this.$store.commit('setUserAuthToken', this.personalAccessToken)
            this.$router.push('/home')
          })
          .catch(
            () => {
              this.helperText = `Error! The auth token: "${this.personalAccessToken}" is not valid!. Please double check it!`
            }
          )
        } catch (error) {
          console.log(error)
        }
      } else {
        this.helperText = 'Incorrect value!'
      }
    }
  },
  data () {
    return {
      msg: 'Login',
      helperText: '',
      personalAccessToken: '' // Personal Access Token
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
