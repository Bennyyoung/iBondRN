import React from "react"
import Box from "@/components/Box"
import FollowText from "@/components/FollowText/FollowText"
import Text from "@/components/Text"
import { Dimensions, StyleSheet } from "react-native"
import { RFValue } from "react-native-responsive-fontsize"
const { height } = Dimensions.get('window')
import { User } from "../types";

type UsersBoxProps = {
    users: User[]
    type: string
}

const UsersBox = (props: UsersBoxProps) => {
    const { users, type } = props

    return (
        <>
            {users.length > 0 ? users.map((user: User) => (
                <Box key={user.id} style={styles.attendeeContainer}>
                    {/* Profile Image and Online Indicator */}
                    <Box style={styles.profileContainer}>
                        <Box style={styles.imageWrapper}>
                            {user.isOnline && <Box style={styles.onlineIndicator} />}
                            {user.profileImage}
                        </Box>
                        {/* User Details */}
                        <Box style={styles.userDetails}>
                            <Text style={styles.userName}>
                                {user.userName} <Text style={styles.dotSeparator}>•</Text>
                                <Text style={styles.userHandle}>{user.handle}</Text>
                            </Text>
                            <Text style={styles.university}>{user.university}</Text>
                        </Box>
                    </Box>

                    {/* Follow Text */}
                    <FollowText
                        followText={user.followText}
                        fontSize={17}
                    />
                </Box>
            )) : (
                <Box style={styles.emptyContainer}>
                    <Text style={styles.emptyArray}>No {type} yet</Text>
                </Box>
            )
            }
        </>
    )
}

export default UsersBox

const styles = StyleSheet.create({
    attendeeContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 10,
    },
    profileContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    imageWrapper: {
        position: 'relative',
    },
    onlineIndicator: {
        position: 'absolute',
        backgroundColor: '#006E28',
        borderRadius: 6,
        borderWidth: 1.5,
        borderColor: '#006E28',
        width: 12,
        height: 12,
        zIndex: 12,
        top: 30,
        left: 30,
        right: -6,
    },
    userDetails: {
        marginLeft: 10,
    },
    userName: {
        fontWeight: '400',
        fontSize: RFValue(16, height),
        color: '#151619',
    },
    dotSeparator: {
        color: '#3D3F4B',
        fontSize: RFValue(13, height),
    },
    userHandle: {
        color: '#3D3F4B',
        fontSize: RFValue(13, height),
    },
    university: {
        color: '#999BAD',
        fontSize: 14,
    },
    emptyContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    emptyArray: {
        textAlign: 'center',
        fontSize: RFValue(16, height)
    }
})