import { getGeminiGenerativModel } from "@/utils/server/googleGeminiApi";
import { JSDOM } from "jsdom";

export async function chooseSiteCategory({ DOM }: {
    DOM: JSDOM,
}) {
    return new Promise<string>( async (resolve, reject) => {
        try {
            const MESSAGE_TEMPLATE = "regarding the meta description i am going to provide, can you choose any one option. if the website if offering any kind of services then you should choose Lead Generation or if its about product selling then choose Selling Online or if the site is about providing knowledge then choose Informative. don't explain, just choose the option and send the text only as response. Meta description:"
            const DEFAULT_META_DESC = "No meta description found, so just response as Lead Generation";

            // get meta description
            const metaDescElement: HTMLMetaElement | null = DOM.window.document.querySelector("head > meta[name='description']");
            const metaDescription: string = metaDescElement ? metaDescElement.content : DEFAULT_META_DESC;

            // get gemini model
            const model = await getGeminiGenerativModel();
            const result = await model.generateContent(`${MESSAGE_TEMPLATE} ${metaDescription}`);

            const responseText = result.response.text();

            resolve(responseText.trim())

        } catch (err) {
            return reject(err);
        }
    })
}