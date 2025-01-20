import { dbConnect } from "@/database/DBConfig";
import CompetitorAnalysisRecordModel, { CompetitorAnalysisRecordModelInterface } from "@/models/CompetitorAnalysisRecordModel";

export async function getReportById ({reportId}: {
    reportId: string,
}) {
    return new Promise<CompetitorAnalysisRecordModelInterface | null>(async (resolve, reject) => {
        try {
            await dbConnect();
            const report = await CompetitorAnalysisRecordModel.findOne({
                recordId: reportId,
            })

            return resolve(report);
        } catch (err) {
            reject(err);
        }
    })
}