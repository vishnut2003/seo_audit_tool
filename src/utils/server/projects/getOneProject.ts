import ProjectsModel, { ProjectModelInterface } from "@/models/ProjectsModel";

export async function getOneProject(projectId: string | null) {
    return new Promise<ProjectModelInterface | null>(async (resolve, reject) => {
        try {
            const project: ProjectModelInterface | null = await ProjectsModel.findOne({ projectId });
            return resolve(project);
        } catch (err) {
            return reject(err);
        }
    })
}