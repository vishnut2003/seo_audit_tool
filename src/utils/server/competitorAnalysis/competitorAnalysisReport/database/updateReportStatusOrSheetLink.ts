import { dbConnect } from "@/database/DBConfig";
import CompetitorAnalysisRecordModel from "@/models/CompetitorAnalysisRecordModel";

export async function updateReportStatus ({reportId, status}: {
    reportId: string,
    status: "processing" | "success" | "error",
}) {
    return new Promise<void>(async (resolve, reject) => {
        try {
            await dbConnect();
            await CompetitorAnalysisRecordModel.findOneAndUpdate({
                recordId: reportId,
            }, {
                status: status,
            })

            return resolve();
        } catch (err) {
            return reject(err);
        }
    })
}

export async function updateReportSheetLink ({reportId, sheetId}: {
    reportId: string,
    sheetId: string,
}) {
    return new Promise<void>(async (resolve, reject) => {
        try {
            await dbConnect();
            await CompetitorAnalysisRecordModel.findOneAndUpdate({
                recordId: reportId,
            }, {
                sheetId: sheetId
            })

            return resolve()
        } catch (err) {
            return reject(err);
        }
    })
}