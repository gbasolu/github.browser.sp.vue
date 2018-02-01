// For authoring Nightwatch tests, see
// http://nightwatchjs.org/guide#usage

var correctPersonalAccessToken = '9f73bd8f0d7a8a4bfa229135e2fa1a81aa9a1ed8'
var wrongPersonalAccessToken = '9f73bd8f0d7a8a4bfa229135e2fa1a81aa9a1ed8azazaza'
var correctGithubLogin = 'gbasolu'
var wrongGithubLogin = 'gbasolu1234567890'

module.exports = {
  'First app opening (not auth)': function (browser) {
    // automatically uses dev Server port from /config.index.js
    // default: http://localhost:8080
    // see nightwatch.conf.js
    const devServer = browser.globals.devServerURL

    browser
      .url(devServer)
      .waitForElementVisible('#app', 5000)
      .assert.elementPresent('.home')
      .assert.containsText('h1', 'Welcome to Your GitHub Users Explorer')
      .assert.containsText('.home-message', 'You need to login using your Github Personal Auth Token')
      // .assert.elementCount('img', 1)
  },

  'opening menu': function (browser) {
    browser
    .click('#menuSwitchButton', function (clickStatus) {
      browser.assert.attributeContains('#menuContainer', 'class', 'md-active')
    })
  },

  'showing not authorized user menu': function (browser) {
    browser
    .click('#menuSwitchButton', function (clickStatus) {
      browser
      .assert.elementPresent('#home-menu-link')
      .assert.elementNotPresent('#github-user-menu-link')
      .assert.elementNotPresent('#sign-out-menu-link')
      .assert.elementPresent('#sign-in-menu-link')
    })
  },

  'Opening sign in page': function (browser) {
    browser
    .click('#menuSwitchButton', function (clickStatus) {
      browser
      .click('#sign-in-menu-link', function (clickStatus) {
        browser.assert.elementPresent('#personalAccessToken')
      })
    })

    /**
    browser
    .click('#github-user-menu-link', function (clickStatus) {
      browser.assert.elementPresent('#githubLoginName')
    })
    **/
  },

  'Making correct Login and go to Home page': function (browser) {
    browser
    .setValue('#personalAccessToken', correctPersonalAccessToken)
    .click('#loginButton', function (clickStatus) {
      // browser.assert.elementPresent('#personalAccessToken')
      browser
      .waitForElementVisible('.home-message', 5000)
      .assert.elementPresent('#authTokenHeader')
      .assert.containsText('#authTokenHeader', `Your Auth Token is: ${correctPersonalAccessToken}`)
      .assert.elementPresent('.home-message')
      .assert.containsText('.home-message', 'You can go and look for data of a github user from the menu')
      .pause(2000)
    })
  },

  'showing authorized user menu': function (browser) {
    browser
    .click('#menuSwitchButton', function (clickStatus) {
      browser
      .assert.elementPresent('#home-menu-link')
      .assert.elementPresent('#github-user-menu-link')
      .assert.elementPresent('#sign-out-menu-link')
      .assert.elementNotPresent('#sign-in-menu-link')
      .pause(2000)
    })
  },

  'Opening user profile search page': function (browser) {
    browser
    .click('#menuSwitchButton', function (clickStatus) {
      browser
      .click('#github-user-menu-link', function (clickStatus) {
        browser.assert.elementPresent('#githubLoginName')
        .pause(2000)
      })
    })
  },



  'Making correct user search and go to user profile page': function (browser) {
    browser
    .setValue('#githubLoginName', correctGithubLogin)
    .click('#loadUserDataButton', function (clickStatus) {
      // browser.assert.elementPresent('#personalAccessToken')
      browser
      .waitForElementVisible('#user_profile_main_container', 5000)
      .assert.elementPresent('#user_profile_login')
      .assert.containsText('#user_profile_login', correctGithubLogin)
      .assert.elementPresent('#repositories_list_title')
      .assert.containsText('#repositories_list_title', 'Repositories list')
      .assert.elementCount('.user-repository-short', 4, '>=')
      .pause(2000)
    })
  },

  'Show the first repository details page': function (browser) {
    browser
    .click('#repository_details_link_0', function (clickStatus) {
      // browser.assert.elementPresent('#personalAccessToken')
      browser
      .waitForElementVisible('.repository_details_container', 5000)
      .pause(2000)
    })
  },

  'Goto back to User profile page': function (browser) {
    browser
    .click('#backToProfileLink', function (clickStatus) {
      // browser.assert.elementPresent('#personalAccessToken')
      browser
      .waitForElementVisible('#user_profile_main_container', 5000)
      .assert.elementPresent('#user_profile_login')
      .pause(1000)
      .assert.containsText('#user_profile_login', correctGithubLogin)
    })
  },

  'Close User profile page': function (browser) {
    browser
    .click('#closeProfileLink', function (clickStatus) {
      // browser.assert.elementPresent('#personalAccessToken')
      browser
      .waitForElementVisible('#githubLoginName', 5000)
      .assert.elementPresent('#githubLoginName')
      .pause(2000)
    })
  },

  'Making WRONG user search and get error under input field': function (browser) {
    browser
    .setValue('#githubLoginName', wrongGithubLogin)
    .click('#loadUserDataButton', function (clickStatus) {
      // browser.assert.elementPresent('#personalAccessToken')
      browser
      .pause(2000)
      .assert.visible('#githubLoginName')
      .assert.containsText('#githubLoginNameHelperText', `Error in lookup the user with nick: "${wrongGithubLogin}". Please double check it!`)
    })
  },

  'Logging out': function (browser) {
    browser
    .click('#logoutButton', function (clickStatus) {
      browser
      .pause(5000)
      .assert.elementPresent('#logoutTitle')
    })
  },

  'ending': function (browser) {
    browser.end()
  }

}
