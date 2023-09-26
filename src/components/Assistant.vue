<script setup lang="ts">
import {ref, watch} from "vue";

  const recording = ref(false);

  const rec = new webkitSpeechRecognition()
  rec.continuous = false
  rec.interimResults = false
  rec.lang = "ja-JP"

  rec.onresult = (e) => {
    for (let i = e.resultIndex; i < e.results.length; i++) {
      if (!e.results[i].isFinal) continue

      const { transcript } = e.results[i][0]
      console.log(`Recognised: ${transcript}`)
    }
  }

  rec.onend = () => {
    if (recording.value) {
      rec.start();
    }
  }

  watch(recording, () => {
    recording.value ? rec.start() : rec.stop();
  })
</script>

<template>
  <div class="assistantBox">
    <button
        @click="recording = !recording">🎤
      <template v-if="recording">[recording]</template>
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
