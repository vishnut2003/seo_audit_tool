import { NewProjectFormData } from "@/app/dashboard/projects/add-new/handleSubmit";
import { dbConnect } from "@/database/DBConfig";
import ProjectsModel from "@/models/ProjectsModel";
import bcrypt from 'bcrypt';

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

            // create project id
            const saltRound = 10;
            const salt = await bcrypt.genSalt(saltRound);
            const projectId = await bcrypt.hash(formData.domain, salt);

            // write to database
            await ProjectsModel.create({
                email,
                domain: formData.domain,
                competitors,
                projectId,
            });

            return resolve();
        } catch (err) {
            return reject(err);
        }
    })
}