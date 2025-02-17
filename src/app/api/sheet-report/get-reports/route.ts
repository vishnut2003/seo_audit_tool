import { getSheetReports } from "@/utils/server/sheetReport/databaseActions/getReports";
import { NextRequest, NextResponse } from "next/server";

export interface RouteSheetReportGetReport {
    email: string,
    status: "processing" | "success" | "error",
    limit: number,
}

export async function POST(request: NextRequest) {
    try {
        const body = (await request.json()) as RouteSheetReportGetReport;
        const reports = await getSheetReports(body);
        return NextResponse.json({reports})
    } catch (err) {
        return NextResponse.json({ error: err }, { status: 500 })
    }
}