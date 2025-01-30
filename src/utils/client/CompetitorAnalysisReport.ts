import { CompetiotrAnalysisFormSubmitInterface } from "@/Interfaces/CompetitorAnalysisInterface/FormSubmitInterface";
import { CompetitorAnalysisRecordModelInterface } from "@/models/CompetitorAnalysisRecordModel";
import axios from "axios";

export async function createCompetitorAnalysisReport ({formData}: {
    formData: CompetiotrAnalysisFormSubmitInterface
}) {
    return new Promise ( async () => {
        try {
            const response = await axios.post('/api/competitor-analysis/create-report', formData);
            console.log(response);
        } catch (err) {
            console.log(err);
        }
    })
}

export async function getAllCompetitorAnalysisReports () {
    return new Promise<CompetitorAnalysisRecordModelInterface[]>(async (resolve) => {
        try {
            const response = await axios.get("/api/competitor-analysis/get-all-reports");
            const data = response.data as {
                reports: CompetitorAnalysisRecordModelInterface[],
            }

            return resolve(data.reports);
        } catch (err) {
            console.log(err);
        }
    })
}