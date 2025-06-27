import { dbConnect } from "@/database/DBConfig";
import UsersModel, { UserModelInterface } from "@/models/UsersModel";

export async function getUserDataByEmail({
    email,
}: {
    email: string,
}) {
    return new Promise<UserModelInterface | null>(async (resolve, reject) => {
        try {
            await dbConnect();
            const userData = await UsersModel.findOne({ email }) as UserModelInterface;

            return resolve(userData || null)

        } catch (err) {
            return reject(err);
        }
    })
}