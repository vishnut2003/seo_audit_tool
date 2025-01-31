import { getOneProject } from "@/utils/server/projects/getOneProject";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        const cookiesStore = await cookies();
        const projectId = cookiesStore.get('projectId') || null;
        const project = await getOneProject(projectId ? projectId.value : null)
        return NextResponse.json({ project });
    } catch (err) {
        return NextResponse.json({ error: err }, { status: 500 });
    }
}