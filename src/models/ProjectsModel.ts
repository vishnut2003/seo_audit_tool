import mongoose from "mongoose";

export interface ProjectModelInterface extends mongoose.Document {
    projectId: string,
    email: string,
    domain: string,
    competitors: string[],
    accessShare: string[],
    createdAt: string,
    updatedAt: string,
    googleAnalytics?: {
        propertyId: string,
        clientEmail?: string,
        privateKey?: string,
        token?: {
            access_token: string,
            refresh_token: string,
            expiry: number,
        }
    },
    googleSearchConsole?: {
        property: string,
        clientEmail?: string,
        privateKey?: string,
        token?: {
            access_token: string,
            refresh_token: string,
            expiry: number,
        }
    },
}

const OAuthClientToken = new mongoose.Schema({
    access_token: String,
    refresh_token: String,
    expiry_date: Number,
})

const googleAnalyticsSchema = new mongoose.Schema({
    propertyId: String,
    clientEmail: String,
    privateKey: String,
    token: OAuthClientToken,
})

const googleSearchConsoleSchema = new mongoose.Schema({
    property: String,
    clientEmail: String,
    privateKey: String,
    token: OAuthClientToken,
})

const projectSchema = new mongoose.Schema<ProjectModelInterface>({
    projectId: {
        type: String,
        required: true,
    },
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
    accessShare: {
        type: [String],
        required: true,
        default: [],
    },
    googleAnalytics: {
        type: googleAnalyticsSchema,
    },
    googleSearchConsole: {
        type: googleSearchConsoleSchema,
    }
}, { timestamps: true });

export default mongoose.models.Projects || mongoose.model<ProjectModelInterface>('Projects', projectSchema);
