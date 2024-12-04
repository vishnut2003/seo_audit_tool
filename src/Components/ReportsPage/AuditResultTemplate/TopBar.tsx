
const TopBar = ({domainName}: {
    domainName: string
}) => {
  return (
    <div className="p-5 bg-primary text-foregroundwhite flex flex-col gap-2 rounded-lg">
        <h2 className="text-base font-semibold">Website Report {domainName}</h2>
        <p className="text-sm font-normal">This report grades your website on the strength of a range of important factors such as on-page SEO optimization, off-page backlinks, social, performance, security and more. The overall grade is on a A+ to F- scale, with most major industry leading websites in the A range. Improving a website&apos;s grade is recommended to ensure a better website experience for your users and improved ranking and visibility by search engines.</p>
    </div>
  )
}

export default TopBar