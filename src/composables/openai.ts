import OpenAI from 'openai';
import {useUserStore} from "../store/userStore.ts";
import {useTweetStore} from "../store/tweetStore.ts";

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
}

out
{
  answer: string; // 何をやったのか、または質問に対する返答
  commands: [ // commandは複数実行できるようになっています。例えばcurrentLocationが/ならつぶやきたい場合は/tweetに移動してからpostする必要があります
    {
        type: "move"|"favorite"|"post" // move=ページ移動, favorite=いいねする, post=つぶやく
        newLocation: string; // type=moveの時に移動したいpathを指定する
        favoriteId: string; // type=favoriteの時にいいねしたいid
        postText: string; // type=postの時につぶやきたい内容
    }
  ]
}
`

export function useOpenAi() {
    const openai = new OpenAI({
        apiKey: 'my api key',
    });

    return {
        async completion(question: string) {
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
        }
    }
}