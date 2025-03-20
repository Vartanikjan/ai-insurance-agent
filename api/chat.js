import { Configuration, OpenAIApi } from "openai";

export default async function handler(req, res) {
    if (req.method !== "POST") {
        return res.status(405).json({ error: "Method Not Allowed" });
    }

    try {
        const { message } = req.body;

        if (!message) {
            return res.status(400).json({ error: "Message is required" });
        }

        if (!process.env.OPENAI_API_KEY) {
            return res.status(500).json({ error: "Missing OpenAI API Key in Vercel settings" });
        }

        const configuration = new Configuration({
            apiKey: process.env.OPENAI_API_KEY,
        });

        const openai = new OpenAIApi(configuration);

        const response = await openai.createChatCompletion({
            model: "gpt-4",
            messages: [
                { role: "system", content: "You are an AI Insurance Agent helping users find the best agents." },
                { role: "user", content: message }
            ],
        });

        res.status(200).json({ response: response.data.choices[0].message.content });

    } catch (error) {
        console.error("❌ OpenAI Error:", error);
        res.status(500).json({ error: `Internal Server Error: ${error.message}` });
    }
}
