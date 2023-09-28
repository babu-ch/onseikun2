import {defineStore} from "pinia";
import {ref} from "vue";

export const useTweetStore = defineStore("tweets", () => {
    type Tweet = {
        id: number;
        contents: string;
        name: string;
        isFav: boolean;
        uid: string;
    }
    const tweets = ref<Tweet[]>([
        {id: 1,uid:"chikuo",name: "ちくお", isFav: false, contents: "テレビおもろいな〜"},
        {id: 2,uid:"mochiyama",name: "もち山", isFav: false, contents: "もちうますぎる"},
        {id: 3,uid:"vacajirou",name: "バカンスじろう", isFav: false, contents: "ソーキそば食べたい"},
        {id: 4,uid:"pasta_suikomu",name: "パスタ吸い込みマン", isFav: false, contents: "パスタ食べてたら一日が終わった"},
    ])

    const inputTweet = ref("")

    return {
        tweets,
        inputTweet,
        post(text:string|null=null) {
            if (typeof text === "string") {
                inputTweet.value = text
            }
            tweets.value.unshift({
                id: tweets.value.length + 1,
                name: "あなた",
                contents: inputTweet.value,
                isFav: false,
                uid: "me"
            });
            inputTweet.value = ""
        },
        toggleFavorite(id: number) {
            const tweet = tweets.value.find(tweet => tweet.id === id)
            if (!tweet) {
                return
            }
            tweet.isFav = !tweet.isFav
        },
    };
});