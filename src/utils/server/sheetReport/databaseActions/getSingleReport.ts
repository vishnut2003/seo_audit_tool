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