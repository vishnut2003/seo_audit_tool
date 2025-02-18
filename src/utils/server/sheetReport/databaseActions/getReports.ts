import { RouteSheetReportGetReport } from "@/app/api/sheet-report/get-reports/route";
import SheetReportRecordModel, { sheetReportRecordInterface } from "@/models/SheetReportRecordModel";

export async function getSheetReports({ email, status, limit }: RouteSheetReportGetReport) {
    return new Promise<sheetReportRecordInterface[]>(async (resolve, reject) => {
        try {
            const reports = await SheetReportRecordModel.find({
                email, 
                status: status || {
                    $in: [
                        "processing",
                        "success",
                        "error",
                    ]
                }
            }, null, { limit, sort: { $natural: -1 } });
            return resolve(reports)
        } catch (err) {
            return reject(err);
        }
    })
}