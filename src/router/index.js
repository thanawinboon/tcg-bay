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
      path: '/card/:id',
      name: 'card-details',
      props: true,
      component: () => import('../views/CardDetailsView.vue')
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

router.beforeEach((to, from, next) => {
  console.log("Before each is executed");
  console.log("to :" + to.name);

  const isLoggedIn = auth.currentUser;

  if (to.name === "login" && isLoggedIn) {
    console.log("User is already logged in, redirecting to profile");
    next({ name: "profile" });
  } else if (to.name === "profile" && !isLoggedIn) {
    console.log("Login users only");
    next({ name: "login" });
  } else {
    next();
  }
});

export default router
