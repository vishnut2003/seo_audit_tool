import { dbConnect } from "@/database/DBConfig";
import ProjectsModel, { ProjectModelInterface } from "@/models/ProjectsModel";

export async function getAllProjects({ page, email }: {
    page: number,
    email: string,
}) {
    return new Promise<{
        projects: ProjectModelInterface[],
        count: number,
    }>(async (resolve, reject) => {
        try {
            await dbConnect();
            const perPage = 10;
            page--
            const skip = page * perPage;

            const projects: ProjectModelInterface[] = await ProjectsModel.find({ email }, null, { skip, limit: perPage });
            const count = await ProjectsModel.countDocuments()
            return resolve({projects, count}); // return projects and total project count

        } catch (err) {
            return reject(err);
        }
    })
}