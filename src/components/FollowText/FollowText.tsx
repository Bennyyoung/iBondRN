import { Dimensions, StyleSheet, TouchableOpacity } from "react-native"
import Text from "../Text"
import { RFValue } from "react-native-responsive-fontsize"

const { height } = Dimensions.get('window')

type FollowTextProps = {
    followText: string
}

const FollowText = ({ followText }: FollowTextProps) => {

    return (
        <TouchableOpacity>
            <Text style={styles.followText}>{followText}</Text>
        </TouchableOpacity>
    )
}

export default FollowText

const styles = StyleSheet.create({
    followText: {
        color: '#6500E0',
        fontWeight: '400',
        fontSize: RFValue(12, height),
    },
})