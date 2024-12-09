import { Font, StyleSheet, Text, View } from "@react-pdf/renderer"

const DomainMetrics = () => {

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
            color: "#7fa042"
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

                <View style={{display: "flex", gap: "10px"}}>
                    <View style={{
                        backgroundColor: "#7fa042",
                        color: "white",
                        padding: "15px 25px",
                        display: "flex",
                        flexDirection: "row",
                        gap: "20px",
                        fontSize: "15px",
                        fontWeight: 600,
                        borderRadius: '10px',
                        justifyContent: "space-between"
                    }}>
                        <Text>Domain Authority</Text>
                        <Text>77 <Text style={{fontSize: "11px"}}>/100</Text></Text>
                    </View>

                    <View style={{
                        backgroundColor: "#7fa042",
                        color: "white",
                        padding: "15px 25px",
                        display: "flex",
                        flexDirection: "row",
                        gap: "20px",
                        fontSize: "15px",
                        fontWeight: 600,
                        borderRadius: '10px',
                        justifyContent: "space-between"
                    }}>
                        <Text>Total Backlinks</Text>
                        <Text>77 <Text style={{fontSize: "11px"}}>/100</Text></Text>
                    </View>

                    <View style={{
                        backgroundColor: "#7fa042",
                        color: "white",
                        padding: "15px 25px",
                        display: "flex",
                        flexDirection: "row",
                        gap: "20px",
                        fontSize: "15px",
                        fontWeight: 600,
                        borderRadius: '10px',
                        justifyContent: "space-between"
                    }}>
                        <Text>Domain Strength</Text>
                        <Text>77 <Text style={{fontSize: "11px"}}>/100</Text></Text>
                    </View>
                    
                    <View style={{
                        backgroundColor: "#7fa042",
                        color: "white",
                        padding: "15px 25px",
                        display: "flex",
                        flexDirection: "row",
                        gap: "20px",
                        fontSize: "15px",
                        fontWeight: 600,
                        borderRadius: '10px',
                        justifyContent: "space-between"
                    }}>
                        <Text>Referring Domains</Text>
                        <Text>77 <Text style={{fontSize: "11px"}}>/100</Text></Text>
                    </View>
                </View>
            </View>
        </View>
    )
}

export default DomainMetrics