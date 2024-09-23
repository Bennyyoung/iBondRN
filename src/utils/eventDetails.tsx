import { StyleSheet } from 'react-native'
import OngoingIcon from '@/assets/svg/ongoing.svg'
import TodayIcon from '@/assets/svg/today.svg'
import VirtualIcon from '@/assets/svg/virtual.svg'
import GoogleMeet from '@/assets/svg/googleMeet.svg'
import Clock from "@/assets/svg/clock.svg"
import EventTitleImage1 from "@/assets/svg/eventTitleImage1.svg"
import EventTitleImage2 from "@/assets/svg/eventTitleImage2.svg"
import EventTitleImage3 from "@/assets/svg/eventTitleImage3.svg"
import EventTitleImage4 from "@/assets/svg/eventTitleImage4.svg"
import EventTitleImage5 from "@/assets/svg/eventTitleImage5.svg"
import EventTitleImage6 from "@/assets/svg/eventTitleImage6.svg"
import OrganizerPicture from "@/assets/svg/organizerPicture.svg"

const styles = StyleSheet.create({
  image: {
    borderRadius: 8
  },
})

const eventDetails = [
  {
    id: 1,
    eventTitle: 'How to manage a remote work lifestyle',
    eventStatus: `Ongoing`,
    statusColor: '#FF3B30',
    eventType: 'Virtual',
    eventPlatform: 'Google Meet',
    platformIcon: <VirtualIcon />,
    statusIcon: <OngoingIcon />,
    meetingIcon: <GoogleMeet />,
    eventImage: <EventTitleImage1
      style={styles.image}
    />,
    organizer: {
      organizerPicture: <OrganizerPicture />,
      organizerName: 'Samantha Mathilda',
      organizerUniversity: 'University of Ibadan',
      isVerified: true
    }
  },
  {
    id: 2,
    eventTitle: 'How to manage time effectively',
    eventStatus: 'Today',
    statusColor: '#151619',
    eventType: 'Virtual',
    eventPlatform: 'Zoom',
    platformIcon: <VirtualIcon />,
    statusIcon: <TodayIcon />,
    meetingIcon: <GoogleMeet />,
    eventImage: <EventTitleImage2 />,
    organizer: {
      organizerPicture: <OrganizerPicture />,
      organizerName: 'Benjamin Daniel Effiong',
      organizerUniversity: 'University of Ibadan',
      isVerified: true
    }
  },
  {
    id: 3,
    eventTitle: 'How to manage time effectively',
    eventStatus: 'Today',
    statusColor: '#151619',
    eventType: 'Virtual',
    eventPlatform: 'Zoom',
    platformIcon: <VirtualIcon />,
    statusIcon: <TodayIcon />,
    meetingIcon: <GoogleMeet />,
    eventImage: <EventTitleImage3 />,
    organizer: {
      organizerPicture: <OrganizerPicture />,
      organizerName: 'Suileman Java',
      organizerUniversity: 'University of Ibadan',
      isVerified: false
    }
  },
  {
    id: 4,
    eventTitle: 'How to manage time effectively',
    eventStatus: 'Tomorrow',
    statusColor: '#151619',
    eventType: 'Virtual',
    eventPlatform: 'Zoom',
    platformIcon: <VirtualIcon />,
    statusIcon: <TodayIcon />,
    meetingIcon: <GoogleMeet />,
    eventImage: <EventTitleImage4 />,
    organizer: {
      organizerPicture: <OrganizerPicture />,
      organizerName: 'Adeyemo Gift',
      organizerUniversity: 'University of Ibadan',
      isVerified: false
    }
  },
  {
    id: 5,
    eventTitle: 'How to manage a remote work lifestyle',
    eventStatus: 'Wed, 11 Feb, 2026',
    eventTime: '11:30 AM',
    eventTimeIcon: <Clock />,
    statusColor: '#151619',
    eventType: 'Virtual',
    eventPlatform: 'Zoom',
    platformIcon: <VirtualIcon />,
    statusIcon: <TodayIcon />,
    meetingIcon: <GoogleMeet />,
    eventImage: <EventTitleImage5 />,
    organizer: {
      organizerPicture: <OrganizerPicture />,
      organizerName: 'Sandra Ajah',
      organizerUniversity: 'University of Ibadan',
      isVerified: true

    }

  },
  {
    id: 6,
    eventTitle: 'How to manage a remote work lifestyle',
    eventStatus: 'Wed, 11 Feb, 2027',
    eventTime: '11:30 AM',
    eventTimeIcon: <Clock />,
    statusColor: '#151619',
    eventType: 'Virtual',
    eventPlatform: 'Zoom',
    platformIcon: <VirtualIcon />,
    statusIcon: <TodayIcon />,
    meetingIcon: <GoogleMeet />,
    eventImage: <EventTitleImage6 />,
    organizer: {
      organizerPicture: <OrganizerPicture />,
      organizerName: 'Samantha Mathilda',
      organizerUniversity: 'University of Ibadan',
    }

  },
];

export default eventDetails