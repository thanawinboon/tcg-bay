<script setup>
import CardsDisplay from '@/components/CardsDisplay.vue'
import { ref, onMounted } from 'vue'
import { db } from '@/js/firebase.js'
import { collection, onSnapshot, query, where } from 'firebase/firestore'

const props = defineProps({
  category: { required: true, type: String }
})

const cards = ref([])
function getCards() {
  const cardsCollection = collection(db, 'cards')
  const queryCards = query(
    cardsCollection,
    where('category', '==', props.category),
  )

  onSnapshot(queryCards, (querySnapshot) => {
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
          owner: doc.data().owner,
          imageUrl: doc.data().imageUrl,
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
  <div id="category">
    <div class="category-header">
      <h1>{{ props.category }}</h1>
    </div>
    <div class="category-body">
      <CardsDisplay :cards="cards"/>
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
  align-items: center;
  justify-content: center;
}
</style>
