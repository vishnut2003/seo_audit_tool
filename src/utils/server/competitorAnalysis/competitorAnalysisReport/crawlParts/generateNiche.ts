import { getGeminiGenerativModel } from "@/utils/server/googleGeminiApi";
import { JSDOM } from "jsdom";

export async function generateNiche({ DOM }: {
    DOM: JSDOM,
}) {
    return new Promise<string>( async (resolve, reject) => {
        try {
            const MESSAGE_TEMPLATE = "iam providing the meta description of a site. read the meta description and tell me what kind of website is this in a 3 words, dont explain or anything just 3 words response. Meta Description: "
            const DEFAULT_META_DESC = "No meta description found, so just response as Niche";

            // get gemini generative model
            const model = await getGeminiGenerativModel();

            // fetch meta description content
            const metaDescElement: HTMLMetaElement | null = DOM.window.document.querySelector("head > meta[name='description']")
            const metaDescription = metaDescElement ? metaDescElement.content : DEFAULT_META_DESC;

            const result = await model.generateContent(`${MESSAGE_TEMPLATE} ${metaDescription}`);
            const responseText = result.response.text();

            return resolve(responseText.trim());

        } catch (err) {
            return reject(err);
        }
    })
}