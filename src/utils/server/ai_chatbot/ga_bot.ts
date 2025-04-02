import { GenerativeModel, GoogleGenerativeAI } from "@google/generative-ai";

export async function GA_getGeminiGenerativModel() {
    return new Promise<GenerativeModel>((resolve, reject) => {
        try {
            const GEMINI_API = process.env.GEMINI_API_KEY;
            const GEMINI_MODEL = process.env.GEMINI_MODEL;

            // handle if api is not provided.
            if (!GEMINI_API || !GEMINI_MODEL) {
                return reject("Please provide GEMINI_API_KEY and GEMINI_MODEL in .env file.")
            }

            const genAi = new GoogleGenerativeAI(GEMINI_API);
            const model = genAi.getGenerativeModel({
                model: GEMINI_MODEL,
                systemInstruction: {
                    parts: [
                        {
                            text: "User will ask question from the stringify json data from Google Analytics. create response accordingly.",
                        },
                        {
                            text: "Google Analytics data is in the conversation."
                        },
                    ],
                    role: 'system',
                }
            });

            return resolve(model);
            
        } catch (err) {
            return reject(err);
        }
    })
}