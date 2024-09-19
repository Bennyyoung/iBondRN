import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import ImageIcon from '@/assets/svg/img-part.svg'; // Importing img-part.svg
import Sud from '@/assets/svg/sud.svg'; // Importing sud.svg
import { RFValue } from 'react-native-responsive-fontsize';


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
    eventTime?: string
  };
}

// Card component that receives data as props
const Card = ({ data }: CardProps) => {
  const { id, eventStatus, eventTitle, statusColor, eventType, eventPlatform, statusIcon, platformIcon, meetingIcon, eventTimeIcon, eventTime } = data
  // Determine which image to display based on the card id
  const renderImage = () => {
    switch (id) {
      case 1:
        return <ImageIcon style={styles.image} width={RFValue(284)} height={RFValue(182.5)} />;
      case 2:
        return <ImageIcon style={styles.image} width={RFValue(284)} height={RFValue(182.5)} />;
      case 3:
        return <ImageIcon style={styles.image} width={RFValue(284)} height={RFValue(182.5)} />;
      default:
        return <ImageIcon style={styles.image} width={RFValue(284)} height={RFValue(182.5)} />;
    }
  };

  return (
    <View style={styles.card}>
      <View style={styles.imageContainer}>
        {/* Display the correct image based on the card id */}
        {renderImage()}
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
    </View>
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
    width: RFValue(300),
    height: RFValue(284.5),
  },
  imageContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 12,
    backgroundColor: '#FFFFFF',
    width: '100%',
    // height: 150
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
    fontSize: RFValue(11),
    fontWeight: '400',
    marginLeft: RFValue(5)
  },
  statusContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center'
  },
  title: {
    fontSize: RFValue(13),
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
    fontSize: RFValue(11),
    lineHeight: RFValue(13),
    letterSpacing: RFValue(0.06),
    fontWeight: '400',
    color: '#3D3F4B',
    marginLeft: RFValue(5)

  },
  dot: {
    fontSize: 12,
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
