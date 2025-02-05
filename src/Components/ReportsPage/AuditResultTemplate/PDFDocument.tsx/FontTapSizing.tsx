import { getReportResponseInterface } from "@/Interfaces/SeoOptimer/GetResponseInterface"
import { Image, Text, View } from "@react-pdf/renderer"

const FontTapSizing = ({ fullReport }: {
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
                    src={'/pdf-assets/legible-fonts-tap-sizing.png'} />
            </View>

            <View style={{ width: "100%", display: "flex", gap: "20px" }}>

                {/* Legible Fonts */}
                <View style={{ width: "100%", display: "flex", gap: "10px" }}>
                    {/* Section title */}
                    <View style={{
                        display: "flex",
                        flexDirection: "row",
                        gap: "7px",
                        alignItems: "center",
                    }}>
                        <Text style={{ fontSize: "18px", fontWeight: 600 }}>Legible Fonts</Text>
                        {
                            fullReport.data.output.legibleFonts?.passed ?
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
                    <Text style={{ fontSize: "11px" }}>Legible fonts are crucial for SEO as they improve readability, enhance user experience,
                        and reduce bounce rates. Clear typography ensures accessibility, fostering engagement and
                        better rankings in search engine results.</Text>

                    {/* Details */}
                    <Text style={{
                        fontSize: "13px",
                        fontWeight: 600
                    }}>Details: <Text style={{ fontWeight: 400 }}>{fullReport.data.output.legibleFonts?.shortAnswer}</Text></Text>
                </View>

                {/* Tap Target Sizing */}
                <View style={{ width: "100%", display: "flex", gap: "10px" }}>
                    {/* Section title */}
                    <View style={{
                        display: "flex",
                        flexDirection: "row",
                        gap: "7px",
                        alignItems: "center",
                    }}>
                        <Text style={{ fontSize: "18px", fontWeight: 600 }}>Tap Target Sizing</Text>
                        {
                            fullReport.data.output.tapTargetSizing?.passed ?
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
                    <Text style={{ fontSize: "11px" }}>Tap target sizing is vital for SEO, ensuring clickable elements are appropriately sized 
                        for touchscreens. It enhances mobile usability, reduces frustration, improves user experience, and aligns with 
                        mobile-first indexing for better rankings.</Text>

                    {/* Details */}
                    <Text style={{
                        fontSize: "13px",
                        fontWeight: 600
                    }}>Details: <Text style={{ fontWeight: 400 }}>{fullReport.data.output.tapTargetSizing?.shortAnswer}</Text></Text>
                </View>

            </View>

        </View>
    )
}

export default FontTapSizing