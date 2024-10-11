import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions, Image, Platform } from 'react-native';
import ImageIcon from '@/assets/svg/img-part.svg'; // Importing img-part.svg
import Sud from '@/assets/svg/sud.svg'; // Importing sud.svg
import { RFValue } from 'react-native-responsive-fontsize';
import { useNavigation } from '@react-navigation/native';
import { Event } from '@/components/types';
import { SvgIcon } from '@/assets/icons/SvgIcon';
import moment from 'moment';

// Define the interface for the props
interface CardProps {
  data: Event
}
const { height } = Dimensions.get('window')

// Card component that receives data as props
const Card = ({ data }: CardProps) => {
  const navigation = useNavigation()
  const { id, eventStatus, date, eventTitle, eventType, eventPlatform, endTime, statusIcon, platformIcon, meetingIcon, eventTimeIcon, startTime, imageUrl, location } = data

  const now = moment();
  const eventDate = moment(date);
  const eventStartTime = moment(startTime, 'HH:mm:ss');
  const eventEndTime = moment(endTime, 'HH:mm:ss');

  // Check if the event is today
  const isToday = eventDate.isSame(now, 'day');

  // Check if the event is ongoing
  const isOngoing = now.isBetween(eventStartTime, eventEndTime);

  // Determine the display text and color
  let statusText = moment(date).format('ddd, D MMM, YYYY');
  let statusColor = '#000';  // Default color
  if (isToday) {
    statusText = isOngoing ? 'Ongoing' : 'Today';
    statusColor = '#FF3B30';  // Change color to red if ongoing or today
  }

  return (
    <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('EventDetailScreen', { event: data })}>
      <Image
        source={{
          uri: `${imageUrl}`
        }}
        style={styles.image}
        resizeMode='cover'
        resizeMethod='resize'
      />

      <View style={styles.content}>
        <Text style={styles.title}>{eventTitle}</Text>

        <View style={styles.statusContainer}>
          {statusIcon}
          <Text style={[styles.status, { color: statusColor }]}>
            {statusText}
          </Text>

          {
            startTime && (
              <>
                <Text style={styles.dot}>•</Text>
                {eventTimeIcon}
                <SvgIcon name='clock' />
                <Text style={[styles.status, { color: statusColor }]}>
                  {startTime}
                </Text>
              </>
            )
          }
        </View>

        <View style={styles.footer}>
          <View style={{ flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center' }}>
            {platformIcon}
            <Text style={styles.infoText}>{eventType}</Text>
          </View>
          <Text style={styles.dot}>•</Text>
          <View style={{ flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center' }}>
            {meetingIcon}
            <Text style={styles.infoText}>{eventPlatform || location}</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

// Styling for the Card component
const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 10,
    overflow: 'hidden',
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#E2E2E2',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    marginRight: 20,
    width: 377,
  },
  imageContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 12,
    backgroundColor: '#FFFFFF',
    marginHorizontal: 30,
    // height: '40%'
  },
  image: {
    width: '100%',
    height: Platform.OS === 'ios' ? 200 : undefined, // Fixed height for iOS
    aspectRatio: 16 / 9, // This will maintain a 16:9 aspect ratio on Android
  },
  content: {
    padding: 10,
  },
  status: {
    fontSize: RFValue(11, height),
    fontWeight: '400',
    marginLeft: 5
  },
  statusContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center'
  },
  title: {
    fontSize: RFValue(13, height),
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#151619'
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: RFValue(5)
  },
  infoText: {
    fontSize: RFValue(11, height),
    lineHeight: 13,
    letterSpacing: 0.06,
    fontWeight: '400',
    color: '#3D3F4B',
    marginLeft: 5

  },
  dot: {
    fontSize: RFValue(12, height),
    marginHorizontal: 10,
    color: '#6A6A6A',
  },
  iconsContainer: {
    flexDirection: 'row',
    marginTop: 10,
  },
  iconWrapper: {
    marginRight: 10,
  },
});

export default Card;
