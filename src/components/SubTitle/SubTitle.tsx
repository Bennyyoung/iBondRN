import { Dimensions, StyleSheet, TouchableOpacity } from "react-native"
import Box from "@/components/Box"
import Text from "@/components/Text"
import { RFValue } from "react-native-responsive-fontsize"
RFValue

type SubTitle = {
    title: string
    subtitle: string
}

const { height } = Dimensions.get('window')

const SubTitle = ({ title, subtitle }: SubTitle) => {

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
        marginTop: 20,
        marginBottom: 10
    },
    title: {
        fontSize: RFValue(17, height),
        letterSpacing: -0.43,
        fontWeight: '600'
    },
    subtitle: {
        color: '#999BAD',
        fontWeight: 400,
        fontSize: RFValue(13, height),
        lineHeight: 18,
        letterSpacing: -0.08
    }
})

export default SubTitle