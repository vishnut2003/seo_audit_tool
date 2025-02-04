import SheetReportRecordModel from "@/models/SheetReportRecordModel";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        const reportsCount = await SheetReportRecordModel.countDocuments();
        const reportId = `${reportsCount + 1000}`;
        return NextResponse.json({ reportId });
    } catch (err) {
        return NextResponse.json({
            error: err,
        }, {
            status: 500,
        })
    }
}