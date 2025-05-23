import ReportRecordModel from "@/models/ReportRecordModel";
import { dbConnect } from "@/database/DBConfig";
import { getReportResponseInterface } from "@/Interfaces/SeoOptimer/GetResponseInterface";
import axios from "axios";

export interface createReportResponseInterface {
    success: boolean,
    data?: {
        url: string,
        pdf: boolean,
        callback: boolean,
        template: boolean,
        id: number
    }
}

export async function createReport({ domainName }: {
    domainName: string
}) {

    return new Promise<createReportResponseInterface>(async (resolve, reject) => {

        const OPTIMER_BASE_URL = "https://api.seoptimer.com";
        const OPTIMER_API_KEY: string | undefined = process.env.OPTIMER_API_KEY;

        if (!OPTIMER_API_KEY) return reject('No API key found for SEO Optimer.');

        const data = JSON.stringify({
            "url": domainName,
        });

        var config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: `${OPTIMER_BASE_URL}/v1/report/create`,
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'x-api-key': OPTIMER_API_KEY
            },
            data: data
        };

        const response = await axios(config);
        const apiResponse = response.data as createReportResponseInterface;

        // return if something go wrong while creating report
        if (!apiResponse.success) return reject("Something went wrong while creating report.");

        resolve(apiResponse);
    })
}

export async function getReport({ reportId }: {
    reportId: number
}) {
    return new Promise<getReportResponseInterface>(async (resolve, reject) => {

        const OPTIMER_BASE_URL = "https://api.seoptimer.com";
        const OPTIMER_API_KEY: string | undefined = process.env.OPTIMER_API_KEY;

        if (!OPTIMER_API_KEY) return reject('No API key found for SEO Optimer.');

        var config = {
            method: 'get',
            maxBodyLength: Infinity,
            url: `${OPTIMER_BASE_URL}/v1/report/get/${reportId}`,
            headers: {
                'Content-Type': 'application/json',
                'x-api-key': OPTIMER_API_KEY
            }
        };

        const response = await axios(config);
        const apiReponse = response.data as getReportResponseInterface;

        if (!apiReponse.success) {
            if (
                'message' in apiReponse.data &&
                typeof apiReponse.data.message === "string"
            ) {
                return reject(apiReponse.data.message);
            } else {
                return reject("Report is in process. Please wait 5 min and try again.")
            }
        }

        resolve(apiReponse);

    })
}

export async function saveReportToDatabase({ reportResponse, projectId, userEmail }: {
    reportResponse: createReportResponseInterface,
    projectId: string,
    userEmail: string,
}) {
    return new Promise<void>(async (resolve) => {
        await dbConnect();

        await ReportRecordModel.create({
            projectId,
            email: userEmail,
            reportRecord: reportResponse,
        });

        resolve();
    })
}