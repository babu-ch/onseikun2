import {ref, watch} from "vue";
export function useRecorder() {
    const recording = ref(false);
    const text = ref("");

    const rec = new webkitSpeechRecognition()
    rec.continuous = false
    rec.interimResults = false
    rec.lang = "ja-JP"

    rec.onresult = (e) => {
        for (let i = e.resultIndex; i < e.results.length; i++) {
            if (!e.results[i].isFinal) continue

            const { transcript } = e.results[i][0]
            console.log(`Recognised: ${transcript}`)
            text.value += transcript;
        }
    }

    rec.onend = () => {
        if (recording.value) {
            rec.start();
        }
    }

    watch(recording, () => {
        if (recording.value) {
            rec.start();
            return;
        }
        rec.stop();
        text.value = "";
    })

    return {
        recording
    }
}