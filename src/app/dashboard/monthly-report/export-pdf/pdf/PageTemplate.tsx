import { Page, StyleSheet, View } from '@react-pdf/renderer'
import React, { ReactNode } from 'react'
import PDFPageFooter from './PageFooter'

const PageTemplate = ({
    children,
    pageNo,
    totalPage,
}: {
    children: ReactNode,
    pageNo: number,
    totalPage: number,
}) => {
    const styleSheet = StyleSheet.create({
        pageStyle: {
            backgroundColor: 'white',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: "space-between"
        },
        contentWrapper: {
            padding: '20px 30px'
        }
    })

    return (
        <Page
            size="A4"
            orientation="portrait"
            style={styleSheet.pageStyle}
        >
            <View style={styleSheet.contentWrapper}>
                {children}
            </View>
            <PDFPageFooter
                currentPageNo={pageNo}
                totalPage={totalPage}
            />
        </Page>
    )
}

export default PageTemplate