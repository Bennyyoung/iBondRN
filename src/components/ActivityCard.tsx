



import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

// Define the type for event data
type EventData = {
  id: string;
  title: string;
  date: string;
  time: string;
  location: string;
  platform: string;
  image: string;
  promoted: boolean;
};

const ActivityCard = ({ event }: { event: EventData }) => {
  // Ensure local image is imported using require directly
  const localImage = require('@/assets/images/active-img.png');
  
  return (
    <View style={styles.card}>
      <Image 
        source={event.promoted ? localImage : { uri: event.image }} 
        style={styles.image} 
      />
      <View style={styles.cardContent}>
        {event.promoted && <Text style={styles.promotedTag}>Promoted hhhh</Text>}
        <Text style={styles.title}>{event.title}</Text>
        <View style={styles.infoContainer}>
          <Text style={styles.date}>{event.date}</Text>
          <Text style={styles.time}>• {event.time}</Text>
        </View>
        <View style={styles.infoContainer}>
          <Text style={styles.location}>{event.location}</Text>
          <Text style={styles.platform}>• {event.platform}</Text>
        </View>
      </View>
    </View>
  );
};

// Styles
const styles = StyleSheet.create({
  card: {
    margin: 10,
    borderRadius: 10,
    overflow: 'hidden',
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 0,
    elevation: 3,
  },
  image: {
    height: 200,
    width: '100%',
  },
  cardContent: {
    padding: 15,
  },
  promotedTag: {
    position: 'absolute',
    top: -180,
    left: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    color: 'black',
    padding: 5,
    borderRadius: 5,
    fontWeight: 'bold',
    fontSize: 10,
  },
  title: {
    fontSize: 13,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  infoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  date: {
    color: '#666',
  },
  time: {
    color: '#666',
  },
  location: {
    color: '#666',
  },
  platform: {
    color: '#666',
  },
});

export default ActivityCard;
