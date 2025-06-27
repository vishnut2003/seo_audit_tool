import { dbConnect } from "@/database/DBConfig";
import ProjectsModel from "@/models/ProjectsModel";

export interface ProjectUpdatingDatas {
    competitors: string[],
    accessShare: string[],
}

export async function updateOneProjectByProjectId({
    email,
    projectId,
    updateData,
}: {
    updateData: ProjectUpdatingDatas,
    projectId: string,
    email: string,
}) {
    return new Promise<void>(async (resolve, reject) => {
        try {
            await dbConnect();

            const projectExist = await ProjectsModel.findOneAndUpdate({ email, projectId }, {
                ...updateData,
            })

            if (!projectExist) {
                throw new Error("Project not found");
            }

            return resolve()
        } catch (err) {
            return reject(err);
        }
    })
}