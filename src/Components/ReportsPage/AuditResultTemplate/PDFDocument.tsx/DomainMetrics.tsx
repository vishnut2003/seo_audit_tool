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
        },
        colRight: {
            width: '100%'
        },
        leftHeading: {
            fontSize: '20px',
            fontWeight: "extrabold",
        },
        leftPara: {
            fontSize: '15px',
        }
    })

    return (
        <View style={styleSheet.mainWrapper}>
            <View style={styleSheet.colLeft}>
                <View>
                    <Text style={styleSheet.leftHeading}>Heading</Text>
                    <Text style={styleSheet.leftPara}>Paragraph</Text>
                </View>
                <View>
                    <Text style={styleSheet.leftHeading}>Heading</Text>
                    <Text style={styleSheet.leftPara}>Paragraph</Text>
                </View>
            </View>
            <View style={styleSheet.colRight}>
                <Text style={styleSheet.leftHeading}>Heading</Text>
            </View>
        </View>
    )
}

export default DomainMetrics