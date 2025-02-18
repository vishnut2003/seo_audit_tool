import { RouteCompetitorGetReport } from "@/app/api/competitor-analysis/get-report/route";
import CompetitorAnalysisRecordModel, { CompetitorAnalysisRecordModelInterface } from "@/models/CompetitorAnalysisRecordModel";

export async function getCompetitorReports({ email, status, limit }: RouteCompetitorGetReport) {
    return new Promise<CompetitorAnalysisRecordModelInterface[]>(async (resolve, reject) => {
        try {
            const reports = await CompetitorAnalysisRecordModel.find({
                email, 
                status: status || {
                    $in: [
                        "processing",
                        "success",
                        "error",
                    ]
                }
            }, null, { limit, sort: { $natural: -1 } });
            return resolve(reports);
        } catch (err) {
            return reject(err);
        }
    })
}