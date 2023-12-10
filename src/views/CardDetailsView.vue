<script setup>
import { ref, onMounted, watch } from 'vue'
// import router from '@/router/index.js'
import { useRoute } from 'vue-router';
import { db, auth } from '@/js/firebase.js'
import { doc, onSnapshot } from 'firebase/firestore'
import { getDate } from '@/js/utils.js'

const props = defineProps({
  cardId: {
    required: true,
    type: String
  }
})

const currentUser = ref(null);
const currentCard = ref(null);
function getCard() {
  console.log(props.cardId)
  const card = doc(db, `cards/${props.cardId}`)
  onSnapshot(card, (docSnapshot) => {
    try {
      currentCard.value = docSnapshot.data()
    } catch (error) {
      console.error('Error fetching cards:', error)
    }
  })
}

const route = useRoute();
watch(route, () => {
  getCard()
  auth.onAuthStateChanged((user) => {
    if (user) {
      currentUser.value = user
    } else {
      currentUser.value = null
    }
  })
});
onMounted(() => {
  getCard()
  auth.onAuthStateChanged((user) => {
    if (user) {
      currentUser.value = user
    } else {
      currentUser.value = null
    }
  })
})

function isOwner() {
  if (currentUser.value) {
    return currentUser.value.uid === currentCard.value.owner.id
  }
  return false
}

function deleteCard() {
  console.log('delete card')
}

</script>

<template>
  <div class="card-detail" v-if="currentCard">
    <div class="card-detail-header">
      <h3 v-if="isOwner()">My Card</h3>
      <h3 v-else>Card</h3>
      <h3>Card id: {{ cardId }}</h3>
      
      <h1>{{ currentCard.name }}</h1>
    </div>
    
    <div class="card-detail-image">
      <img :src="currentCard.imageUrl" alt="card image" />
    </div>
    <div class="card-detail-description">
      <h3>Owner's Note</h3>
      <h4>{{ currentCard.note }}</h4>
    </div>

    <div class="card-detail-body">
      <div class="card-detail-body-item">
        <h3>Category: {{ currentCard.category }}</h3>
        <h3>Card posted on: {{ getDate(currentCard.time.seconds * 1000) }}</h3>
      </div>
      <div class="card-detail-body-item">
        <h3>Owner: {{ currentCard.owner.name }}</h3>
        <h3>Contact: {{ currentCard.owner.email }}</h3>
      </div>
    </div>

    <div class="owner" v-if="isOwner()">
      <hr />
      <div>
        <h1>Owner Control panel</h1>
        <button @click.prevent="deleteCard">Delete card</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.card-detail {
  text-align: center;
  width: 100%;
  padding: 0 10px;
  margin-bottom: 60px;
}

.card-detail-image img{
  max-height: 500px;
  max-width: 800px;
}

.card-detail-body {
  display: flex;
  justify-content: space-evenly;
  margin: 20px 0;

  .card-detail-body-item {
    margin: 0 20px;
  }
}

hr {
  display: block;
  height: 1px;
  border: 0;
  border-top: 1px solid #ccc;
  margin: 30px 0;
  padding: 0;
}
</style>
