<template>
  <div class="githubUser">
    <h1>{{ msg }}</h1>

    <md-tabs :md-active-step.sync="active" md-sync-route md-dynamic-height md-linear :md-changed="stepChanged()">
      <md-tab id="tab-select" md-label="Selection" to="/github/user/select" :md-disabled="false">
        <md-field>
          <label>Type the Login user account name to look for in GitHub!</label>
          <md-input v-model="githubLoginName" id="githubLoginName"></md-input>
          <span class="md-helper-text" id="githubLoginNameHelperText">{{helperText}}</span>
        </md-field>
        <md-button class="md-raised md-primary" v-on:click="loadUserData()" id="loadUserDataButton">Load</md-button>
      </md-tab>
      <md-tab id="tab-profile" md-label="Profile" to="/github/user/profile" :md-disabled="true">
        <!-- User Profile -->
        <git-hub-user-profile :user="user" v-if="user.found"
          v-on:loadRepositoryData="loadRepositoryData"
          v-on:closeProfile="closeProfile"></git-hub-user-profile>
      </md-tab>
      <md-tab id="tab-repository" md-label="Repository" to="/github/user/repository" :md-disabled="true">
        <!-- Repository -->
        <git-hub-user-repository :repository="user.selectedRepository" v-if="user.found && user.repositoryFound"></git-hub-user-repository>
      </md-tab>
    </md-tabs>
    <md-button class="md-raised md-accent" v-on:click="logout()" id="logoutButton">
      <md-icon>close</md-icon>Logout
    </md-button>
  </div>
</template>

<script>
import Vue from 'vue'
import { GraphQLClient } from 'graphql-request'
import GitHubUserProfile from '@/components/GitHubUser/Profile'
import GitHubUserRepository from '@/components/GitHubUser/Repository'
export default {
  name: 'GitHubUser',
  components: {
    // 'github-user-profile': Profile
    GitHubUserProfile,
    GitHubUserRepository
  },
  mounted () {
    // this.loadUser()
    if (!location.href.match(/select/) && this.githubLoginName === '') {
      this.$router.push('/github/user/select')
    } else {
      this.loadUserData()
    }
  },
  updated () {
    if (!this.user.found) {
      this.$router.push('/github/user/select')
    } else if (!location.href.match(/select/) && this.githubLoginName === '') {
      this.$router.push('/github/user/select')
    }
  },
  methods: {
    stepChanged () {
      // console.log('stepChanged()')
    },
    resetUserProfile () {
      Vue.set(this.user, 'profile', {})
      Vue.set(this.user, 'found', false)
      Vue.set(this.user, 'repositoryFound', false)
    },
    resetUserRepository () {
      Vue.set(this.user, 'selectedRepository', {})
    },
    resetUserData (areasToReset = []) {
      // Delete all data in profile and repositories tabs
      areasToReset.forEach(
        (v, index) => {
          if (v === 'p') {
            this.resetUserProfile()
          } else if (v === 'r') {
            this.resetUserRepository()
          }
        }
      )
    },
    logout () {
      location.href = '#/admin/logout'
    },
    closeProfile () {
      this.resetUserProfile()
      this.githubLoginName = ''
      location.href = '#/github/user/select'
    },
    async loadRepositoryData (repositoryName) {
      const client = new GraphQLClient(this.$store.getters.getApiEndPoint, {
        headers: {
          Authorization: `Bearer ${this.$store.getters.getUserAuthToken}`
        }
      })
      const query = `query {
        repository(owner:"${this.githubLoginName}", name:"${repositoryName}") {
          name
          nameWithOwner
          description
          createdAt
          updatedAt
          isFork
        }
      }
      `
      // console.log(query)
      client.request(query).then(data => {
        // console.log(data)
        Vue.set(this.user, 'selectedRepository', data.repository)
        Vue.set(this.user, 'repositoryFound', true)
        this.$router.push('/github/user/repository')
      })
      .catch(
        (e) => {
          // console.log(e)
          // this.helperText = `Error in lookup the user with nick: "${this.githubLoginName}". Please double check it!`
        }
      )
    },
    async loadUserData () {
      // Download user data
      // await this.userLogin()
      if (!this.githubLoginName) {
        return
      }
      const client = new GraphQLClient(this.$store.getters.getApiEndPoint, {
        headers: {
          Authorization: `Bearer ${this.$store.getters.getUserAuthToken}`
        }
      })
      const query = `query {
        user(login:"${this.githubLoginName}") {
          login,
          name,
          avatarUrl,
          bio,
          company,
          location,
          email,
          repositories(last: 100) {
            nodes {
              id,
              name,
              description,
              createdAt,
              url
            }
          }
        }
      }
      `
      client.request(query).then(data => {
        // console.log(data)
        this.helperText = ''
        this.user.rawData = data
        Object.keys(data.user).forEach(
          (k) => {
            Vue.set(this.user.profile, k, data.user[k])
          }
        )
        Vue.set(this.user, 'found', true)
        this.$router.push('/github/user/profile')
      })
      .catch(
        (e) => {
          // console.log(e)
          this.helperText = `Error in lookup the user with nick: "${this.githubLoginName}". Please double check it!`
        }
      )
    }
  },
  watch: {
    githubLoginName () {
      this.resetUserData(['p', 'r'])
    }
  },
  data () {
    return {
      msg: 'GitHub user profile',
      apiEndPoint: 'https://api.github.com/graphql',
      githubLoginName: '', // tangyang8942
      helperText: '',
      active: 0,
      user: {
        found: false,
        repositoryFound: false,
        rawData: {},
        profile: {},
        repositories: [],
        selectedRepository: {}
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
</style>
