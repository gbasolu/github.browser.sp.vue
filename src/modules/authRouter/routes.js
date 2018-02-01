import NotFound from '@/components/NotFound'
import Home from '@/components/Home'
import GitHubUser from '@/components/GitHubUser'
import Login from '@/components/Login'
import Logout from '@/components/Logout'

const routes = [
  {
    path: '/',
    component: Home,
    redirect: '/Home'
  },
  {
    path: '/Home',
    name: 'Home',
    component: Home
  },
  {
    path: '/admin/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/admin/logout',
    name: 'Logout',
    component: Logout
  },
  {
    path: '/github/user/select',
    name: 'Github User Select',
    component: GitHubUser
  },
  {
    path: '/github/user/profile',
    name: 'Github User Profile',
    component: GitHubUser
  },
  {
    path: '/github/user/repository',
    name: 'Github User repository',
    component: GitHubUser
  },
  { path: '*', component: NotFound }
]

/**
 * Asynchronously load view (Webpack Lazy loading compatible)
 * The specified component must be inside the Views folder
 * @param  {string} name  the filename (basename) of the view to load.
function view(name) {
   var res= require('../components/Dashboard/Views/' + name + '.vue');
   return res;
};**/

export default routes
