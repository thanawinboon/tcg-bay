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
      path: '/card/:cardId',
      name: 'card-details',
      props: true,
      component: () => import('../views/CardDetailsView.vue')
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
      props: true
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
      path: '/my-profile',
      name: 'my-profile',
      component: () => import('../views/ProfileView.vue')
    },
    {
      path: '/profile/:userId',
      name: 'user-profile',
      props: true,
      component: () => import('../views/ProfileView.vue'),
    },
    
    {
      path: '/upload',
      name: 'upload',
      component: () => import('../views/UploadView.vue')
    },
  ]
})

router.beforeEach((to, from, next) => {
  console.log('Before each is executed')
  console.log('to :' + to.name)

  const isLoggedIn = auth.currentUser
  console.log('Is logged in: ' + isLoggedIn)
  if (to.name === "login" && isLoggedIn) {
    console.log("User is already logged in, redirecting to profile");
    next({ name: "my-profile" });
  } else if (to.name === "my-profile" && !isLoggedIn) {
    console.log("Login users only");
    next({ name: "login" });
  } else {
    next()
  }
})

export default router
