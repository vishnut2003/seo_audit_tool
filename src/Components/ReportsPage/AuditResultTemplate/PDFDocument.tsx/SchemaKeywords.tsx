import { getReportResponseInterface } from "@/Interfaces/SeoOptimer/GetResponseInterface"
import { Image, Text, View } from "@react-pdf/renderer"

const SchemaKeywords = ({ fullReport }: {
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

            <View style={{ width: "80%" }}>
                <Image
                    style={{ width: "100%" }}
                    src={'/pdf-assets/schema-keywords-section.png'} />
            </View>

            <View style={{ width: "100%", display: "flex", gap: "20px" }}>

                {/* Schema Org */}
                <View style={{ width: "100%", display: "flex", gap: "10px" }}>
                    {/* Section title */}
                    <View style={{
                        display: "flex",
                        flexDirection: "row",
                        gap: "7px",
                        alignItems: "center",
                    }}>
                        <Text style={{ fontSize: "18px", fontWeight: 600 }}>Schema Check</Text>
                        {
                            fullReport.data.output.schemaOrg.passed ?
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

                    {/* Paragraph */}
                    <Text style={{ fontSize: "11px" }}>Schema.org enhances SEO by providing structured data that helps search engines understand website content.
                        It improves rich snippet visibility, boosts rankings, enhances user experience, and increases click-through rates with detailed search result displays.</Text>

                    {/* Details */}
                    <Text style={{
                        fontSize: "13px",
                        fontWeight: 600
                    }}>Details: <Text style={{ fontWeight: 400 }}>{fullReport.data.output.schemaOrg.shortAnswer}</Text></Text>
                </View>

                {/* Keywords Position */}
                <View style={{ width: "100%", display: "flex", gap: "10px" }}>
                    {/* Section title */}
                    <View style={{
                        display: "flex",
                        flexDirection: "row",
                        gap: "7px",
                        alignItems: "center",
                    }}>
                        <Text style={{ fontSize: "18px", fontWeight: 600 }}>Keyword Positions</Text>
                    </View>

                    {/* Paragraph */}
                    <Text style={{ fontSize: "11px" }}>Keyword positions are critical for SEO as they track where your site ranks in search results.
                        Monitoring positions helps optimize strategies, improve rankings, and target high-performing keywords for better visibility and traffic.</Text>

                    {/* Details */}
                    <Text style={{
                        fontSize: "11px",
                        fontWeight: 600
                    }}>Details: <Text style={{ fontWeight: 400 }}>{fullReport.data.output.keywordPositions.shortAnswer}</Text></Text>

                    {/* Positions */}
                    <View style={{
                        display: "flex",
                        flexDirection: "column"
                    }}>
                        {Object.keys(fullReport.data.output.keywordPositions.data).map((position, index) => {
                            if (index < 5) return (
                                <View key={index} style={{
                                    display: "flex",
                                    flexDirection: "row",
                                    gap: "30px",
                                    borderBottom: "1px solid #cecece",
                                    fontSize: '10px',
                                    padding: "5px 20px"
                                }}>
                                    <View style={{ width: "100%" }}>
                                        <Text style={{ fontWeight: 600 }}>{position}</Text>
                                    </View>
                                    <View style={{ width: "100%" }}>
                                        <Text>{fullReport.data.output.keywordPositions.data[position as keyof typeof fullReport.data.output.keywordPositions.data]}</Text>
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

export default SchemaKeywords