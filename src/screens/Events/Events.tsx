import React, { useRef } from 'react';
import { View, StyleSheet, FlatList, ScrollView, VirtualizedList } from 'react-native';
import { RFPercentage, RFValue } from 'react-native-responsive-fontsize';
import Box from '@/components/Box';
import TitleBar from '@/components/TitleBar/TitleBar';
import PlusIcon from '@/assets/svg/plusIcon.svg';
import Text from '@/components/Text';
import Title from '@/components/Title/Title';
import CalendarIcon from '@/assets/svg/calender.svg';
import { SearchBar } from '@/components/SearchBar';
import SearchBarIcon from '@/assets/svg/searchIcon.svg';
import EducationIcon from '@/assets/svg/education.svg';
import CareerIcon from '@/assets/svg/career.svg';
import CultureIcon from '@/assets/svg/culture.svg';
import EntertainmentIcon from '@/assets/svg/entertainment.svg';
import SportIcon from '@/assets/svg/sport.svg';
import SocialIcon from '@/assets/svg/social.svg';
import CorporateIcon from '@/assets/svg/corporate.svg';
import Card from '@/components/Card'; // Assuming Card.tsx is in the same folder
// import EventListtwo from '@/components/EventListtwo'; // Import EventList component
import UpcomingEventsScreen from '@/components/UpcommingEventsScreen';
import UpcommingEventsScreen from '@/components/UpcommingEventsScreen';
import FeaturedSection from '@/components/FeaturedSection';
import FeaturedEventScreen from '@/components/FeaturedEventScreen';
import SubTitle from '@/components/SubTitle/SubTitle';
import OngoingIcon from '@/assets/svg/ongoing.svg'
import TodayIcon from '@/assets/svg/today.svg'
import VirtualIcon from '@/assets/svg/virtual.svg'
import GoogleMeet from '@/assets/svg/googleMeet.svg'
import Clock from "@/assets/svg/clock.svg"

const eventsNavigation = [
  {
    id: 1,
    icon: <CorporateIcon />,
    linkName: 'Corporate',
    linkUrl: ''
  },
  {
    id: 2,
    icon: <EducationIcon />,
    linkName: 'Education',
    linkUrl: ''
  },
  {
    id: 3,
    icon: <CareerIcon />,
    linkName: 'Career',
    linkUrl: ''
  },
  {
    id: 4,
    icon: <CultureIcon />,
    linkName: 'Culture',
    linkUrl: ''
  },
  {
    id: 5,
    icon: <EntertainmentIcon />,
    linkName: 'Entertainment',
    linkUrl: ''
  },
  {
    id: 6,
    icon: <SocialIcon />,
    linkName: 'Sport',
    linkUrl: ''
  },
  {
    id: 7,
    icon: <SportIcon />,
    linkName: 'Social',
    linkUrl: ''
  },

];

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
    meetingIcon: <GoogleMeet />
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
    meetingIcon: <GoogleMeet />
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
    meetingIcon: <GoogleMeet />
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
    meetingIcon: <GoogleMeet />
  },
  {
    id: 5,
    eventTitle: 'How to manage a remote work lifestyle',
    eventStatus: 'Wed, 11 Feb, 2025',
    eventTime: '11:30 AM',
    eventTimeIcon: <Clock />,
    statusColor: '#151619',
    eventType: 'Virtual',
    eventPlatform: 'Zoom',
    platformIcon: <VirtualIcon />,
    statusIcon: <TodayIcon />,
    meetingIcon: <GoogleMeet />
  },
  {
    id: 6,
    eventTitle: 'How to manage a remote work lifestyle',
    eventStatus: 'Wed, 11 Feb, 2025',
    eventTime: '11:30 AM',
    eventTimeIcon: <Clock />,
    statusColor: '#151619',
    eventType: 'Virtual',
    eventPlatform: 'Zoom',
    platformIcon: <VirtualIcon />,
    statusIcon: <TodayIcon />,
    meetingIcon: <GoogleMeet />
  },
];

const getItem = (data: any, index: number) => data[index];
const getItemCount = (data: any) => data.length;

