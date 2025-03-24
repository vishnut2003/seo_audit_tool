import { createSearchConsoleOAuthClient } from "@/utils/server/googleOAuth";
import { createOAuthConsentToken } from "@/utils/server/projects/googleSearchConsoleAPI/create";
import { getServerSession } from "next-auth";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);
        const code = searchParams.get('code') || "";
        const [authClient] = await createSearchConsoleOAuthClient();
        const { tokens } = await authClient.getToken(code);

        const session = await getServerSession();
        const cookieStore = await cookies();
        const projectId = cookieStore.get('projectId');

        if (!session?.user?.email) {
            throw new Error("User not found");
        } else if (!projectId) {
            throw new Error("ProjectId not found!");
        }

        await createOAuthConsentToken({
            email: session.user.email,
            projectId: projectId.value,
            token: tokens,
        });

        return NextResponse.redirect(new URL('/dashboard/google-search-console/report', request.url));

    } catch (err) {
        return NextResponse.json({
            error: err,
        }, { status: 500 });
    }
}