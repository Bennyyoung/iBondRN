import Box from "@/components/Box"
import Text from "@/components/Text"
import TopEventsForYou from "@/components/TopEventsForYou/TopEventsForYou"
import { Dimensions, Image, StyleSheet } from "react-native"
import { RFValue } from "react-native-responsive-fontsize"
import SmallProfileIcon from "@/assets/svg/smallProfileIcon.svg"
import MapView, { Marker } from "react-native-maps"
import users from "@/utils/users"
import { Event } from "@/components/types"
import { SvgIcon } from "@/assets/icons/SvgIcon"
import moment from "moment"

const { height } = Dimensions.get('window')

const Details = ({ event }: { event: Event }) => {

    return (
        <Box>
            <Box style={styles.detailsSection}>
                {
                    event.attendees.length > 0 ? (
                        <Box style={styles.attendeesList}>
                            <Box style={styles.attendeesContainer}>
                                {
                                    // users.slice(1, 5).map((user, index) => (
                                    // <Box key={index} style={styles.profileContainer}>
                                    //     {user.profileImage}
                                    // </Box>
                                    // ))

                                    event.attendees.length > 0 ? (
                                        event.attendees.slice(1, 5).map((attendee, index) => (
                                            <Box key={index} style={styles.profileContainer}>
                                                {attendee?.profileImage}
                                            </Box>
                                        ))
                                    ) : null
                                }
                            </Box>
                            <Text style={styles.attendeeText}>
                                {`${event.attendees.length} ${(event.attendees.length === 0 || event.attendees.length === 1) ? 'Attendee' : 'Attendees'}`}
                            </Text>
                        </Box>
                    ) : null
                }

                {/* Event Details */}
                <Box style={styles.infoRow}>
                    <SvgIcon name="calendar" size='sm' style={{ marginRight: 5 }} />
                    <Text style={{ fontSize: RFValue(16, height) }}>{moment(event.date).format('dddd D MMM, YYYY')}</Text>
                    {/* h:mm A */}
                </Box>

                <Box style={styles.infoRow}>
                    <SvgIcon name="clock" size="sm" style={{ marginRight: 5 }} />
                    <Text style={{ fontSize: RFValue(16, height) }}>{moment(event.date).format('h:mm A')}</Text>
                </Box>

                <Box style={[styles.infoRow, styles.lastRow]}>
                    <SvgIcon name="location" size="sm" color='black' style={{ marginRight: 5 }} />
                    <Text style={{ textTransform: 'capitalize', fontSize: RFValue(16, height) }}>{event.location}</Text>
                </Box>

                {/* Google Map */}
                {/* <MapView
                    style={styles.map}
                    initialRegion={{
                        latitude: 37.7749, // Latitude of San Francisco
                        longitude: -122.4194, // Longitude of San Francisco
                        latitudeDelta: 0.0922,
                        longitudeDelta: 0.0421,
                    }}
                >
                    <Marker
                        coordinate={{ latitude: 37.7749, longitude: -122.4194 }}
                        title="San Francisco"
                        description="This is San Francisco"
                    />
                </MapView> */}

                {/* More Details */}
                <Text style={{ color: '#151619', fontWeight: '400', fontSize: RFValue(16, height) }}>More Details</Text>
                <Text style={styles.moreDetails}>
                    {event.otherDetails}
                </Text>
            </Box>
        </Box>
    )
}

export default Details

const styles = StyleSheet.create({
    detailsSection: {
        // marginVertical: 10,
    },
    sectionTitle: {
        fontSize: RFValue(16, height),
        fontWeight: 'bold',
    },
    attendeesList: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    attendeesContainer: {
        flexDirection: 'row',
        marginRight: 10,
        marginLeft: 25
    },
    profileContainer: {
        marginLeft: -27,  // For slight overlap of icons
        borderRadius: 20, // Circular container
        borderWidth: 2,
        borderColor: '#fff', // White border for a clean look
        overflow: 'hidden',  // Ensures the SVG doesn't overflow the borderRadius
    },
    profileIcon: {
        width: 40,  // Width of the SVG
        height: 40, // Height of the SVG
    },
    attendeeText: {
        fontSize: RFValue(16, height),
        fontWeight: '400',
        color: '#151619', // Customize the color as needed
    },
    infoRow: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 20,
        borderBottomWidth: 0.4,  // Add a bottom border
        borderBottomColor: 'grey',  // Set the color for the horizontal line,
    },
    lastRow: {
        borderBottomWidth: 0,  // Remove the border from the last row
    },
    icon: {
        fontSize: RFValue(18, height),
        marginRight: 8,
    },
    infoText: {
        fontSize: RFValue(13, height),
        fontWeight: '400',
        lineHeight: 18,
        color: '#151619'
    },
    map: {
        width: '100%',
        height: 300, // Adjust height as needed
    },
    mapButton: {
        position: 'absolute',
        top: 10,
        left: 10,
        backgroundColor: '#E0E0E0',
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderRadius: 5,
        color: '#333',
        fontSize: 14,
    },
    moreDetails: {
        fontSize: RFValue(14, height),
        color: '#666',
        marginVertical: 10,
    },
})