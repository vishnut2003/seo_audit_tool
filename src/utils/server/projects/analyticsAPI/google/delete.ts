import ProjectsModel from "@/models/ProjectsModel";

export async function deleteGoogleAnalyticsAuth ({
    email,
    projectId,
}: {
    email: string,
    projectId: string,
}) {
    return new Promise<void>(async (resolve, reject) => {
        try {
            await ProjectsModel.findOneAndUpdate({email, projectId}, 
                {
                    $unset: {
                        googleAnalytics: 1,
                    }
                }
            );

            return resolve();
        } catch (err) {
            return reject(err);
        }
    })
}