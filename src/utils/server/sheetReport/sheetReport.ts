import axios from "axios";
import { fetchSitemap } from "./createSheetReport/fetchSitemap"
import { checkTitleLessThat30 } from "./createSheetReport/titleChecks";

export async function createSheetReport({ baseUrl }: {
    baseUrl: string
}) {
    return new Promise(async (resolve, reject) => {
        try {
            // fetch sitemap for the site using base url
            const pagesList: string[] = await fetchSitemap({ baseUrl });
            const response = await axios.get(pagesList[0]);
            const pageContent: string = response.data
            await checkTitleLessThat30({pageContent})
        } catch (err) {
            reject(err)
        }
    })
}