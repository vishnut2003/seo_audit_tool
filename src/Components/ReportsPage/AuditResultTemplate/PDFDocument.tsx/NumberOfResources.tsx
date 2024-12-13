import { getReportResponseInterface } from "@/Interfaces/SeoOptimer/GetResponseInterface"
import { Text, View } from "@react-pdf/renderer"

const NumberOfResources = ({ fullReport }: {
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

            <View style={{ width: "100%" }}>

                {/* Number of resources */}
                <View style={{ width: "100%", display: "flex", gap: "10px" }}>
                    {/* Section title */}
                    <Text style={{ fontSize: "18px", fontWeight: 600 }}>Number of Resources</Text>

                    {/* Paragraph */}
                    <Text style={{ fontSize: "11px" }}>The number of resources affects SEO by influencing page load speed.
                        Fewer resources lead to faster loading times, improved user experience, and better rankings. Reducing
                        unnecessary resources enhances performance and mobile optimization.</Text>

                    {/* Details */}
                    <Text style={{
                        fontSize: "13px",
                        fontWeight: 600
                    }}>Details: <Text style={{ fontWeight: 400 }}>{fullReport.data.output.numberOfResources.shortAnswer}</Text></Text>

                    <View>

                        {/* Resources list */}
                        <View>
                            {Object.keys(fullReport.data.output.numberOfResources.data).map((resourceName, index) => (
                                <View key={index} style={{
                                    display: "flex",
                                    flexDirection: "row",
                                    gap: "20px",
                                    fontSize: "11px",
                                    padding: "5px",
                                    fontWeight: 600,
                                    borderBottom: "1px solid #cecece",
                                    justifyContent: "space-between",
                                    textTransform: "capitalize"
                                }}>
                                    <Text>{resourceName}:</Text>
                                    <Text>{fullReport.data.output.numberOfResources.data[resourceName as keyof typeof fullReport.data.output.numberOfResources.data]}</Text>
                                </View>
                            ))}
                        </View>
                    </View>

                </View>

            </View>

            <View style={{ width: "100%", display: "flex", gap: "20px" }}>

                {/* Hah AMP */}
                <View style={{ width: "100%", display: "flex", gap: "10px" }}>
                    {/* Section title */}
                    <Text style={{ fontSize: "18px", fontWeight: 600 }}>AMP Check</Text>

                    {/* Paragraph */}
                    <Text style={{ fontSize: "11px" }}>AMP Accelerated Mobile Pages enhances SEO by optimizing mobile page speed.
                        It provides faster loading times, improves user experience, reduces bounce rates, and boosts rankings in
                        mobile-first search results, increasing visibility.</Text>

                    {/* Details */}
                    <Text style={{
                        fontSize: "13px",
                        fontWeight: 600
                    }}>Details: <Text style={{ fontWeight: 400 }}>{fullReport.data.output.hasAmp.shortAnswer}</Text></Text>

                    <View>

                        {/* Page size Metrics */}
                        <View>
                            {Object.keys(fullReport.data.output.hasAmp.data).map((ampType, index) => (
                                <View key={index} style={{
                                    display: "flex",
                                    flexDirection: "row",
                                    gap: "20px",
                                    fontSize: "11px",
                                    padding: "5px",
                                    fontWeight: 600,
                                    borderBottom: "1px solid #cecece",
                                    justifyContent: "space-between",
                                    textTransform: "capitalize"
                                }}>
                                    <Text>{ampType}:</Text>
                                    <Text>{fullReport.data.output.hasAmp.data[ampType as keyof typeof fullReport.data.output.hasAmp.data] ? <>Yes</> : <>No</>}</Text>
                                </View>
                            ))}
                        </View>
                    </View>

                </View>

            </View>

        </View>
    )
}

export default NumberOfResources