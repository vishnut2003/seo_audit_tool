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

// not using
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

// not using
export function getAllReportRecords() {
    return new Promise<createReportMDocInterface>(async (resolve) => {
        try {
            const response = await axios.get('/api/audit-report/get-all/1');
            const records = (response.data) as createReportMDocInterface;
            resolve(records);
        } catch (err) {
            console.log(err);
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