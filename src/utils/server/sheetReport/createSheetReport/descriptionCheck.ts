import { JSDOM } from "jsdom"
import { metaDescBelow70Interface, metaDescOver155Interface } from "../sheetReportInterfaces";

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
                resolve(response);
            } else {
                resolve(false);
            }
        } catch (err) {
            return reject(err);
        }
    })
}

export async function validateDescOver155({ DOM, url }: {
    DOM: JSDOM,
    url: string,
}) {
    return new Promise<false | metaDescOver155Interface>((resolve, reject) => {
        try {
            const metaDesc: HTMLMetaElement | null = DOM.window.document.querySelector("head > meta[name='description']")

            if (metaDesc && metaDesc.content.length > 155) {
                const length: number = metaDesc.content.length;
                const description: string = metaDesc.content;
                const response: metaDescOver155Interface = {
                    address: url,
                    description,
                    length
                }
                console.log(response);
                resolve(response);
            } else {
                console.log(metaDesc?.content);
                resolve(false);
            }
        } catch (err) {
            return reject(err);
        }
    })
}