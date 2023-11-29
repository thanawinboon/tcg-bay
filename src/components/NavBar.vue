<script setup>
import { RouterLink } from 'vue-router'
import { ref } from 'vue'

const isDropped = ref(false)

const toggleDropdown = (value) => {
  isDropped.value = value
}
</script>

<template>
  <div class="navbar">
    <nav class="menu">
      <div class="left">
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
          <RouterLink to="/about">Search</RouterLink>
        </span>

        <span 
          class="menu-item"
          @mouseover="toggleDropdown(true)"
          @mouseleave="toggleDropdown(false)"
        >
          <a href="#" class="dropbtn">Category &#9662;</a>
          <transition name="slide">
            <div
              class="dropdown-content" 
              v-if="isDropped"
            >
              <RouterLink to="/about">Category1</RouterLink>
              <RouterLink to="/about">Category2</RouterLink>
              <RouterLink to="/about">Category3</RouterLink>
          </div>
          </transition>
        </span>
      </div>
      
      <div class="right">

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
.menu {
  display: flex;
  justify-content: space-between;
  background-color: #202124;
  padding: 10px 20px;
}
.left {
  display: flex;
  justify-content: center;
  align-items: center;
}

.right {
  display: flex;
  justify-content: center;
  align-items: center;
}

.menu-logo {
  margin-right: 20px;
  color: white;
}
.menu-item {
  margin: 0px 5px;
  color: white;
}
.menu-item a {
  text-decoration: none;
  color: white;
}
.menu-item a:visited {
  color: white;
}

.menu-item:hover {
  transform: scale(1.03);
}

.dropdown-content {
  position: absolute;
  background-color: #333;
  min-width: 120px;
  z-index: 1;

  transform-origin: top;
  transition: .33s ease-in-out;
  overflow: hidden;
}

.dropdown-content a {
  color: white;
  padding: 12px 16px;
  text-decoration: none;
  display: block;
}

.dropdown-content a:hover {
  background-color: #555;
}

.slide-enter {
  transform: scaleY(0);
}
.slide-leave-to {
  transform: scaleY(0);
}

</style>
