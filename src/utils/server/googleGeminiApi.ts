import { GenerativeModel, GoogleGenerativeAI } from "@google/generative-ai";

export async function getGeminiGenerativModel() {
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
            });

            return resolve(model);
            
        } catch (err) {
            return reject(err);
        }
    })
}