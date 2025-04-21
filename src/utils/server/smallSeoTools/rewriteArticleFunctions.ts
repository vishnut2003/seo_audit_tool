import { getGeminiGenerativModel } from "../googleGeminiApi";

export async function rewriteArticle ({
    content,
}: {
    content: string,
}) {
    return new Promise<string>(async (resolve, reject) => {
        try {
            const model = await getGeminiGenerativModel();
            const modelResponse = await model.generateContent(`Rewrite this article in a different way while preserving meaning:\n\n"${content}"`);
            const textResponse = modelResponse.response.text();
            return resolve(textResponse);
        } catch (err) {
            return reject(err);
        }
    })
}