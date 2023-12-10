<script setup>
import { ref, onMounted, watch } from 'vue'
import { signOut } from 'firebase/auth'
import { auth } from '@/js/firebase'
import router from '@/router/index.js'
import { useRoute } from 'vue-router'

import { db } from '@/js/firebase.js'
import { collection, doc, onSnapshot, query, where } from 'firebase/firestore'

import CardsDisplay from '@/components/CardsDisplay.vue'

const props = defineProps({
  userId: {
    required: false,
    default: '',
    type: String
  }
})

const cards = ref([])
const currentUser = ref(null)

function userCards(userId) {
  const cardsCollection = collection(db, 'cards')
  const queryCards = query(cardsCollection, where('owner.id', '==', userId))
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
  console.log(props.userId)
  const user = doc(db, `users/${props.userId}`)
  onSnapshot(user, (docSnapshot) => {
    try {
      currentUser.value = docSnapshot.data()
    } catch (error) {
      console.error('Error fetching cards:', error)
    }
  })
}

const route = useRoute()

watch(route, () => {
  if (props.userId) {
    // if a userId is specified, display that person's profile
    getUser()
    userCards(props.userId)
  } else {
    auth.onAuthStateChanged((user) => {
      if (user) {
        currentUser.value = {
          id: user.uid,
          email: user.email,
          username: user.displayName
        }
        userCards(currentUser.value.uid)
      } else {
        currentUser.value = null
      }
    })
  }
})

onMounted(() => {
  if (props.userId) {
    // if a userId is specified, display that person's profile
    getUser()
    userCards(props.userId)
  } else {
    auth.onAuthStateChanged((user) => {
      if (user) {
        currentUser.value = {
          id: user.uid,
          email: user.email,
          username: user.displayName
        }
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
      <h1 class="username">{{ currentUser.username }}</h1>
      <h3 class="email">{{ currentUser.email }}</h3>
    </div>

    <div class="profile-body">
      <hr />
      <h3>Owned cards</h3>
      <div class="showcase">
        <CardsDisplay :cards="cards" />
      </div>
    </div>

    <div class="usersettings" v-if="!userId">
      <hr />
      <div>
        <h1>User Settings</h1>
        <p>
          Current user: <span class="email">{{ currentUser.email }}</span>
        </p>
        <p>
          ID: <span class="code">{{ currentUser.id }}</span>
        </p>
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
.showcase {
  text-align: left;
}

hr {
  display: block;
  height: 1px;
  border: 0;
  border-top: 1px solid #ccc;
  margin: 30px 0;
  padding: 0;
}

.username {
  color: #ffcb2b;
  font-weight: 600;
}
.email {
  color: white;
}
.code {
  color: #ec938f;
}
</style>
