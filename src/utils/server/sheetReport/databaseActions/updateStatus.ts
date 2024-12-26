import SheetReportRecordModel from "@/models/SheetReportRecordModel";

export default async function updateStatus ({status, reportId}: {
    status: "processing" | "success" | "error",
    reportId: string,
}) {

    try {
        await SheetReportRecordModel.findOneAndUpdate({reportId}, {status});
    } catch (err) {
        throw err;
    }
}