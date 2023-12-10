<script setup>
const props = defineProps({
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

<script>
export default {
  data: () => ({
    show: false
  })
}
</script>

<template>
  <div class="card">
    <div class="artwork">
      <img class="card__img" alt="product-image" :src="props.card.imageUrl" />
    </div>

    <h3 class="card__name">{{ props.card.name }}</h3>

    <div class="card__extra">
      <h6 class="card__category">
        {{ props.card.category }}
      </h6>
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
        <span>Owned by</span> <span class="name">{{ props.card.owner.name }}</span>
      </p>
    </div>

    <v-card>
      <v-card-actions>
        <div class="card__revealer">
          <v-btn icon @click="show = !show">
            <v-icon>{{ show ? ' &#9650;' : '&#9660;' }}</v-icon>
          </v-btn>
        </div>
      </v-card-actions>
      <v-expand-transition>
        <div v-show="show">
          <div class="line"></div>
          <p class="card__note">{{ props.card.note }}</p>
        </div>
      </v-expand-transition>
    </v-card>
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

  .card__category {
    color: #ffcb2b;
    font-weight: 600;
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
}

.line {
  height: 1px;
  width: 100%;
  background: #172b3c;
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
</style>

// TODO: find a way to display image
