import { getCompetitorReports } from "@/utils/server/competitorAnalysis/getReports";
import { NextRequest, NextResponse } from "next/server";

export interface RouteCompetitorGetReport {
    email: string,
    status: "processing" | "success" | "error" | null,
    limit: number,
}

export async function POST (request: NextRequest) {
    try {
        const body = (await request.json()) as RouteCompetitorGetReport;
        const reports = await getCompetitorReports(body);
        return NextResponse.json({reports});
    } catch (err) {
        return NextResponse.json({error: err}, {
            status: 500,
        })
    }
}