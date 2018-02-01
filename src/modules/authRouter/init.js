import Vue from 'vue'
import VueRouter from 'vue-router'
// router setup
import routes from './routes'

Vue.use(VueRouter)

function myRouterInit (store) {
  // Guards to avoid hidden paths
  // configure router
  const myRouter = new VueRouter({
    routes, // short for routes: routes
    linkActiveClass: 'active'
  })
  myRouter.beforeEach((to, from, next) => {
    var publicPaths = [
      '^/$',
      '^/home$'
    ]
    var notAuthenticatedPaths = [
      '^/admin/login$'
    ]
    var authenticatedPaths = [
      '^/admin/logout$',
      '^/github/user/select$',
      '^/github/user/profile$',
      '^/github/user/repository$'
    ]
    // Cerco se il path e' permesso nella whitelist
    let pathFound = ''
    for (let i = 0; i < publicPaths.length; i++) {
      let re = new RegExp(publicPaths[i])
      if (re.test(to.fullPath)) {
        pathFound = publicPaths[i]
        break
      }
    }
    if (pathFound === '') {
      if (true && !!store.getters.getUserAuthToken) {
        // Se sono autenticato
        for (let i = 0; i < authenticatedPaths.length; i++) {
          let re = new RegExp(authenticatedPaths[i])
          if (re.test(to.fullPath)) {
            pathFound = authenticatedPaths[i]
            break
          }
        }
      } else if (!store.getters.getUserAuthToken) {
        // Se sono autenticato
        if (pathFound === '') {
          for (let i = 0; i < notAuthenticatedPaths.length; i++) {
            let re = new RegExp(notAuthenticatedPaths[i])
            if (re.test(to.fullPath)) {
              pathFound = notAuthenticatedPaths[i]
              break
            }
          }
        }
      }
    }

    if (pathFound === '') {
      next('/home')
    } else {
      next()
    }
  })
  return myRouter
}
export default myRouterInit
