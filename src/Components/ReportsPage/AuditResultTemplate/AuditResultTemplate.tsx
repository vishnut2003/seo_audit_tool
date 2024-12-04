import { getReportResponseInterface } from "@/Interfaces/SeoOptimer/GetResponseInterface"
import TopBar from "./TopBar"
import DomainMetrics from "./DomainMetrics"
import Divider from "./Divider"

const AuditResultTemplate = ({fullReport}: {
    fullReport: getReportResponseInterface,
}) => {
  return (
    <div className="w-full bg-white p-5 rounded-lg">
        <TopBar domainName={fullReport.data.input.url}/>
        <DomainMetrics fullReport={fullReport}/>
        <Divider/>
    </div>
  )
}

export default AuditResultTemplate