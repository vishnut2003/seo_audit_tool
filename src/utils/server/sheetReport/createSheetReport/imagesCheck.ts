import { JSDOM } from "jsdom";
import { imageFileSizeOver100KbInterface, imagesAltMissingInterface } from "../sheetReportInterfaces";

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

export async function checkImagesSizeOver100KB({ DOM, url, title }: {
    DOM: JSDOM,
    url: string,
    title: string,
}) {
    return new Promise<false | imageFileSizeOver100KbInterface[]>(async (resolve, reject) => {
        try {
            const imagesElements: HTMLCollectionOf<HTMLImageElement> = DOM.window.document.getElementsByTagName("img");
            const imageOver100Kb: imageFileSizeOver100KbInterface[] = [];

            for (const imageElement of imagesElements) {
                const imageUrl = imageElement.src;
                console.log(imageUrl);
                if (!URL.canParse(imageUrl)) {
                    console.log("image url is not valid!")
                    continue;
                }
                
                const blob = await fetch(imageUrl).then((res) => res.blob());
                const fileSize = blob.size;
                const sizeInKb = Math.round(fileSize / 1000)
                
                if (sizeInKb > 100) {
                    const response: imageFileSizeOver100KbInterface = {
                        title,
                        address: url,
                        file_size: `${sizeInKb} KB`,
                        image_url: imageUrl,
                    }

                    imageOver100Kb.push(response);
                }
            }

            if (imageOver100Kb.length > 0) {
                resolve(imageOver100Kb);
            } else {
                resolve(false);
            }

        } catch (err) {
            return reject(err);
        }
    })
}