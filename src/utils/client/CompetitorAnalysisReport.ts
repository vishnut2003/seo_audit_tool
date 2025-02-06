import { CompetiotrAnalysisFormSubmitInterface } from "@/Interfaces/CompetitorAnalysisInterface/FormSubmitInterface";
import axios from "axios";

export async function createCompetitorAnalysisReport({ formData }: {
    formData: CompetiotrAnalysisFormSubmitInterface
}) {
    return new Promise<void>(async (resolve, reject) => {
        try {
            await axios.post('/api/competitor-analysis/create-report', formData);
            return resolve();
        } catch (err) {
            return reject(err);
        }
    })
}

export async function generateReportId() {
    return new Promise<string>(async (resolve, reject) => {
        try {
            const response = await axios.get('/api/competitor-analysis/generate-report-id');
            const reportId: string = response.data;
            return resolve(reportId);
        } catch (err) {
            console.log(err)
            return reject();
        }
    })
}