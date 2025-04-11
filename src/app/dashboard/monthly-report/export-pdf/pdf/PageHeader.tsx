import { Text, View } from '@react-pdf/renderer'
import React from 'react'

const PDFPageHeader = () => {
    return (
        <View>
            <Text
                style={{
                    fontSize: "18px", 
                    fontWeight: 600,
                }}
            >Header</Text>
        </View>
    )
}

export default PDFPageHeader