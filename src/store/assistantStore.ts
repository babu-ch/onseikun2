import {defineStore} from "pinia";
import {ref, watch} from "vue";
import {useAI} from "../composables/ai.ts";
import {useCommandHandler} from "../composables/commandHandler.ts";

export const useAssistantStore = defineStore("assy", () => {

    const commandHandler = useCommandHandler()
    const openai = useAI()

    type Log = {
        name: "you"|"assistant";
        text: string;
    }

    const logs = ref<Log[]>([])

    watch(logs, async () => {
        const lastLog = logs.value[0]
        if (lastLog.name === "assistant") {
            return
        }
        // POST
        const answer = await openai.getAnswer(lastLog.text)
        console.error({answer})
        if (!answer) {
            return
        }
        logs.value.unshift({
            name: "assistant",
            text: answer.answer,
        })
        commandHandler.execCommands(answer.commands)
    }, {deep: true})


    return {
        logs,
    };
});