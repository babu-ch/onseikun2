import {ref, watch} from "vue"
import {useAssistantStore} from "../store/assistantStore.ts";
export function useRecorder() {
    const assistantStore = useAssistantStore();
    const recording = ref(false)
    const recordingText = ref("")

    const rec = new webkitSpeechRecognition()
    rec.continuous = true
    rec.interimResults = false
    rec.lang = "ja-JP"

    rec.onresult = (e) => {
        for (let i = e.resultIndex; i < e.results.length; i++) {
            if (!e.results[i].isFinal) continue

            const { transcript } = e.results[i][0]
            console.log(`Recognised: ${transcript}`)
            recordingText.value += transcript
        }
    }

    rec.onend = () => {
        recording.value = false
        assistantStore.logs.push(
            {
                name: "you",
                text: recordingText.value
            }
        )
    }

    watch(recording, () => {
        if (recording.value) {
            recordingText.value = ""
            rec.start()
            return
        }
        rec.stop()
    })

    return {
        recording,
        recordingText,
    }
}