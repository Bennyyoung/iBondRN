import { Dimensions, StyleSheet, TouchableOpacity } from "react-native"
import Text from "../Text"
import { RFValue } from "react-native-responsive-fontsize"

const { height } = Dimensions.get('window')

type FollowTextProps = {
    followText?: string
    fontSize?: number
}

const FollowText = ({ followText, fontSize = 12 }: FollowTextProps) => {
    const styles = StyleSheet.create({
        followText: {
            color: '#6500E0',
            fontWeight: '400',
            fontSize: RFValue(fontSize, height),
        },
    })

    return (
        <TouchableOpacity>
            <Text style={styles.followText}>{followText}</Text>
        </TouchableOpacity>
    )
}

export default FollowText

