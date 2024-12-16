'use client';

import { getReportResponseInterface } from "@/Interfaces/SeoOptimer/GetResponseInterface"
import PDFTemplate from "./PDFDocument.tsx/PDFTemplate";
import { PDFViewer } from "@react-pdf/renderer";

const AuditResultTemplate = ({ fullReport }: {
  fullReport: getReportResponseInterface,
}) => {

  return (
    <div className="w-full bg-transparent h-full">
      <PDFViewer className="w-full h-[100%] rounded-lg">
        <PDFTemplate fullReport={fullReport}/>
      </PDFViewer>
    </div>
  )
}

export default AuditResultTemplate