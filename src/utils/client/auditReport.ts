import { createReportMDocInterface } from "@/app/models/ReportRecordModel";
import { getReportResponseInterface } from "@/Interfaces/SeoOptimer/GetResponseInterface";
import axios from "axios";

export function createNewAudit ({domainName}: {
    domainName: string
}) {
    return new Promise<getReportResponseInterface>( async (resolve) => {
        try {
            const response = await axios.post('/api/audit-report/create', {domain: domainName});
            const auditResult: getReportResponseInterface = response.data;
            resolve(auditResult)
        } catch (err) {
            console.log(err);
        }
    })
}

export async function getOneReportById({reportId}: {
    reportId: number
}) {
    return new Promise<getReportResponseInterface>( async (resolve, reject) => {
        try {
            const response = await axios.post('/api/audit-report/get-one', {reportId});
            const data = response.data as getReportResponseInterface;
            resolve(data);
        } catch (err) {
            reject(err);
        }
    })
}

export function getAllReportRecords () {
    return new Promise<createReportMDocInterface>( async (resolve, reject) => {
        try {
            const response = await axios.get('/api/audit-report/get-all/1');
            const records = (response.data) as createReportMDocInterface;
            resolve(records);
        } catch (err) {
            console.log(err);
        }
    })
}