import { getReportResponseInterface } from "@/Interfaces/SeoOptimer/GetResponseInterface"
import { Image, Text, View } from "@react-pdf/renderer"

const WebsiteCompression = ({ fullReport }: {
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
                    src={'/pdf-assets/website-compression-section.png'} />
            </View>

            <View style={{ width: "100%", display: "flex", gap: "20px" }}>

                {/* Website Compression */}
                <View style={{ width: "100%", display: "flex", gap: "10px" }}>
                    {/* Section title */}
                    <View style={{
                        display: "flex",
                        flexDirection: "row",
                        gap: "7px",
                        alignItems: "center",
                    }}>
                        <Text style={{ fontSize: "18px", fontWeight: 600 }}>Website Compression</Text>
                        {
                            fullReport.data.output.gzip?.passed ?
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
                    <Text style={{ fontSize: "11px" }}>Gzip is essential for SEO, compressing website files to reduce page size and improve load times.
                        Faster loading enhances user experience, decreases bounce rates, and positively impacts search engine rankings.</Text>

                    {/* Details */}
                    <Text style={{
                        fontSize: "13px",
                        fontWeight: 600
                    }}>Details: <Text style={{ fontWeight: 400 }}>{fullReport.data.output.gzip?.shortAnswer}</Text></Text>

                    <View>

                        {/* response details */}
                        <View>
                            {fullReport.data.output.gzip?.data && Object.keys(fullReport.data.output.gzip.data).map((sizeDetail, index) => {
                                if (index < 8) return (
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
                                        <Text>{sizeDetail}:</Text>
                                        <Text>{fullReport.data.output.gzip?.data?.[sizeDetail as keyof typeof fullReport.data.output.gzip.data]}</Text>
                                    </View>
                                )
                            })}
                        </View>
                    </View>

                </View>

            </View>

        </View>
    )
}

export default WebsiteCompression