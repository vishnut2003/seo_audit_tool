import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    try {
        const { projectId } = await request.json() as {
            projectId: string,
        }
        const cookiesStore = await cookies();
        cookiesStore.set('projectId', projectId);

        return NextResponse.json({ success: true });
    } catch (err) {
        return NextResponse.json({ error: err }, { status: 500 });
    }
}