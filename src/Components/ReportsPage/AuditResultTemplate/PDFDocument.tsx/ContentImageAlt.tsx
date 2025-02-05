import { getReportResponseInterface } from "@/Interfaces/SeoOptimer/GetResponseInterface"
import { Image, Text, View } from "@react-pdf/renderer"

const ContentImageAlt = ({ fullReport }: {
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
                {/* image alt section */}
                <View style={{ width: "100%", display: "flex", gap: "10px" }}>

                    {/* Section title */}
                    <View style={{
                        display: "flex",
                        flexDirection: "row",
                        gap: "7px",
                        alignItems: "center",
                    }}>
                        <Text style={{ fontSize: "18px", fontWeight: 600 }}>Content Length</Text>
                        {
                            fullReport?.data?.output?.contentLength?.passed ?
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

                    <Text style={{ fontSize: "11px" }}>Content length impacts SEO by providing comprehensive information, improving engagement,
                        and signaling quality to search engines. Longer, well-structured content enhances keyword usage, boosts rankings, and encourages users to spend more time on the page.</Text>

                    <Text style={{
                        fontSize: "13px",
                        fontWeight: 600
                    }}>Details: <Text style={{ fontWeight: 400 }}>{fullReport.data.output.contentLength?.shortAnswer}</Text></Text>

                </View>
                
                {/* Image alt secttion */}
                <View style={{ width: "100%", display: "flex", gap: "10px" }}>

                    {/* Section title */}
                    <View style={{
                        display: "flex",
                        flexDirection: "row",
                        gap: "7px",
                        alignItems: "center",
                    }}>
                        <Text style={{ fontSize: "18px", fontWeight: 600 }}>Image Alt</Text>
                        {
                            fullReport.data.output.imageAlt?.passed ?
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

                    <Text style={{ fontSize: "11px" }}>Image Alt text is crucial for SEO as it improves accessibility, provides context for images, enhances user experience, and helps search engines understand visuals, 
                        boosting rankings and driving additional traffic through image searches.</Text>

                    <Text style={{
                        fontSize: "13px",
                        fontWeight: 600
                    }}>Details: <Text style={{ fontWeight: 400 }}>{fullReport.data.output.imageAlt?.shortAnswer}</Text></Text>

                </View>

            </View>

            <View style={{ width: "80%" }}>
                <Image 
                style={{width: "100%"}}
                src={'/pdf-assets/content-image-alt-section.png'}/>
            </View>

        </View>
    )
}

export default ContentImageAlt