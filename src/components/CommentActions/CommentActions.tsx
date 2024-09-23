import Box from "@/components/Box"
import Text from "@/components/Text"
import { Dimensions, StyleSheet, TouchableOpacity } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";
import FollowText from "@/components/FollowText/FollowText";

const { height } = Dimensions.get('window')

const CommentActions = ({ followText }: { followText?: string }) => {
    return (
        <Box style={styles.actionsContainer}>
            <TouchableOpacity>
                <Text style={styles.actionText}>Reply</Text>
            </TouchableOpacity>
            <TouchableOpacity>
                <Text style={styles.actionText}>Like</Text>
            </TouchableOpacity>
            {followText && <FollowText followText={followText} />}

        </Box>
    );
};

export default CommentActions

const styles = StyleSheet.create({
    actionsContainer: {
        flexDirection: 'row',
        marginTop: 5,
    },
    actionText: {
        marginRight: 15,
        color: '#999BAD',
        fontSize: RFValue(12, height),
        fontWeight: '400'
    },
    followText: {
        marginLeft: 'auto',
        color: '#7c4dff',
    },
})