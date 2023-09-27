import {useRouter} from "vue-router";

export type TCommand = {
    type:"move"|"favorite"|"post",
    newLocation: string;
    favoriteId: string;
    postText: string;
}
export function useCommandHandler() {
    const router = useRouter()

    return {
        execCommands(commands: TCommand[]) {
            console.log(commands)
        },
    }
}