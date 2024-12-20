import mongoose from "mongoose";

export interface UserModelInterface extends mongoose.Document {
    username: string,
    email: string,
    password: string,
    image: string,
    name?: string,
    phone?: string
}

const userSchema = new mongoose.Schema<UserModelInterface>({
    username: {
        type: String,
        unique: true,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true,
        default: "/users/default-avatar.png"
    },
    name: String,
    phone: String
})

export default mongoose.models.Users || mongoose.model<UserModelInterface>('Users', userSchema);
// export default mongoose.model<UserModelInterface>('Users', userSchema);