import axios from "axios";

export function createNewAudit ({domainName}: {
    domainName: string
}) {
    return new Promise ( async (resolve, reject) => {
        try {
            const response = await axios.post('/api/audit-report/create', {domain: domainName});
            console.log(response);
        } catch (err) {
            console.log(err);
        }
    })
}