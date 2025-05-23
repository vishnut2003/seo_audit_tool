import { getReportResponseInterface } from "@/Interfaces/SeoOptimer/GetResponseInterface"
import { StyleSheet, Text, View } from "@react-pdf/renderer"

const DomainMetrics = ({ fullReport }: {
    fullReport: getReportResponseInterface
}) => {

    const styleSheet = StyleSheet.create({
        mainWrapper: {
            display: 'flex',
            flexDirection: 'row',
            width: '100%'
        },
        colLeft: {
            width: '100%',
            display: "flex",
            flexDirection: "column",
            gap: "20px"
        },
        colRight: {
            width: '100%',
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: "20px"
        },
        leftHeading: {
            fontSize: '15px',
            fontWeight: 800,
        },
        leftPara: {
            fontSize: '11px',
        }
    })

    return (
        <View style={styleSheet.mainWrapper}>
            <View style={styleSheet.colLeft}>
                <View>
                    <Text style={styleSheet.leftHeading}>1. Domain Authority</Text>
                    <Text style={styleSheet.leftPara}>Domain age is a metric that is often used to gauge the success of a website as it is an important factor that helps with determining the rank of a website. Domain age is basically the length of time the site has been registered and maintained.</Text>
                </View>
                <View>
                    <Text style={styleSheet.leftHeading}>2. Total Backlinks</Text>
                    <Text style={styleSheet.leftPara}>Domain age is a metric that is often used to gauge the success of a website as it is an important factor that helps with determining the rank of a website. Domain age is basically the length of time the site has been registered and maintained.</Text>
                </View>
                <View>
                    <Text style={styleSheet.leftHeading}>3. Domain Strength</Text>
                    <Text style={styleSheet.leftPara}>Domain age is a metric that is often used to gauge the success of a website as it is an important factor that helps with determining the rank of a website. Domain age is basically the length of time the site has been registered and maintained.</Text>
                </View>
                <View>
                    <Text style={styleSheet.leftHeading}>4. Referring Domains</Text>
                    <Text style={styleSheet.leftPara}>Domain age is a metric that is often used to gauge the success of a website as it is an important factor that helps with determining the rank of a website. Domain age is basically the length of time the site has been registered and maintained.</Text>
                </View>
            </View>
            <View style={styleSheet.colRight}>

                <View>
                    <Text style={{
                        fontWeight: 600,
                        fontSize: '18px',
                        textAlign: "center"
                    }}>Domain Metrics</Text>
                </View>

                <View style={{ display: "flex", gap: "10px" }}>

                    <View style={{
                        backgroundColor: "#7fa042",
                        color: "white",
                        padding: "10px 20px",
                        display: "flex",
                        flexDirection: "row",
                        gap: "20px",
                        fontSize: "12px",
                        fontWeight: 600,
                        borderRadius: '10px',
                        justifyContent: "space-between"
                    }}>
                        <Text>Domain Strength</Text>
                        <Text>{fullReport.data.output.backlinks?.data?.domain_strength} <Text style={{ fontSize: "11px" }}>/100</Text></Text>
                    </View>

                    <View style={{
                        backgroundColor: "#7fa042",
                        color: "white",
                        padding: "10px 20px",
                        display: "flex",
                        flexDirection: "row",
                        gap: "20px",
                        fontSize: "12px",
                        fontWeight: 600,
                        borderRadius: '10px',
                        justifyContent: "space-between"
                    }}>
                        <Text>Total Backlinks</Text>
                        <Text>{fullReport.data.output.backlinks?.data?.allbacklinks}</Text>
                    </View>

                    <View style={{
                        backgroundColor: "#7fa042",
                        color: "white",
                        padding: "10px 20px",
                        display: "flex",
                        flexDirection: "row",
                        gap: "20px",
                        fontSize: "12px",
                        fontWeight: 600,
                        borderRadius: '10px',
                        justifyContent: "space-between"
                    }}>
                        <Text>Referring Domains</Text>
                        <Text>{fullReport.data.output.backlinks?.data?.referring_domains}</Text>
                    </View>
                    
                    <View style={{
                        backgroundColor: "#7fa042",
                        color: "white",
                        padding: "10px 20px",
                        display: "flex",
                        flexDirection: "row",
                        gap: "20px",
                        fontSize: "12px",
                        fontWeight: 600,
                        borderRadius: '10px',
                        justifyContent: "space-between"
                    }}>
                        <Text>Page Strength</Text>
                        <Text>{fullReport.data.output.backlinks?.data?.page_strength}</Text>
                    </View>
                    
                    <View style={{
                        backgroundColor: "#7fa042",
                        color: "white",
                        padding: "10px 20px",
                        display: "flex",
                        flexDirection: "row",
                        gap: "20px",
                        fontSize: "12px",
                        fontWeight: 600,
                        borderRadius: '10px',
                        justifyContent: "space-between"
                    }}>
                        <Text>NoFollow Backlinks</Text>
                        <Text>{fullReport.data.output.backlinks?.data?.nofollow_backlinks}</Text>
                    </View>
                    
                    <View style={{
                        backgroundColor: "#7fa042",
                        color: "white",
                        padding: "10px 20px",
                        display: "flex",
                        flexDirection: "row",
                        gap: "20px",
                        fontSize: "12px",
                        fontWeight: 600,
                        borderRadius: '10px',
                        justifyContent: "space-between"
                    }}>
                        <Text>DoFollow Backlinks</Text>
                        <Text>{fullReport.data.output.backlinks?.data?.dofollow_backlinks}</Text>
                    </View>
                    
                    <View style={{
                        backgroundColor: "#7fa042",
                        color: "white",
                        padding: "10px 20px",
                        display: "flex",
                        flexDirection: "row",
                        gap: "20px",
                        fontSize: "12px",
                        fontWeight: 600,
                        borderRadius: '10px',
                        justifyContent: "space-between"
                    }}>
                        <Text>Edu Backlinks</Text>
                        <Text>{fullReport.data.output.backlinks?.data?.edu_backlinks}</Text>
                    </View>
                    
                    <View style={{
                        backgroundColor: "#7fa042",
                        color: "white",
                        padding: "10px 20px",
                        display: "flex",
                        flexDirection: "row",
                        gap: "20px",
                        fontSize: "12px",
                        fontWeight: 600,
                        borderRadius: '10px',
                        justifyContent: "space-between"
                    }}>
                        <Text>Gov Backlinks</Text>
                        <Text>{fullReport.data.output.backlinks?.data?.gov_backlinks}</Text>
                    </View>

                </View>
            </View>
        </View>
    )
}

export default DomainMetrics