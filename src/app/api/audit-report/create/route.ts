import { NextRequest, NextResponse } from "next/server";
import testResponse from "./testResponseJson";

export async function POST (request: NextRequest) {
    const body = (await request.json()) as {domain: string};

    return NextResponse.json(testResponse);
}