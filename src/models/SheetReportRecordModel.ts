import mongoose from "mongoose";

export interface sheetReportRecordInterface extends mongoose.Document {
    reportId: string,
    status: "processing" | "success" | "error",
    totalPage: number,
    finishPage: number,
    sheetLink?: string,
    websiteUrl: string,
}

const sheetReportSchema = new mongoose.Schema<sheetReportRecordInterface>({
    reportId: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        enum: ["processing", "success", "error"],
        required: true,
    },
    totalPage: {
        type: Number,
        required: true,
        default: 0,
    },
    finishPage: {
        type: Number,
        required: true,
        default: 0,
    },
    sheetLink: {
        type: String,
        required: false,
    },
    websiteUrl: {
        type: String,
        required: true,
    }
}, {timestamps: true});

export default mongoose.models.SheetReportRecord || mongoose.model<sheetReportRecordInterface>('SheetReportRecord', sheetReportSchema);
// export default mongoose.model<sheetReportRecordInterface>('SheetReportRecord', sheetReportSchema);