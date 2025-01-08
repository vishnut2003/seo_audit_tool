import { dbConnect } from "@/database/DBConfig";
import SheetReportRecordModel from "@/models/SheetReportRecordModel";

export default function getAllSheetReport () {
    return new Promise ( async (resolve, reject) => {
        try {
            await dbConnect();
            const records = await SheetReportRecordModel.find({});
            resolve(records);
        } catch (err) {
            return reject(err);
        }
    })
}