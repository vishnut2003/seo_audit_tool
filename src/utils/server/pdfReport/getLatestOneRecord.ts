import { dbConnect } from "@/database/DBConfig";
import ReportRecordModel, { createReportMDocInterface } from "@/models/ReportRecordModel";

export async function getLatestOneRecord(projectId: string) {
    return new Promise<createReportMDocInterface | null>(async (resolve, reject) => {
        try {
            await dbConnect();
            const report = await ReportRecordModel.find({projectId}).sort({$natural: -1}).limit(1);
            return resolve(report[0]);
        } catch (err) {
            return reject(err);
        }
    })
}