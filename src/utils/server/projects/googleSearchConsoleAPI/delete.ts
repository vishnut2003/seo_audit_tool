import ProjectsModel from "@/models/ProjectsModel";

export async function deleteGoogleSearchConsoleAuth ({
    email,
    projectId,
}: {
    projectId: string,
    email: string,
}) {
    return new Promise<void>(async (resolve, reject) => {
        try {
            await ProjectsModel.findOneAndUpdate({email, projectId}, 
                {
                    $unset: {
                        googleSearchConsole: 1,
                    },
                }
            )

            return resolve();
        } catch (err) {
            return reject(err);
        }
    })
}