import { getReportResponseInterface } from "@/Interfaces/SeoOptimer/GetResponseInterface"
import { Image, Text, View } from "@react-pdf/renderer"

const SslHttpsRedirect = ({fullReport}: {
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

            <View style={{ width: "80%" }}>
                <Image
                    style={{ width: "100%" }}
                    src={'/pdf-assets/ssl-https-redirects-section.png'} />
            </View>

            <View style={{ width: "100%", display: "flex", gap: "20px" }}>

                {/* SSL Enabled */}
                <View style={{ width: "100%", display: "flex", gap: "10px" }}>
                    {/* Section title */}
                    <View style={{
                        display: "flex",
                        flexDirection: "row",
                        gap: "7px",
                        alignItems: "center",
                    }}>
                        <Text style={{ fontSize: "18px", fontWeight: 600 }}>SSL Certificate</Text>
                        {
                            fullReport.data.output.sslEnabled.passed ?
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
                    <Text style={{ fontSize: "11px" }}>SSL is essential for SEO, encrypting data to ensure security and trust. 
                        Websites with SSL gain better rankings, improved user confidence, and alignment with search engine 
                        preferences for secure sites.</Text>

                    {/* Details */}
                    <Text style={{
                        fontSize: "13px",
                        fontWeight: 600
                    }}>Details: <Text style={{ fontWeight: 400 }}>{fullReport.data.output.sslEnabled.shortAnswer}</Text></Text>
                </View>

                {/* HTTPS Redirect */}
                <View style={{ width: "100%", display: "flex", gap: "10px" }}>
                    {/* Section title */}
                    <View style={{
                        display: "flex",
                        flexDirection: "row",
                        gap: "7px",
                        alignItems: "center",
                    }}>
                        <Text style={{ fontSize: "18px", fontWeight: 600 }}>HTTPS Force Redirect</Text>
                        {
                            fullReport.data.output.httpsRedirect.passed ?
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
                    <Text style={{ fontSize: "11px" }}>HTTPS force redirect is crucial for SEO, ensuring all traffic uses secure connections. 
                        It boosts user trust, aligns with search engine preferences, prevents duplicate content, and enhances 
                        rankings by prioritizing secure browsing.</Text>

                    {/* Details */}
                    <Text style={{
                        fontSize: "13px",
                        fontWeight: 600
                    }}>Details: <Text style={{ fontWeight: 400 }}>{fullReport.data.output.httpsRedirect.shortAnswer}</Text></Text>
                </View>

            </View>

        </View>
    )
}

export default SslHttpsRedirect