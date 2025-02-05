import { getReportResponseInterface } from "@/Interfaces/SeoOptimer/GetResponseInterface"
import { Text, View } from "@react-pdf/renderer"

const IpAndTechnology = ({ fullReport }: {
    fullReport: getReportResponseInterface
}) => {
    return (
        <View style={{
            display: "flex",
            flexDirection: "row",
            gap: "30px",
            justifyContent: "center",
            alignItems: "center"
        }}>

            <View style={{ width: "100%", display: "flex", gap: "20px" }}>

                {/* IP Address */}
                <View style={{ width: "100%", display: "flex", gap: "10px" }}>
                    {/* Section title */}
                    <Text style={{ fontSize: "18px", fontWeight: 600 }}>Website IP Address</Text>

                    {/* Details */}
                    <Text style={{
                        fontSize: "13px",
                        fontWeight: 600
                    }}>Details: <Text style={{ fontWeight: 400 }}>{fullReport.data.output.ip?.data}</Text></Text>
                </View>

                {/* Webserver details */}
                <View style={{ width: "100%", display: "flex", gap: "10px" }}>
                    {/* Section title */}
                    <Text style={{ fontSize: "18px", fontWeight: 600 }}>Webserver</Text>

                    {/* Details */}
                    <Text style={{
                        fontSize: "13px",
                        fontWeight: 600
                    }}>Details: <Text style={{ fontWeight: 400 }}>{fullReport.data.output.webServer?.data}</Text></Text>
                </View>

                {/* Technologies */}
                <View style={{ width: "100%", display: "flex", gap: "10px" }}>
                    {/* Section title */}
                    <Text style={{ fontSize: "18px", fontWeight: 600 }}>Technologies</Text>

                    {/* Details */}
                    <Text style={{
                        fontSize: "13px",
                        fontWeight: 600
                    }}>Details: <Text style={{ fontWeight: 400 }}>{fullReport.data.output.technologies?.shortAnswer}</Text></Text>

                    <View>

                        {/* response details */}
                        <View>
                            {fullReport.data.output.technologies?.data?.map((technology, index) => (
                                <View key={index} style={{
                                    display: "flex",
                                    flexDirection: "row",
                                    gap: "20px",
                                    fontSize: "11px",
                                    padding: "5px",
                                    fontWeight: 600,
                                    borderBottom: "1px solid #cecece",
                                    justifyContent: "flex-start",
                                    textTransform: "capitalize"
                                }}>
                                    <Text>{index + 1}.</Text>
                                    <Text>{technology}</Text>
                                </View>
                            ))}
                        </View>
                    </View>
                </View>

            </View>

            <View style={{ width: "100%", display: "flex", gap: "20px" }}>

                {/* DMARC */}
                <View style={{ width: "100%", display: "flex", gap: "10px" }}>
                    {/* Section title */}
                    <View style={{
                        display: "flex",
                        flexDirection: "row",
                        gap: "7px",
                        alignItems: "center",
                    }}>
                        <Text style={{ fontSize: "18px", fontWeight: 600 }}>DMARC Check</Text>
                        {
                            fullReport.data.output.dmarc?.passed ?
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

                    {/* Details */}
                    <Text style={{
                        fontSize: "13px",
                        fontWeight: 600
                    }}>Details: <Text style={{ fontWeight: 400 }}>{fullReport.data.output.dmarc?.shortAnswer}</Text></Text>
                </View>

                {/* SPF check */}
                <View style={{ width: "100%", display: "flex", gap: "10px" }}>
                    {/* Section title */}
                    <View style={{
                        display: "flex",
                        flexDirection: "row",
                        gap: "7px",
                        alignItems: "center",
                    }}>
                        <Text style={{ fontSize: "18px", fontWeight: 600 }}>SPF Check</Text>
                        {
                            fullReport.data.output.spf?.passed ?
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

                    {/* Details */}
                    <Text style={{
                        fontSize: "13px",
                        fontWeight: 600
                    }}>Details: <Text style={{ fontWeight: 400 }}>{fullReport.data.output.spf?.shortAnswer}</Text></Text>
                </View>

            </View>

        </View>
    )
}

export default IpAndTechnology