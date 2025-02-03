import { createReportMDocInterface } from "@/models/ReportRecordModel";
import { getReportResponseInterface } from "@/Interfaces/SeoOptimer/GetResponseInterface";
import axios from "axios";

export function createNewAudit({ domainName, projectId, email }: {
    domainName: string,
    projectId: string,
    email: string,
}) {
    return new Promise<void>(async (resolve, reject) => {
        try {
            await axios.post('/api/audit-report/create', {
                domain: domainName,
                projectId,
                email,
            });
            resolve()
        } catch (err) {
            console.log(err);
            reject();
        }
    })
}

export async function getOneReportById({ reportId }: {
    reportId: number
}) {
    return new Promise<getReportResponseInterface>(async (resolve, reject) => {
        try {
            const response = await axios.post('/api/audit-report/get-one', { reportId });
            const data = response.data as getReportResponseInterface;
            resolve(data);
        } catch (err) {
            reject(err);
        }
    })
}

// New Function
export function getCurrentProjectLatestReport(projectId: string) {
    return new Promise<createReportMDocInterface | null>(async (resolve, reject) => {
        try {
            const { data }: {
                data: {
                    report: createReportMDocInterface,
                };
            } = await axios.post('/api/audit-report/get-latest-one', { projectId });
            if ('report' in data) {
                return resolve(data.report);
            } else {
                return resolve(null)
            }
        } catch (err) {
            return reject(err);
        }
    })
}