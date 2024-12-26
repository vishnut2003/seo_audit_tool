import { dbConnect } from "@/database/DBConfig";
import SheetReportRecordModel from "@/models/SheetReportRecordModel";

export default async function databaseCreateSheetReport ({reportId}: {
    reportId: String,
}) {

    try {
        // connect to database
        await dbConnect();

        // create new sheetReport
        await SheetReportRecordModel.create({
            reportId: reportId,
            status: "processing",
        })

        return;

    } catch (err) {
        throw err;
    }
}