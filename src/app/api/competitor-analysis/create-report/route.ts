import { CompetiotrAnalysisFormSubmitInterface } from "@/Interfaces/CompetitorAnalysisInterface/FormSubmitInterface";
import { competitorAnalysisReport } from "@/utils/server/competitorAnalysis/competitorAnalysisReport/competitorAnalysisReport";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    try {
        const body = await request.json() as CompetiotrAnalysisFormSubmitInterface;
        
        // create report
        await competitorAnalysisReport(body);

        return NextResponse.json({ success: true })
    } catch (err) {
        console.log(err)
        return NextResponse.json({
            error: err,
        }, { status: 500 })
    }
}