import getAllSheetReport from "@/utils/server/sheetReport/databaseActions/getAllSheetReport";
import { NextResponse } from "next/server";

export async function GET () {
    
    try {
        const records =  await getAllSheetReport();
        return NextResponse.json({records});
    } catch (err) {
        return NextResponse.json({
            error: err
        })
    }
}