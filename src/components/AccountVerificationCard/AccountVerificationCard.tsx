
import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import BadmusIcon from "@/assets/svg/badmus.svg";
import Verify from '@/assets/svg/verify.svg';

const AccountVerificationCard = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>Get your account verified</Text>
      <BadmusIcon
       
        style={styles.profileImage}
      />
      <View style={styles.profileContainer}>
        <Text style={styles.profileName}>Oluwasegun Badmus</Text>
        <Icon name="checkmark-circle" size={18} color="white" style={styles.verifiedIcon} />
      </View>
      <Text style={styles.description}>
        Having a verification badge on your profile shows that you’ve confirmed specific
        information about your account, which in turn builds credibility and trust.
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#6A00FF', // Purple background
    borderRadius: 15,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    alignSelf: 'center',
    marginVertical: 20,
  },
  headerText: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  profileImage: {
    width: 70,
    height: 70,
    borderRadius: 35,
    marginBottom: 10,
  },
  profileContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  profileName: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
    marginRight: 8,
  },
  verifiedIcon: {
    backgroundColor: '#6A00FF',
  },
  description: {
    color: 'white',
    textAlign: 'center',
    fontSize: 14,
    lineHeight: 20,
  },
});

export default AccountVerificationCard;



