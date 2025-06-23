import mongoose from "mongoose";

export interface UserModelInterface extends mongoose.Document {
    userId: string,
    name: string,
    email: string,
    password: string,
    image: string,
}

const userSchema = new mongoose.Schema<UserModelInterface>({
    userId: {
        type: String,
        required: true,
        unique: true,
    },
    name: {
        type: String,
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
    },
})

export default mongoose.models.Users || mongoose.model<UserModelInterface>('Users', userSchema);
// export default mongoose.model<UserModelInterface>('Users', userSchema);