import { GoogleAnalyticsFormSubmitInterface } from "@/app/dashboard/analytics-report/AnalyticsApiKey";
import { dbConnect } from "@/database/DBConfig";
import ProjectsModel, { ProjectModelInterface } from "@/models/ProjectsModel";

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
            const document: ProjectModelInterface | null = await ProjectsModel.findOneAndUpdate({ email, projectId }, {
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