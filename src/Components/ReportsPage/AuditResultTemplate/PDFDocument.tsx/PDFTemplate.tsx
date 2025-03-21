import { Document, Font } from "@react-pdf/renderer";
import PageTemplate from "./PageTemplate";
import DomainMetrics from "./DomainMetrics";
import HeroTemplate from "./HeroTemplate";
import { getReportResponseInterface } from "@/Interfaces/SeoOptimer/GetResponseInterface";
import PerformanceMetrics from "./PerformanceMetrics";
import SeoTitleDesc from "./SeoTitleDesc";
import HasH1Tag from "./HasH1Tag";
import Keywords from "./Keywords";
import ContentImageAlt from "./ContentImageAlt";
import Backlinks from "./Backlinks";
import OnPageLinks from "./OnPageLinks";
import NoIndex from "./NoIndex";
import RobotsTxt from "./RobotsTxt";
import SitemapAnalytics from "./SitemapAnalytics";
import SchemaKeywords from "./SchemaKeywords";
import PageInsights from "./PageInsights";
import MobileViewportFlash from "./MobileViewportFlash";
import FaviconIframe from "./FaviconIframe";
import FontTapSizing from "./FontTapSizing";
import ServerResponsePageSize from "./ServerResponsePageSize";
import NumberOfResources from "./NumberOfResources";
import WebsiteCompression from "./WebsiteCompression";
import JsErrorHttp2 from "./JsErrorHttp2";
import OptimizedMinified from "./OptimizedMinified";
import DeprecatedInlineCss from "./DeprecatedInlineCss";
import Social from "./Social";
import SslHttpsRedirect from "./SslHttpsRedirect";
import PhoneAddressEmail from "./PhoneAddressEmail";
import GoogleBusinessProfile from "./GoogleBusinessProfile";
import IpAndTechnology from "./IpAndTechnology";
import GoogleSearchPreview from "./GoogleSearchPreview";
import BacklinksTop from "./BacklinksTop";

const PDFTemplate = ({fullReport}: {
    fullReport: getReportResponseInterface
}) => {

    Font.register({
        family: 'Open Sans', fonts: [
            { src: 'https://cdn.jsdelivr.net/npm/open-sans-all@0.1.3/fonts/open-sans-regular.ttf' },
            { src: 'https://cdn.jsdelivr.net/npm/open-sans-all@0.1.3/fonts/open-sans-600.ttf', fontWeight: 600 }
        ]
    })

    return (
        <Document
            style={{
                fontFamily: 'Open Sans'
            }}
            title="Site Audit" >

            {/* Hero Section */}
            <HeroTemplate fullReport={fullReport}/>

            {/* Domain Metrics */}
            <PageTemplate>
                <DomainMetrics fullReport={fullReport} />
            </PageTemplate>

            {/* performance metrics */}
            <PageTemplate>
                <PerformanceMetrics fullReport={fullReport}/>
            </PageTemplate>
            
            {/* Title Attri Checks */}
            <PageTemplate>
                <SeoTitleDesc fullReport={fullReport} />
            </PageTemplate>

            {/* Has H1 Tag */}
            <PageTemplate>
                <HasH1Tag fullReport={fullReport}/>
            </PageTemplate>

            {/* Keywords */}
            <PageTemplate>
                <Keywords fullReport={fullReport}/>
            </PageTemplate>

            {/* Content Length / Image alt */}
            <PageTemplate>
                <ContentImageAlt fullReport={fullReport}/>
            </PageTemplate>

            {/* Backlinks section */}
            <PageTemplate>
                <Backlinks fullReport={fullReport}/>
            </PageTemplate>

            {/* Backlink Top Anchors and top geographies section */}
            <PageTemplate>
                <BacklinksTop fullReport={fullReport}/>
            </PageTemplate>

            {/* On-Page Links section */}
            <PageTemplate>
                <OnPageLinks fullReport={fullReport}/>
            </PageTemplate>

            {/* No Index Section */}
            <PageTemplate>
                <NoIndex fullReport={fullReport}/>
            </PageTemplate>

            {/* RobotTxt */}
            <PageTemplate>
                <RobotsTxt fullReport={fullReport}/>
            </PageTemplate>

            {/* Sitemap and Analytics section */}
            <PageTemplate>
                <SitemapAnalytics fullReport={fullReport}/>
            </PageTemplate>

            {/* Schema and Keywords positions */}
            <PageTemplate>
                <SchemaKeywords fullReport={fullReport}/>
            </PageTemplate>

            {/* PageInsights */}
            <PageTemplate>
                <PageInsights fullReport={fullReport}/>
            </PageTemplate>

            {/* Mobile Viewport and Flash content */}
            <PageTemplate>
                <MobileViewportFlash fullReport={fullReport}/>
            </PageTemplate>

            {/* Favicon and iframe section */}
            <PageTemplate>
                <FaviconIframe fullReport={fullReport}/>
            </PageTemplate>

            {/* Legible fonts and tap target sizing */}
            <PageTemplate>
                <FontTapSizing fullReport={fullReport}/>
            </PageTemplate>

            {/* Page Response time and Page size section */}
            <PageTemplate>
                <ServerResponsePageSize fullReport={fullReport}/>
            </PageTemplate>

            {/* Number of resources and AMP Enabled */}
            <PageTemplate>
                <NumberOfResources fullReport={fullReport}/>
            </PageTemplate>

            {/* Website compression */}
            <PageTemplate>
                <WebsiteCompression fullReport={fullReport}/>
            </PageTemplate>

            {/* JS Error and HTTP version section */}
            <PageTemplate>
                <JsErrorHttp2 fullReport={fullReport}/>
            </PageTemplate>

            {/* Image Optimization and Files Minified section */}
            <PageTemplate>
                <OptimizedMinified fullReport={fullReport}/>
            </PageTemplate>

            {/* Deprecation and inline css */}
            <PageTemplate>
                <DeprecatedInlineCss fullReport={fullReport}/>
            </PageTemplate>

            {/* Social section */}
            <PageTemplate>
                <Social fullReport={fullReport}/>
            </PageTemplate>

            {/* SSL or HTTPS Redirects section */}
            <PageTemplate>
                <SslHttpsRedirect fullReport={fullReport}/>
            </PageTemplate>

            {/* Email, Phone, Address section */}
            <PageTemplate>
                <PhoneAddressEmail fullReport={fullReport}/>
            </PageTemplate>

            {/* Google My Business section */}
            <PageTemplate>
                <GoogleBusinessProfile fullReport={fullReport}/>
            </PageTemplate>

            {/* Google Search Preview and Local business schema */}
            <PageTemplate>
                <GoogleSearchPreview fullReport={fullReport}/>
            </PageTemplate>

            {/* ID and technologies section */}
            <PageTemplate>
                <IpAndTechnology fullReport={fullReport}/>
            </PageTemplate>
        </Document>
    )
}

export default PDFTemplate