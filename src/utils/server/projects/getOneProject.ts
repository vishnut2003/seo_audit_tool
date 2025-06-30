import { dbConnect } from "@/database/DBConfig";
import ProjectsModel, { ProjectModelInterface } from "@/models/ProjectsModel";

export async function getOneProject(projectId: string | null, email: string) {
    return new Promise<ProjectModelInterface | null>(async (resolve, reject) => {
        try {
            await dbConnect();
            const project: ProjectModelInterface | null = await ProjectsModel.findOne({ projectId, 
                $or: [
                    {
                        email,
                    },
                    {
                        accessShare: email,
                    }
                ]
             });
            return resolve(project);
        } catch (err) {
            return reject(err);
        }
    })
}