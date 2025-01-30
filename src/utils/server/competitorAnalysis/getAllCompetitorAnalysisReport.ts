import { dbConnect } from "@/database/DBConfig";
import CompetitorAnalysisRecordModel from "@/models/CompetitorAnalysisRecordModel";

export async function getAllCompetitorAnalysisReports () {
    return new Promise(async (resolve, reject) => {
        try {
            await dbConnect()
            const reports = await CompetitorAnalysisRecordModel.find({});
            return resolve(reports);
        } catch (err) {
            return reject(err);
        }
    })
}