import { getReport } from "@/utils/server/seoOptimerApi";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    const body = (await request.json()) as {reportId: number};

    try {
        const report = await getReport({reportId: body.reportId});
        return NextResponse.json(report);
    } catch (err) {
        return NextResponse.json({error: err}, {status: 500});
    }
}