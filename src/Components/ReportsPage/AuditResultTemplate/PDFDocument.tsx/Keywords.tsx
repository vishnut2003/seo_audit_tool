import { getReportResponseInterface } from "@/Interfaces/SeoOptimer/GetResponseInterface"
import { Image, Text, View } from "@react-pdf/renderer"

const Keywords = ({ fullReport }: {
    fullReport: getReportResponseInterface
}) => {
    return (
        <View style={{
            display: "flex",
            flexDirection: "row",
            gap: "30px",
            justifyContent: "center",
            alignItems: "center",
        }}>

            <View style={{ width: "80%" }}>
                <Image 
                style={{width: "100%"}}
                src={'/pdf-assets/keywords-section.png'}/>
            </View>

            <View style={{ width: "100%", display: "flex", gap: "10px" }}>

                <View style={{
                    display: "flex",
                    flexDirection: "row",
                    gap: "7px",
                    alignItems: "center",
                }}>
                    <Text style={{ fontSize: "18px", fontWeight: 600 }}>Keywords Usage</Text>
                    {
                        fullReport.data.output.keywords?.passed ?
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

                {/* Keyword explained */}
                <Text style={{ fontSize: "11px" }}>Keywords are vital for SEO, connecting user queries with content. Properly placed keywords boost search engine visibility, improve relevance,
                    attract targeted traffic, and enhance rankings, driving better engagement and conversions for your website</Text>

                <Text style={{
                    fontSize: "13px",
                    fontWeight: 600
                }}>Details: <Text style={{ fontWeight: 400 }}>{fullReport.data.output.keywords?.shortAnswer}</Text></Text>

                <View style={{
                    display: "flex",
                    gap: "10px"
                }}>
                    <Text style={{
                        fontSize: "13px",
                        fontWeight: 600
                    }}>Keywords</Text>

                    <View style={{
                        display: "flex",
                        gap: "10px"
                    }}>
                        {/* List of keywords. */

                            fullReport.data.output.keywords?.data?.keywords?.map((keyword, index) => {
                                if (index < 5) return (
                                    <View key={index} style={{
                                        fontSize: "12px",
                                        display: "flex",
                                        flexDirection: "row",
                                        gap: "7px"
                                    }}>
                                        <Text style={{fontWeight: 600}}>{index + 1}</Text>
                                        <Text>{keyword.word} - {keyword.count} times</Text>
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

export default Keywords