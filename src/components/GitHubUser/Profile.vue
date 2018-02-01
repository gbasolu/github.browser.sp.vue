<template>
  <div class="md-layout" id="user_profile_main_container">
    <div class="md-layout-item">
      <md-card class="profile-card">
        <div style="text-align:left">
          <md-button class="md-icon-button md-primary" id="closeProfileLink" v-on:click="closeProfile()">
            <md-icon>close</md-icon>
          </md-button>
        </div>
        <md-card-header>
          <div class="md-title" id="user_profile_login">{{user.profile.login}}</div>
        </md-card-header>
        <md-card-media>
          <img :src="user.profile.avatarUrl" :alt="user.profile.name" style="width:100px">
        </md-card-media>
        <md-card-header>
          <div class="md-title" id="user_profile_name">{{user.profile.name}}</div>
          <div class="md-subhead" id="user_profile_bio">{{user.profile.bio}}</div>
          <div class="md-content" v-if="user.profile.location" id="user_profile_location">
            <br/>
            <md-icon class="md-size-1x">location_on</md-icon>&nbsp;{{user.profile.location}}
          </div>
          <div class="md-content" v-if="user.profile.company" id="user_profile_company">
            <md-icon class="md-size-1x">people</md-icon>&nbsp;{{user.profile.company}}
          </div>
          <div class="md-content" v-if="user.profile.email" id="user_profile_email">
            <md-icon class="md-size-1x">email</md-icon>&nbsp;{{user.profile.email}}
          </div>
        </md-card-header>
      </md-card>
    </div>
    <div class="md-layout-item">
      <!-- repositories list -->
      <span class="md-title" id="repositories_list_title">Repositories list</span>
      <md-content class="md-scrollbar">
        <md-list class="md-triple-line">
          <md-list-item v-for="(repository, i) in sortedRepositories" :key="repository.name">
            <div class="md-list-item-text user-repository-short">
              <span><a :href="repository.url" target="_blank">{{repository.name}}</a></span>
              <span>{{repository.description}}</span>
              <p>Updated on {{updatedAt(repository.createdAt)}}</p>
              <p style="text-align:right">
                <md-button class="md-primary md-raised " v-on:click="loadRepositoryData(repository.name)" style="width:auto;font-size:10px;" :id="`repository_details_link_${i}`">Repository Details</md-button>
              </p>
            </div>

          </md-list-item>
        </md-list>
      </md-content>
    </div>
  </div>
</template>
<script>
export default {
  name: 'GitHubUserProfile',
  methods: {
    updatedAt (createdAt) {
      var items = createdAt.split(/T/)
      var dateItems = items[0].split(/-/)
      return `${dateItems[2]} ${this.months[parseInt(dateItems[1]) - 1]} ${dateItems[0]}`
    },
    loadRepositoryData (repositoryName) {
      this.$emit('loadRepositoryData', repositoryName)
    },
    closeProfile () {
      this.$emit('closeProfile')
    }
  },
  props: {
    'user': {
      type: Object,
      default: function () {
        return {
          profile: {
            repositories: {
              nodes: []
            }
          }
        }
      }
    }
  },
  computed: {
    sortedRepositories () {
      // Sorting the repositories by createdAt descendant
      var sorted = this.user.profile.repositories.nodes.sort((a, b) => {
        return (a.createdAt < b.createdAt ? 1 : -1)
      })
      return sorted
    }
  },
  data () {
    return {
      months: [
        'Jan', 'Feb',
        'Mar', 'Apr',
        'May', 'Jun',
        'Jul', 'Aug',
        'Sep', 'Oct',
        'Nov', 'Dec'
      ]

    }
  }
}
</script>
<style scoped>
.profile-card{
  width:auto;
}
.md-scrollbar {
  max-height: 568px;
  overflow: auto;
}
</style>
