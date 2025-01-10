import { Page } from "puppeteer";

export async function robotTxtCheck ({page, baseUrl}: {
    page: Page,
    baseUrl: string,
}) {
    return new Promise<"PRESENT" | "NOT PRESENT">( async (resolve, reject) => {
        try {
            const robotTxtFileUrl = `${baseUrl}/robots.txt`;

            // check if page exist
            const httpResponse = await page.goto(robotTxtFileUrl);
            if (httpResponse && httpResponse.status() >= 200 && httpResponse.status() < 300) {
                return resolve("PRESENT");
            } else {
                return resolve("NOT PRESENT");
            }
        } catch (err) {
            return reject(err);
        }
    })
}