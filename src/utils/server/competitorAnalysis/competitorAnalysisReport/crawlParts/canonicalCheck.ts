import { JSDOM } from "jsdom"
import { Page } from "puppeteer";

export async function checkMainDomainCanonical({ DOM, page, url }: {
    DOM: JSDOM,
    page: Page,
    url: string,
}) {
    return new Promise<"PRESENT" | "NOT PRESENT">(async (resolve, reject) => {
        try {
            // fetch current page url
            await page.goto(url, { timeout: 0 })
            const currentUrl = page.url();

            // fetch canonical url
            const linkElement: HTMLLinkElement | null = DOM.window.document.querySelector("head > link[rel='canonical']");
            const canonicalUrl: string = linkElement ? linkElement.href : "";

            // check if canonical issue exist
            if (currentUrl === canonicalUrl) {
                return resolve("NOT PRESENT");
            } else {
                return resolve("PRESENT");
            }

        } catch (err) {
            return reject(err);
        }
    })
}