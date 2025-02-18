import { JSDOM } from "jsdom";
import { HTTPResponse } from "puppeteer-core";
import { sheetReportTotalPages } from "../sheetReportInterfaces";

export async function getPagesDetails({ url, DOM, title, httpResponse }: {
    url: string,
    DOM: JSDOM,
    title: string,
    httpResponse: HTTPResponse,
}) {
    return new Promise<sheetReportTotalPages>(async (resolve, reject) => {
        try {

            const responseTemplate: sheetReportTotalPages = {
                address: url,
                title,
                description: "",
                status: httpResponse.status(),
            };

            const metaElement: HTMLMetaElement | null = DOM.window.document.querySelector("head > meta[name='description']");
            responseTemplate.description = !metaElement ? "" : metaElement.content;

            return resolve(responseTemplate);
        } catch (err) {
            return reject(err)
        }
    })
}