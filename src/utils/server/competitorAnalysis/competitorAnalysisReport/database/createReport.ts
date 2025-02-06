import { dbConnect } from "@/database/DBConfig";
import CompetitorAnalysisRecordModel from "@/models/CompetitorAnalysisRecordModel";

export async function createNewCompetitorAnalysisReport ({
    reportId, 
    mainSite, 
    competitors, 
    email, 
    projectId
}: {
    reportId: string,
    mainSite: string,
    competitors: string[],
    email?: string,
    projectId?: string,
}) {
    return new Promise<void>(async (resolve, reject) => {
        try {
            await dbConnect();
            await CompetitorAnalysisRecordModel.create({
                email,
                projectId,
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