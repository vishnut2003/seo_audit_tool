import axios, { AxiosError } from "axios";
import { XMLValidator, XMLParser } from "fast-xml-parser"

interface sitemapParseDataInterface {
    "?xml": string,
    "?xml-stylesheet"?: string,
    sitemapindex?: {
        sitemap: {
            loc: string,
        }[]
    },
    urlset?: {
        url: {
            loc: string,
        }[] | {
            loc: string
        }
    }
}

export async function fetchSitemap({ baseUrl }: {
    baseUrl: string,
}) {
    return new Promise<string[] | null>(async (resolve, reject) => {
        try {
            const sitemapUrl = `${baseUrl}/sitemap.xml`;
            const sitemapsList: string[] = [];
            const pagesList: string[] = [];

            const response = await axios.get(sitemapUrl);
            const sitemapData: string = response.data;

            const isXMLValid = XMLValidator.validate(sitemapData, {
                allowBooleanAttributes: true,
            })

            if (!isXMLValid) throw new Error("Sitemap data is not valid!");

            const sitemapParser = new XMLParser();
            const parsedSitemap: sitemapParseDataInterface = sitemapParser.parse(sitemapData);
            
            if (!parsedSitemap.hasOwnProperty("?xml")) {
                return resolve(null);
            }

            if (parsedSitemap.sitemapindex) {

                // if its sitmapindex push to sitemaps
                const saveSitemaps = parsedSitemap.sitemapindex.sitemap.map((sitemap) => {
                    sitemapsList.push(sitemap.loc);
                })
                await Promise.allSettled(saveSitemaps);

            } else if (parsedSitemap.urlset && Array.isArray(parsedSitemap.urlset.url)) {

                // push to pages list if its list or urls
                const savePages = parsedSitemap.urlset.url.map((url) => {
                    pagesList.push(url.loc);
                })
                await Promise.allSettled(savePages);
                return resolve(pagesList);

            }

            // loop list of sitemaps and push to pageList
            for(const sitemap of sitemapsList) {
                const response = await axios.get(sitemap);
                const parsedData: sitemapParseDataInterface = sitemapParser.parse(response.data);

                if (parsedData.urlset && Array.isArray(parsedData.urlset.url)) {
                    const savetoPagelist = parsedData.urlset.url.map((url) => {
                        pagesList.push(url.loc);
                    })
                    await Promise.allSettled(savetoPagelist);
                } else if (parsedData.urlset && !Array.isArray(parsedData.urlset.url)) {
                    pagesList.push(parsedData.urlset.url.loc);
                }
            }

            return resolve(pagesList);

        } catch (err) {
            if (err instanceof AxiosError) {
                // return axios error if sitemap not found.
                console.log(err);
                resolve(null);
            }

            console.log(err);
            reject('Something went wrong while fetching sitemap.');
        }
    })
}