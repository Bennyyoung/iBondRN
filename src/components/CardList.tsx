import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import ImgPart from '@/assets/svg/img-part.svg'; // Importing img-part.svg

export const mockData = [
  {
    id: 1,
    title: 'How to manage a remote work lifestyle',
    status: 'Ongoing',
    statusColor: 'red',
    mode: 'Virtual',
    platform: 'Google Meet',
    icons: [<ImgPart key="img-part" />], // Icon components
  },
];

// Define the interface for the props
interface CardProps {
  data: {
    id: number;
    title: string;
    status: string;
    mode: string;
    platform: string;
    statusColor: string;
    icons?: React.ReactNode[]; // Optional array of React nodes for icons
  };
}

// Card component that receives data as props
const CardList: React.FC<{ data: CardProps['data'] }> = ({ data }) => {
  return (
    <View style={styles.card}>
      <View style={styles.content}>
        {/* Title */}
        <Text style={styles.title}>{data.title}</Text>
        {/* Status */}
        <Text style={[styles.status, { color: data.statusColor }]}>
          {data.status}
        </Text>

        {/* Mode and Platform Info */}
        <View style={styles.footer}>
          <Text style={styles.infoText}>{data.mode}</Text>
          <Text style={styles.dot}>•</Text>
          <Text style={styles.infoText}>{data.platform}</Text>
        </View>

        {/* Icons */}
        <View style={styles.iconsContainer}>
          {data.icons?.map((IconComponent, index) => (
            <View key={index} style={styles.iconWrapper}>
              {IconComponent}
            </View>
          ))}
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
    width: 300,
  },
  content: {
    padding: 10,
  },
  status: {
    fontSize: 12,
    marginBottom: 5,
    fontWeight: 'bold',
  },
  title: {
    fontSize: 13,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  infoText: {
    fontSize: 12,
    color: '#6A6A6A',
  },
  dot: {
    fontSize: 12,
    marginHorizontal: 5,
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

export default CardList;
