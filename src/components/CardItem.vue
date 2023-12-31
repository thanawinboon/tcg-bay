<script setup>
import { getDate } from '@/js/utils.js'
const props = defineProps({
  card: {
    type: Object,
    required: true
  }
})
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
  <div class="card">
    <div class="artwork" @click="navigateToImage(props.card)">
      <img class="card__img" alt="product-image" :src="props.card.imageUrl" />
    </div>

    <RouterLink
      :to="{ name: 'card-details', params: { cardId: props.card.id } }"
      style="display: inline-block; text-decoration: none; color: black"
      :title="props.card.name"
    >
      <h3 class="card__name">{{ props.card.name }}</h3>
    </RouterLink>

    <div class="card__extra">
      <div class="card__category">
        <RouterLink
          :to="{ name: 'category', params: { category: props.card.category } }"
          style="display: inline-block; text-decoration: none; color: black"
        >
          <div class="card__category__text">{{ props.card.category }}</div>
        </RouterLink>
      </div>
      <h6 class="card__time">
        <img src="/icon-clock.svg" alt="clock" />
        {{ getDate(props.card.time.seconds * 1000) }}
      </h6>
    </div>
    <div class="line"></div>
    <div class="card__owner">
      <div class="profile-photo">
        <!-- display image -->
      </div>
      <p>
        <span>Owned by </span>
        <RouterLink
          :to="{ name: 'user-profile', params: { userId: props.card.owner.id } }"
          style="display: inline-block; text-decoration: none; color: black"
        >
          <span class="name">{{ props.card.owner.name }}</span>
        </RouterLink>
      </p>
    </div>
    <div class="card__revealer">
      <div class="card__revealer__icon" @click="show = !show">
        <span>{{ show ? ' &#9650;' : '&#9660;' }}</span>
      </div>
    </div>
    <div v-show="show">
      <div class="line"></div>
      <p class="card__note">{{ props.card.note }}</p>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.card {
  --shadow-color: rgba(0, 0, 0, 0.05);
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  gap: 1rem;
  width: 100%;
  max-width: 350px;
  color: #94a5bc;
  background-color: #0d2037;
  border-radius: 1rem;
  box-shadow: 0px 0px 20px 20px rgba(0, 0, 0, 0.418);
  padding: 1.5rem;
}

.artwork {
  width: 302px;
  height: 302px;
  background-color: black;
  aspect-ratio: 1/1;
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

.card__name {
  color: #4a82e7;
  font-weight: 600;
  font-size: 1.5rem;
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

.card__note {
  color: #99a8c2;
  font-size: 18px;
  font-weight: 300;
  line-height: 25px;
  margin-top: 16px;
}

.card__extra {
  display: flex;
  justify-content: space-between;
  .card__category,
  .card__time {
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }
  .card__category__text {
    color: #ffcb2b;
    font-weight: 600;
    &:hover {
      color: white;
      cursor: pointer;
    }
  }
  .card__time {
    color: #8bacd9;
    font-weight: 100;
  }
}

.card__revealer {
  display: flex;
  text-align: right;
  justify-content: right;
  align-items: right;
  position: absolute;
  margin-top: 432px;
  margin-left: 280px;
  .card__revealer__icon {
    color: #8bacd9;
    &:hover {
      color: white;
      cursor: pointer;
    }
  }
}
.card__owner {
  display: flex;
  justify-content: start;
  align-items: center;
  gap: 1rem;

  .profile-photo {
    display: flex;
    flex-shrink: 0;
    justify-content: center;
    align-items: center;
    width: 2rem;
    background-color: black;
    aspect-ratio: 1/1;
    border: 1px solid white;
    border-radius: 100%;
    img {
      width: 100%;
    }
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

.line {
  height: 1px;
  width: 100%;
  background: #172b3c;
}
</style>
