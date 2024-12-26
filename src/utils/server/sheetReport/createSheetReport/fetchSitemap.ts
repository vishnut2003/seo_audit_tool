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
        }[]
    }
}

export async function fetchSitemap({ baseUrl }: {
    baseUrl: string,
}) {
    return new Promise<string[]>(async (resolve, reject) => {
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

            if (parsedSitemap.sitemapindex) {

                // if its sitmapindex push to sitemaps
                const saveSitemaps = parsedSitemap.sitemapindex.sitemap.map((sitemap) => {
                    sitemapsList.push(sitemap.loc);
                })
                await Promise.allSettled(saveSitemaps);

            } else if (parsedSitemap.urlset) {

                // push to pages list if its list or urls
                const savePages = parsedSitemap.urlset.url.map((url) => {
                    pagesList.push(url.loc);
                })
                await Promise.allSettled(savePages);
                return resolve(pagesList);

            }

            // loop list of sitemaps and push to pageList
            const fetchPagesFromSitemaps = sitemapsList.map(async (sitemap) => {
                const response = await axios.get(sitemap);
                const parsedData: sitemapParseDataInterface = sitemapParser.parse(response.data);

                if (parsedData.urlset) {
                    const savetoPagelist = parsedData.urlset.url.map((url) => {
                        pagesList.push(url.loc);
                    })
                    await Promise.allSettled(savetoPagelist);
                }
            })
            await Promise.allSettled(fetchPagesFromSitemaps);

            return resolve(pagesList);

        } catch (err) {
            if (err instanceof AxiosError) {
                // return axios error if sitemap not found.
                console.log(err);
                return reject("Sitemap not found!");
            }

            console.log(err);
            reject('Something went wrong while fetching sitemap.');
        }
    })
}