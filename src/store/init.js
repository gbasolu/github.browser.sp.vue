import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex)

export const state = {
  apiEndPoint: 'https://api.github.com/graphql',
  count: 0,
  connectedUser: '',
  user: {
    id: 0,
    nickname: '',
    authToken: ''
  }
}

export const mutations = {
  changeConnectedUser (state, user) {
    state.connectedUser = user
  },
  // Dati utente
  setUserId (state, userId) {
    state.user.id = userId
  },
  setUserNickname (state, userNickname) {
    state.user.nickname = userNickname
  },
  setUserAuthToken (state, userToken) {
    state.user.authToken = userToken
  },
  resetUserData (state) {
    state.user.nickname = ''
    state.user.authToken = ''
  }
}

export const getters = {
  getConnectedUser (state) {
    return state.connectedUser
  },
  getApiEndPoint (state) {
    return state.apiEndPoint
  },
  // Dati utente
  getUserId (state) {
    return state.user.id
  },
  getUserNickname (state) {
    return state.user.nickname
  },
  getUserAuthToken (state) {
    return state.user.authToken
  },
  isAuthenticated (state) {
    return (!!state.user.authToken)
  }
}

// Store state define
const store = new Vuex.Store({
  plugins: [createPersistedState({ storage: window.localStorage })],
  state,
  mutations,
  getters
})

export default store
