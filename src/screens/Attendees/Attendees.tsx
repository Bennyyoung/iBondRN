import Box from "@/components/Box"
import FollowText from "@/components/FollowText/FollowText"
import Text from "@/components/Text"
import attendees from "@/utils/attendees"
import { Dimensions } from "react-native"
import { RFValue } from "react-native-responsive-fontsize"

const { height } = Dimensions.get('window')

const Attendees = () => {

    return (
        <>
            {attendees.map((attendee) => (
                <Box key={attendee.id} style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 10 }}>
                    {/* Profile Image */}
                    <Box style={{ flexDirection: 'row', alignItems: 'center' }}>
                        {attendee.profileImage}

                        {/* attendee Details */}
                        <Box style={{ marginLeft: 10 }}>
                            <Text style={{ fontWeight: '400', fontSize: RFValue(16, height), color: '#151619' }}>{attendee.userName} <Text style={{ color: '#3D3F4B', fontSize: RFValue(13, height) }}>•</Text> 
                            <Text style={{ color: '#3D3F4B', fontSize: RFValue(13, height)}}>{attendee.handle}</Text></Text>
                            <Text style={{ color: '#999BAD', fontSize: 14 }}>{attendee.university}</Text>
                        </Box>
                    </Box>

                    {/* Follow Text */}
                    <FollowText followText={attendee.followText} />
                </Box>
            ))}
        </>
    )
}

export default Attendees