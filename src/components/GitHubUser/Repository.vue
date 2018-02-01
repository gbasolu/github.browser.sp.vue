<template>
  <div class="md-layout repository_details_container">
    <div class="md-layout-item" style="text-align:left">
      <p style="text-align:left">
        <md-button class="md-primary md-raised " to="/github/user/profile" style="width:auto;font-size:10px;" id="backToProfileLink"><< Back to profile</md-button>
      </p>
      <p class="md-display-1">Repository details</p>
      <p>
        <span class="md-title">Name:</span>
        <span class="md-title">{{repository.name}}</span>
      </p>
      <p>
        <span class="md-subheading">Description: {{repository.description}}</span>
      </p>
      <p>Created on {{normalizeDate(repository.createdAt)}}</p>
      <p>Updated on {{normalizeDate(repository.updatedAt)}}</p>
    </div>
  </div>
</template>
<script>
export default {
  name: 'GitHubUserRepository',
  methods: {
    normalizeDate (createdAt) {
      var items = createdAt.split(/T/)
      var dateItems = items[0].split(/-/)
      return `${dateItems[2]} ${this.months[parseInt(dateItems[1]) - 1]} ${dateItems[0]}`
    }
  },
  props: {
    'repository': {
      type: Object,
      default: function () {
        return {
          name: '',
          updatedAt: '',
          createdAt: '',
          description: ''
        }
      }
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
</style>
