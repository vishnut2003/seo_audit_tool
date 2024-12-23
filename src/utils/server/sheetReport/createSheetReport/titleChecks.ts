import { JSDOM } from "jsdom"

export async function checkTitleLessThat30({ pageContent }: {
    pageContent: string,
}) {
    return new Promise((resolve, reject) => {
        try {
            const dom = new JSDOM(pageContent);
            const titleText = dom.window.document.querySelector("title")?.textContent;
            console.log(titleText);
        } catch (err) {
            return reject(err);
        }
    })
}