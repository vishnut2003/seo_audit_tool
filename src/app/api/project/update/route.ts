import { ProjectUpdatingDatas, updateOneProjectByProjectId } from "@/utils/server/projects/updateOneProject";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export interface UpdateProjectByProjectIdApiRequestDataInterface extends ProjectUpdatingDatas {
    projectId: string,
}

export async function POST(request: NextRequest) {
    try {

        const {projectId, ...updateData} = await request.json() as UpdateProjectByProjectIdApiRequestDataInterface;
        const userSession = await getServerSession();

        if (!userSession?.user?.email) {
            throw new Error("User unauthorized!");
        }

        await updateOneProjectByProjectId({
            updateData,
            email: userSession.user.email,
            projectId,
        })

        return NextResponse.json(true);

    } catch (err) {
        let errorMessage = "Something went wrong!";

        if (err instanceof Error) {
            errorMessage = err.message;
        } else if (typeof err === "string") {
            errorMessage = err;
        }

        return NextResponse.json(errorMessage, { status: 500 });
    }
}