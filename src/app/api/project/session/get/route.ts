import { getOneProject } from "@/utils/server/projects/getOneProject";
import { getServerSession } from "next-auth";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        const cookiesStore = await cookies();
        const projectId = cookiesStore.get('projectId') || null;

        const userSession = await getServerSession();

        if (!userSession?.user?.email) {
            throw new Error("Unauthorized user!");
        }

        const project = await getOneProject(projectId ? projectId.value : null, userSession.user.email);
        return NextResponse.json({ project });
    } catch (err) {
        return NextResponse.json({ error: err }, { status: 500 });
    }
}