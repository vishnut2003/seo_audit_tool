import { fetchSitemap } from "./createSheetReport/fetchSitemap"

export async function createSheetReport({ baseUrl }: {
    baseUrl: string
}) {
    return new Promise(async (resolve, reject) => {
        try {
            // fetch sitemap for the site using base url
            const pagesList: string[] = await fetchSitemap({ baseUrl });
            console.log(pagesList);
        } catch (err) {
            reject(err)
        }
    })
}