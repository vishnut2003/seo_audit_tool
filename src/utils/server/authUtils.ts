import { dbConnect } from "@/database/DBConfig";
import UsersModel from "@/models/UsersModel";
import { v4 as uuid } from "uuid"
import bcrypt from "bcrypt";

interface ReturnUserInterface {
    id: string,
    name: string,
    email: string,
    image: string,
}

export function verifyIsMainAdmin({ email, password }: {
    email?: string,
    password?: string
}) {
    if (!email || !password) return false;

    const MAIN_ADMIN_EMAIL = process.env.MAIN_ADMIN_EMAIL;
    const MAIN_ADMIN_PASSWORD = process.env.MAIN_ADMIN_PASSWORD;

    // verify if its admin
    if (MAIN_ADMIN_EMAIL === email) {
        if (MAIN_ADMIN_PASSWORD === password) {
            return true;
        } else {
            return false;
        }
    } else {
        return false;
    }
}

export async function fetchMainAdmin({ email }: {
    email: string
}) {
    try {
        await dbConnect();
        const mainAdminInfo = await UsersModel.findOne({ email });
        if (mainAdminInfo) {
            return {
                id: mainAdminInfo._id,
                name: mainAdminInfo.name,
                email: mainAdminInfo.email,
                image: mainAdminInfo.image
            }
        } else {
            return {
                id: uuid(),
                name: "Main Admin",
                email: email,
                image: "/users/default-avatar.png"
            }
        }
    } catch (err) {
        console.log(err);
    }
}

export async function authenticateUser({ email, password }: {
    email?: string,
    password?: string,
}) {
    return new Promise<ReturnUserInterface>(async (resolve, reject) => {
        try {
            if (!email || !password) {
                return reject();
            }

            await dbConnect();

            const emailExist = await UsersModel.findOne({ email });
            if (!emailExist) {
                return reject();
            }

            const isValid = await bcrypt.compare(password, emailExist.password);
            if (isValid) {
                return resolve({
                    id: emailExist.userId,
                    name: emailExist.name,
                    email: emailExist.email,
                    image: emailExist.image,
                })
            } else {
                return reject();
            }

        } catch (err) {
            return reject(err);
        }
    })
}