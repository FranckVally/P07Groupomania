import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Accueil',
    component: () => import('../views/Accueil.vue')
  },
  {
    path: '/signup',
    name: 'Signup',
    component: () => import('../views/Signup.vue')
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/Login.vue')
  },

  {
    path: '/user',
    name: 'User',
    component: () => import('../views/User.vue'),
    meta: {
      requiresAuth: true
    },
    beforeEnter: (to, from, next) => {
      if (localStorage.getItem('token') == null) {
        next({ name: 'Login' })

      } else {
        next()
      } next()
    }
  },

  {
    path: '/Wall',
    name: 'Wall',
    component: () => import('../views/Wall.vue'),
    meta: {
      requiresAuth: true
    },
    beforeEnter: (to, from, next) => {
      if (localStorage.getItem('token') == null) {
        next({ name: 'Login' })

      } else {
        next()
      } next()
    }
  },
  {
    path: '/WallAdmin',
    name: 'WallAdmin',
    component: () => import('../views/WallAdmin.vue'),
    meta: {
      requiresAuth: true
    },
    beforeEnter: (to, from, next) => {
      if (localStorage.getItem('token') == null) {
        next({ name: 'Login' })

      } else {
        next()
      } next()
    }
  },
]



const router = new VueRouter({
  routes
})



export default router