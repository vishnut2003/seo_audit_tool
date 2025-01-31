import { ProjectModelInterface } from "@/models/ProjectsModel";
import axios from "axios";

export async function setProjectId(projectId: string) {
    return new Promise<void>(async (resolve, reject) => {
        try {
            await axios.post('/api/project/session/set', { projectId });
            return resolve()
        } catch (err) {
            console.log(err);
            return reject(err);
        }
    })
}

export async function getSessionProject() {
    return new Promise<ProjectModelInterface | null>(async (resolve, reject) => {
        try {
            const { data }: {
                data: {
                    project: ProjectModelInterface | null,
                },
            } = await axios.get('/api/project/session/get');

            return resolve(data.project);

        } catch (err) {
            console.log(err);
            return reject(err);
        }
    })
}