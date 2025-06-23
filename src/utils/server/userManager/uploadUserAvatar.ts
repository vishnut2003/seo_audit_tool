import path from "path";
import fs from "fs";
import fsPromise from "fs/promises";

export async function uploadUserAvatarToPublicFolder ({
    email,
    profileImage,
}: {
    email: string,
    profileImage: File,
}) {
    return new Promise<string>(async (resolve, reject) => {
        try {
            const _PROJECT_ABS_PATH = process.env.PROJECT_ABS_PATH;
            
            if (!_PROJECT_ABS_PATH) {
                throw new Error("Please provide PROJECT_ABS_PATH IN .env");
            }

            const fileExtension = path.extname(profileImage.name);
            
            const _UPLOAD_DIR = path.join(..._PROJECT_ABS_PATH.split(','), "public", "user-avatar");
            const _FILEPATH = path.join(_UPLOAD_DIR, `${email}${fileExtension}`);

            if (!fs.existsSync(_UPLOAD_DIR)) {
                fs.mkdirSync(_UPLOAD_DIR)
            }

            const returnFilePath = `/user-avatar/${email}${fileExtension}`;

            const buffer = Buffer.from(await profileImage.arrayBuffer());

            await fsPromise.writeFile(_FILEPATH, buffer);

            return resolve(returnFilePath);

        } catch (err) {
            return reject(err);
        }
    })
}