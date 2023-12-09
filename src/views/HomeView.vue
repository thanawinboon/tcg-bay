<script setup>
import { ref, onMounted } from 'vue'
import CardsDisplay from '@/components/CardsDisplay.vue'
import { db } from '@/js/firebase.js'
import { collection, onSnapshot } from 'firebase/firestore'
// TODO: Show some fancy TCG wallpaper plus website's name ???

const cards = ref([]);
async function getCards() {
  onSnapshot(collection(db, 'cards'), (querySnapshot) => {
    try {
      let cardsSnapshot = []
      querySnapshot.forEach((doc) => {
        console.log(doc.id, ' => ', doc.data())
        let card = {
          id: doc.id,
          category: doc.data().category,
          name: doc.data().name,
          note: doc.data().note,
          time: doc.data().time,
          owner: doc.data().owner
        }
        cardsSnapshot.push(card)
      })
      cards.value = cardsSnapshot
      console.log('Cards retrieved:', cards.value)
    } catch (error) {
      console.error('Error fetching cards:', error)
    }
  })
}

onMounted(async () => {
  await getCards()
})

</script>

<template>
  <div id="home">
    <div class="home-header">
      <h1>TCG Bay</h1>
      <p>Home page is where the heart of the card is</p>
    </div>
    <div>
      <CardsDisplay :cards="cards"/>
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

