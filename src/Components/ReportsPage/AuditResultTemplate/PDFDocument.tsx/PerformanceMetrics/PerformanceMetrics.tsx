import { getReportResponseInterface } from '@/Interfaces/SeoOptimer/GetResponseInterface'
import { Image, Text, View } from '@react-pdf/renderer'
import React from 'react'

const PerformanceMetrics = ({ fullReport }: {
    fullReport: getReportResponseInterface
}) => {
    return (
        <View style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            gap: "10px"
        }}>

            <View style={{ width: "100%", display: 'flex', gap: '10px' }}>

                {/* Section Heading */}
                <View>
                    <Text style={{
                        fontWeight: 600,
                        fontSize: '18px',
                    }}>Performance Metrics</Text>
                </View>

                {/* Overall Performance */}
                <View style={{ fontSize: "11px" }}>
                    <Text style={{
                        fontWeight: 600,
                        fontSize: "13px"
                    }}>Overall:</Text>

                    <Text>{fullReport.data.output.scores.overall.title}</Text>
                </View>
                
                <Text style={{fontSize: "15px", fontWeight: 600}}>Details:</Text>
                
                {/* On-Page SEO Performance */}
                <View style={{ fontSize: "11px" }}>
                    <Text style={{
                        fontWeight: 600,
                        fontSize: "13px"
                    }}>{fullReport.data.output.scores.seo.title}</Text>

                    <Text>On-Page SEO focuses on optimizing website elements, improving speed, enhancing user experience, and ensuring mobile-friendly performance.</Text>
                </View>
                
                {/* Links Performance */}
                <View style={{ fontSize: "11px" }}>
                    <Text style={{
                        fontWeight: 600,
                        fontSize: "13px"
                    }}>{fullReport.data.output.scores.links.title}</Text>

                    <Text>Links play a vital role in navigation, SEO, user engagement, ensuring accessibility, and enhancing overall page performance.</Text>
                </View>
                
                {/* Speed Performance */}
                <View style={{ fontSize: "11px" }}>
                    <Text style={{
                        fontWeight: 600,
                        fontSize: "13px"
                    }}>{fullReport.data.output.scores.performance.title}</Text>

                    <Text>Speed is crucial for user satisfaction, search rankings, reduced bounce rates, faster load times, and improved performance metrics.</Text>
                </View>
                
                {/* Social SEO Performance */}
                <View style={{ fontSize: "11px" }}>
                    <Text style={{
                        fontWeight: 600,
                        fontSize: "13px"
                    }}>{fullReport.data.output.scores.social.title}</Text>

                    <Text>Social sharing boosts engagement, drives traffic, improves visibility, enhances brand presence, and fosters connections with users.</Text>
                </View>
                
                {/* UI Performance */}
                <View style={{ fontSize: "11px" }}>
                    <Text style={{
                        fontWeight: 600,
                        fontSize: "13px"
                    }}>{fullReport.data.output.scores.ui.title}</Text>

                    <Text>Usability focuses on intuitive design, seamless navigation, accessibility, user satisfaction, task efficiency, and enhanced overall experience.</Text>
                </View>
            </View>

            <View style={{ width: "80%" }}>
                <Image
                    src={"/pdf-assets/performance-section-image.png"}
                    style={{
                        width: "100%"
                    }}
                />
            </View>

        </View>
    )
}

export default PerformanceMetrics