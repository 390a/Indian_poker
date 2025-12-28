<template>
  <div class="start-view">
    <ul class="suits">
      <li><img src="../trumpCard/clover.png" alt="clover"></li>
      <li><img src="../trumpCard/heart.png" alt="heart"></li>
      <li><img src="../trumpCard/spade.png" alt="spade"></li>
      <li><img src="../trumpCard/diamond.png" alt="diamond"></li>
    </ul>
    <div class="start_msg">Indian Poker</div>
    <button class="start_btn" @click="start">
      <span class="btn_char">START</span>
    </button>
    <ul class="jokers">
      <li><img src="../trumpCard/joker1.png" alt="joker"></li>
      <span class="space"></span>
      <li><img src="../trumpCard/joker1.png" alt="joker"></li>
    </ul>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
const router = useRouter()

const start = () => {
  router.push('../game')
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=DotGothic16&display=swap');

.start-view {
  background-color: rgb(3, 109, 29);
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

img {
  width: 70px;
  height: 85px;
}

ul {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0;
  margin: 20px 0;
}

li {
  list-style: none;
  margin: 0 10px;
}

.start_msg {
  text-align: center;
  font-size: xx-large;
  color: cornsilk;
  font-family: 'DotGothic16';
  margin: 20px 0;
}

.start_btn {
  display: block;
  margin: 20px auto;
  width: 100px;
  height: 70px;
  background: gold;
  border-radius: 30px;
  border: none;
  cursor: pointer;
}

.btn_char {
  text-align: center;
  color: coral;
  font-size: large;
  font-family: 'DotGothic16';
}

.space {
  width: 140px;
}
</style>