import { Document, View, Text } from "@react-pdf/renderer";
import React from "react";
import PageTemplate from "./PageTemplate";

const PDFTemplate = () => {
    
    return (
        <Document title="Site Audit">

            {/* Domain Metrics */}
            <PageTemplate>
                <View>
                    <Text>Hello</Text>
                </View>
            </PageTemplate>
        </Document>
    )
}

export default PDFTemplate