import { Credentials, JWT, OAuth2Client } from "google-auth-library";
import { resolve } from "path";
import { createSearchConsoleOAuthClient } from "../../googleOAuth";

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

export async function googleSearchConsoleOAuthClient({ token }: {
    token: Credentials,
}) {
    return new Promise<OAuth2Client>(async (resolve, reject) => {
        try {
            const [authClient] = await createSearchConsoleOAuthClient();
            authClient.setCredentials(token);

            return resolve(authClient);
        } catch (err) {
            return reject(err);
        }
    })
}