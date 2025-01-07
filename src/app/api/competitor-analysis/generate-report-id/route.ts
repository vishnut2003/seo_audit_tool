import { generateReportId } from "@/utils/server/competitorAnalysis/generateReportId";
import { NextResponse } from "next/server";

export async function GET () {
    try {
        const reportId = await generateReportId();
        return NextResponse.json(reportId);
    } catch (err) {
        return NextResponse.json({
            error: err,
        }, {
            status: 500,
        });
    }
}