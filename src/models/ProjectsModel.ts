import mongoose from "mongoose";

export interface ProjectModelInterface extends mongoose.Document {
    email: string,
    domain: string,
    competitors: string[],
    createdAt: string,
    updatedAt: string,
}

const projectSchema = new mongoose.Schema<ProjectModelInterface>({
    email: {
        type: String,
        required: true,
    },
    domain: {
        type: String,
        required: true,
    },
    competitors: {
        type: [String],
        required: true,
        default: [],
    },
}, { timestamps: true });

export default mongoose.models.Projects || mongoose.model<ProjectModelInterface>('Projects', projectSchema);
