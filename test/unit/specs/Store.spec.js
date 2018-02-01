import { expect } from 'chai'
// destructure assign `mutations`
import { mutations, getters } from '@/store/init.js'

let state
beforeEach(function () {
  // mock state
  state = {
    apiEndPoint: 'https://api.github.com/graphql',
    count: 0,
    connectedUser: '',
    user: {
      id: 0,
      nickname: '',
      authToken: ''
    }
  }
})

describe('mutations', () => {
  it('Change Connected User', () => {
    // apply mutation
    mutations.changeConnectedUser(state, 'pippo')
    // assert result
    expect(state.connectedUser).to.equal('pippo')
  })
  it('Change Auth Token', () => {
    // apply mutation
    mutations.setUserAuthToken(state, '1234567890')
    // assert result
    expect(state.user.authToken).to.equal('1234567890')
  })
  it('Reset user auth token', () => {
    // apply mutation
    mutations.setUserAuthToken(state, '1234567890')
    mutations.resetUserData(state)
    // assert result
    expect(state.user.authToken).to.equal('')
  })
})

describe('getters', () => {
  it('Get Connected User', () => {
    // apply mutation
    mutations.changeConnectedUser(state, 'pippo')
    const result = getters.getConnectedUser(state)
    // assert result
    expect(result).to.equal('pippo')
  })
  it('Get Auth Token', () => {
    // apply mutation
    mutations.setUserAuthToken(state, '1234567890')
    const result = getters.getUserAuthToken(state)
    // assert result
    expect(result).to.equal('1234567890')
  })
  it('Should not be authenticated', () => {
    // apply mutation
    const result = getters.isAuthenticated(state)
    // assert result
    expect(result).to.equal(false)
  })
  it('Should be authenticated', () => {
    // apply mutation
    mutations.setUserAuthToken(state, '1234567890')
    const result = getters.isAuthenticated(state)
    // assert result
    expect(result).to.equal(true)
  })
})
