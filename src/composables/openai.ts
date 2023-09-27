import OpenAI from 'openai';
import {useUserStore} from "../store/userStore.ts";
import {useTweetStore} from "../store/tweetStore.ts";
import {ref, watch} from "vue";
import {useRoute} from "vue-router";
import {TCommand} from "./commandHandler.ts";

const prompt = `
あなたはwebサイトのアシスタントです

このサイトには以下のページがあります
[
  {path: "/"}, // ホーム、最初のページ
  {path: "/tweet"}, // つぶやき一覧ページ つぶやきを見たり、つぶやいたり、いいねしたりできる
  {path: "/profile/:uid"}, // ユーザのプロフィールページ
]

このサイトでできる行動
・/tweet
つぶやいたり、いいねしたりできる
つぶやきを投稿する行為は「ポストする」「つぶやく」「投稿する」と言われる

・/profile/:uid
ユーザのプロフィールがみれる

・/
特に面白くないトップページ

以下のようなinとoutを定義するのでそれに従ってjsonでレスポンスを生成してください

in
{
  uid: string; // ユーザのuid
  question: string; // ユーザの質問
  currentLocation: string; // 現在のpath
  users: object[]; // ユーザ情報
  tweets: object[]; // つぶやき情報
  routeHistories: string[]; // 過去のlocationの履歴 最新はcurrentLocationと同じ
}

out
{
  answer: string; // 何をやったのか、または質問に対する返答
  // commandは複数実行できるようになっています。
  // 例えばcurrentLocationが/ならつぶやきたい場合は/tweetに移動してからpostする必要があります
  // commandは必ずしも毎回返す必要はありません。例えば雑談だったらcommandsは空配列です
  commands: [ 
    {
        type: "move"|"favorite"|"post" // move=ページ移動, favorite=いいねする or いいねを解除する, post=つぶやく
        newLocation: string; // type=moveの時に移動したいpathを指定する
        favoriteId: string; // type=favoriteの時にいいね、またはいいね解除したいid
        postText: string; // type=postの時につぶやきたい内容
    }
  ]
}
`

type TAnswer = {
    answer: string;
    commands: TCommand[];
}

export function useOpenAi() {
    // WARNING!
    // サンプルなのでフロントからOpenAIのAPIを叩いていますが、実際にこのようなものを作る時はAI部分はbackendで実装してください
    const openai = new OpenAI({
        apiKey: import.meta.env.VITE_OPENAI_API_KEY,
        dangerouslyAllowBrowser: true,
    })

    const routeHistories = ref<string[]>([])
    const route = useRoute()
    watch(() => route.path, () => {
        routeHistories.value.unshift(location.pathname)
    });

    return {
        async getAnswer(question: string) {
            const chatCompletion = await openai.chat.completions.create({
                messages: [
                    { role: "system", content: prompt },
                    { role: "user", content: JSON.stringify({
                            uid: "me",
                            question,
                            currentLocation: location.pathname,
                            users: useUserStore().users,
                            tweets: useTweetStore().tweets,
                        }) }
                ],
                model: 'gpt-3.5-turbo',
                stream: false,
            })
            console.log(chatCompletion.choices)
            const content = chatCompletion.choices[0].message.content as string
            if (!content) {
                return
            }
            return JSON.parse(content) as TAnswer
        }
    }
}