import { titileAbove60Interface, titileLessThan30Interface } from "../sheetReportInterfaces";

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

            } else {
                return resolve(false);
            }
        } catch (err) {
            return reject(err);
        }
    })
}

export async function checkTitleAbove60({ title, url }: {
    title: string,
    url: string,
}) {
    return new Promise<false | titileAbove60Interface>((resolve, reject) => {
        try {
            if (title.length > 60) {

                // create response
                const responseTemplate: titileAbove60Interface = {
                    address: url,
                    title: title,
                    length: title.length
                }
                return resolve(responseTemplate);

            } else {
                return resolve(false);
            }
        } catch (err) {
            return reject(err);
        }
    })
}