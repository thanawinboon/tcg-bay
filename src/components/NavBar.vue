<script setup>
import { RouterLink } from 'vue-router'
import { ref, onMounted } from 'vue'
import { auth } from '@/js/firebase'

const isDropped = ref(false)
const isLoggedIn = ref(false)

const toggleDropdown = (value) => {
  isDropped.value = value
}

onMounted(() => {
  auth.onAuthStateChanged((user) => {
    if (user) {
      isLoggedIn.value = true
    } else {
      isLoggedIn.value = false
    }
  })
})

const categories = ref([
  {
    name: 'CategoryA',
  },
  {
    name: 'CategoryB',
  },
  {
    name: 'CategoryC',
  }
])

</script>

<template>
  <div class="navbar">
    <nav class="navbar-menu">
      <div class="navbar-menu-left">
        <span class="menu-logo">
          <h1>LOGO HERE</h1>
        </span>
        <span class="menu-item">
          <RouterLink to="/">Home</RouterLink>
        </span>
    
        <!-- DELETE ABOUT LATER -->
        <span class="menu-item">
          <RouterLink to="/about">About</RouterLink>
        </span>

        <span class="menu-item">
          <RouterLink to="/search">Search</RouterLink>
        </span>

        <span 
          class="menu-item"
          @mouseover="toggleDropdown(true)"
          @mouseleave="toggleDropdown(false)"
        >
          <a href="#" class="dropbtn">Category &#9662;</a>
          <transition name="slide">
            <div
              class="navbar-menu-dropdown-content" 
              v-if="isDropped"
            >
              <router-link 
                v-for="category in categories"
                :key="category.name"
                :to="{path: `/category/${category.name}`}"
              >
                {{ category.name }}
              </router-link>
          </div>
          </transition>
        </span>
        <span class="menu-item">
          <RouterLink to="/profile">Profile</RouterLink>
        </span>
        <span class="menu-item" v-if="!isLoggedIn">
          <RouterLink to="/register">Register</RouterLink>
        </span>
      </div>
      
      <div class="navbar-menu-right">

      </div>
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
}
.navbar-menu {
  display: flex;
  justify-content: space-between;
  background-color: #061B2B;
  padding: 10px 20px;
  .menu-logo {
    margin-right: 20px;
    color: #FFCB2B;
  }
  .menu-item {
    margin: 0px 10px;
    color: #D3E2FC;
  }
  .menu-item a {
    text-decoration: none;
    color: #D3E2FC;
  }
  .menu-item a:visited {
    color: #D3E2FC;
  }

  .menu-item:hover {
    transform: scale(1.03);
    color: #94A5BC;
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
  background-color: #0D2037;
  min-width: 120px;
  z-index: 1;

  transform-origin: top;
  transition: .33s ease-in-out;
  overflow: hidden;
  
}

.navbar-menu-dropdown-content a {
  color: #D3E2FC;
  padding: 12px 16px;
  text-decoration: none;
  display: block;
}

.navbar-menu-dropdown-content a:hover {
  background-color: #162D47;
  color: #94A5BC;
}

.slide-enter {
  transform: scaleY(0);
}
.slide-leave-to {
  transform: scaleY(0);
}

</style>
