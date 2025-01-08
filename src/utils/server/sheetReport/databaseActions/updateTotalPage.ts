import SheetReportRecordModel from "@/models/SheetReportRecordModel";

export default async function updateTotalPage ({pageCount, reportId}: {
    pageCount: number,
    reportId: string
}) {

    try {
        await SheetReportRecordModel.findOneAndUpdate({reportId}, {
            totalPage: pageCount
        })

        return
    } catch (err) {
        throw err;
    }
}