import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import SearchView from '../views/SearchView.vue'
import CategoryView from '../views/CategoryView.vue'

import { auth } from '@/js/firebase'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('../views/AboutView.vue')
    },
    {
      path: '/search',
      name: 'search',
      component: SearchView
    },
    {
      path: '/category/:category',
      name: 'category',
      component: CategoryView,
      props: true,
    },
    {
      path: '/register',
      name: 'register',
      component: () => import('../views/RegisterView.vue')
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/LoginView.vue')
    },
    {
      path: '/profile',
      name: 'profile',
      component: () => import('../views/ProfileView.vue')
    },
  ]
})

router.beforeEach( (to, from) => {
  console.log("Before each is executed")
  console.log("to :" + to.name)
  if(to.name === "profile" & !auth.currentUser) {
    console.log("login users only")
    router.push('/login')
  }
})

export default router
