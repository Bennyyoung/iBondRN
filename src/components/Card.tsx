import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import ImageIcon from '@/assets/svg/img-part.svg'; // Importing img-part.svg
import Sud from '@/assets/svg/sud.svg'; // Importing sud.svg
import { RFValue } from 'react-native-responsive-fontsize';
import { useNavigation } from '@react-navigation/native';


// Define the interface for the props
interface CardProps {
  data: {
    id?: number;
    eventTitle?: string;
    eventStatus?: string;
    eventType?: string;
    eventPlatform?: string;
    statusColor?: string;
    statusIcon?: React.JSX.Element;
    platformIcon?: React.JSX.Element;
    meetingIcon?: React.JSX.Element;
    eventTimeIcon?: React.JSX.Element;
    eventImage?: React.JSX.Element;
    eventTime?: string
  };
}

const { height } = Dimensions.get('window')

// Card component that receives data as props
const Card = ({ data }: CardProps) => {
  const navigation = useNavigation()
  const { id, eventStatus, eventTitle, statusColor, eventType, eventPlatform, statusIcon, platformIcon, meetingIcon, eventTimeIcon, eventTime, eventImage } = data

  return (
    <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('EventDetailScreen', { event: data })}>
      <View style={styles.imageContainer}>
        {eventImage}
      </View>

      <View style={styles.content}>
        {/* Title */}
        <Text style={styles.title}>{eventTitle}</Text>

        {/* Status */}
        <View style={styles.statusContainer}>
          {statusIcon}
          <Text style={[styles.status, { color: statusColor }]}>
            {eventStatus}
          </Text>

          {
            (eventTime && eventTimeIcon) && (
              <>
                <Text style={styles.dot}>•</Text>
                {eventTimeIcon}
                <Text style={[styles.status, { color: statusColor }]}>
                  {eventTime}
                </Text>
              </>
            )
          }
        </View>

        {/* Mode and Platform Info */}
        <View style={styles.footer}>
          <View style={{ flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center' }}>
            {platformIcon}
            <Text style={styles.infoText}>{eventType}</Text>
          </View>
          <Text style={styles.dot}>•</Text>
          <View style={{ flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center' }}>
            {meetingIcon}
            <Text style={styles.infoText}>{eventPlatform}</Text>
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
    marginHorizontal: 30
  },
  image: {
    width: '90%',
    height: '90%',
    resizeMode: 'contain',
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
