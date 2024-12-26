import { titileLessThan30Interface } from "../sheetReportInterfaces";

export async function checkTitleLessThat30({ title, url }: {
    title: string,
    url: string
}) {
    return new Promise<false | titileLessThan30Interface>((resolve, reject) => {
        try {
            if (title.length < 30) {

                // create response
                const responseTemplate: titileLessThan30Interface = {
                    address: url,
                    title: title,
                    length: title.length
                }
                return resolve(responseTemplate);

            }  else {
                return resolve(false);
            }
        } catch (err) {
            return reject(err);
        }
    })
}