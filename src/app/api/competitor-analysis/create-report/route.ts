import { CompetiotrAnalysisFormSubmitInterface } from "@/Interfaces/CompetitorAnalysisInterface/FormSubmitInterface";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    try {
        const body = await request.json() as CompetiotrAnalysisFormSubmitInterface;
        console.log(body);

        return NextResponse.json({ success: true })
    } catch (err) {
        console.log(err)
        return NextResponse.json({
            error: err,
        }, { status: 500 })
    }
}