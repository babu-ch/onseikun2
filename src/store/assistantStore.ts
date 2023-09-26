import {defineStore} from "pinia";
import {computed, reactive, ref, watch} from "vue";
import {useRecorder} from "../composables/recorder.ts";

export const useAssistantStore = defineStore("assy", () => {

    type Log = {
        name: "you"|"assistant";
        text: string;
    }

    const logs = ref<Log[]>([]);


    return {
        logs,
    };
});