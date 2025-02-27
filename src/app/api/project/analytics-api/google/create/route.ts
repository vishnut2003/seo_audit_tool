import { GoogleAnalyticsFormSubmitInterface } from "@/app/dashboard/analytics-report/AnalyticsApiKey";
import { createGoogleAnalyticsCredentials } from "@/utils/server/projects/analyticsAPI/google/create";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    try {
        const body = await request.json() as GoogleAnalyticsFormSubmitInterface;
        
        await createGoogleAnalyticsCredentials(body);

        return NextResponse.json({ success: true });
    } catch (err) {
        return NextResponse.json({ error: err }, { status: 500 });
    }
}