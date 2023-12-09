<script setup>
import { ref } from 'vue'
import CardsDisplay from '@/components/CardsDisplay.vue'
import { db } from '@/js/firebase.js'
import { collection, onSnapshot, query, where } from 'firebase/firestore'
// TODO: Show some fancy TCG wallpaper plus website's name ???

const cards = ref([]);
const searchInput = ref('')


function searchCards() {
  console.log('Searching for cards')
  const cardsCollection = collection(db, 'cards');
  const queryCards = query(cardsCollection, where('name', '>=', searchInput.value), where('name', '<=', `${searchInput.value}\uf8ff`));
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

// TODO: Add search page 
// - Display all cards showing each one's image, name, owner's username (AND RATING), category
// - Has a textbox for input
// - Can sort cards
</script>

<template>
  <div id="search">
    <div class="search-header">
      <h2>Search</h2>
      <form class="search-container" @submit.prevent="searchCards">
        <input v-model="searchInput" type="text" id="search-bar" placeholder="Enter card name here...">
        <button>
          <img class="search-icon" src="http://www.endlessicons.com/wp-content/uploads/2012/12/search-icon.png" alt="search">
        </button>
      </form>
    </div>
    <div class="search-body">
      <CardsDisplay :cards="cards"/>
    </div>
  </div>
</template>

<style scoped>
#search {
  margin-top: 60px;
  width: 100%;
  padding: 0 10px;
}
.search-header {
  display: flex;
  text-align: center;
  align-items: center;
  justify-content: center;
  color: white;
  margin-bottom: 20px;
}

.search-container{
  display: flex;
  width: 100%;
  margin: 0 20px;
}

input#search-bar{
  width: 100%;
  max-width: 1000px;
  height: 35px;
  padding: 0 20px;
  font-size: 1rem;
  border: none;
  outline: none;
  border-radius: 5px;
 }

.search-icon{
  position: relative;
  float: right;
  max-width: 30px;
  max-height: 30px;
}

</style>


