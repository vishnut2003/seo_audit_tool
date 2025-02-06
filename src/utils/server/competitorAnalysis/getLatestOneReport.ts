import { dbConnect } from "@/database/DBConfig";
import CompetitorAnalysisRecordModel, { CompetitorAnalysisRecordModelInterface } from "@/models/CompetitorAnalysisRecordModel";

export async function getLatestOneReport ({email, projectId}: {
    email: string,
    projectId: string,
}) {
    return new Promise<CompetitorAnalysisRecordModelInterface | null>(async (resolve, reject) => {
        try {
            await dbConnect();
            const report = await CompetitorAnalysisRecordModel.find({email, projectId, status: "completed"}).sort({$natural: -1}).limit(1);
            return resolve(report[0] || null);
        } catch (err) {
            return reject(err);
        }
    })
}