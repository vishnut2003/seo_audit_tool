import { NewProjectFormData } from "@/app/dashboard/projects/add-new/handleSubmit";
import { dbConnect } from "@/database/DBConfig";
import ProjectsModel from "@/models/ProjectsModel";

export async function createProject({ formData, email }: {
    formData: NewProjectFormData,
    email: string,
}) {
    return new Promise<void>(async (resolve, reject) => {
        try {
            await dbConnect();

            // check if the domain already exist
            const domainExist = await ProjectsModel.findOne({ domain: formData.domain });
            if (domainExist) {
                return reject({
                    message: 'Main Domain already exist!',
                    status: 409,
                });
            }

            const competitorsKeys: string[] = Object.keys(formData).filter((key) => key.includes('competitor'));
            const competitors: string[] = [];

            for (const key of competitorsKeys) {
                const competitor = formData[key as keyof typeof formData];
                competitors.push(competitor);
            }

            // write to database
            await ProjectsModel.create({
                email,
                domain: formData.domain,
                competitors,
            });

            return resolve();
        } catch (err) {
            return reject(err);
        }
    })
}