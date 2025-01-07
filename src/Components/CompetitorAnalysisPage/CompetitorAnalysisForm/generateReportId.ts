import axios from "axios";

export async function generateReportId () {
    return new Promise<string>( async (resolve, reject) => {
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