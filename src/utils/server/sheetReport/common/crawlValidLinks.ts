import { Browser } from "puppeteer";
import { generateInteractiveDoc } from "../jsDomValidate";

export async function crawlValidLinks({ browser, url }: {
    browser: Browser,
    url: string,
}) {
    return new Promise<string[]>(async (resolve, reject) => {
        try {
            const page = await browser.newPage();
            await page.goto(url, { timeout: 0 });
            const content = await page.content();

            const DOM = await generateInteractiveDoc({content});
            const anchorElements = DOM.window.document.getElementsByTagName("a");

            const validLinks: string[] = [url];

            for (const anchorElement of anchorElements) {
                if (anchorElement.href.includes(url) && anchorElement.href.length > (url.length + 3)) {
                    validLinks.push(anchorElement.href);
                }
            }
            console.log(validLinks);
            resolve(validLinks);
        } catch (err) {
            return reject(err);
        }
    })
}