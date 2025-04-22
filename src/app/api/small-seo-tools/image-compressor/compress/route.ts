import { NextRequest, NextResponse } from "next/server";
import sharp from 'sharp';

export async function POST (request: NextRequest) {
    try {
        const formData = await request.formData();
        const files = formData.getAll('files') as File[];
        const quality = formData.get('quality') as string;

        const parsedQuality = parseInt(quality || '70')

        const processedFiles = await Promise.all(files.map(async (file) => {
            const buffer = Buffer.from(await file.arrayBuffer());
            const output = await sharp(buffer).resize({width: 800}).jpeg({quality: parsedQuality}).toBuffer()
            return output.toString('base64')
        }))

        return NextResponse.json(processedFiles);
    } catch (err) {
        console.log(err);
        return NextResponse.error();
    }
}