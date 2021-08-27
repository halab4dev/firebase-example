import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import Home from '../views/Home.vue'
import Profile from '../views/Profile.vue'
import PreBuiltLogin from '../views/PreBuiltLogin.vue'
import Login from '../views/Login.vue'
import AuthLine from '../views/AuthLine.vue'
import AuthService from "@/services/auth-service";

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/auth/line',
    name: 'AuthLine',
    component: AuthLine
  },
  {
    path: '/pre-built-login',
    name: 'PreBuiltLogin',
    component: PreBuiltLogin
  },
  {
    path: '/profile',
    name: 'Profile',
    component: Profile,
    meta: {authenticationRequired: true}
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeResolve((to, from, next) => {
  if (to.matched.some(record => record.meta.authenticationRequired)) {
    if (AuthService.getCurrentUserInfo()) {
      next()
    } else {
      next({
        path: '/login'
      });
    }
  } else {
    next()
  }
})

export default router
