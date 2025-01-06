import { JSDOM } from "jsdom"
import { H1MissingInterface } from "../sheetReportInterfaces";

export async function checkH1Missing({ DOM, url, pageTitle }: {
    DOM: JSDOM,
    url: string,
    pageTitle: string,
}) {
    return new Promise<false | H1MissingInterface>((resolve, reject) => {
        try {
            const h1Element = DOM.window.document.querySelector("h1");

            if (!h1Element) {
                const response: H1MissingInterface = {
                    address: url,
                    title: pageTitle,
                }

                return resolve(response);
            } else {
                return resolve(false)
            }
        } catch (err) {
            return reject(err);
        }
    })
}