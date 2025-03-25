import { GoogleSearchConsoleApiFormDataInterface } from "@/app/dashboard/google-search-console/SearchConsoleApiKey";
import { dbConnect } from "@/database/DBConfig";
import ProjectsModel, { ProjectModelInterface } from "@/models/ProjectsModel";
import { Credentials } from "google-auth-library";

export async function createGoogleSearchConsoleCredentials({
    email,
    projectId,
    property,
    clientEmail,
    privateKey,
}: GoogleSearchConsoleApiFormDataInterface) {
    return new Promise<void>(async (resolve, reject) => {
        try {
            await dbConnect();
            const project: ProjectModelInterface | null = await ProjectsModel.findOneAndUpdate({ email, projectId }, {
                googleSearchConsole: {
                    property,
                    clientEmail,
                    privateKey,
                }
            })

            if (!project) {
                return reject("Project not found!");
            }

            return resolve();
        } catch (err) {
            return reject(err);
        }
    })
}

export async function updateProperty({ projectId, property, email }: {
    email: string,
    projectId: string,
    property: string,
}) {
    return new Promise<void>(async (resolve, reject) => {
        try {
            const project = await ProjectsModel.findOneAndUpdate({ email, projectId }, {
                'googleSearchConsole.property': property,
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

export async function createOAuthConsentToken({
    email,
    projectId,
    token,
}: {
    token: Credentials,
    email: string,
    projectId: string,
}) {
    return new Promise<void>(async (resolve, reject) => {
        try {
            const project = await ProjectsModel.findOneAndUpdate({ email, projectId },
                {
                    'googleSearchConsole.token': {
                        access_token: token.access_token,
                        refresh_token: token.refresh_token,
                        expiry_date: token.expiry_date,
                    },
                }
            );

            if (!project) {
                return reject("Project not found!");
            }

            return resolve();
        } catch (err) {
            return reject(err);
        }
    })
}