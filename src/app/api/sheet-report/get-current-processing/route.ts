import { getCurrentProcessingSheetRecord } from "@/utils/server/sheetReport/databaseActions/getSingleReport";
import { NextResponse } from "next/server";

export async function GET () {
    try {
        const record = await getCurrentProcessingSheetRecord();
        
        if (record) {
            return NextResponse.json(record)
        } else {
            return NextResponse.json(false);
        }
    } catch (err) {
        return NextResponse.json({error: err}, {status: 500})
    }
}