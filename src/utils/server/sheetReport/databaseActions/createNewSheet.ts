import { dbConnect } from "@/database/DBConfig";
import SheetReportRecordModel from "@/models/SheetReportRecordModel";

export default async function databaseCreateSheetReport ({reportId, websiteUrl, projectId, email}: {
    reportId: string,
    websiteUrl: string,
    projectId?: string,
    email?: string,
}) {

    try {
        // connect to database
        await dbConnect();

        // create new sheetReport
        await SheetReportRecordModel.create({
            projectId,
            email,
            reportId: reportId,
            websiteUrl: websiteUrl,
            status: "processing",
        })

        return;

    } catch (err) {
        throw err;
    }
}