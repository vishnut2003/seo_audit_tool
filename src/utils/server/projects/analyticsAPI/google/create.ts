import { GoogleAnalyticsFormSubmitInterface } from "@/app/dashboard/analytics-report/AnalyticsApiKey";
import { dbConnect } from "@/database/DBConfig";
import ProjectsModel, { ProjectModelInterface } from "@/models/ProjectsModel";
import { Credentials } from "google-auth-library";

export async function createGoogleAnalyticsCredentials({
    clientEmail,
    privateKey,
    propertyId,
    email,
    projectId,
}: GoogleAnalyticsFormSubmitInterface) {
    return new Promise<void>(async (resolve, reject) => {
        try {
            await dbConnect();
            const document: ProjectModelInterface | null = await ProjectsModel.findOneAndUpdate({
                projectId,
                $or: [
                    { email },
                    { accessShare: email },
                ],
            }, {
                googleAnalytics: {
                    clientEmail,
                    privateKey,
                    propertyId,
                }
            }, { new: true });

            if (!document) {
                return reject("Project not fount!");
            }

            resolve();
        } catch (err) {
            return reject(err);
        }
    })
}

export async function createOAuthConsentToken({ token, email, projectId }: {
    token: Credentials,
    email: string,
    projectId: string,
}) {
    return new Promise<void>(async (resolve, reject) => {
        try {
            const project = await ProjectsModel.findOneAndUpdate({
                projectId,
                $or: [
                    { email },
                    { accessShare: email },
                ],
            }, {
                'googleAnalytics.token': {
                    access_token: token.access_token,
                    refresh_token: token.refresh_token,
                    expiry_date: token.expiry_date,
                }
            })

            if (!project) {
                throw new Error("Project not found!");
            }

            return resolve();
        } catch (err) {
            return reject(err);
        }
    })
}

export async function updatePropertyId({
    email,
    projectId,
    propertyId,
}: {
    email: string,
    projectId: string,
    propertyId: string,
}) {
    return new Promise<void>(async (resolve, reject) => {
        try {
            const project = await ProjectsModel.findOneAndUpdate({
                projectId,
                $or: [
                    { email },
                    { accessShare: email }
                ],
            }, {
                'googleAnalytics.propertyId': propertyId,
            })

            if (!project) {
                throw new Error("Project not found");
            }

            return resolve();
        } catch (err) {
            return reject(err);
        }
    })
}