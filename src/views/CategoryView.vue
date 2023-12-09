<script setup>
import CardsDisplay from '@/components/CardsDisplay.vue'

const props = defineProps({
  category: { required: true }
})
</script>

<template>
  <div id="category">
    <div class="category-header">
      <h1>{{ props.category }}</h1>
    </div>
    <div class="category-body">
      <CardsDisplay />
    </div>
  </div>
</template>

<style scoped>
#category {
  margin-top: 50px;
  padding: 0 10px;
}
.category-header {
  margin-bottom: 20px;
  text-align: center;
  align-items: center;
  justify-content: center;
}
.category-body {
  margin-bottom: 20px;
  text-align: center;
  align-items: center;
  justify-content: center;
}
</style>
