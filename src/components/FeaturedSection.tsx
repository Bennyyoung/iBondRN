import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import CardList, { mockData } from './Card'; // Adjust the path as needed
import ImgPart from "@/assets/svg/img-part.svg"
const featuredData = [
//   mockData[0], // Just an example, you can use any data or fetch dynamically
  {
    id: 1,
    title: 'How to improve team collaboration',
    status: 'Upcoming',
    statusColor: 'blue',
    mode: 'In-person',
    platform: 'Microsoft Teams',
    icons: [<ImgPart key="img-part" />], // Use different or same icons as needed
  },
];

const FeaturedSection: React.FC = () => {
  return (
    <View style={styles.section}>
      <Text style={styles.title}>Featured Cards</Text>
      <ScrollView horizontal contentContainerStyle={styles.scrollContainer}>
        {featuredData.map((data) => (
          <CardList key={data.id} data={data} />
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  section: {
    marginBottom: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    paddingHorizontal: 16,
  },
  scrollContainer: {
    paddingHorizontal: 16,
  },
});

export default FeaturedSection;


