import { RegisterUserApiRequestDataInterface } from "@/app/api/user-manager/register-user/route";
import { dbConnect } from "@/database/DBConfig";
import UsersModel from "@/models/UsersModel";
import bcrypt from "bcrypt"
import { uploadUserAvatarToPublicFolder } from "./uploadUserAvatar";

export interface RegisterUserFunctionArgInterface extends RegisterUserApiRequestDataInterface {
    imageFile: File | null,
}

export async function registerUser({
    userData,
}: {
    userData: RegisterUserFunctionArgInterface,
}) {
    return new Promise<void>(async (resolve, reject) => {
        try {
            await dbConnect();

            // Check if the email already exist
            const userExist = await UsersModel.findOne({ email: userData.email });
            if (userExist) {
                return reject("Email already exist!");
            }

            // Create hash from user email id
            const saltRound = 10;
            const salt = await bcrypt.genSalt(saltRound)
            const userId = await bcrypt.hash(userData.email, salt);

            // hash password before save
            const hashPassword = await bcrypt.hash(userData.password, salt);

            let imagePath = "";

            // save image to user-avatar folder
            if (userData.imageFile) {
                imagePath = await uploadUserAvatarToPublicFolder({
                    email: userData.email,
                    profileImage: userData.imageFile,
                })
            }

            const newUserInstance = new UsersModel({
                userId,
                name: userData.name,
                email: userData.email,
                password: hashPassword,
                image: imagePath,
            });

            try {
                await newUserInstance.save();
            } catch (err) {
                return reject(err);
            }

            return resolve();

        } catch (err) {
            return reject(err);
        }
    })
}