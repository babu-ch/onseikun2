<script setup lang="ts">
  import {useRecorder} from "../composables/recorder.ts";

  const recorder = useRecorder();
</script>

<template>
  <div class="assistantBox">
    <button
        @click="recorder.recording.value = !recorder.recording.value">🎤
      <template v-if="recorder.recording.value">[recording]</template>
    </button>
    <p>msg</p>
    <p>msg</p>
    <p>msg</p>
    <p>msg</p>
    <p>msg</p>
    <p>msg</p>
    <p>msg</p>
    <p>msg</p>
  </div>
</template>

<style scoped>
.assistantBox {
  right: 0;
  bottom: 0;
  position: fixed;
  height: 400px;
  width: 300px;
  background: #213547;
  padding: 10px;
}
.assistantBox p {
  border-bottom: 1px solid #ccc;
}
</style>
