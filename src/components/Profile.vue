<script setup lang="ts">
import {useUserStore} from "../store/userStore.ts";
import {useRoute} from "vue-router";

const userStore = useUserStore();
const route = useRoute();

const user = userStore.getUser(route.params.uid as string);
</script>

<template>
  <h1>PROFILE PAGE!!!!!!</h1>
  <div v-if="user">
    <p>name: {{user.name}}</p>
    <p>profile: {{user.profile}}</p>
  </div>
</template>

<style scoped>
.read-the-docs {
  color: #888;
}
</style>
