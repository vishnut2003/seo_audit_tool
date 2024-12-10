import { Text, View } from "@react-pdf/renderer"

const OnPageLinks = () => {
  return (
    <View style={{
        display: "flex",
        flexDirection: "row",
        gap: "30px",
        justifyContent: "center",
        alignItems: "center",
    }}>

        <View style={{width: "100%"}}>
            <Text>Left Col</Text>
        </View>
        
        <View style={{width: "100%"}}>
            <Text>Right Col</Text>
        </View>

    </View>
  )
}

export default OnPageLinks