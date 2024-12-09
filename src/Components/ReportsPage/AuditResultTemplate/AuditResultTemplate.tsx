'use client';

import { getReportResponseInterface } from "@/Interfaces/SeoOptimer/GetResponseInterface"
import PDFTemplate from "./PDFDocument.tsx/PDFTemplate";
import { PDFViewer } from "@react-pdf/renderer";

const AuditResultTemplate = ({ fullReport }: {
  fullReport: getReportResponseInterface,
}) => {

  return (
    <div className="w-full bg-white p-5 rounded-lg">
      <PDFViewer className="w-full h-[70dvh] rounded-lg">
        <PDFTemplate fullReport={fullReport}/>
      </PDFViewer>
    </div>
  )
}

export default AuditResultTemplate