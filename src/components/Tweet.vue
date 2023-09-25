<script setup lang="ts">
import {ref} from "vue";

type Tweet = {
  id: number;
  contents: string;
  name: string;
  isFav: boolean;
}
const tweets = ref<Tweet[]>([
  {id: 1,name: "ちくお", isFav: false, contents: "テレビおもろいな〜"},
  {id: 2,name: "もち山", isFav: false, contents: "もちうますぎる"},
  {id: 3,name: "バカンスじろう", isFav: false, contents: "ソーキそば食べたい"},
  {id: 4,name: "パスタ吸い込みマン", isFav: false, contents: "パスタ食べてたら一日が終わった"},
]);

const inputTweet = ref("");

function send() {
  tweets.value.unshift({
    id: tweets.value.length + 1,
    name: "あなた",
    contents: inputTweet.value,
    isFav: false,
  });
  inputTweet.value = "";
}
</script>

<template>
  <p>TWEET PAGE</p>
  <div>
    つぶやく
    <input type="text" v-model="inputTweet"><button @click="send">送信</button>
  </div>
  <div v-for="tweet in tweets" class="tweet">
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