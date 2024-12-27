import { JWT } from "google-auth-library";

export function googleApiAuth() {
    try {
        const GOOGLE_CLIENT_EMAIL = process.env.GOOGLE_CLIENT_EMAIL;
        const GOOGLE_PRIVATE_KEY = process.env.GOOGLE_PRIVATE_KEY;

        if (!GOOGLE_CLIENT_EMAIL || !GOOGLE_PRIVATE_KEY) {
            throw new Error("Provide GOOGLE_CLIENT_EMAIL and GOOGLE_PRIVATE_KEY in .env file.");
        }

        return new JWT({
            email: GOOGLE_CLIENT_EMAIL,
            key: GOOGLE_PRIVATE_KEY,
            scopes: [
                'https://www.googleapis.com/auth/spreadsheets',
                'https://www.googleapis.com/auth/drive.file',
            ],
        })

    } catch (err) {
        console.log(err);
        throw err
    }
} 