import { createAnalyticsOAuthClient } from "@/utils/server/googleOAuth";
import { createOAuthConsentToken } from "@/utils/server/projects/analyticsAPI/google/create";
import { getServerSession } from "next-auth";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);
        const code = searchParams.get('code') || "";
        const [authClient] = await createAnalyticsOAuthClient();
        const { tokens } = await authClient.getToken(code);
        
        const session = await getServerSession();

        if (!session?.user?.email) {
            throw new Error("User not found!");
        }

        const cookieStore = await cookies();
        const projectId = cookieStore.get('projectId');

        if (!projectId) {
            throw new Error("ProjectId not found!");
        }

        await createOAuthConsentToken({
            token: tokens,
            email: session.user.email,
            projectId: projectId.value,
        })

        return NextResponse.redirect(new URL('/dashboard/analytics-report', request.url));
    } catch (err) {
        return NextResponse.json(err, { status: 500 })
    }
}