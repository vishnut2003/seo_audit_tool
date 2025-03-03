import { GoogleSearchConsoleApiFormDataInterface } from "@/app/dashboard/google-search-console/SearchConsoleApiKey";
import { dbConnect } from "@/database/DBConfig";
import ProjectsModel, { ProjectModelInterface } from "@/models/ProjectsModel";

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