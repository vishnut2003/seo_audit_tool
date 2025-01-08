import mongoose from "mongoose";

export interface CompetitorAnalysisRecordModelInterface extends mongoose.Document {
    recordId: string,
}

const CompetitorAnalysisSchema = new mongoose.Schema<CompetitorAnalysisRecordModelInterface>({
    recordId: {
        type: String,
        required: true,
    }
}, {
    timestamps: true,
})

export default mongoose.models.CompetitorAnalysisRecord || mongoose.model<CompetitorAnalysisRecordModelInterface>('CompetitorAnalysisRecord', CompetitorAnalysisSchema);
// export default mongoose.model<CompetitorAnalysisRecordModelInterface>('CompetitorAnalysisRecord', CompetitorAnalysisSchema);