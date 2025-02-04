import databaseCreateSheetReport from "@/utils/server/sheetReport/databaseActions/createNewSheet";
import updateSheetLink from "@/utils/server/sheetReport/databaseActions/updateSheetLink";
import { createNewSpreadSheet } from "@/utils/server/sheetReport/googleSheet/createNewSheet";
import { createSheetReport } from "@/utils/server/sheetReport/sheetReport";
import { NextRequest, NextResponse } from "next/server";
import {v4 as uuid} from "uuid";

export async function POST(request: NextRequest) {
    const body = await request.json() as {
        baseUrl: string,
        reportId: string,
    }

    try {
        const reportId = body.reportId || uuid();

        // check if the base url is in the form of domain or url
        const domainRegex = /^[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}$/;
        if (domainRegex.test(body.baseUrl)) {
            body.baseUrl = "https://" + body.baseUrl
        }

        // create new report in database
        await databaseCreateSheetReport({reportId, websiteUrl: body.baseUrl});

        // create sheet
        const report = await createSheetReport({ baseUrl: body.baseUrl, reportId });

        const sheetId = await createNewSpreadSheet({
            websiteUrl: body.baseUrl,
            report
        })

        await updateSheetLink({reportId, sheetId})
        return NextResponse.json({ sheetId });
    } catch (err) {
        console.log(err);
        return NextResponse.json({ error: err }, { status: 500 });
    }
}