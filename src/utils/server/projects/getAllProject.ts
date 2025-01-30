import { dbConnect } from "@/database/DBConfig";
import ProjectsModel, { ProjectModelInterface } from "@/models/ProjectsModel";

export async function getAllProjects({ page, email }: {
    page: number,
    email: string,
}) {
    return new Promise<ProjectModelInterface[]>(async (resolve, reject) => {
        try {
            await dbConnect();
            const perPage = 10;
            const skip = page * 10;

            const projects: ProjectModelInterface[] = await ProjectsModel.find({ email }, null, { skip, limit: perPage });
            return resolve(projects);

        } catch (err) {
            return reject(err);
        }
    })
}