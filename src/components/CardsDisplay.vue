<script setup>
import { onMounted } from 'vue'
import CardItem from '@/components/CardItem.vue'

defineProps({
  cards: {
    required: true
  }
})

onMounted(async () => {
  console.log('Connecting to Firebase')
})
</script>

<template>
  <div class="box">
    <div class="cards">
      <CardItem v-for="card in cards" :key="card.id" :card="card" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
main {
  background: var(--main-bg);
  padding: 2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
}
.box {
  padding: 20px;
}
.cards {
  display: flex;
  flex-direction: row;
  justify-content: center;
  gap: 15px;
  flex-wrap: wrap;
}
</style>
