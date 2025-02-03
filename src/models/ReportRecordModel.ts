import mongoose from 'mongoose';

export interface createReportMDocInterface extends mongoose.Document {
    projectId: string,
    email: string,
    reportRecord: {
        success: boolean,
        data?: {
            url: string,
            pdf: boolean,
            callback: boolean,
            template: boolean,
            id: number
        }
    }
}

const reportRecordSchema = new mongoose.Schema<createReportMDocInterface>({
    projectId: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    reportRecord: {
        success: Boolean,
        data: {
            url: String,
            pdf: Boolean,
            callback: Boolean,
            template: Boolean,
            id: Number
        }
    }
}, { timestamps: true });

export default mongoose.models.ReportRecord || mongoose.model<createReportMDocInterface>('ReportRecord', reportRecordSchema);
// export default mongoose.model<createReportMDocInterface>('ReportRecord', reportRecordSchema);
