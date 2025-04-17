import { Text, View } from '@react-pdf/renderer'
import React from 'react'

const PDFPageFooter = ({
    currentPageNo,
    totalPage,
}: {
    totalPage: number,
    currentPageNo: number,
}) => {
    return (
        <View>
            <Text
                style={{
                    fontSize: "10px",
                    fontWeight: 600,
                    padding: '20px 30px',
                }}
            >Page No. {currentPageNo} of Total Page {totalPage}</Text>
        </View>
    )
}

export default PDFPageFooter