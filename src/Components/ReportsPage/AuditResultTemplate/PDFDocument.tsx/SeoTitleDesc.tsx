import { getReportResponseInterface } from "@/Interfaces/SeoOptimer/GetResponseInterface"
import { Image, Text, View } from "@react-pdf/renderer"

const SeoTitleDesc = ({ fullReport }: {
  fullReport: getReportResponseInterface
}) => {
  return (
    <View style={{
      display: "flex",
      flexDirection: "row",
      gap: "20px",
      justifyContent: "center",
      alignItems: "center"
    }}>

      {/* Left col */}
      <View style={{ width: "70%" }}>
        <Image
          src={'/pdf-assets/seo-title-desc-section.png'}
          style={{
            width: "100%"
          }}
        />
      </View>

      {/* Right Col */}
      <View style={{ width: "100%", display: "flex", gap: "20px" }}>
        <Text style={{
          fontWeight: 600,
          fontSize: '18px',
        }}>SEO Tags & Attributes</Text>

        {/* Seo Title */}
        <View style={{ display: "flex", gap: "5px" }}>
          <View style={{ display: "flex", flexDirection: "row", justifyContent: "flex-start", alignItems: "center", gap: "10px", fontWeight: 600 }}>
            <Text style={{ fontSize: "15px" }}>Title Tag</Text>

            {
              fullReport.data.output.title?.passed ?
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
                }}>Failed</Text>

            }

          </View>

          {/* Title short answer */}
          <Text style={{ fontSize: "11px" }}>{fullReport.data.output.title?.shortAnswer}</Text>
        </View>


        {/* Seo Description */}
        <View style={{ display: "flex", gap: "5px" }}>
          <View style={{ display: "flex", flexDirection: "row", justifyContent: "flex-start", alignItems: "center", gap: "10px", fontWeight: 600 }}>
            <Text style={{ fontSize: "15px" }}>Meta Description</Text>

            {
              fullReport.data.output.description?.passed ?
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
                }}>Failed</Text>

            }

          </View>

          {/* Title short answer */}
          <Text style={{ fontSize: "11px" }}>{fullReport.data.output.description?.shortAnswer}</Text>
        </View>
        
        {/* hreflang Attribute */}
        <View style={{ display: "flex", gap: "5px" }}>
          <View style={{ display: "flex", flexDirection: "row", justifyContent: "flex-start", alignItems: "center", gap: "10px", fontWeight: 600 }}>
            <Text style={{ fontSize: "15px" }}>hreflang attribute</Text>

            {
              fullReport.data.output.hasHreflang?.passed ?
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
                }}>Failed</Text>

            }

          </View>

          {/* Title short answer */}
          <Text style={{ fontSize: "11px" }}>{fullReport.data.output.hasHreflang?.shortAnswer}</Text>
        </View>
        
        {/* lang Attribute */}
        <View style={{ display: "flex", gap: "5px" }}>
          <View style={{ display: "flex", flexDirection: "row", justifyContent: "flex-start", alignItems: "center", gap: "10px", fontWeight: 600 }}>
            <Text style={{ fontSize: "15px" }}>lang attribute</Text>

            {
              fullReport.data.output.langCheck?.passed ?
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
                }}>Failed</Text>

            }

          </View>

          {/* Title short answer */}
          <Text style={{ fontSize: "11px" }}>{fullReport.data.output.langCheck?.shortAnswer}</Text>
        </View>

      </View>
    </View>
  )
}

export default SeoTitleDesc