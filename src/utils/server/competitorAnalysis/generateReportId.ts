import { dbConnect } from "@/database/DBConfig";
import CompetitorAnalysisRecordModel from "@/models/CompetitorAnalysisRecordModel";

export async function generateReportId () {
    return new Promise <string> ( async (resolve, reject) => {
        try {
            await dbConnect();
            const recordsCount = await CompetitorAnalysisRecordModel.countDocuments();
            const newReportId = `${1000 + recordsCount}`
            return resolve(newReportId);
        } catch (err) {
            return reject(err);
        }
    })
}