<script setup>
import NavBar from '@/components/NavBar.vue'
</script>

<template>
  <div>
    <NavBar />
    <br />

    <RouterView style="margin-top: 60px" />
  </div>
</template>

<style scoped>
#app {
  width: 100%;
  font-family: 'Nunito', sans-serif;
}
</style>
