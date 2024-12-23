import { createSheetReport } from "@/utils/server/sheetReport/sheetReport";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    const body = await request.json() as {
        baseUrl: string
    }

    try {
        await createSheetReport({ baseUrl: body.baseUrl });
        return NextResponse.json({ success: true });
    } catch (err) {
        console.log(err);
        return NextResponse.json({ error: err }, { status: 500 });
    }
}