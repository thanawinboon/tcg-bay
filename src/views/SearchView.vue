<script setup>
import CardsDisplay from '@/components/CardsDisplay.vue'
// TODO: Add search page 
// - Display all cards showing each one's image, name, owner's username (AND RATING), category
// - Has a textbox for input
// - Can sort cards
</script>

<template>
  <div id="search">
    <div class="search-header">
      <h2>Search</h2>
      <form class="search-container">
        <input type="text" id="search-bar" placeholder="Enter card name here...">
        <button>
          <img class="search-icon" src="http://www.endlessicons.com/wp-content/uploads/2012/12/search-icon.png" alt="search">
        </button>
      </form>
    </div>
    <div class="search-body">
      <CardsDisplay/>
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


