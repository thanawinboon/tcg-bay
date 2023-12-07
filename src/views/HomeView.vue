<script setup>
import CardsDisplay from '@/components/CardsDisplay.vue'
// TODO: Show some fancy TCG wallpaper plus website's name ??

</script>

<template>
  <div id="home">
    <div class="home-header">
      <h1>TCG Bay</h1>
      <p>Home page is where the heart of the card is</p>
    </div>
    <div>
      <CardsDisplay/>
    </div>
  </div>
</template>

<style scoped>

#home {
  margin-top: 50px;
  padding: 0 10px;
}
.home-header {
  margin-bottom: 20px;
  text-align: center;
  align-items: center;
  color: white;
  justify-content: center;
}

</style>

