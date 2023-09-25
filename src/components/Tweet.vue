<script setup lang="ts">
import {useTweetsStore} from "../store/tweetsStore.ts";

const tweetsStore = useTweetsStore();
</script>

<template>
  <p>TWEET PAGE</p>
  <div>
    つぶやく
    <input type="text" v-model="tweetsStore.inputTweet"><button @click="tweetsStore.post">送信</button>
  </div>
  <div v-for="tweet in tweetsStore.tweets" class="tweet">
    <small>{{tweet.name}}さんのつぶやき</small>
    <p>{{tweet.contents}}</p>
    <p @click="tweet.isFav = !tweet.isFav">
      <template v-if="tweet.isFav">
        💖
      </template>
      <template v-else>
        🖤
      </template>
    </p>
  </div>
</template>


<style scoped>
.tweet {
  padding: 10px;
  border: 1px solid #ccc;
}
</style>