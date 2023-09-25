import {defineStore} from "pinia";
import {ref} from "vue";

export const useTweetStore = defineStore("tweets", () => {
    type Tweet = {
        id: number;
        contents: string;
        name: string;
        isFav: boolean;
    }
    const tweets = ref<Tweet[]>([
        {id: 1,name: "ちくお", isFav: false, contents: "テレビおもろいな〜"},
        {id: 2,name: "もち山", isFav: false, contents: "もちうますぎる"},
        {id: 3,name: "バカンスじろう", isFav: false, contents: "ソーキそば食べたい"},
        {id: 4,name: "パスタ吸い込みマン", isFav: false, contents: "パスタ食べてたら一日が終わった"},
    ]);

    const inputTweet = ref("");

    return {
        tweets,
        inputTweet,
        post() {
            tweets.value.unshift({
                id: tweets.value.length + 1,
                name: "あなた",
                contents: inputTweet.value,
                isFav: false,
            });
            inputTweet.value = "";
        },
    };
});