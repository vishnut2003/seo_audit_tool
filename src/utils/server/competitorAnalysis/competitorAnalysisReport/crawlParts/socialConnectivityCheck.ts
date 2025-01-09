import { JSDOM } from "jsdom";

export async function socialConnectivityCheck({ DOM }: {
    DOM: JSDOM,
}) {
    return new Promise<"PRESENT" | "NOT PRESENT">((resolve, reject) => {
        try {

            const socialPlatformDomains: string[] = [
                "facebook.com",
                "instagram.com",
                "x.com",
                "linkedin.com",
                "youtube.com",
                "pinterest.com",
                "threads.net",
                "t.me"
            ]

            // get all anchor elements
            const anchorElements: HTMLCollectionOf<HTMLAnchorElement> = DOM.window.document.getElementsByTagName("a");

            // check all anchor elements
            for (const anchorElement of anchorElements) {
                for(const socialDomain of socialPlatformDomains) {
                    if (anchorElement.href.includes(socialDomain)) {
                        return resolve("PRESENT")
                    }
                }
            }

            return resolve("NOT PRESENT")
        } catch (err) {
            return reject(err);
        }
    })
}