import React, { useCallback, useEffect, useRef, useState } from 'react';
import { View, StyleSheet, FlatList, ScrollView, VirtualizedList, Dimensions, ActivityIndicator } from 'react-native';
import { RFPercentage, RFValue } from 'react-native-responsive-fontsize';
import Box from '@/components/Box';
import TitleBar from '@/components/TitleBar/TitleBar';
import PlusIcon from '@/assets/svg/plusIcon.svg';
import Text from '@/components/Text';
import Title from '@/components/Title/Title';
import CalendarIcon from '@/assets/svg/calendar.svg';
import { SearchBar } from '@/components/SearchBar';
import SearchBarIcon from '@/assets/svg/searchIcon.svg';
import Card from '@/components/Card'; // Assuming Card.tsx is in the same folder
import SubTitle from '@/components/SubTitle/SubTitle';
import TopEventsForYou from '@/components/TopEventsForYou/TopEventsForYou';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import useGetAllEvents from '@/utils/hooks/Event/useGetAllEvents';
import { Event } from '@/components/types';
import useSearchEvents from '@/utils/hooks/Event/useSearchEvent';
import { eventsNavigation } from '@/utils/browseEventsData';
import moment from 'moment';

const { width: screenWidth, height } = Dimensions.get('window')

const getItem = (data: any, index: number) => data[index];
const getItemCount = (data: any) => data.length;

const BrowseEvents: React.FC = () => {
  const navigation = useNavigation()
  const { fetchAllEvents } = useGetAllEvents()
  const [events, setEvents] = useState<Event[]>([])
  const [searchTerm, setSearchTerm] = useState('')
  const [category, setCategory] = useState('')
  const [isSearchTriggered, setIsSearchTriggered] = useState(false)
  const { searchEvents } = useSearchEvents(searchTerm, category)

  const triggerSearch = () => {
    setIsSearchTriggered(true)
  }


  const handleSearch = useCallback((text: string) => {
    setSearchTerm(text)
  }, [])

  useEffect(() => {
    if (isSearchTriggered && searchTerm.length >= 3) {
      searchEvents()
      setIsSearchTriggered(false)
    }
  }, [isSearchTriggered, searchTerm, category])

  
  const getEvents = async () => {
    const events = await fetchAllEvents()
    const content = events.data.content
    setEvents(content)
  }

  const handleCategory = (category: string) => {
    setCategory(category)
    triggerSearch()
  }
  useEffect(() => {
    getEvents()
  }, [])

  const isEventTodayOrOngoing = (event: Event) => {
    const now = moment()
    const eventDate = moment(event.date)
    const eventStartTime = moment(event.startTime, 'HH:mm:ss')
    const eventEndTime = moment(event.startTime, 'HH:mm:ss')

    // Check if event date is today
    const isToday = eventDate.isSame(now, 'day')

    // Check if event is ongoing
    const isOngoing = now.isBetween(eventStartTime, eventEndTime)

    return isToday || isOngoing
  }

  // const happenngSoonEvents = events.filter(isEventTodayOrOngoing)

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Title Bar with Plus Icon */}
      <TitleBar>
        <Box style={styles.title}>
          <TouchableOpacity onPress={() => navigation.navigate('MyEvents')}>
            <Text>
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
          getSearchInput={handleSearch}
          placeholder="Search"
          backgroundColor="#FBF7FF"
          height={RFValue(40)}
          svgIcon={
            <TouchableOpacity onPress={triggerSearch}>
              <SearchBarIcon />
            </TouchableOpacity>
          }
        />
      </Box>

      {/* Horizontal scrolling navigation */}
      <Box style={styles.gridContainer}>
        {eventsNavigation.map((events) => (
          <TouchableOpacity
            key={events.id}
            style={styles.gridItem}
            onPress={() => handleCategory(events.categoryName)}
          >
            <Box style={styles.iconCircle}>{events.icon}</Box>
            <Text style={styles.iconLabel}>{events.categoryName}</Text>
          </TouchableOpacity>
        ))}
      </Box>

      {
        (() => {
          // Filter data to include only ongoing or today events
          const filteredData = (events).filter(isEventTodayOrOngoing);
          {/* Happening Soon */ }
          <View style={{ paddingHorizontal: 20 }}>
            <SubTitle title={'Happening Soon'} subtitle='Show more' />
          </View>

          return filteredData.length > 0 ? (
            <VirtualizedList
              horizontal
              showsHorizontalScrollIndicator={false}
              data={filteredData}
              keyExtractor={(item) => item.id.toString()}
              initialNumToRender={4}
              renderItem={({ item }) => (
                <Card data={item} />
              )}
              contentContainerStyle={styles.flatListContainer}
              getItem={getItem}
              getItemCount={getItemCount}
            />
          ) : (
            // Display a message when there are no events
            // <Text style={styles.noEvents}>No Events happening soon</Text>
            null
          );
        })()
      }




      <Box style={{ marginHorizontal: 16 }}>
        {events.length > 0 ? (
          events.map((event) => {
            const status = isEventTodayOrOngoing(event);
            // Render only events that are not 'TODAY' or 'ONGOING'
            if (status !== 'TODAY' && status !== 'ONGOING') {
              return <Card key={event.id} data={event} />;
            }
            return null;
          })
        ) : (
          <Text>No other events available</Text>
        )}
      </Box>

      {/* Top Events */}
      <TopEventsForYou events={events} />

    </ScrollView>
  );
};

export default BrowseEvents;

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#fff',
  },
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
    padding: 16,
    marginTop: 20
  },
  gridItem: {
    width: 84.25,
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
    paddingHorizontal: 10, // Add horizontal padding for spacing
    flexDirection: 'row',  // Ensure the items are laid out horizontally
    alignItems: 'center',  // Center align the items
  },
  eventListContainer: {
    padding: 16
  },
  anErrorOccured: {
    fontSize: RFValue(14, height),
    textAlign: 'center',
    padding: 20
  },
  noEvents: {
    fontSize: RFValue(14, height),
    textAlign: 'center',
    padding: 20
  },
});


