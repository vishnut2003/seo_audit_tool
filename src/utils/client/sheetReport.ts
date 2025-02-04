import { sheetReportRecordInterface } from "@/models/SheetReportRecordModel";
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

export function getAllSheetReport ({page}: {
    page: number
}) {
    return new Promise<sheetReportRecordInterface[]>( async (resolve) => {
        
        try {
            const response = await axios.get(`/api/sheet-report/get-all/${page}`);
            const records: sheetReportRecordInterface[] = response.data.records;
            resolve(records)
        } catch (err) {
            console.log(err);
        }
    })
}

// not using
export function getCurrentProcessingSheetRecord () {
    return new Promise <sheetReportRecordInterface | null> ( async (resolve) => {
        try {
            const resoponse = await axios.get('/api/sheet-report/get-current-processing')
            const record = resoponse.data as sheetReportRecordInterface | null;
            return resolve(record)
        } catch (err) {
            console.log(err);
        }
    })
}