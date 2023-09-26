import {defineStore} from "pinia";
import {computed, reactive, ref, watch} from "vue";
import {useRecorder} from "../composables/recorder.ts";

export const useAssistantStore = defineStore("assy", () => {

    type Log = {
        name: "you"|"assistant";
        text: string;
    }

    const logs = ref<Log[]>([])

    watch(logs, () => {
        const lastLog = logs.value[logs.value.length - 1]
        if (lastLog.name === "assistant") {
            return
        }
        // POST
    })


    return {
        logs,
    };
});