import bcrypt from "bcrypt";
import { uploadUserAvatarToPublicFolder } from "./uploadUserAvatar";
import UsersModel from "@/models/UsersModel";

export async function updateUserData({
    email,
    name,
    password,
    profileImage,
}: {
    email: string,

    // Updating data
    name: string,
    password: string | null,
    profileImage: File | null,
}) {
    return new Promise<void>(async (resolve, reject) => {
        try {

            let hashPassword: string | null = null;

            if (password) {
                const saltRound = 10;
                const salt = await bcrypt.genSalt(saltRound);
                hashPassword = await bcrypt.hash(password, salt);
            }

            if (profileImage) {
                await uploadUserAvatarToPublicFolder({
                    email,
                    profileImage,
                })
            }

            const updateRequestData: {
                name: string,
                password?: string,
            } = { name };

            if (hashPassword) {
                updateRequestData['password'] = hashPassword;
            }

            await UsersModel.findOneAndUpdate({ email }, updateRequestData);

            return resolve()

        } catch (err) {
            reject(err);
        }
    })
}