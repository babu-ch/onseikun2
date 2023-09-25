<script setup lang="ts">
</script>

<template>
  <nav>
    <ul>
      <li>links-></li>
      <li>
        <router-link to="/">home</router-link>
      </li>
      <li>
        <router-link to="/tweet">tweet</router-link>
      </li>
    </ul>
  </nav>
  <div>
    <h3>view</h3>
    <router-view></router-view>
  </div>
</template>

<style scoped>
li {
  display: inline-block;
  padding: 10px;
}
</style>
