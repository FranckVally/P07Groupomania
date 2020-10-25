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
    component: () => import('../views/User.vue')
  },
  {
    path: '/Wall',
    name: 'Wall',
    component: () => import('../views/Wall.vue')
  },
  {
    path: '/WallAdmin',
    name: 'WallAdmin',
    component: () => import('../views/WallAdmin.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router