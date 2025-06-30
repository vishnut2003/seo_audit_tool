import { dbConnect } from "@/database/DBConfig";
import ProjectsModel, { ProjectModelInterface } from "@/models/ProjectsModel";

export async function getAllProjects({ page, email, searchText }: {
    page: number,
    email: string,
    searchText?: string,
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

            const matchValue = {
                $or: [
                    {
                        email,
                    },
                    {
                        accessShare: email,
                    }
                ],
                domain: {
                    $regex: searchText ? new RegExp(searchText, 'i') : "",
                }
            }

            const projects: ProjectModelInterface[] = await ProjectsModel.find(matchValue, null, { skip, limit: perPage });
            const count = await ProjectsModel.countDocuments(matchValue)
            return resolve({ projects, count }); // return projects and total project count

        } catch (err) {
            return reject(err);
        }
    })
}