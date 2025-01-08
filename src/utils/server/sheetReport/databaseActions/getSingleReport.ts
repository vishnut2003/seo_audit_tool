import SheetReportRecordModel, { sheetReportRecordInterface } from "@/models/SheetReportRecordModel";

export async function getCurrentProcessingSheetRecord () {
    return new Promise<sheetReportRecordInterface | null>( async (resolve, reject) => {
        try {
            const record = await SheetReportRecordModel.findOne({
                status: "processing",
            });

            return resolve(record);
        } catch (err) {
            return reject(err);
        }
    })
}