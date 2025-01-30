import { JSDOM } from "jsdom";

export async function checkStructureDataError({ DOM }: {
    DOM: JSDOM,
}) {
    return new Promise<"PRESENT" | "NOT PRESENT">( async (resolve, reject) => {
        try {
            const scripts: NodeListOf<HTMLScriptElement> = DOM.window.document.querySelectorAll("script[type='application/ld+json']");
            for (const scriptElement of scripts) {
                const passed = await validateJson({data: scriptElement.textContent || ""})
                if (!passed) {
                    return resolve("PRESENT");
                }
            }

            return resolve("NOT PRESENT")
        } catch (err) {
            return reject(err);
        }
    })
}

function validateJson ({data}: {data: string}) {
    return new Promise<boolean>((resolve) => {
        try {
            JSON.parse(data);
            return resolve(true)
        } catch (err) {
            console.log("Error from JSON parse.", err);
            return resolve(false);
        }
    })
}