import { getLatestOneReport } from "@/utils/server/competitorAnalysis/getLatestOneReport";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    try {
        const { projectId, email } = await request.json() as {
            email: string,
            projectId: string,
        }

        const report = await getLatestOneReport({
            projectId,
            email,
        });

        return NextResponse.json(report);
    } catch (err) {
        return NextResponse.json({ error: err }, { status: 500 });
    }
}