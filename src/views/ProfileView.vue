<script setup>
import { ref, onMounted } from 'vue'
import { signOut } from 'firebase/auth'
import { auth } from '@/js/firebase'
import router from '@/router/index.js'

import { db } from '@/js/firebase.js'
import { collection, onSnapshot, query, where } from 'firebase/firestore'

import CardsDisplay from '@/components/CardsDisplay.vue'

const props = defineProps({
  userId: {
    required: false,
    default: null,
    type: String
  }
})

const cards = ref([])
const currentUser = ref(null)

function userCards(userId) {
  const cardsCollection = collection(db, 'cards')
  const queryCards = query(cardsCollection, where('owner', '==', userId))
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
          imageUrl: doc.data().imageUrl
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

function getUser() {
  const usersCollection = collection(db, 'users')
  const queryCards = query(usersCollection, where('id', '==', props.userId))
  onSnapshot(queryCards, (querySnapshot) => {
    try {
      querySnapshot.forEach((doc) => {
        console.log(doc.id, ' => ', doc.data())
        let user = {
          id: doc.id,
          // name: doc.data().name,
          name: 'temp'
        }
        currentUser.value = user
      })
    } catch (error) {
      console.error('Error fetching cards:', error)
    }
  })
}

onMounted(() => {
  if (props.userId) {
    // if a userId is specified, display that person's profile
    getUser()
    userCards(props.userId)
  } else {
    auth.onAuthStateChanged((user) => {
      if (user) {
        currentUser.value = user
        console.log('Current user is: ' + currentUser.value.email)
        console.log(auth.currentUser)
        console.log(currentUser.value.uid)
        userCards(currentUser.value.uid)
      } else {
        currentUser.value = null
      }
    })
  }
})

function userSignOut() {
  signOut(auth)
    .then(() => {
      console.log('Signed Out')
      router.push('/')
    })
    .catch((error) => {
      console.log('Cannot Sign Out !!!')
      console.log(error)
    })
}
</script>

<template>
  <div class="profile" v-if="currentUser">
    <div class="profile-header">
      <h3 v-if="userId">Profile</h3>
      <h3 v-else>My Profile</h3>
      <!-- TODO: change this to username (if there's one) -->
      <h1>{{ currentUser.email }}</h1>
    </div>

    <div class="profile-body">
      <hr />
      <h3>Owned cards</h3>
      <CardsDisplay :cards="cards" />
    </div>

    <div class="usersettings" v-if="!userId">
      <hr />
      <div>
        <h1>User Settings</h1>
        <p>Current user: {{ currentUser.email }}</p>
        <button @click.prevent="userSignOut">Sign Out</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.profile {
  text-align: center;
  width: 100%;
  padding: 0 10px;
  margin-bottom: 60px;
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
