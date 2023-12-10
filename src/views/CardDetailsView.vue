<script setup>
import { ref, onMounted, watch } from 'vue'
import { useRoute } from 'vue-router'
import { db, auth } from '@/js/firebase.js'
import { doc, onSnapshot, deleteDoc } from 'firebase/firestore'
import { getDate } from '@/js/utils.js'
import router from '@/router/index.js'

const props = defineProps({
  cardId: {
    required: true,
    type: String
  }
})

const currentUser = ref(null)
const currentCard = ref(null)
function getCard() {
  console.log(props.cardId)
  const card = doc(db, `cards/${props.cardId}`)
  onSnapshot(card, (docSnapshot) => {
    try {
      currentCard.value = docSnapshot.data()
    } catch (error) {
      console.error('Error fetching card:', error)
    }
  })
}

const route = useRoute()
watch(route, () => {
  getCard()
  auth.onAuthStateChanged((user) => {
    if (user) {
      currentUser.value = user
    } else {
      currentUser.value = null
    }
  })
})
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

async function deleteCard() {
  await deleteDoc(doc(db, 'cards', props.cardId))
  router.push({ name: 'my-profile' })
}
</script>

<script>
export default {
  data: () => ({
    show: false
  }),
  methods: {
    navigateToImage(card) {
      const imageUrl = card.imageUrl
      window.location.href = imageUrl
    }
  }
}
</script>

<template>
  <div class="card__body" v-if="currentCard">
    <div class="card__header">
      <div class="card__title">CARD VIEW</div>

      <div class="control" v-if="isOwner()">
        <button class="icon__box" @click.prevent="deleteCard">
          <img class="icon" src="/icon-trashcan.svg" alt="search" />
        </button>
      </div>
    </div>

    <div class="card__detail">
      <div class="card__left">
        <div class="artwork" @click="navigateToImage(currentCard)">
          <img class="card__img" alt="product-image" :src="currentCard.imageUrl" />
        </div>

        <div class="card__footer">
          <h6 class="subtext">Posted on:</h6>
          <div class="card__time">
            <img src="/icon-clock.svg" alt="clock" />
            {{ getDate(currentCard.time.seconds * 1000) }}
          </div>
        </div>
      </div>

      <div class="card__right">
        <div class="card__category">
          <h6 class="subtext">Category:</h6>
          <RouterLink
            :to="{ name: 'category', params: { category: currentCard.category } }"
            style="display: inline-block; text-decoration: none; color: black"
          >
            <h5 class="card__category__text">{{ currentCard.category }}</h5>
          </RouterLink>
        </div>
        <div class="card__name">
          <h6 class="subtext">Name:</h6>
          <RouterLink
            :to="{ name: 'card-details', params: { cardId: currentCard.id } }"
            style="display: inline-block; text-decoration: none; color: black"
            :title="currentCard.name"
          >
            <h5 class="card__name__text">{{ currentCard.name }}</h5>
          </RouterLink>
        </div>

        <div class="card__note">
          <h6 class="subtext">Owner's note:</h6>
          <p class="card__note__text">{{ currentCard.note }}</p>
        </div>

        <div class="card__owner">
          <div class="card__owner__item">
            <div>
              <span>Owner: </span>
              <RouterLink
                :to="{ name: 'user-profile', params: { userId: currentCard.owner.id } }"
                style="display: inline-block; text-decoration: none; color: black"
              >
                <span class="name">{{ currentCard.owner.name }}</span>
              </RouterLink>
            </div>
            <div>
              Card ID: <span class="code">{{ cardId }}</span>
            </div>
          </div>
          <div class="card__contact">
            <span>Email:</span><span class="email">{{ currentCard.owner.email }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.card__body {
  width: 100%;
  height: 100%;
}

.card__header {
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  margin-left: 49px;
  margin-bottom: 20px;
  justify-content: space-between;
  text-align: center;
  align-items: center;
  color: #d3e2fc;
}
.card__title {
  font-size: 40px;
  color: #7dacf9;
  font-weight: 600;
  letter-spacing: 2px;
}
.control {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  gap: 2rem;
  .icon__box {
    position: absolute;
    margin-top: 190px;
    margin-left: -80px;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 50px;
    width: 60px;
    border-radius: 5px;
    border: 1px solid #ab1111;
    background: #021524;
    cursor: pointer;
    .icon {
      max-width: 30px;
      max-height: 30px;
      filter: invert(17%) sepia(44%) saturate(4260%) hue-rotate(353deg) brightness(105%)
        contrast(95%);
    }
    .icon:hover {
      filter: invert(23%) sepia(89%) saturate(7439%) hue-rotate(0deg) brightness(96%) contrast(122%);
    }
  }
  .icon__box:hover {
    border: 1px solid #fa0000;
    background: #0f2137;
  }
}

.card__detail {
  --shadow-color: rgba(0, 0, 0, 0.05);
  display: flex;
  flex-direction: row;
  justify-content: center;
  gap: 3rem;
  width: 100%;
  color: #94a5bc;
  background-color: #0d2037;
  border-radius: 1rem;
  box-shadow: 0px 0px 20px 20px rgba(0, 0, 0, 0.418);
  padding: 1.5rem;
}

.card__left,
.card__right {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  height: 100%;
}
.card__right {
  gap: 0.5rem;
}

.artwork {
  width: 300px;
  height: 500px;
  background-color: black;
  border-radius: 0.5rem;
  display: flex;
  flex: none;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  position: relative;
  &:hover {
    cursor: pointer;
    &::before,
    &::after {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      z-index: 1;
    }
    &::before {
      background: #0d2037;
      opacity: 0.5;
    }
    &::after {
      content: url(/icon-view.svg);
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }
  img {
    width: 100%;
  }
}

.card__footer {
  display: flex;
  justify-content: space-between;
  .card__time {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 0.5rem;
    color: #8bacd9;
    font-weight: 100;
  }
}

.card__category {
  display: flex;
  justify-content: left;
  align-items: center;
  gap: 1rem;
  .card__category__text {
    color: #ffcb2b;
    font-size: 30px;
    font-weight: 600;
    &:hover {
      color: white;
      cursor: pointer;
    }
  }
}

.card__name {
  display: flex;
  justify-content: left;
  align-items: center;
  gap: 2.8rem;
  .card__name__text {
    color: #4a82e7;
    font-weight: 500;
    font-size: 30px;
    letter-spacing: 1px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    max-width: 100%;
    &:hover {
      color: white;
      cursor: pointer;
    }
  }
}

.card__note {
  display: flex;
  flex-direction: column;
  justify-content: left;
  align-items: justify-content;
  width: 100%;
  min-width: 500px;
  .card__note__text {
    color: #99a8c2;
    font-size: 18px;
    font-weight: 300;
    line-height: 25px;
    background: #021524;
    border-radius: 1rem;
    padding: 1.5rem;
    height: 22.3rem;
  }
}

.card__owner {
  display: flex;
  justify-content: left;
  flex-direction: column;
  align-items: left;
  gap: 0.5rem;
  .card__owner__item {
    display: flex;
    justify-content: space-between;
    color: #5484d0;
  }
  span {
    font-weight: 300;
    &.name {
      color: white;
      &:hover {
        color: #d3e2fc;
        cursor: pointer;
      }
    }
  }
}
.card__contact {
  display: flex;
  justify-content: left;
  gap: 0.8rem;
  color: #5484d0;
}

.email {
  color: white;
}
.code {
  color: #ec938f;
}
.subtext {
  font-size: 20px;
  color: #5484d0;
}
.line {
  height: 1px;
  width: 100%;
  background: #172b3c;
}
</style>
