import { NewProjectFormData } from "@/app/dashboard/projects/add-new/handleSubmit";
import { createProject } from "@/utils/server/projects/createProject";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    try {
        const { email, formData } = await request.json() as {
            formData: NewProjectFormData,
            email: string,
        }

        // Create project
        await createProject({ email, formData })

        return NextResponse.json({ success: true });
    } catch (err) {
        if (err && typeof err === "object" && 'message' in err && 'status' in err && typeof err.message === "string" && typeof err.status === "number") {
            return NextResponse.json({
                message: err.message,
            }, {
                status: err.status,
            })
        } else {
            console.log(err);
            return NextResponse.json({
                message: "Something went wrong!"
            }, { status: 500 })
        }
    }
}