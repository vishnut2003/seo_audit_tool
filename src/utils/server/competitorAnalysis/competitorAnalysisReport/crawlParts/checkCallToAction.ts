import { JSDOM } from "jsdom";

export async function checkCallToAction({ DOM }: {
    DOM: JSDOM
}) {
    return new Promise <"PASSED" | "FAILED"> ((resolve, reject) => {
        try {

            // get all element of a tag
            const aTagElements: HTMLCollectionOf<HTMLAnchorElement> = DOM.window.document.getElementsByTagName("a");

            // regex for test
            const telRegex = /^tel:/;
            const mailRegex = /^mailto/;
            
            // process the elements ad check if element is call to action
            let validation: "PASSED" | "FAILED" = "FAILED";
            for (const aTagElement of aTagElements) {
                if (validation === "FAILED") {
                    validation = telRegex.test(aTagElement.href) || mailRegex.test(aTagElement.href) ? "PASSED" : "FAILED";
                }
            }

            resolve(validation);
        } catch (err) {
            return reject(err);
        }
    })
}