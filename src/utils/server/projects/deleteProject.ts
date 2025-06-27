import { dbConnect } from "@/database/DBConfig";
import ProjectsModel from "@/models/ProjectsModel";

export async function deleteProjectById ({
    ownerEmail,
    projectId,
}: {
    projectId: string,
    ownerEmail: string,
}) {
    return new Promise<void>(async (resolve, reject) => {
        try {
            await dbConnect();
            const project = await ProjectsModel.findOneAndDelete({
                email: ownerEmail,
                projectId,
            })

            if (!project) {
                return reject("Project not found!");
            }

            resolve()
        } catch (err) {
            return reject(err);
        }
    })
}