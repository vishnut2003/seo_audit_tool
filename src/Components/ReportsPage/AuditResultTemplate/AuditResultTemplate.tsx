'use client';

import { getReportResponseInterface } from "@/Interfaces/SeoOptimer/GetResponseInterface"
import PDFTemplate from "./PDFDocument.tsx/PDFTemplate";
import { PDFViewer } from "@react-pdf/renderer";
import AuditResultProgress from "../AuditResultProgress/AuditResultProgress";

const AuditResultTemplate = ({ fullReport }: {
  fullReport: getReportResponseInterface,
}) => {

  return (
    <div className="w-full bg-transparent h-full relative">
      <AuditResultProgress loadingText="Loading PDF Viewer..."/>
      <PDFViewer className="w-full h-[100%] absolute top-0 left-0">
        <PDFTemplate fullReport={fullReport}/>
      </PDFViewer>
    </div>
  )
}

export default AuditResultTemplate