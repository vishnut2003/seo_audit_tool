import { dbConnect } from "@/database/DBConfig";
import UsersModel from "@/models/UsersModel";
import { v4 as uuid } from "uuid"

export function verifyIsMainAdmin ({email, password}: {
    email?: string,
    password?: string
}) {
        if (!email || !password) return false;

        const MAIN_ADMIN_EMAIL = process.env.MAIN_ADMIN_EMAIL;
        const MAIN_ADMIN_PASSWORD = process.env.MAIN_ADMIN_PASSWORD;

        // verify if its admin
        if(MAIN_ADMIN_EMAIL === email) {
            if(MAIN_ADMIN_PASSWORD === password) {
                return true;
            } else {
                return false;
            }
        } else {
            return false;
        }
}

export async function fetchMainAdmin ({email}: {
    email: string
}) {
    try {
        await dbConnect();
        const mainAdminInfo = await UsersModel.findOne({email});
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