<script setup>
import { ref, onMounted } from 'vue'
import { db } from '@/js/firebase.js'
import { collection, onSnapshot } from 'firebase/firestore'

import CardItem from '@/components/CardItem.vue'

const cards = ref([])

async function getCards() {
  onSnapshot(collection(db, 'cards'), (querySnapshot) => {
    try {
      let cardsSnapshot = []
      console.log('first test')
      querySnapshot.forEach((doc) => {
        console.log('second test')  // DOES NOT GET LOGGED BECAUSE IT QUERIES NOTHING SOMEHOW
        console.log(doc.id, ' => ', doc.data())
        let card = {
          id: doc.id,
          category: doc.data().category,
          name: doc.data().name,
          note: doc.data().note,
          time: doc.data().time
        }
        cardsSnapshot.push(card)
      })
      cards.value = cardsSnapshot
      console.log('Cards retrieved:', cards.value)
    } catch (error) {
      console.error('Error fetching cards:', error)  // NO ERROR IS CAUGHT
    }
  })
}

onMounted(async () => {
  console.log('Connecting to Firebase')
  await getCards()
})
</script>

<template>
  <div class="box">
    <div class="cards">
      <CardItem v-for="card in cards" :key="card.id" :card="card" />
    </div>
  </div>
</template>

<style scoped>
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

// TODO: ACTUALLY GET THIS TO WORK!!
