import { Image, Page, StyleSheet, Text, View } from "@react-pdf/renderer";

function PageTemplate({ children }: Readonly<{
    children: React.ReactNode,
}>) {

    const styleSheet = StyleSheet.create({
        pageStyle: {
            backgroundColor: 'white',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: "space-between"
        }
    })

    return (
        <Page
            size="A4"
            orientation="landscape"
            style={styleSheet.pageStyle}>
            <PageHeader />
            {children}
            <PageFooter />
        </Page>
    )
}

function PageHeader() {

    const styleSheet = StyleSheet.create({
        headerContainer: {
            display: 'flex',
            justifyContent: 'space-between',
            padding: '20px 30px'
        }
    })

    return (
        <View style={styleSheet.headerContainer}>
            <Image src={'/webspider-logo-icon.png'} style={{
                width: '50px'
            }} />
        </View>
    )
}

function PageFooter() {

    const styleSheet = StyleSheet.create({
        footerContainer: {
            width: '100%',
            padding: '20px 30px',
        },
        footerText: {
            fontSize: '16px'
        }
    })

    return (
        <View style={styleSheet.footerContainer}>
            <Text style={styleSheet.footerText}>webspidersolutions.com</Text>
        </View>
    )
}

export default PageTemplate;