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