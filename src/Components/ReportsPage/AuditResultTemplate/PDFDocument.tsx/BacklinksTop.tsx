import { getReportResponseInterface } from "@/Interfaces/SeoOptimer/GetResponseInterface"
import { Text, View } from "@react-pdf/renderer"

const BacklinksTop = ({ fullReport }: {
    fullReport: getReportResponseInterface
}) => {
    return (
        <View style={{
            display: "flex",
            flexDirection: "row",
            gap: "30px",
            justifyContent: "center",
            alignItems: "flex-start"
        }}>

            <View style={{ width: "100%", display: "flex", gap: "20px" }}>

                {/* Backlinks Top Anchors */}
                <View style={{ width: "100%", display: "flex", gap: "10px" }}>
                    {/* Section title */}
                    <Text style={{ fontSize: "18px", fontWeight: 600 }}>Backlink Top Anchors</Text>

                    {/* Paragraph */}
                    <Text style={{ fontSize: "11px" }}>{fullReport.data.output.backlinksTopAnchors.shortAnswer}</Text>

                    {/* Anchor lists lists */}
                    <View style={{
                        display: "flex",
                        flexDirection: "column"
                    }}>
                        {fullReport.data.output.backlinksTopAnchors && fullReport.data.output.backlinksTopAnchors.data.list.map((anchorText, index) => {
                            if (index < 5) return (
                                <View key={index} style={{
                                    display: "flex",
                                    flexDirection: "row",
                                    gap: "30px",
                                    borderBottom: "1px solid #cecece",
                                    fontSize: '10px',
                                    padding: "5px 20px"
                                }}>
                                    <View>
                                        <Text style={{ fontWeight: 600 }}>{index + 1}</Text>
                                    </View>
                                    <View style={{ width: "100%" }}>
                                        <Text>Anchor Text: {anchorText.anchor}</Text>
                                        <Text style={{ fontWeight: 600 }}>Count: {anchorText.backlinks}</Text>
                                    </View>
                                </View>
                            )
                        })}
                    </View>
                </View>

            </View>

            <View style={{ width: "100%", display: "flex", gap: "20px" }}>

                {/* Backlinks top geographies */}
                <View style={{ width: "100%", display: "flex", gap: "10px" }}>
                    {/* Section title */}
                    <Text style={{ fontSize: "18px", fontWeight: 600 }}>Backlinks Top Geographies</Text>

                    {/* Paragraph */}
                    <Text style={{ fontSize: "11px" }}>{fullReport.data.output.backlinksTopGeographies.shortAnswer}</Text>

                    {/* TDL Lists */}
                    <View style={{
                        display: "flex",
                        flexDirection: "column"
                    }}>
                        <Text style={{ fontSize: "11px", fontWeight: 600 }}>TLDs Lists</Text>
                        {fullReport.data.output.backlinksTopGeographies && fullReport.data.output.backlinksTopGeographies.data.tlds.map((tdl, index) => {
                            if (index < 2) return (
                                <View key={index} style={{
                                    display: "flex",
                                    flexDirection: "row",
                                    gap: "30px",
                                    borderBottom: "1px solid #cecece",
                                    fontSize: '10px',
                                    padding: "5px 20px"
                                }}>
                                    <View>
                                        <Text style={{ fontWeight: 600 }}>{index + 1}</Text>
                                    </View>
                                    <View style={{ width: "100%" }}>
                                        <Text>TDL: {tdl.tld}</Text>
                                        <Text style={{ fontWeight: 600 }}>Count: {tdl.count}</Text>
                                    </View>
                                </View>
                            )
                        })}
                    </View>
                    
                    {/* Country Lists */}
                    <View style={{
                        display: "flex",
                        flexDirection: "column"
                    }}>
                        <Text style={{ fontSize: "11px", fontWeight: 600 }}>Country Lists</Text>
                        {fullReport.data.output.backlinksTopGeographies && fullReport.data.output.backlinksTopGeographies.data.countries.map((country, index) => {
                            if (index < 3) return (
                                <View key={index} style={{
                                    display: "flex",
                                    flexDirection: "row",
                                    gap: "30px",
                                    borderBottom: "1px solid #cecece",
                                    fontSize: '10px',
                                    padding: "5px 20px"
                                }}>
                                    <View>
                                        <Text style={{ fontWeight: 600 }}>{index + 1}</Text>
                                    </View>
                                    <View style={{ width: "100%" }}>
                                        <Text>Country: {country.country}</Text>
                                        <Text style={{ fontWeight: 600 }}>Count: {country.count}</Text>
                                    </View>
                                </View>
                            )
                        })}
                    </View>
                </View>

            </View>

        </View>
    )
}

export default BacklinksTop