import { deleteGoogleSearchConsoleAuth } from "@/utils/server/projects/googleSearchConsoleAPI/delete";
import { NextRequest, NextResponse } from "next/server";

export interface SearchConsoleDeleteRequestDataInterface {
    projectId: string,
    email: string,
};

export async function POST(request: NextRequest) {
    try {
        const {
            email,
            projectId,
        } = (await request.json()) as SearchConsoleDeleteRequestDataInterface;

        if (!email || !projectId) {
            throw new Error("Email and Project Id is required!");
        }

        await deleteGoogleSearchConsoleAuth({
            email,
            projectId,
        });

        return NextResponse.json({success: true});
    } catch (err) {
        return NextResponse.json({ err }, { status: 500 });
    }
}