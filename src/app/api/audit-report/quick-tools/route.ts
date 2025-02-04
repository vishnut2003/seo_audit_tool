import { NextRequest, NextResponse } from "next/server";
import { createReport } from "@/utils/server/seoOptimerApi";

export async function POST(request: NextRequest) {
    try {
        const body = (await request.json()) as {
            domain: string,
        };

        // Create new report
        const createdReport = await createReport({ domainName: body.domain });

        // return if the created report dont have data body
        if (!createdReport.data || !createdReport.data.id) throw new Error('No data body or data.id in created report response.');

        return NextResponse.json({ reportId: createdReport.data.id });

    } catch (err) {
        return NextResponse.json({ error: err }, { status: 500 });
    }
}