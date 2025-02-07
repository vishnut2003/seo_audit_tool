import { Page } from "puppeteer";

export async function checkBlogPageExist({ page, baseUrl }: {
    page: Page,
    baseUrl: string,
}) {
    return new Promise<"PRESENT" | "NOT PRESENT">(async (resolve, reject) => {
        try {
            const possibleEndpoints: string[] = [
                "blogs", 
                "blog", 
                "news",
                "resource",
                "resources",
                "travel-blogs",
                "travel-blog",
            ];
            console.log("\nchecking if blogs page exist\n");

            for (const endpoint of possibleEndpoints) {
                console.log(`Checking page: ${baseUrl}/${endpoint}`)
                const httpResponse = await page.goto(`${baseUrl}/${endpoint}`, { timeout: 0 });
                if (httpResponse && httpResponse.ok()) {
                    return resolve("PRESENT");
                }
            }

            resolve("NOT PRESENT");

        } catch (err) {
            return reject(err);
        }
    })
}