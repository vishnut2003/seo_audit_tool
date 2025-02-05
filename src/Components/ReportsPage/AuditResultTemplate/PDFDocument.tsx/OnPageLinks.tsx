import { getReportResponseInterface } from "@/Interfaces/SeoOptimer/GetResponseInterface"
import { Text, View } from "@react-pdf/renderer"

const OnPageLinks = ({ fullReport }: {
    fullReport: getReportResponseInterface
}) => {
    return (
        <View style={{
            display: "flex",
            flexDirection: "row",
            gap: "30px",
            justifyContent: "center",
            alignItems: "flex-start",
        }}>

            {/* First Column */}
            <View style={{ width: "100%", display: "flex", gap: "10px" }}>
                {/* Section title */}
                <Text style={{ fontSize: "18px", fontWeight: 600 }}>On-Page Links</Text>

                <Text style={{ fontSize: "11px" }}>On-page links are vital for SEO, improving navigation, guiding users to key content, distributing page authority,
                    and enhancing user experience. They help search engines understand site structure and boost overall visibility.</Text>

                <Text style={{ fontSize: "13px", fontWeight: 600 }}>Links Summary</Text>

                <View>
                    {
                        fullReport.data.output.onPageLinks?.data && Object.keys(fullReport.data.output.onPageLinks.data).map((point, index) => (
                            <View key={index} style={{
                                display: "flex",
                                flexDirection: "row",
                                gap: "10px",
                                fontSize: "12px",
                                width: "100%",
                                justifyContent: "space-between",
                                padding: "10px 20px",
                                borderBottom: "1px solid #cecece",
                                textTransform: "capitalize"
                            }}>
                                <Text>{point}</Text>
                                <Text>{fullReport.data.output.onPageLinks?.data?.[point as keyof typeof fullReport.data.output.onPageLinks.data]}</Text>
                            </View>
                        ))
                    }
                </View>
            </View>

            {/* Second column */}
            <View style={{ width: "100%", display: "flex", gap: "10px" }}>

                {/* Section title */}
                <View style={{
                    display: "flex",
                    flexDirection: "row",
                    gap: "7px",
                    alignItems: "center",
                }}>
                    <Text style={{ fontSize: "18px", fontWeight: 600 }}>Friendly Urls</Text>
                    {
                        fullReport.data.output.friendlyUrls?.passed ?
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

                <Text style={{ fontSize: "11px" }}>Friendly URLs are essential for SEO as they improve readability, enhance user experience, include keywords,
                    and help search engines understand page content. Clear, concise URLs boost rankings and encourage click-through rates.</Text>

                <Text style={{
                    fontSize: "13px",
                    fontWeight: 600
                }}>Details: <Text style={{ fontWeight: 400 }}>{fullReport.data.output.friendlyUrls?.shortAnswer}</Text></Text>

            </View>

        </View>
    )
}

export default OnPageLinks