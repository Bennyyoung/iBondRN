import React, { useRef } from 'react';
import { View, StyleSheet, FlatList, ScrollView, VirtualizedList, Dimensions } from 'react-native';
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
import SubTitle from '@/components/SubTitle/SubTitle';
import eventDetails from '@/utils/eventDetails';
import TopEventsForYou from '@/components/TopEventsForYou/TopEventsForYou';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';

const { width: screenWidth, height } = Dimensions.get('window')

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

const getItem = (data: any, index: number) => data[index];
const getItemCount = (data: any) => data.length;

const BrowseEvents: React.FC = () => {
  const navigation = useNavigation()

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1, backgroundColor: '#fff' }}>
      {/* Title Bar with Plus Icon */}
      <TitleBar>

        {/* <Box style={styles.title}>
          <TouchableOpacity onPress={() => navigation.navigate('CreateEvents')}>
            <PlusIcon />
          </TouchableOpacity>
        </Box>
        <TouchableOpacity onPress={() => navigation.navigate('MyEvents')}>
          <Text style={styles.titleText}>
            My Event
          </Text>
        </TouchableOpacity> */}

        <Box style={styles.title}>
          <TouchableOpacity onPress={() => navigation.navigate('MyEvents')}>
            <Text style={styles.createEvent}>
              {/* Create Event */}
            </Text>
          </TouchableOpacity>
        </Box>
        <TouchableOpacity style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', width: 80 }} onPress={() => navigation.navigate('MyEvents')}>
          <PlusIcon />

          <Text style={styles.titleText}>
            My Event
          </Text>
        </TouchableOpacity>
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

      <Box style={{ marginHorizontal: 16 }}>
        {
          eventDetails.map(eventDetail => {
            if (eventDetail.eventStatus === 'Today') {
              return null
            }
            if (eventDetail.eventStatus === 'Ongoing') {
              return null
            }
            return <Card key={eventDetail.id} data={eventDetail} />
          })
        }
      </Box>

      {/* Top Events */}
      <TopEventsForYou />

    </ScrollView>
  );
};

export default BrowseEvents;

const styles = StyleSheet.create({
  image: {
    borderRadius: 8
  },
  title: {
    paddingVertical: RFValue(10),
    paddingRight: RFValue(16),
    paddingLeft: RFValue(0),
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16
  },
  imageContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 12,
    backgroundColor: '#FFFFFF',
    marginHorizontal: 30
  },
  titleText: {
    color: '#6500E0',
    fontSize: RFValue(14, height),
    fontWeight: '600',
  },
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    padding: 16
  },
  gridItem: {
    width: '22%',
    alignItems: 'center',
    marginBottom: 20,
    marginRight: 20
  },
  iconCircle: {
    backgroundColor: '#F4EBFF',
    padding: 14,
    borderRadius: 1500,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10
  },
  iconLabel: {
    textAlign: 'center',
    fontSize: RFValue(12, height)
  },
  cardContainer: {
    marginRight: 16 // Adds spacing between cards
  },
  flatListContainer: {
    paddingLeft: 16 // Add padding to align with other content
  },
  eventListContainer: {
    padding: 16
  }
});


