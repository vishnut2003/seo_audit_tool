import SheetReportRecordModel from "@/models/SheetReportRecordModel"

export default async function updateFinishPage ({reportId, count}: {
    reportId: string,
    count: number
}) {

    try {

        await SheetReportRecordModel.findOneAndUpdate({reportId}, {
            $inc: {
                finishPage: count
            }
        })

        return

    } catch (err) {
        throw err
    }
}