import React from 'react';
import { ScrollView, View, Text, StyleSheet } from 'react-native';
import EventList from './EventList'; // Adjust the path as needed

const FeaturedEventScreen: React.FC = () => {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>Upcoming Events</Text>
      <EventList
        title="How to Manage a Remote Work Lifestyle"
        date="September 30, 2024"
        time="10:00 AM"
        platform="Google Meet"
        location="Virtual"
      />

      <EventList
        title="How to Manage a Remote Work Lifestyle"
        date="October 10, 2024"
        time="2:00 PM"
        platform="Zoom"
        location="Hybrid"
      />

      <EventList
        title="How to Manage a Remote Work Lifestyle"
        date="October 10, 2024"
        time="2:00 PM"
        platform="Zoom"
        location="Hybrid"
      />
     
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    margin: 16,
  },
});

export default FeaturedEventScreen;
