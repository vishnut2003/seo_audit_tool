import { OAuth2Client } from "google-auth-library"

export async function createAnalyticsOAuthClient() {
    return new Promise<[OAuth2Client, string[]]>(async (resolve, reject) => {
        try {

            const clientId = process.env.OAUTH_CLIENT_ID;
            const clientSecret = process.env.OAUTH_CLIENT_SECRET;
            const redirectUri = process.env.ANALYTICS_OAUTH_REDIRECT_URL;

            if (
                !clientId ||
                !clientSecret ||
                !redirectUri
            ) {
                return reject("OAuth Credentials required!");
            }

            const authClient = new OAuth2Client({
                clientId,
                clientSecret,
                redirectUri,
            });

            const SCOPE = [
                "https://www.googleapis.com/auth/analytics.readonly",
            ]

            return resolve([
                authClient,
                SCOPE,
            ])

        } catch (err) {
            return reject(err);
        }
    })
}

export async function createSearchConsoleOAuthClient() {
    return new Promise<[OAuth2Client, string[]]>(async (resolve, reject) => {
        try {
            const clientId = process.env.OAUTH_CLIENT_ID;
            const clientSecret = process.env.OAUTH_CLIENT_SECRET;
            const redirectUri = process.env.SEARCH_CONSOLE_OAUTH_REDIRECT_URL;

            if (
                !clientId ||
                !clientSecret ||
                !redirectUri
            ) {
                return reject("OAuth Credentials required!");
            }

            const authClient = new OAuth2Client({
                clientId,
                clientSecret,
                redirectUri,
            });

            const SCOPE = [
                "https://www.googleapis.com/auth/webmasters.readonly",
            ]

            return resolve([
                authClient,
                SCOPE,
            ])
        } catch (err) {
            return reject(err);
        }
    })
}