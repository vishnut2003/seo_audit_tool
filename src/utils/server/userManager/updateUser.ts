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

            let imagePath = null;

            if (profileImage) {
                imagePath = await uploadUserAvatarToPublicFolder({
                    email,
                    profileImage,
                })
            }

            const updateRequestData: {
                name: string,
                password?: string,
                image?: string,
            } = { name };
            
            if (hashPassword) {
                updateRequestData['password'] = hashPassword;
            }
            
            if (imagePath) {
                updateRequestData['image'] = imagePath;
            }

            await UsersModel.findOneAndUpdate({ email }, updateRequestData);

            return resolve()

        } catch (err) {
            reject(err);
        }
    })
}