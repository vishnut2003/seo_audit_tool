import { CompetiotrAnalysisFormSubmitInterface } from "@/Interfaces/CompetitorAnalysisInterface/FormSubmitInterface";
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