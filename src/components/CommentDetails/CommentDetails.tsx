import { Dimensions, StyleSheet, TouchableOpacity } from "react-native";
import Box from "@/components/Box";
import Text from "@/components/Text";
import { RFValue } from "react-native-responsive-fontsize";
import FollowText from "@/components/FollowText/FollowText";

const { height } = Dimensions.get('window')

const CommentDetails = ({
    userName,
    userUniversity,
    timeAgo,
    followText
}: {
    userName: string;
    userUniversity: string;
    timeAgo: string;
    followText?: string
}) => {
    return (
        <>
            <Box style={styles.commentDetails}>
                <Box width={188} style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Text style={styles.userName}>{userName}</Text>
                    <Text style={styles.dot}>•</Text>
                    <Text style={styles.timeAgo}>{timeAgo}</Text>
                </Box>
                {followText && <FollowText followText={followText} />}
            </Box>
            <Text style={styles.userUniversity}>{userUniversity}</Text>

        </>
    );
};

export default CommentDetails

const styles = StyleSheet.create({
    commentDetails: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    userName: {
        fontWeight: '600',
        fontSize: RFValue(13, height),
        color: '#151619',
        lineHeight: RFValue(16, height)
    },
    dot: {
        color: '#3D3F4B',
        fontSize: RFValue(16, height),
        marginHorizontal: 5,
    },
    timeAgo: {
        color: '#3D3F4B',
        marginLeft: 5,
        fontSize: RFValue(11, height),
        lineHeight: RFValue(16, height)
    },
    followText: {
        color: '#6500E0',
        fontWeight: '400',
        fontSize: RFValue(12, height),
    },
    userUniversity: {
        fontSize: RFValue(12, height),
        color: '#999BAD',
    },
})