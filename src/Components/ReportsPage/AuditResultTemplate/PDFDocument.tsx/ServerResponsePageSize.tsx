import { getReportResponseInterface } from "@/Interfaces/SeoOptimer/GetResponseInterface"
import { Text, View } from "@react-pdf/renderer"

const ServerResponsePageSize = ({ fullReport }: {
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

                {/* Server Response time */}
                <View style={{ width: "100%", display: "flex", gap: "10px" }}>
                    {/* Section title */}
                    <View style={{
                        display: "flex",
                        flexDirection: "row",
                        gap: "7px",
                        alignItems: "center",
                    }}>
                        <Text style={{ fontSize: "18px", fontWeight: 600 }}>Server Response Time</Text>
                        {
                            fullReport.data.output.serverResponseTime.passed ?
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
                    <Text style={{ fontSize: "11px" }}>Server response time is crucial for SEO, as faster responses improve page load speed, 
                        enhance user experience, and reduce bounce rates. Optimized response times positively impact search engine 
                        rankings and overall performance.</Text>

                    {/* Details */}
                    <Text style={{
                        fontSize: "11px",
                        fontWeight: 600
                    }}>Details: <Text style={{ fontWeight: 400 }}>{fullReport.data.output.serverResponseTime.shortAnswer}</Text></Text>

                    <View>

                        {/* response details */}
                        <View>
                            {Object.keys(fullReport.data.output.serverResponseTime.data).map((serverMetrics, index) => (
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
                                    <Text>{serverMetrics}:</Text>
                                    <Text>{fullReport.data.output.serverResponseTime.data[serverMetrics as keyof typeof fullReport.data.output.serverResponseTime.data]}</Text>
                                </View>
                            ))}
                        </View>
                    </View>
                </View>

            </View>

            <View style={{ width: "100%", display: "flex", gap: "20px" }}>

                {/* Page Size */}
                <View style={{ width: "100%", display: "flex", gap: "10px" }}>
                    {/* Section title */}
                    <View style={{
                        display: "flex",
                        flexDirection: "row",
                        gap: "7px",
                        alignItems: "center",
                    }}>
                        <Text style={{ fontSize: "18px", fontWeight: 600 }}>Page Size</Text>
                        {
                            fullReport.data.output.pageSize.passed ?
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
                    <Text style={{ fontSize: "11px" }}>Page size directly impacts SEO by influencing load speed and user experience. Smaller, 
                        optimized pages load faster, improve rankings, reduce bounce rates, and ensure better performance across devices, 
                        particularly for mobile users.</Text>

                    {/* Details */}
                    <Text style={{
                        fontSize: "11px",
                        fontWeight: 600
                    }}>Details: <Text style={{ fontWeight: 400 }}>{fullReport.data.output.pageSize.shortAnswer}</Text></Text>

                    <View>

                        {/* Page size Metrics */}
                        <View>
                            {Object.keys(fullReport.data.output.pageSize.data).map((pageSizeMetrics, index) => (
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
                                    <Text>{pageSizeMetrics}:</Text>
                                    <Text>{fullReport.data.output.pageSize.data[pageSizeMetrics as keyof typeof fullReport.data.output.pageSize.data]}</Text>
                                </View>
                            ))}
                        </View>
                    </View>
                </View>

            </View>

        </View>
    )
}

export default ServerResponsePageSize