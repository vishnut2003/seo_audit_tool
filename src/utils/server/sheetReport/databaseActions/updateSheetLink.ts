import SheetReportRecordModel from "@/models/SheetReportRecordModel";

export default function updateSheetLink ({sheetId, reportId}: {
    sheetId: string,
    reportId: string,
}) {
    return new Promise<void>( async (resolve, reject) => {
        try {
            await SheetReportRecordModel.findOneAndUpdate({reportId}, {sheetLink: `https://docs.google.com/spreadsheets/d/${sheetId}`});
            resolve()
        } catch (err) {
            return reject(err);
        }
    })
}