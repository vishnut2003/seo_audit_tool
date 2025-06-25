import path from "path";
import fsPromise from "fs/promises";
import fs from "fs";

export async function getUserAvatar({
    imageRelativePath,
}: {
    imageRelativePath: string,
}) {
    return new Promise<string | null>(async (resolve, reject) => {
        try {
            const _PROJECT_ABS_PATH = process.env.PROJECT_ABS_PATH;

            if (!_PROJECT_ABS_PATH) {
                throw new Error('Please provide PROJECT_ABS_PATH IN .env');
            }

            const _PUBLIC_FOLDER = path.join(..._PROJECT_ABS_PATH.split(','), "public");
            const imagePath = path.join(_PUBLIC_FOLDER, imageRelativePath);
            
            if (!fs.existsSync(imagePath)) {
                resolve(null);
            }

            const imageBuffer = await fsPromise.readFile(imagePath);
            resolve(imageBuffer.toString('base64'));

        } catch (err) {
            return reject(err);
        }
    })
}