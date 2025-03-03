import { JWT } from "google-auth-library";

export function GoogleSearchConsoleAuth({ clientEmail, privateKey }: {
    clientEmail?: string,
    privateKey?: string,
}) {
    return new Promise<JWT>(async (resolve, reject) => {
        try {

            if (!clientEmail || !privateKey) {
                throw new Error("Provide GOOGLE_CLIENT_EMAIL and GOOGLE_PRIVATE_KEY.");
            }

            const auth = new JWT({
                email: clientEmail,
                key: privateKey.replace(/\\n/gm, '\n'),
                scopes: [
                    "https://www.googleapis.com/auth/webmasters.readonly",
                ],
            })

            await auth.authorize();
            return resolve(auth)

        } catch (err) {
            return reject(typeof err === "string" ? err : "API Credentials Autherization Failed");
        }
    })
} 