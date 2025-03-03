import { GoogleSearchConsoleApiFormDataInterface } from "@/app/dashboard/google-search-console/SearchConsoleApiKey";
import { createGoogleSearchConsoleCredentials } from "@/utils/server/projects/googleSearchConsoleAPI/create";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    try {
        const body: GoogleSearchConsoleApiFormDataInterface = await request.json();

        await createGoogleSearchConsoleCredentials(body);

        return NextResponse.json({ success: true });

    } catch (err) {
        return NextResponse.json({ error: err }, { status: 500 })
    }
}