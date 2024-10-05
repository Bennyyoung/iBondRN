
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

// Import your SVG files
import VerifiedIcon from '@/assets/svg/verified.svg'; 
import EyeIcon from '@/assets/svg/eyeIcon.svg'; 
import ChatIcon from '@/assets/svg/chatIcon.svg'; 

// Define types for props
interface VerificationItemProps {
  icon: React.ReactNode; // React element for rendering SVG
  title: string;
  description: string;
}

// Reusable VerificationItem component
const VerificationItem: React.FC<VerificationItemProps> = ({ icon, title, description }) => {
  return (
    <View style={styles.item}>
      {icon}
      <View style={styles.textContainer}>
        <Text style={styles.itemTitle}>{title}</Text>
        <Text style={styles.itemDescription}>{description}</Text>
      </View>
    </View>
  );
};

const VerifyInfo = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>When you are verified, you get:</Text>

      <VerificationItem 
        icon={<VerifiedIcon width={45} height={45} />} 
        title="Verification badge" 
        description="A badge is a testament that an account is being operated by a real person. It helps build trust."
      />

      <VerificationItem 
        icon={<VerifiedIcon width={45} height={45} />} 
        title="Increased exposure" 
        description="Verified accounts get their contents displayed to more audience with content prioritization."
      />

      <VerificationItem 
        icon={<VerifiedIcon width={45} height={45} />} 
        title="Better support experience" 
        description="You get a much faster resolve when you use our help and support channels."
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 16,
    fontWeight: '400',
    color: '#333',
    marginBottom: 20,
  },
  item: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  textContainer: {
    marginLeft: 10,
    flex: 1,
  },
  itemTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  itemDescription: {
    fontSize: 14,
    color: '#666',
  },
});

export default VerifyInfo;
