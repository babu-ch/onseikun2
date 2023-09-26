import OpenAI from 'openai';


export function useOpenAi() {
    const openai = new OpenAI({
        apiKey: 'my api key',
    });

    return {
        async completion(question: string) {
            const chatCompletion = await openai.chat.completions.create({
                messages: [
                    { role: "system", content: "" },
                    { role: "user", content: question }
                ],
                model: 'gpt-3.5-turbo',
                stream: false,
            })
            console.log(chatCompletion.choices)
        }
    }
}