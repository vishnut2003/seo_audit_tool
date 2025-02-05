import { dbConnect } from "@/database/DBConfig";
import SheetReportRecordModel, { sheetReportRecordInterface } from "@/models/SheetReportRecordModel";

export async function getCurrentProcessingSheetRecord({ reportId }: {
    reportId: string,
}) {
    return new Promise<sheetReportRecordInterface | null>(async (resolve, reject) => {
        try {
            await dbConnect();
            const record = await SheetReportRecordModel.findOne({ reportId });

            return resolve(record);
        } catch (err) {
            return reject(err);
        }
    })
}

export async function getLatestOneReport ({projectId, email}: {
    projectId: string,
    email: string,
}) {
    return new Promise<sheetReportRecordInterface | null>(async (resolve, reject) => {
        try {
            await dbConnect();
            const record = await SheetReportRecordModel.find({projectId, email, status: "success"}).sort({$natural: -1}).limit(1);
            return resolve(record[0] || null)
        } catch (err) {
            return reject(err);
        }
    })
}