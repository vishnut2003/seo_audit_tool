import { dbConnect } from "@/database/DBConfig";
import UsersModel from "@/models/UsersModel";

export async function deleteUserByUserId({
    currentUserEmail,
    userId,
}: {
    userId: string,
    currentUserEmail: string,
}) {
    return new Promise<void>(async (resolve, reject) => {
        try {

            const adminEmail = process.env.MAIN_ADMIN_EMAIL;

            if (!adminEmail) {
                throw new Error("Please provide MAIN_ADMIN_EMAIL in .env file");
            }

            if (currentUserEmail !== adminEmail) {
                throw new Error("Unauthorized access!");
            }

            await dbConnect();

            const user = await UsersModel.findOneAndDelete({ userId });

            if (!user) {
                throw new Error("User not found!");
            }

            return resolve()

        } catch (err) {
            return reject(err);
        }
    })
}