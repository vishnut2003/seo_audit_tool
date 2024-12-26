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
    return new Promise<sheetReportRecordInterface[]>( async (resolve, reject) => {
        
        try {
            const response = await axios.get(`/api/sheet-report/get-all/${page}`);
            const records: sheetReportRecordInterface[] = response.data.records;
            resolve(records)
        } catch (err) {
            console.log(err);
        }
    })
}