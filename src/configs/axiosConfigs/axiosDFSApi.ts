import axios, { AxiosInstance } from "axios";

export async function axiosDFSInstance() {
    return new Promise<AxiosInstance>(async (resolve, reject) => {
        try {
            const baseURL = "https://api.dataforseo.com/v3/";
            const DFS_EMAIL = process.env.DFS_EMAIL;
            const DFS_PASSWORD = process.env.DFS_PASSWORD;

            // check if email and password exist for API
            if (!DFS_EMAIL || !DFS_PASSWORD) {
                return reject("Data For SEO API Email and Password Required!");
            }

            const axiosDFSApi = axios.create({
                baseURL,
                auth: {
                    username: DFS_EMAIL,
                    password: DFS_PASSWORD,
                },
                headers: {
                    'content-type': 'application/json'
                }
            })

            return resolve(axiosDFSApi);
        } catch (err) {
            return reject(err);
        }
    })
}