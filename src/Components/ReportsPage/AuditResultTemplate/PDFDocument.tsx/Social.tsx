import { getReportResponseInterface } from "@/Interfaces/SeoOptimer/GetResponseInterface"
import { Text, View } from "@react-pdf/renderer"

const Social = ({fullReport}: {
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

            <View style={{ width: "100%", display: "flex", gap: "15px" }}>

                {/* Facebook Link */}
                <View style={{ width: "100%", display: "flex", gap: "5px" }}>
                    {/* Section title */}
                    <View style={{
                        display: "flex",
                        flexDirection: "row",
                        gap: "7px",
                        alignItems: "center",
                    }}>
                        <Text style={{ fontSize: "18px", fontWeight: 600 }}>Facebook Link</Text>
                        {
                            fullReport.data.output.facebookLink?.passed ?
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
                        fontSize: "11px",
                        fontWeight: 600
                    }}>Details: <Text style={{ fontWeight: 400 }}>{fullReport.data.output.facebookLink?.shortAnswer}</Text></Text>
                </View>
                
                
                {/* Facebook Pixel */}
                <View style={{ width: "100%", display: "flex", gap: "5px" }}>
                    {/* Section title */}
                    <View style={{
                        display: "flex",
                        flexDirection: "row",
                        gap: "7px",
                        alignItems: "center",
                    }}>
                        <Text style={{ fontSize: "18px", fontWeight: 600 }}>Facebook Pixel</Text>
                        {
                            fullReport.data.output.facebookPixel?.passed ?
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
                        fontSize: "11px",
                        fontWeight: 600
                    }}>Details: <Text style={{ fontWeight: 400 }}>{fullReport.data.output.facebookPixel?.shortAnswer}</Text></Text>
                </View>
                
                
                {/* Twitter Link */}
                <View style={{ width: "100%", display: "flex", gap: "5px" }}>
                    {/* Section title */}
                    <View style={{
                        display: "flex",
                        flexDirection: "row",
                        gap: "7px",
                        alignItems: "center",
                    }}>
                        <Text style={{ fontSize: "18px", fontWeight: 600 }}>Twitter Link</Text>
                        {
                            fullReport.data.output.twitterLink?.passed ?
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
                        fontSize: "11px",
                        fontWeight: 600
                    }}>Details: <Text style={{ fontWeight: 400 }}>{fullReport.data.output.twitterLink?.shortAnswer}</Text></Text>
                </View>
                
                
                {/* Twitter Tags */}
                <View style={{ width: "100%", display: "flex", gap: "5px" }}>
                    {/* Section title */}
                    <View style={{
                        display: "flex",
                        flexDirection: "row",
                        gap: "7px",
                        alignItems: "center",
                    }}>
                        <Text style={{ fontSize: "18px", fontWeight: 600 }}>Twitter Tags</Text>
                        {
                            fullReport.data.output.twitterTags?.passed ?
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
                        fontSize: "11px",
                        fontWeight: 600
                    }}>Details: <Text style={{ fontWeight: 400 }}>{fullReport.data.output.twitterTags?.shortAnswer}</Text></Text>
                </View>
                
                
                {/* Instagram Link */}
                <View style={{ width: "100%", display: "flex", gap: "5px" }}>
                    {/* Section title */}
                    <View style={{
                        display: "flex",
                        flexDirection: "row",
                        gap: "7px",
                        alignItems: "center",
                    }}>
                        <Text style={{ fontSize: "18px", fontWeight: 600 }}>Instagram Link</Text>
                        {
                            fullReport.data.output.instagramLink?.passed ?
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
                        fontSize: "11px",
                        fontWeight: 600
                    }}>Details: <Text style={{ fontWeight: 400 }}>{fullReport.data.output.instagramLink?.shortAnswer}</Text></Text>
                </View>

            </View>
            
            
            <View style={{ width: "100%", display: "flex", gap: "15px" }}>

                {/* Youtube Link */}
                <View style={{ width: "100%", display: "flex", gap: "5px" }}>
                    {/* Section title */}
                    <View style={{
                        display: "flex",
                        flexDirection: "row",
                        gap: "7px",
                        alignItems: "center",
                    }}>
                        <Text style={{ fontSize: "18px", fontWeight: 600 }}>YouTube Link</Text>
                        {
                            fullReport.data.output.youtubeLink?.passed ?
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
                        fontSize: "11px",
                        fontWeight: 600
                    }}>Details: <Text style={{ fontWeight: 400 }}>{fullReport.data.output.youtubeLink?.shortAnswer}</Text></Text>
                </View>
                
                
                {/* LinkedIn Link */}
                <View style={{ width: "100%", display: "flex", gap: "5px" }}>
                    {/* Section title */}
                    <View style={{
                        display: "flex",
                        flexDirection: "row",
                        gap: "7px",
                        alignItems: "center",
                    }}>
                        <Text style={{ fontSize: "18px", fontWeight: 600 }}>LinkedIn Link</Text>
                        {
                            fullReport.data.output.linkedInLink?.passed ?
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
                        fontSize: "11px",
                        fontWeight: 600
                    }}>Details: <Text style={{ fontWeight: 400 }}>{fullReport.data.output.linkedInLink?.shortAnswer}</Text></Text>
                </View>
                
                
                {/* OpenGraph tags */}
                <View style={{ width: "100%", display: "flex", gap: "5px" }}>
                    {/* Section title */}
                    <View style={{
                        display: "flex",
                        flexDirection: "row",
                        gap: "7px",
                        alignItems: "center",
                    }}>
                        <Text style={{ fontSize: "18px", fontWeight: 600 }}>OpenGraph Tags</Text>
                        {
                            fullReport.data.output.openGraphTags?.passed ?
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
                        fontSize: "11px",
                        fontWeight: 600
                    }}>Details: <Text style={{ fontWeight: 400 }}>{fullReport.data.output.openGraphTags?.shortAnswer}</Text></Text>
                </View>

            </View>

        </View>
    )
}

export default Social