import { Document, View, Text, Page, StyleSheet, Styles } from "@react-pdf/renderer";
import React from "react";
import PageTemplate from "./PageTemplate";

const PDFTemplate = () => {
    
    const styles = StyleSheet.create({
        page: {
            flexDirection: 'row',
            backgroundColor: '#E4E4E4'
        },
        section: {
            margin: 10,
            padding: 10,
            flexGrow: 1
        }
    });
    
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