import { getAllCompetitorAnalysisReports } from "@/utils/server/competitorAnalysis/getAllCompetitorAnalysisReport";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        const reports = await getAllCompetitorAnalysisReports();
        return NextResponse.json({ reports })
    } catch (err) {
        return NextResponse.json({ error: err }, { status: 500 });
    }
}