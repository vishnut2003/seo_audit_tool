import { JSDOM } from "jsdom";
import { imagesAltMissingInterface } from "../sheetReportInterfaces";

export async function checkImagesAlt({ DOM, url, title }: {
    DOM: JSDOM,
    url: string,
    title: string,
}) {
    return new Promise<false | imagesAltMissingInterface[]>((resolve, reject) => {
        try {
            const imagesElements: HTMLCollectionOf<HTMLImageElement> = DOM.window.document.getElementsByTagName('img');
            const altMissingList: imagesAltMissingInterface[] = [];

            // Loop all images for logic
            for (const imageElement of imagesElements) {
                const altText: string = imageElement.alt || '';
                const altLength: number = altText.length;

                if (altLength === 0) {
                    const altMissing: imagesAltMissingInterface = {
                        title,
                        address: url,
                        image_url: imageElement.src,
                    }
                    altMissingList.push(altMissing);
                }
            }

            if (altMissingList.length > 0) {
                return resolve(altMissingList);
            } else {
                return resolve(false)
            }

        } catch (err) {
            return reject(err);
        }
    })
}