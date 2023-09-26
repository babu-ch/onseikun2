<script setup lang="ts">
  import {useRecorder} from "../composables/recorder.ts";
  import {useAssistantStore} from "../store/assistantStore.ts";

  const recorder = useRecorder();
  const assistantStore = useAssistantStore();
</script>

<template>
  <div class="assistantBox">
    <button
        @click="recorder.recording.value = !recorder.recording.value">🎤
      <template v-if="recorder.recording.value">[recording]</template>
    </button>
    <p v-for="log in assistantStore.logs">{{log.name}}: {{log.text}}</p>
  </div>
</template>

<style scoped>
.assistantBox {
  right: 0;
  bottom: 0;
  position: fixed;
  height: 600px;
  width: 300px;
  background: #213547;
  padding: 10px;
}
.assistantBox p {
  border-bottom: 1px solid #ccc;
  font-size: 0.8em;
  text-align: left;
}
</style>
