import { sheetReportRecordInterface } from "@/models/SheetReportRecordModel";
import axios from "axios"

export function createSheetReport({ baseUrl }: {
    baseUrl: string,
}) {
    return new Promise<void>(async (resolve, reject) => {

        try {
            await axios.post('/api/sheet-report/create', { baseUrl });
            resolve();
        } catch (err) {
            console.log(err);
            reject();
        }

    })
}

export async function getLatestOneReport({ projectId, email }: {
    projectId: string,
    email: string,
}) {
    return new Promise<sheetReportRecordInterface | null>(async (resolve, reject) => {
        try {
            const { data } = await axios.post('/api/sheet-report/get-latest-one-report', {
                projectId,
                email,
            })
            return resolve(data);
        } catch (err) {
            return reject(err);
        }
    })
}