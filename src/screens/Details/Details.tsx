import Box from "@/components/Box"
import Text from "@/components/Text"
import TopEventsForYou from "@/components/TopEventsForYou/TopEventsForYou"
import { Dimensions, Image, StyleSheet } from "react-native"
import { RFValue } from "react-native-responsive-fontsize"
import SmallProfileIcon from "@/assets/svg/smallProfileIcon.svg"
import { Event, EventDetails, EventDetailsProps, RouteParams } from "@/navigation/types"
import MapView, { Marker } from "react-native-maps"

const { height } = Dimensions.get('window')

const profileDisplayIcons = [1, 2, 3, 4]

const Details = ({ event }: EventDetails) => {
    
    return (
        <Box>
            <Box style={styles.detailsSection}>
                <Box style={styles.attendeesList}>
                    <Box style={styles.attendeesContainer}>
                        {profileDisplayIcons.map((_, index) => (
                            <Box key={index} style={styles.profileContainer}>
                                <SmallProfileIcon width={40} height={40} style={styles.profileIcon} />
                            </Box>
                        ))}
                    </Box>
                    <Text style={styles.attendeeText}>286 Attendees</Text>
                </Box>

                {/* Event Details */}
                <Box style={styles.infoRow}>
                    <Text style={styles.icon}>{event?.statusIcon}</Text>
                    <Text style={styles.infoText}>{event.eventStatus}</Text>
                </Box>

                <Box style={styles.infoRow}>
                    <Text style={styles.icon}>{event.eventTimeIcon}</Text>
                    <Text style={styles.infoText}>11:30 AM</Text>
                </Box>

                <Box style={styles.infoRow}>
                    <Text style={styles.icon}>{event.platformIcon}</Text>
                    <Text style={styles.infoText}>{event.eventType}</Text>
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
                    Join us for an insightful and practical event designed to empower Nigerian employees with tools and strategies needed to thrive in a remote work environment.
                </Text>
            </Box>
        </Box>
    )
}

export default Details

const styles = StyleSheet.create({
    detailsSection: {
        marginVertical: 10,
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
        marginVertical: 5,
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