<script setup>
defineProps({
  card: {
    type: Object,
    required: true
  }
})
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
      <div class="card__product-img">
        <!-- <img 
        class="card__img"
        alt="product-image" 
        :src="require('@/static/images/' + img)"
      > -->
      </div>
      <div class="card__content">
        <p class="card__name">
          {{ card.name }}
        </p>
        <p class="card__note">{{ card.note }}</p>
        <div class="card__content-bottom">
          <div class="card__category">
            <ins>◘</ins>
            <p>{{ card.category }}</p>
          </div>
          <div v-if="time" class="card__time">
            <ins>◷</ins>
            <p>{{ card.time }}</p>
          </div>
        </div>
      </div>
      <div class="card__footer">
        <div class="card__avatar">
          <img :src="require('@/static/images/' + avatar)" alt="avatar-image" />
        </div>
        <p class="card__author">
          Creation of <span class="card__author--alt-color">{{ card.id }}</span>
        </p>
      </div>
    </div>
  </RouterLink>
</template>

<style scoped lang="scss">
.card {
  background-color: #15263f;
  color: #8bacd9;
  border-radius: 16px;
  padding: 24px;
  width: 327px;
  font-size: 1.5rem;
  box-shadow: 0 25px 50px 0 rgba(0, 0, 0, 0.1);
  @media screen and (min-width: 768px) {
    font-size: 1.6rem;
    width: 350px;
    padding-bottom: 32px;
  }
  .card__product-img {
    cursor: pointer;
    position: relative;
    border-radius: 8px;
    overflow: hidden;
    @mixin hoverOpacity {
      content: '';
      position: absolute;
      left: 0;
      width: 100%;
      height: 100%;
      opacity: 0;
      transition: opacity 0.25s ease-out;
    }
    &::after {
      @include hoverOpacity;
      background: no-repeat rgba(0, 255, 255, 0.5) url(../../assets/images/card/icon-view.svg)
        center;
    }
    &:hover {
      &::after {
        opacity: 1;
      }
    }
  }
  .card__content {
    display: flex;
    flex-direction: column;
    gap: 12px;
    padding: 24px 0 16px 0;
    @media screen and (min-width: 768px) {
      gap: 16px;
      padding: 24px 0;
    }
    .card__name {
      color: white;
      font-size: 2.2rem;
      font-weight: bold;
      cursor: pointer;
      &:hover {
        color: #00fff8;
      }
    }
    .card__note {
      font-size: 1.8rem;
      line-height: 2.6rem;
      font-weight: lighter;
    }
    .card__content-bottom {
      display: flex;
      justify-content: space-between;
      padding-top: 4px;
      @media screen and (min-width: 768px) {
        padding-top: 6px;
      }
      > * {
        display: flex;
        align-items: center;
        gap: 8px;
        font-weight: 600;
      }
      .card__category {
        color: #00fff8;
        ins {
          margin-left: -0.3rem;
          margin-right: 0.5rem;
        }
        .card__time {
          color: #a89ec9;
          ins {
            margin: 0.5rem;
            margin-bottom: 0.4rem;
          }
        }
      }
    }
    .card__footer {
      display: flex;
      align-items: center;
      border-top: 1px solid #2e405a;
      gap: 16px;
      padding-top: 16px;
      .card__avatar {
        display: flex;
        border-radius: 90px;
        border: 1px solid white;
        img {
          width: 33px;
        }
      }
      .card__author--alt-color {
        color: white;
        cursor: pointer;
        &:hover {
          color: #00fff8;
        }
      }
    }
  }
}

.fade-enter-active,
.fade-leave-active {
  transition: 0.25s ease-out;
}
.fade-leave-to,
.fade-enter-from {
  opacity: 0;
}
</style>

// TODO: find a way to display image
