import { getAllProjects } from "@/utils/server/projects/getAllProject";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    try {
        const { email, page, searchText } = await request.json() as {
            page: number, // for pagination
            email: string,
            searchText?: string,
        }

        const projects = await getAllProjects({ email, page, searchText });
        return NextResponse.json(projects);
    } catch (err) {
        return NextResponse.json({ error: err }, { status: 500 })
    }
}