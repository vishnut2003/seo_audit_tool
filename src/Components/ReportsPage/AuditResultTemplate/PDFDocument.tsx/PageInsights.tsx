import { getReportResponseInterface } from "@/Interfaces/SeoOptimer/GetResponseInterface"
import { Text, View } from "@react-pdf/renderer"

const PageInsights = ({ fullReport }: {
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

                {/* Mobile PageInsights */}
                <View style={{ width: "100%", display: "flex", gap: "10px" }}>
                    {/* Section title */}
                    <View style={{
                        display: "flex",
                        flexDirection: "row",
                        gap: "7px",
                        alignItems: "center",
                    }}>
                        <Text style={{ fontSize: "18px", fontWeight: 600 }}>Mobile PageInsights</Text>
                        {
                            fullReport.data.output.mobilePageInsights.passed ?
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
                    <Text style={{ fontSize: "11px" }}>Mobile PageInsights is vital for SEO, analyzing mobile performance, speed, and user experience.
                        It identifies issues, provides optimization suggestions, and ensures mobile-friendly pages, improving
                        rankings and engagement on mobile search results.</Text>

                    {/* Details */}
                    <Text style={{
                        fontSize: "11px",
                        fontWeight: 600
                    }}>Details: <Text style={{ fontWeight: 400 }}>{fullReport.data.output.mobilePageInsights.shortAnswer}</Text></Text>

                    <View>

                        {/* Total Score */}
                        <View style={{
                            display: "flex",
                            flexDirection: "row",
                            gap: "20px",
                            fontSize: "11px",
                            padding: "5px",
                            fontWeight: 600,
                            borderBottom: "1px solid #cecece",
                            justifyContent: "space-between"
                        }}>
                            <Text>Mobile Overall Score:</Text>
                            <Text style={{
                                fontWeight: 600,
                                color: fullReport.data.output.mobilePageInsights.passed ? 'green' : 'red'
                            }}>{fullReport.data.output.mobilePageInsights.data.score}</Text>
                        </View>

                        {/* Other Scores */}
                        <View>
                            {fullReport.data.output.mobilePageInsights.data.labdata.map((metricsItem, index) => (
                                <View key={index} style={{
                                    display: "flex",
                                    flexDirection: "row",
                                    gap: "20px",
                                    fontSize: "11px",
                                    padding: "5px",
                                    fontWeight: 600,
                                    borderBottom: "1px solid #cecece",
                                    justifyContent: "space-between"
                                }}>
                                    <Text>{metricsItem.name}:</Text>
                                    <Text>{metricsItem.value}</Text>
                                </View>
                            ))}
                        </View>
                    </View>
                </View>

            </View>

            <View style={{ width: "100%", display: "flex", gap: "20px" }}>

                {/* Desktop PageInsights */}
                <View style={{ width: "100%", display: "flex", gap: "10px" }}>
                    {/* Section title */}
                    <View style={{
                        display: "flex",
                        flexDirection: "row",
                        gap: "7px",
                        alignItems: "center",
                    }}>
                        <Text style={{ fontSize: "18px", fontWeight: 600 }}>Desktop PageInsights</Text>
                        {
                            fullReport.data.output.desktopPageInsights.passed ?
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
                    <Text style={{ fontSize: "11px" }}>Desktop PageInsights is essential for SEO, evaluating page speed, performance, 
                        and user experience on desktops. It highlights optimization areas, enhances load times, boosts search rankings, and 
                        ensures seamless navigation for desktop users.</Text>

                    {/* Details */}
                    <Text style={{
                        fontSize: "11px",
                        fontWeight: 600
                    }}>Details: <Text style={{ fontWeight: 400 }}>{fullReport.data.output.desktopPageInsights.shortAnswer}</Text></Text>

                    <View>

                        {/* Total Score */}
                        <View style={{
                            display: "flex",
                            flexDirection: "row",
                            gap: "20px",
                            fontSize: "11px",
                            padding: "5px",
                            fontWeight: 600,
                            borderBottom: "1px solid #cecece",
                            justifyContent: "space-between"
                        }}>
                            <Text>Desktop Overall Score:</Text>
                            <Text style={{
                                fontWeight: 600,
                                color: fullReport.data.output.desktopPageInsights.passed ? 'green' : 'red'
                            }}>{fullReport.data.output.desktopPageInsights.data.score}</Text>
                        </View>

                        {/* Other Scores */}
                        <View>
                            {fullReport.data.output.desktopPageInsights.data.labdata.map((metricsItem, index) => (
                                <View key={index} style={{
                                    display: "flex",
                                    flexDirection: "row",
                                    gap: "20px",
                                    fontSize: "11px",
                                    padding: "5px",
                                    fontWeight: 600,
                                    borderBottom: "1px solid #cecece",
                                    justifyContent: "space-between"
                                }}>
                                    <Text>{metricsItem.name}:</Text>
                                    <Text>{metricsItem.value}</Text>
                                </View>
                            ))}
                        </View>
                    </View>
                </View>

            </View>

        </View>
    )
}

export default PageInsights