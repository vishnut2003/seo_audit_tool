import { getReportResponseInterface } from "@/Interfaces/SeoOptimer/GetResponseInterface"
import { Image, Text, View } from "@react-pdf/renderer"

const Backlinks = ({ fullReport }: {
    fullReport: getReportResponseInterface
}) => {
    return (
        <View style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: "30px",
            flexDirection: "row"
        }}>

            <View style={{ width: "80%" }}>
                <Image 
                style={{width: "100%"}}
                src={'/pdf-assets/Backlinks.png'}/>
            </View>

            <View style={{ width: "100%", display: "flex", gap: "20px" }}>

                {/* backlink status */}
                <View style={{ width: "100%", display: "flex", gap: "10px" }}>
                    {/* Section title */}
                    <View style={{
                        display: "flex",
                        flexDirection: "row",
                        gap: "7px",
                        alignItems: "center",
                    }}>
                        <Text style={{ fontSize: "18px", fontWeight: 600 }}>Backlink Activity</Text>
                        {
                            fullReport.data.output.backlinks.passed ?
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

                    <Text style={{ fontSize: "11px" }}>Backlinks are critical for SEO as they signal website authority,
                        improve search engine rankings, drive referral traffic, and establish trust by connecting your content to reputable sources, enhancing overall online visibility and credibility.</Text>

                    <Text style={{
                        fontSize: "13px",
                        fontWeight: 600
                    }}>Details: <Text style={{ fontWeight: 400 }}>{fullReport.data.output.backlinks.shortAnswer}</Text></Text>
                </View>

                {/* Backlinks list */}
                <View style={{ width: "100%", display: "flex", gap: "10px" }}>

                    {/* Section title */}
                    <Text style={{ fontSize: "18px", fontWeight: 600 }}>Backlink Sites</Text>

                    {/* site list */}
                    <View style={{
                        display: "flex",
                        gap: "10px"
                    }}>
                        {
                            !fullReport.data.output.backlinksList.data.list || fullReport.data.output.backlinksList.data.list.length < 1 ?
                                <Text style={{ fontSize: "12px", fontWeight: 600, color: 'red' }}>No Backlink Sites</Text> :
                                fullReport.data.output.backlinksList.data.list.map((site, index) => {
                                    if (index < 5) return (
                                        <View key={index} style={{ display: "flex", flexDirection: "row", gap: "10px", fontSize: "12px" }}>
                                            <Text>{index + 1}</Text>
                                            <View style={{
                                                display: "flex",
                                                flexDirection: "column",
                                                gap: "4px"
                                            }}>
                                                <Text>{site.url}</Text>
                                                <Text style={{ fontWeight: 600 }}>Domain Authority: {site.domain_authority}</Text>
                                            </View>
                                        </View>
                                    )
                                })
                        }
                    </View>
                </View>

            </View>

        </View>
    )
}

export default Backlinks