const Events: React.FC = () => {
  const flatListRef = useRef<FlatList>(null);

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1, backgroundColor: '#fff' }}>
      {/* Title Bar with Plus Icon */}
      <TitleBar>
        <Box style={styles.title}>
          <PlusIcon />
          <Text style={styles.titleText}>
            My Event
          </Text>
        </Box>
      </TitleBar>

      {/* Title with Calendar Icon */}
      <Title icon={<CalendarIcon />}>Events</Title>

      {/* Search Bar */}
      <Box paddingHorizontal={'md'}>
        <SearchBar
          placeholder="Search"
          backgroundColor="#FBF7FF"
          height={RFValue(40)}
          borderRadius={RFValue(12)}
          svgIcon={<SearchBarIcon />}
        />
      </Box>

      {/* Horizontal scrolling navigation */}
      <Box marginTop={'Ml'} style={styles.gridContainer}>
        {eventsNavigation.map((events) => (
          <Box key={events.id} style={styles.gridItem}>
            <Box style={styles.iconCircle}>{events.icon}</Box>
            <Text style={styles.iconLabel}>{events.linkName}</Text>
          </Box>
        ))}
      </Box>

      {/* Happening Soon */}
      <SubTitle title={'Happening Soon'} subtitle='Show more' />

      <VirtualizedList
        horizontal
        showsHorizontalScrollIndicator={false}
        data={eventDetails}
        keyExtractor={(item) => item.id.toString()}
        initialNumToRender={4}
        renderItem={({ item }) => {
          if (item.eventStatus === 'Ongoing') {
            return (
              <Card data={item} />
            )
          }
          if (item.eventStatus === 'Today') {
            return (
              <Card data={item} />
            )
          }
          return null
        }}
        // showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.flatListContainer}
        getItem={getItem}
        getItemCount={getItemCount}
      />

      <Box style={{ marginHorizontal: RFValue(20) }}>
        {
          eventDetails.map(eventDetail => {
            if (eventDetail.eventStatus === 'Today') {
              return null
            }
            if (eventDetail.eventStatus === 'Ongoing') {
              return null
            }
            return <Card data={eventDetail} />
          })
        }
      </Box>

      {/* Top Events */}
      <SubTitle title={'Top Events'} subtitle='Show more' />

      <VirtualizedList
        horizontal
        showsHorizontalScrollIndicator={false}
        data={eventDetails}
        keyExtractor={(item) => item.id.toString()}
        initialNumToRender={4}
        renderItem={({ item }) => {
          if (item.eventStatus === 'Today') {
            return (
              <Card data={item} />
            )
          }
          if (item.eventStatus === 'Tomorrow') {
            return (
              <Card data={item} />
            )
          }
          return null
        }}
        // showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.flatListContainer}
        getItem={getItem}
        getItemCount={getItemCount}
      />

      <Box style={{ marginHorizontal: RFValue(20) }}>
        {
          eventDetails.map(eventDetail => {
            if (eventDetail.eventStatus === 'Today') {
              return null
            }
            if (eventDetail.eventStatus === 'Ongoing') {
              return null
            }
            if (eventDetail.eventStatus === 'Tomorrow') {
              return null
            }
            return <Card data={eventDetail} />
          })
        }
      </Box>


    </ScrollView>
  );
};

export default Events;

const styles = StyleSheet.create({
  title: {
    paddingVertical: RFValue(10),
    paddingRight: RFValue(16),
    paddingLeft: RFValue(0),
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16
  },
  titleText: {
    color: '#6500E0',
    fontSize: RFValue(14),
    fontWeight: '600'
  },
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    padding: RFValue(16)
  },
  gridItem: {
    width: '22%',
    alignItems: 'center',
    marginBottom: 20,
    marginRight: 20
  },
  iconCircle: {
    backgroundColor: '#F4EBFF',
    padding: RFValue(14),
    borderRadius: RFValue(1500),
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: RFValue(10)
  },
  iconLabel: {
    textAlign: 'center',
    fontSize: RFValue(12)
  },
  cardContainer: {
    marginRight: 16 // Adds spacing between cards
  },
  flatListContainer: {
    paddingLeft: RFValue(16) // Add padding to align with other content
  },
  eventListContainer: {
    padding: RFValue(16)
  }
});


