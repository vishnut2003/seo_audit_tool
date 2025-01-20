import mongoose from "mongoose";

export interface CompetitorAnalysisRecordModelInterface extends mongoose.Document {
    recordId: string,
    website: string,
    competitors: string[],
    sheetId?: string,
    status: string,
    finishedSites: string[],
}

const CompetitorAnalysisSchema = new mongoose.Schema<CompetitorAnalysisRecordModelInterface>({
    recordId: {
        type: String,
        required: true,
    },
    website: {
        type: String,
        required: true,
    },
    competitors: {
        type: [String],
        required: true,
    },
    sheetId: {
        type: String,
        required: false,
    },
    status: {
        type: String,
        required: true,
    },
    finishedSites: {
        type: [String],
        required: true,
    },
}, {
    timestamps: true,
})

export default mongoose.models.CompetitorAnalysisRecord || mongoose.model<CompetitorAnalysisRecordModelInterface>('CompetitorAnalysisRecord', CompetitorAnalysisSchema);
// export default mongoose.model<CompetitorAnalysisRecordModelInterface>('CompetitorAnalysisRecord', CompetitorAnalysisSchema);