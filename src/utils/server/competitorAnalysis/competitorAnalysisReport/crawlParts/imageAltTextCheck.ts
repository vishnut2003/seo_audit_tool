import { JSDOM } from "jsdom";

export async function checkImageAltText({ DOM }: {
    DOM: JSDOM,
}) {
    return new Promise<"PRESENT" | "NOT PRESENT">((resolve, reject) => {
        try {
            // fetch all image tags from homepage
            const imageElements: HTMLCollectionOf<HTMLImageElement> = DOM.window.document.getElementsByTagName("img");

            // process all image elemnts to check alt text exist
            for (const imageElement of imageElements) {
                if (!imageElement.alt) {
                    return resolve("NOT PRESENT");
                }
            }

            return resolve("PRESENT")

        } catch (err) {
            return reject(err);
        }
    })
}