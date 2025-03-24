import { createAnalyticsOAuthClient } from "@/utils/server/googleOAuth";
import { JWT, Credentials, OAuth2Client } from "google-auth-library";

export function AnalyticsGoogleApiAuth({ clientEmail, privateKey }: {
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
                    "https://www.googleapis.com/auth/analytics.readonly",
                ],
            })

            await auth.authorize();
            return resolve(auth)

        } catch (err) {
            return reject(typeof err === "string" ? err : "API Credentials Autherization Failed");
        }
    })
}

export async function authorizeWithOAuthClient({ token }: {
    token: Credentials,
}) {
    return new Promise<OAuth2Client>(async (resolve, reject) => {
        try {
            const [oauthclient] = await createAnalyticsOAuthClient();
            oauthclient.setCredentials(token);

            return resolve(oauthclient)
        } catch (err) {
            return reject(err);
        }
    })
}