import { getLatestOneRecord } from "@/utils/server/pdfReport/getLatestOneRecord";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    try {
        const { projectId } = await request.json() as {
            projectId: string,
        }

        const pdfReport = await getLatestOneRecord(projectId)
        return NextResponse.json({
            report: pdfReport,
        });
    } catch (err) {
        console.log(err);
        return NextResponse.json({
            error: err,
        }, { status: 500 });
    }
}