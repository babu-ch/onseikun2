import {defineStore} from "pinia";
import {ref} from "vue";

export const useUserStore = defineStore("users", () => {
    type User = {
        name: string;
        uid: string;
        profile: string;
    }
    const users = ref<Map<string, User>>(new Map([
        ["me", {uid: "me",name: "自分", profile: "自分らしさってなんだ？"}],
        ["chikuo", {uid: "chikuo",name: "ちくお", profile: "最近は山登りが趣味です。"}],
        ["mochiyama", {uid: "mochiyama",name: "もち山", profile: "転職しようか迷ってます"}],
        ["vacajirou", {uid: "vacajirou",name: "バカンスじろう", profile: "海が好きです"}],
        ["pasta_suikomu", {uid: "pasta_suikomu",name: "パスタ吸い込みマン", profile: "ラザニア作りの腕前がプロ並です"}],
    ]));

    return {
        users,
        getUser(uid: string) {
            return users.value.get(uid);
        },
    };
});