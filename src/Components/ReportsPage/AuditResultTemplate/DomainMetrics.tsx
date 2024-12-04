import { getReportResponseInterface } from "@/Interfaces/SeoOptimer/GetResponseInterface"

const DomainMetrics = ({fullReport}: {
  fullReport: getReportResponseInterface
}) => {
  return (
    <div className="w-full flex justify-center items-center p-5 py-20">

      <div className="w-[80%] flex flex-col gap-8">

        <div className="flex flex-col gap-4">
          <h2 className="text-2xl text-primary font-semibold leading-5">1. Domain Authority</h2>
          <p className="text-base font-normal opacity-85">Domain age is a metric that is often used to gauge the success of a website as it is an important factor that helps with determining the rank of a website. Domain age is basically the length of time the site has been registered and maintained.</p>
        </div>

        <div className="flex flex-col gap-4">
          <h2 className="text-2xl text-primary font-semibold leading-5">2. Total Backlinks</h2>
          <p className="text-base font-normal opacity-85">Domain age is a metric that is often used to gauge the success of a website as it is an important factor that helps with determining the rank of a website. Domain age is basically the length of time the site has been registered and maintained.</p>
        </div>
        
        <div className="flex flex-col gap-4">
          <h2 className="text-2xl text-primary font-semibold leading-5">3. Domain Strength</h2>
          <p className="text-base font-normal opacity-85">Domain age is a metric that is often used to gauge the success of a website as it is an important factor that helps with determining the rank of a website. Domain age is basically the length of time the site has been registered and maintained.</p>
        </div>
        
        <div className="flex flex-col gap-4">
          <h2 className="text-2xl text-primary font-semibold leading-5">4. Referring Domains</h2>
          <p className="text-base font-normal opacity-85">Domain age is a metric that is often used to gauge the success of a website as it is an important factor that helps with determining the rank of a website. Domain age is basically the length of time the site has been registered and maintained.</p>
        </div>

      </div>

      <div className="w-full flex flex-col justify-center items-center gap-8">

        <h2 className="text-3xl font-bold text-primary">Domain Metrics</h2>

        <div className="grid grid-cols-2 gap-7">

          <div className="flex justify-center items-center flex-col p-5 shadow-md shadow-primary rounded-md bg-primary">
            <h3 className="text-2xl font-semibold text-white">{fullReport.data.output.backlinks.data.mozda} <span className="text-secondary text-base">/ 100</ span></h3>
            <p className="text-foregroundwhite opacity-80">Domain Authority</p>
          </div>

          <div className="flex justify-center items-center flex-col p-5 shadow-md shadow-primary rounded-md bg-primary">
            <h3 className="text-2xl font-semibold text-white">{fullReport.data.output.backlinks.data.allbacklinks}</h3>
            <p className="text-foregroundwhite opacity-80">Total Backlinks</p>
          </div>

          <div className="flex justify-center items-center flex-col p-5 shadow-md shadow-primary rounded-md bg-primary">
            <h3 className="text-2xl font-semibold text-white">{fullReport.data.output.backlinks.data.domain_strength}</h3>
            <p className="text-foregroundwhite opacity-80">Domain Strength</p>
          </div>

          <div className="flex justify-center items-center flex-col p-5 shadow-md shadow-primary rounded-md bg-primary">
            <h3 className="text-2xl font-semibold text-white">{fullReport.data.output.backlinks.data.referring_domains}</h3>
            <p className="text-foregroundwhite opacity-80">Referring Domains</p>
          </div>

        </div>
      </div>
    </div>
  )
}

export default DomainMetrics