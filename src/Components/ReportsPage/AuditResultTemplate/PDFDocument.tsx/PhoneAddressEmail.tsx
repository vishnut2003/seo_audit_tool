import { getReportResponseInterface } from "@/Interfaces/SeoOptimer/GetResponseInterface"
import { Image, Text, View } from "@react-pdf/renderer"

const PhoneAddressEmail = ({fullReport}: {
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

                {/* Plain Text Email */}
                <View style={{ width: "100%", display: "flex", gap: "10px" }}>
                    {/* Section title */}
                    <View style={{
                        display: "flex",
                        flexDirection: "row",
                        gap: "7px",
                        alignItems: "center",
                    }}>
                        <Text style={{ fontSize: "18px", fontWeight: 600 }}>Email Address</Text>
                        {
                            fullReport.data.output.email?.passed ?
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
                    <Text style={{ fontSize: "11px" }}>plain text emails for SEO is reduced engagement. Without links, users can&apos;t easily access additional 
                        content, leading to fewer conversions, lower traffic, and limited interaction with your website.</Text>

                    {/* Details */}
                    <Text style={{
                        fontSize: "13px",
                        fontWeight: 600
                    }}>Details: <Text style={{ fontWeight: 400 }}>{fullReport.data.output.email?.shortAnswer}</Text></Text>
                </View>

                {/* Phone number and address */}
                <View style={{ width: "100%", display: "flex", gap: "10px" }}>
                    {/* Section title */}
                    <View style={{
                        display: "flex",
                        flexDirection: "row",
                        gap: "7px",
                        alignItems: "center",
                    }}>
                        <Text style={{ fontSize: "18px", fontWeight: 600 }}>Phone Number, Address</Text>
                        {
                            fullReport.data.output.websitePhoneAddress?.passed ?
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
                    <Text style={{ fontSize: "11px" }}>Including a phone number and address on your website enhances SEO by improving local search visibility. 
                        It boosts trust, aids in local rankings, and provides search engines with accurate location-based information.</Text>

                    {/* Details */}
                    <Text style={{
                        fontSize: "11px",
                        fontWeight: 600
                    }}>Details: <Text style={{ fontWeight: 400 }}>{fullReport.data.output.websitePhoneAddress?.shortAnswer}</Text></Text>
                    
                    <Text style={{
                        fontSize: "11px",
                        fontWeight: 600
                    }}>Component: <Text style={{ fontWeight: 400 }}>{fullReport.data.output.websitePhoneAddress?.data?.missing}</Text></Text>
                </View>

            </View>

            <View style={{ width: "80%" }}>
                <Image
                    style={{ width: "100%" }}
                    src={'/pdf-assets/email-phone-address-section.png'} />
            </View>

        </View>
    )
}

export default PhoneAddressEmail