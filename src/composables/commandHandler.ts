import {useRouter} from "vue-router";
import {useTweetStore} from "../store/tweetStore.ts";

export type TCommand = {
    type:"move"|"favorite"|"post",
    newLocation: string;
    favoriteId: string;
    postText: string;
}
export function useCommandHandler() {
    const router = useRouter()
    const tweetStore = useTweetStore()

    return {
        execCommands(commands: TCommand[]) {
            commands.forEach(command => {
                switch (command.type) {
                    case "favorite":
                        tweetStore.toggleFavorite(parseInt(command.favoriteId))
                        return
                    case "move":
                        router.push(command.newLocation)
                        return
                    case "post":
                        tweetStore.post(command.postText)
                        return
                }
            })
        },
    }
}