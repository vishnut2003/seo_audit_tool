import axios from "axios"

export function createSheetReport({baseUrl}: {
    baseUrl: string,
}) {
    return new Promise<void>( async (resolve, reject) => {
        
        try {
            await axios.post('/api/sheet-report/create', {baseUrl});
            resolve();
        } catch (err) {
            console.log(err);
            reject();
        }

    })
}