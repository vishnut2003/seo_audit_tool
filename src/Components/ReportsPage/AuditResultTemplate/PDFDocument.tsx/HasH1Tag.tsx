import { getReportResponseInterface } from "@/Interfaces/SeoOptimer/GetResponseInterface"
import { Image, Text, View } from "@react-pdf/renderer"

const HasH1Tag = ({ fullReport }: {
  fullReport: getReportResponseInterface
}) => {
  return (
    <View style={{
      display: "flex",
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
      gap: "20px"
    }}>
      <View style={{ width: "100%", display: "flex", gap: "20px" }}>

        {/* has h1 tag */}
        <View style={{ width: "100%", display: "flex", gap: "10px" }}>

          <Text style={{
            fontWeight: 600,
            fontSize: '18px',
          }}>H1 Tag Usage</Text>

          <Text style={{ fontSize: "11px" }}>The H1 tag is essential for SEO as it defines the page&apos;s primary topic, improves structure, enhances readability, and helps search engines understand content relevance, boosting rankings and user engagement.</Text>

          <View style={{
            display: "flex",
            flexDirection: "row",
            gap: "7px",
            alignItems: "center",
          }}>
            <Text style={{ fontSize: "15px", fontWeight: 600 }}>Status</Text>
            {
              fullReport.data.output.hasH1Header?.passed ?
                <Text style={{
                  backgroundColor: "green",
                  color: "white",
                  padding: "5px 10px",
                  fontSize: "9px",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  borderRadius: "10px"
                }}>Passed</Text>
                :
                <Text style={{
                  backgroundColor: "red",
                  color: "white",
                  padding: "5px 10px",
                  fontSize: "9px",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  borderRadius: "10px"
                }}>failed</Text>
            }
          </View>

          {/* Details section */}

          <Text style={{
            fontSize: "13px",
            fontWeight: 600
          }}>Details: {fullReport.data.output.hasH1Header?.shortAnswer}</Text>

        </View>

        {/* has header tag usage */}
        <View style={{ width: "100%", display: "flex", gap: "10px" }}>

          <Text style={{
            fontWeight: 600,
            fontSize: '18px',
          }}>Header Tag Usage</Text>

          <Text style={{ fontSize: "11px" }}>Header tags structure content, improve readability, and highlight key sections for users and search engines. They enhance SEO by organizing information hierarchically, boosting keyword relevance, and improving overall page engagement and rankings.</Text>

          <View style={{
            display: "flex",
            flexDirection: "row",
            gap: "7px",
            alignItems: "center",
          }}>
            <Text style={{ fontSize: "15px", fontWeight: 600 }}>Status</Text>
            {
              fullReport.data.output.headers?.passed ?
                <Text style={{
                  backgroundColor: "green",
                  color: "white",
                  padding: "5px 10px",
                  fontSize: "9px",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  borderRadius: "10px"
                }}>Passed</Text>
                :
                <Text style={{
                  backgroundColor: "red",
                  color: "white",
                  padding: "5px 10px",
                  fontSize: "9px",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  borderRadius: "10px"
                }}>failed</Text>
            }
          </View>

          {/* Details section */}

          <Text style={{
            fontSize: "13px",
            fontWeight: 600
          }}>Details: {fullReport.data.output.headers?.shortAnswer}</Text>

        </View>

      </View>

      <View style={{ width: "80%" }}>

        <Image 
        style={{width: '100%'}}
        src={'/pdf-assets/has-h1-usage-section.png'}/>

      </View>
    </View>
  )
}

export default HasH1Tag