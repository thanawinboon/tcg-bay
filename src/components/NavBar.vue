<script setup>
import { RouterLink } from 'vue-router'
import { ref, onMounted } from 'vue'
import { db } from '@/js/firebase.js'
import { collection, onSnapshot } from 'firebase/firestore'
import { auth } from '@/js/firebase'

const isDropped = ref(false)
const isLoggedIn = ref(false)
const categories = ref([
  {
    name: 'Temp'
  }
])

function getCategories() {
  onSnapshot(collection(db, 'categories'), (querySnapshot) => {
    try {
      let categorySnapshot = []
      querySnapshot.forEach((doc) => {
        let category = {
          name: doc.data().name
        }
        categorySnapshot.push(category)
      })
      categories.value = categorySnapshot
    } catch (error) {
      console.error('Error fetching cards:', error)
    }
  })
}

const toggleDropdown = (value) => {
  isDropped.value = value
}

onMounted(() => {
  getCategories()
  auth.onAuthStateChanged((user) => {
    if (user) {
      isLoggedIn.value = true
    } else {
      isLoggedIn.value = false
    }
  })
})
</script>

<template>
  <div class="navbar">
    <nav class="navbar-menu">
      <div class="navbar-menu-left">
        <span class="menu-logo">
          <h1>LOGO_HERE</h1>
        </span>
        <span class="menu-item" :class="{ 'current-page': $route.path === '/' }">
          <RouterLink to="/">Home</RouterLink>
        </span>

        <!-- DELETE ABOUT LATER -->
        <span class="menu-item" :class="{ 'current-page': $route.path === '/about' }">
          <RouterLink to="/about">About</RouterLink>
        </span>

        <span class="menu-item" :class="{ 'current-page': $route.path === '/search' }">
          <RouterLink to="/search">Search</RouterLink>
        </span>

        <span
          class="menu-item"
          @mouseover="toggleDropdown(true)"
          @mouseleave="toggleDropdown(false)"
        >
          <a href="#" class="dropbtn">Category&#9662;</a>
          <transition name="slide">
            <div class="navbar-menu-dropdown-content" v-if="isDropped">
              <router-link
                v-for="category in categories"
                :key="category.name"
                :to="{ path: `/category/${category.name}` }"
              >
                {{ category.name }}
              </router-link>
            </div>
          </transition>
        </span>
        <span class="menu-item" :class="{ 'current-page': $route.path === '/my-profile' }">
          <RouterLink :to="{ path: '/my-profile' }">Profile</RouterLink>
        </span>
        <span
          class="menu-item"
          v-if="!isLoggedIn"
          :class="{ 'current-page': $route.path === '/register' }"
        >
          <RouterLink to="/register">Register</RouterLink>
        </span>
      </div>

      <div class="navbar-menu-right"></div>
    </nav>
  </div>
</template>

<style scoped>
.navbar {
  padding: 0;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 9;
  overflow-x: auto;
  overflow-y: hidden;
  background-color: #061b2b;
}
.navbar-menu {
  display: flex;
  justify-content: space-between;
  padding: 10px 20px;
  .menu-logo {
    margin-right: 20px;
    color: #ffcb2b;
  }
  .menu-item {
    margin: 10px;
    color: #d3e2fc;
  }
  .menu-item a {
    text-decoration: none;
    color: #d3e2fc;
  }
  .menu-item a:visited {
    color: #d3e2fc;
  }

  .menu-item:hover {
    background-color: #092a43;
    color: #94a5bc;
  }
}
.navbar-menu-left {
  display: flex;
  justify-content: center;
  align-items: center;
}

.navbar-menu-right {
  display: flex;
  justify-content: center;
  align-items: center;
}

.navbar-menu-dropdown-content {
  position: absolute;
  background-color: #0d2037;
  min-width: 120px;
  z-index: 10;

  transform-origin: top;
  transition: 0.33s ease-in-out;
  overflow: hidden;
}

.navbar-menu-dropdown-content a {
  color: #d3e2fc;
  padding: 12px 16px;
  text-decoration: none;
  display: block;
}

.navbar-menu-dropdown-content a:hover {
  background-color: #162d47;
  color: #94a5bc;
}

.slide-enter {
  transform: scaleY(0);
}
.slide-leave-to {
  transform: scaleY(0);
}

.current-page {
  box-shadow: inset 0px -1px 0px #afcbfb;
}
</style>
