import { NextResponse } from "next/server";
import testResponse from "./testResponseJson";

export async function POST () {
    // const body = (await request.json()) as {domain: string};

    await new Promise((resolve) => setTimeout(resolve, 3000))
    return NextResponse.json(testResponse);
}