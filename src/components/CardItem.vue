<script setup>
defineProps({
  card: {
    type: Object,
    required: true
  }
})

function getDate(timestamp) {
  const date = new Date(timestamp)
  let dd = date.getDate()
  let mm = date.getMonth() + 1
  const yyyy = date.getFullYear()

  if (dd < 10) {
    dd = '0' + dd
  }

  if (mm < 10) {
    mm = '0' + mm
  }
  return `${yyyy}-${mm}-${dd}`
}
</script>

<template>
  <RouterLink
    :to="{ name: 'card-details', params: { id: card.id } }"
    style="
      display: inline-block;
      text-decoration: none;
      color: black;
      font-family: 'Oswald', sans-serif;
    "
  >
    <div class="card">
      <div class="artwork">
        <!-- <img 
        class="card__img"
        alt="product-image" 
        :src="require('@/static/images/' + img)"
      > -->
      </div>

      <h3 class="card__name">{{ card.name }}</h3>
      <p class="card__note">{{ card.note }}</p>

      <div class="card__extra">
        <h6 class="card__category">
          {{ card.category }}
        </h6>
        <h6 class="card__time">
          <img src="/icon-clock.svg" alt="clock" />
          {{ getDate(card.time.seconds * 1000) }}
        </h6>
      </div>
      <div class="line"></div>

      <div class="card__owner">
        <div class="profile-photo">
          <!-- show photo -->
        </div>
        <p>
          <span>Owned by</span> <span class="name">{{ card.owner }}</span>
        </p>
      </div>
    </div>
  </RouterLink>
</template>

<style lang="scss" scoped>
.card {
  --shadow-color: rgba(0, 0, 0, 0.05);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 1rem;
  width: 100%;
  max-width: 350px;
  // color: var(--white);
  // background: var(--card-bg);
  color: #8bacd9;
  background-color: #15263f;
  border-radius: 1rem;
  box-shadow: 0px 0px 20px 20px var(--shadow-color);
  padding: 1.5rem;
}

.artwork {
  width: 100%;
  background-color: black;
  aspect-ratio: 1/1;
  border-radius: 0.5rem;
  display: flex;
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
      z-index: 10;
    }

    &::before {
      background: var(--cyan);
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
  color: white;
  font-weight: 600;
  font-size: 1.5rem;
  letter-spacing: 1px;

  &:hover {
    color: var(--cyan);
    cursor: pointer;
  }
}

.card__note {
  color: var(--soft-blue);
  font-size: 18px;
  font-weight: 300;
  line-height: 25px;
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

  .card__category {
    color: #00fff8;
    font-weight: 600;
  }

  .card__time {
    color: #a89ec9;
    font-weight: 100;
  }
}

.line {
  height: 1px;
  width: 100%;
  background: #2e415a;
}

.card__owner {
  display: flex;
  justify-content: start;
  align-items: center;
  gap: 1rem;

  .profile-photo {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 2rem;
    background-color: black;
    aspect-ratio: 1/1;
    border: 1px solid var(--white);
    border-radius: 100%;

    img {
      width: 100%;
    }
  }

  span {
    color: var(--soft-blue);
    font-weight: 300;

    &.name {
      color: white;

      &:hover {
        color: var(--cyan);
        cursor: pointer;
      }
    }
  }
}
</style>

// TODO: find a way to display image and user properly
