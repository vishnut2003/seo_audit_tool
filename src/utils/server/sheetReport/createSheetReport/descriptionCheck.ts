import { JSDOM } from "jsdom"
import { metaDescBelow70Interface } from "../sheetReportInterfaces";

export async function validateDescBelow70({ DOM, url }: {
    DOM: JSDOM,
    url: string,
}) {
    return new Promise<false | metaDescBelow70Interface>((resolve, reject) => {
        try {
            const metaDesc: HTMLMetaElement | null = DOM.window.document.querySelector("head > meta[name='description']")

            if (!metaDesc || metaDesc.content.length < 70) {
                const length: number = metaDesc ? metaDesc.content.length : 0;
                const description: string = metaDesc ? metaDesc.content : '';
                const response: metaDescBelow70Interface = {
                    address: url,
                    description,
                    length
                }
                console.log(response);
                resolve(response);
            } else {
                resolve(false);
            }
        } catch (err) {
            return reject(err);
        }
    })
}