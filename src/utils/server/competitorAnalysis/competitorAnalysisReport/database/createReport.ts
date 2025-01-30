import { dbConnect } from "@/database/DBConfig";
import CompetitorAnalysisRecordModel from "@/models/CompetitorAnalysisRecordModel";

export async function createNewCompetitorAnalysisReport ({reportId, mainSite, competitors}: {
    reportId: string,
    mainSite: string,
    competitors: string[],
}) {
    return new Promise<void>(async (resolve, reject) => {
        try {
            await dbConnect();
            await CompetitorAnalysisRecordModel.create({
                recordId: reportId,
                website: mainSite,
                competitors,
                status: "pending",
                finishedSites: [],
            })

            return resolve()
        } catch (err) {
            reject(err);
        }
    })
}