<script setup lang="ts">
import {useTweetStore} from "../store/tweetStore.ts";

const tweetsStore = useTweetStore();
</script>

<template>
  <p>TWEET PAGE</p>
  <div>
    つぶやく
    <input type="text" v-model="tweetsStore.inputTweet"><button @click="tweetsStore.post">送信</button>
  </div>
  <div v-for="tweet in tweetsStore.tweets" class="tweet">
    <small><router-link :to="`/profile/${tweet.uid}`">{{tweet.name}}</router-link>さんのつぶやき</small>
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