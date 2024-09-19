import { StyleSheet, TouchableOpacity } from "react-native"
import Box from "@/components/Box"
import Text from "@/components/Text"
import { RFValue } from "react-native-responsive-fontsize"
RFValue

type SubTitle = {
    title: string
    subtitle: string
}

const SubTitle = ({title, subtitle}: SubTitle) => {

    return (
        <Box style={styles.container}>
            <Text style={styles.title}>{title}</Text>
            <TouchableOpacity>
                <Text style={styles.subtitle}>{subtitle}</Text>
            </TouchableOpacity>
        </Box>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginHorizontal: 20,
        marginVertical: 10
    },
    title: {
        fontSize: RFValue(17),
        letterSpacing: -0.43,
        fontWeight: '600'
    },
    subtitle: {
        color: '#999BAD',
        fontWeight: 400,
        fontSize: RFValue(13),
        lineHeight: 18,
        letterSpacing: -0.08
    }
})

export default SubTitle