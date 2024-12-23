import axios from "axios"

export function createSheetReport({baseUrl}: {
    baseUrl: string,
}) {
    return new Promise( async (resolve, reject) => {
        
        try {
            const response = await axios.post('/api/sheet-report/create', {baseUrl})
            console.log(response)
        } catch (err) {
            console.log(err);
        }

    })
}