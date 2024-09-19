




import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import Active from "@/assets/images/active-img.png";

interface EventProps {
  title: string;
  date: string;
  time: string;
  platform: string;
  location: string;
}

const EventList: React.FC<EventProps> = ({ title, date, time, platform, location }) => {
  return (
    <TouchableOpacity style={styles.card}>
      <Image source={Active} style={styles.image} />
      <View style={styles.infoContainer}>
        <View style={styles.promotedBadge}>
          <Text style={styles.promotedText}>Promoted</Text>
        </View>
        <View style={styles.titleRow}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.ellipsis}>⋮</Text>
        </View>
        {/* Date and Time on the same row */}
        <View style={styles.detailsRow}>
          <Text style={styles.icon}>📅</Text>
          <Text style={styles.detailsText}>{date}</Text>
          <Text style={styles.separator}>.</Text>
          <Text style={styles.icon}>⏰</Text>
          <Text style={styles.detailsText}>{time}</Text>
        </View>
        {/* Location and Platform on the same row */}
        <View style={styles.detailsRow}>
          <Text style={styles.icon}>🌍</Text>
          <Text style={styles.detailsText}>{location}</Text>
          <Text style={styles.separator}>.</Text>
          <Text style={styles.icon}>💻</Text>
          <Text style={styles.detailsText}>{platform}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    borderRadius: 10,
    overflow: 'hidden',
    backgroundColor: '#fff',
    elevation: 2,
    margin: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    padding: 12,
  },
  image: {
    width: '100%',
    height: 200,
    borderRadius: 15,
  },
  infoContainer: {
    padding: 15,
  },
  promotedBadge: {
    backgroundColor: '#eee',
    borderRadius: 4,
    paddingVertical: 3,
    paddingHorizontal: 8,
    alignSelf: 'flex-start',
    marginBottom: 1,
    top: -204,
  },
  promotedText: {
    fontSize: 13,
    color: '#777',
  },
  titleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    fontSize: 13,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  ellipsis: {
    fontSize: 28,
    color: '#333',
  },
  detailsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  icon: {
    fontSize: 16,
    marginRight: 5,
  },
  separator: {
    marginHorizontal: 10,
    fontSize: 16,
    color: '#555',
  },
  detailsText: {
    fontSize: 14,
    color: '#555',
  },
});

export default EventList;
