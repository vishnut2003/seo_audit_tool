import puppeteer, { Browser } from "puppeteer";
import puppeteer_core from "puppeteer-core";
import chromium from "@sparticuz/chromium";

export async function initializePuppeteer() {
    return new Promise<Browser>(async (resolve, reject) => {
        try {
            // Lauch puppeteer browser
            console.log("lauching browser!")

            let browser;

            if (process.env.DEVMODE !== "DEV") {
                console.log('Assigning browser for Production!')
                browser = await puppeteer_core.launch({
                    args: [...chromium.args, "--hide-scrollbars", "--disable-web-security"],
                    defaultViewport: chromium.defaultViewport,
                    executablePath: await chromium.executablePath(),
                    headless: true,
                    timeout: 0
                })
            } else {
                console.log('Assigning browser for local run!')
                browser = await puppeteer.launch({
                    timeout: 0
                })
            }

            resolve(browser as Browser);
        } catch (err) {
            console.log(err);
            reject(err);
        }
    });
}