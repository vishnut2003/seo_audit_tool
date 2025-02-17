import { CompetiotrAnalysisFormSubmitInterface } from "@/Interfaces/CompetitorAnalysisInterface/FormSubmitInterface";
import { competitorAnalysisReport } from "@/utils/server/competitorAnalysis/competitorAnalysisReport/competitorAnalysisReport";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    try {
        const body = await request.json() as CompetiotrAnalysisFormSubmitInterface;

        // check if the urls are in the form domain
        const domainRegex = /^[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}$/;
        if (domainRegex.test(body.website)) {
            body.website = "https://" + body.website;
        }

        // check for competitors also
        for (const [index, competitor] of body.competitor.entries()) {
            if (domainRegex.test(competitor)) {
                body.competitor[index] = "https://" + body.competitor[index];
            }
        }
        
        // create report
        competitorAnalysisReport(body)
            .catch((err) => {
                console.log(err);
                console.log("Competitor analysis failed!");
            });

        return NextResponse.json({ success: true })
    } catch (err) {
        console.log(err)
        return NextResponse.json({
            error: err,
        }, { status: 500 })
    }
}