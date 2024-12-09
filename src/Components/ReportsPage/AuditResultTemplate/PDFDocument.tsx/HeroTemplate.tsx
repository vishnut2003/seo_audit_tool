import { getReportResponseInterface } from "@/Interfaces/SeoOptimer/GetResponseInterface"
import { Image, Page, Text, View } from "@react-pdf/renderer"

const HeroTemplate = ({fullReport}: {
    fullReport: getReportResponseInterface
}) => {
    return (
        <Page
            size="A4"
            orientation="landscape"
            style={{
                backgroundColor: "#7fa042",
                display: "flex",
                justifyContent: "center",
                alignItems: "center"
            }}
        >
            <View style={{
                display: "flex",
                gap: "20px",
                justifyContent: "center",
                alignItems: "center"
            }}>

                <Image
                    src={'/webspider-circle-bg-icon.png'}
                    style={{
                        width: "100px"
                    }}
                />

                <View style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center"
                }}>
                    <Text style={{
                        fontSize: "25px",
                        fontWeight: 800,
                        color: "white"
                    }}>Audit report for {fullReport.data.input.url}</Text>

                    <Text style={{
                        fontSize: "15px",
                        fontWeight: 400,
                        color: "white"
                    }}>by webspidersolutions.com</Text>
                </View>
            </View>
        </Page>
    )
}

export default HeroTemplate