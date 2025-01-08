import { dbConnect } from "@/database/DBConfig";
import SheetReportRecordModel from "@/models/SheetReportRecordModel";

export default async function databaseCreateSheetReport ({reportId, websiteUrl}: {
    reportId: string,
    websiteUrl: string,
}) {

    try {
        // connect to database
        await dbConnect();

        // create new sheetReport
        await SheetReportRecordModel.create({
            reportId: reportId,
            websiteUrl: websiteUrl,
            status: "processing",
        })

        return;

    } catch (err) {
        throw err;
    }
}