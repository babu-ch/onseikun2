import {defineStore} from "pinia";
import {ref} from "vue";

export const useUserStore = defineStore("users", () => {
    type User = {
        name: string;
        uid: string;
    }
    const users = ref<Map<string, User>>(new Map([
        ["chikuo", {uid: "chikuo",name: "ちくお"}],
        ["mochiyama", {uid: "mochiyama",name: "もち山"}],
        ["vacajirou", {uid: "vacajirou",name: "バカンスじろう"}],
        ["pasta_suikomu", {uid: "pasta_suikomu",name: "パスタ吸い込みマン"}],
    ]));

    return {
        users,
        getUser(uid: string) {
            return users.value.get(uid);
        },
    };
});