import { getReportResponseInterface } from "@/Interfaces/SeoOptimer/GetResponseInterface"
import { Image, Text, View } from "@react-pdf/renderer"

const GoogleSearchPreview = ({ fullReport }: {
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
                    src={'/pdf-assets/google-search-preview-section.png'} />
            </View>

            <View style={{ width: "100%", display: "flex", gap: "20px" }}>

                {/* Google Search Preview */}
                <View style={{ width: "100%", display: "flex", gap: "10px" }}>
                    {/* Section title */}
                    <Text style={{ fontSize: "18px", fontWeight: 600 }}>Google Search Preview</Text>

                    {/* Paragraph */}
                    <Text style={{ fontSize: "11px" }}>{fullReport.data.output.googleSearchPreview.shortAnswer}</Text>

                    {/* Details */}
                    <Text style={{
                        fontSize: "13px",
                        fontWeight: 600
                    }}>Preview:</Text>

                    {/* Preview Section */}
                    <View style={{
                        padding: "20px",
                        backgroundColor: "#f6f6f6",
                        borderRadius: "20px",
                        display: "flex",
                        flexDirection: "column",
                        gap: "10px"
                    }}>
                        <Text style={{
                            color: "#0000ff",
                            fontSize: "14px",
                            fontWeight: 600
                        }}>{fullReport.data.output.googleSearchPreview.data.title}</Text>
                        
                        <Text style={{
                            fontSize: "12px"
                        }}>{fullReport.data.output.googleSearchPreview.data.description}</Text>
                    </View>
                </View>

                {/* Local Business Schema */}
                <View style={{ width: "100%", display: "flex", gap: "10px" }}>
                    {/* Section title */}
                    <View style={{
                        display: "flex",
                        flexDirection: "row",
                        gap: "7px",
                        alignItems: "center",
                    }}>
                        <Text style={{ fontSize: "18px", fontWeight: 600 }}>Local Business Schema</Text>
                        {
                            fullReport.data.output.localBusinessSchema.passed ?
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
                    <Text style={{ fontSize: "11px" }}>Google Business Schema enhances SEO by providing structured data about your business, 
                        helping search engines understand key details like name, address, and reviews. It boosts local visibility and improves 
                        rich search result displays.</Text>

                    {/* Details */}
                    <Text style={{
                        fontSize: "13px",
                        fontWeight: 600
                    }}>Details: <Text style={{ fontWeight: 400 }}>{fullReport.data.output.localBusinessSchema.shortAnswer}</Text></Text>
                </View>

            </View>

        </View>
    )
}

export default GoogleSearchPreview