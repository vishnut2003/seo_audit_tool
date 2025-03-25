import { Credentials, JWT, OAuth2Client } from "google-auth-library";
import { createSearchConsoleOAuthClient } from "../../googleOAuth";
import { cookies } from "next/headers";
import { getServerSession } from "next-auth";
import { createOAuthConsentToken } from "./create";

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
            const expaired = Date.now() >= (token.expiry_date ?? 0);

            if (expaired) {
                console.log("Expaired initiated...")
                try {
                    console.log("Refresing...")
                    const { credentials } = await authClient.refreshAccessToken();
                    console.log(credentials);
                    console.log("Refresh done!");
                    const cookieStore = await cookies();
                    const projectId = cookieStore.get('projectId');
                    const session = await getServerSession();

                    if (!projectId) {
                        throw new Error("No Project ID found");
                    } else if (!session?.user?.email) {
                        throw new Error("User not found!");
                    }

                    await createOAuthConsentToken({
                        email: session.user.email,
                        projectId: projectId.value,
                        token: credentials,
                    });

                    authClient.setCredentials(credentials);

                } catch (err) {
                    // refresh token expaired
                    console.log("refresh token expaired!", err);
                }
            }

            return resolve(authClient);
        } catch (err) {
            return reject(err);
        }
    })
}