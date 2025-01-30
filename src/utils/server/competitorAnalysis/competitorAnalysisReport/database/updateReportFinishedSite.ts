import { dbConnect } from "@/database/DBConfig";
import CompetitorAnalysisRecordModel from "@/models/CompetitorAnalysisRecordModel";

export async function updateReportFinishedSite ({
    site,
    reportId,
}: {
    site: string,
    reportId: string,
}) {
    return new Promise<void>(async (resolve, reject) => {
        try {
            await dbConnect();
            await CompetitorAnalysisRecordModel.findOneAndUpdate({
                recordId: reportId,
            }, {
                $push: {
                    finishedSites: site,
                }
            })

            return resolve()
        } catch (err) {
            reject(err);
        }
    })
}