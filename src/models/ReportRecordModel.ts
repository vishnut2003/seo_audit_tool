import mongoose from 'mongoose';

export interface createReportMDocInterface extends mongoose.Document {
    name: string,
    reportRecord: {
        success: boolean,
        data?: {
            url: string,
            pdf: boolean,
            callback: boolean,
            template: boolean,
            id: number
        }
    }[]
}

const reportRecordSchema = new mongoose.Schema<createReportMDocInterface>({
    name: String,
    reportRecord: [
        {
            success: Boolean,
            data: {
                url: String,
                pdf: Boolean,
                callback: Boolean,
                template: Boolean,
                id: Number
            }
        }
    ]
}, { timestamps: true });

export default mongoose.models.ReportRecord || mongoose.model<createReportMDocInterface>('ReportRecord', reportRecordSchema);
// export default mongoose.model<createReportMDocInterface>('ReportRecord', reportRecordSchema);
