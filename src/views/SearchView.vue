<script setup>
import { ref } from 'vue'
import CardsDisplay from '@/components/CardsDisplay.vue'
import { db } from '@/js/firebase.js'
import { collection, onSnapshot, query, where } from 'firebase/firestore'

const cards = ref([])
const searchInput = ref('')

function searchCards() {
  console.log('Searching for cards')
  const cardsCollection = collection(db, 'cards')
  const queryCards = query(
    cardsCollection,
    where('name', '>=', searchInput.value),
    where('name', '<=', `${searchInput.value}\uf8ff`)
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
</script>

<template>
  <div id="search">
    <div class="search">
      <div class="search__actual">
        <div class="search__text">SEARCH</div>
        <form @submit.prevent="searchCards">
          <div class="search__field">
            <input
              v-model="searchInput"
              id="search-bar"
              type="text"
              placeholder="Enter card name here..."
            />
            <button class="icon__box">
              <img class="icon" src="/icon-search.svg" alt="search" />
            </button>
          </div>
        </form>
      </div>
    </div>
    <div class="search__body">
      <CardsDisplay :cards="cards" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.search {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  color: #94a5bc;
  padding: 1.5rem;
  margin-bottom: 20px;
}
.search__actual {
  --shadow-color: rgba(0, 0, 0, 0.05);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 549px;
  color: #94a5bc;
  background-color: #0d2037;
  border-radius: 1rem;
  box-shadow: 0px 0px 20px 20px rgba(0, 0, 0, 0.418);
  padding: 1.5rem;
}
.search__text {
  font-size: 40px;
  color: #7dacf9;
  font-weight: 600;
  letter-spacing: 2px;
}
form {
  .search__field {
    margin-top: 20px;
    display: flex;
    width: 500px;
    .icon__box {
      display: flex;
      justify-content: center;
      align-items: center;
      height: 50px;
      width: 60px;
      color: #94a5bc;
      border-radius: 0 5px 5px 0;
      border: 1px solid #485c73;
      background: #021524;
      cursor: pointer;
      .icon {
        max-width: 30px;
        max-height: 30px;
      }
    }
    .icon__box:hover {
      border: 1px solid #7dacf9;
      background: #0f2137;
    }
  }
}
input {
  height: 50px;
  width: 100%;
  outline: none;
  font-size: 19px;
  color: #99a8c2;
  padding: 0 15px;
  border-radius: 5px 0 0 5px;
  border: 1px solid #485c73;
  caret-color: white;
  background: #051726;
}
input:focus {
  color: #7dacf9;
  background: #0f2137;
  border: 1px solid #7dacf9;
}
</style>
