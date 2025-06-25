import { getUserAvatar } from "@/utils/server/userManager/getUserAvatar";
import { NextRequest, NextResponse } from "next/server";
import path from "path";

export interface GetUserAvatarApiRequestDataInterface {
    relativeImagePath: string,
}

const mimeTypeMap: Record<string, string> = {
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.jpeg': 'image/jpeg',
    '.webp': 'image/webp',
};

export interface GetUserAvatarImageApiRouteResponseInterface {
    buffer: string | null,
    mimeType: string,
}

export async function POST(request: NextRequest) {
    try {

        const {
            relativeImagePath,
        } = await request.json() as GetUserAvatarApiRequestDataInterface;

        const imageData = await getUserAvatar({
            imageRelativePath: relativeImagePath,
        })

        const fileExtension = path.extname(relativeImagePath);

        const mimeType = mimeTypeMap[fileExtension] || 'application/octet-stream';

        const responseData: GetUserAvatarImageApiRouteResponseInterface = {
            buffer: imageData,
            mimeType,
        }

        return NextResponse.json(responseData)

    } catch (err) {
        let errMessage = "Something went wrong!";

        if (err instanceof Error) {
            errMessage = err.message;
        } else if (typeof err === "string") {
            errMessage = err;
        }

        return NextResponse.json(errMessage, { status: 500 });
    }
}