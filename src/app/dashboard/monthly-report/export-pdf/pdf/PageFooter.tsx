import { Text, View } from '@react-pdf/renderer'
import React from 'react'

const PDFPageFooter = () => {
    return (
        <View>
            <Text
                style={{
                    fontSize: "18px",
                    fontWeight: 600,
                }}
            >Footer</Text>
        </View>
    )
}

export default PDFPageFooter