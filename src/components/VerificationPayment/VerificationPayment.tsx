import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import Badmus from '@/assets/svg/badmus.svg'

const VerificationPayment: React.FC = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Review verification payment</Text>
      
      <View style={styles.profileContainer}>
        <Badmus
          style={styles.profileImage}
        />
        <View style={styles.profileText}>
          <Text style={styles.name}>Oluwasegun Badmus</Text>
          <Text style={styles.username}>@segunowo_official</Text>
        </View>
      </View>

      <Text style={styles.paymentInfo}>
        You’ll be billed a one-time payment of <Text style={styles.amount}>₦30,000</Text>
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  profileContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  profileImage: {
    width: 60,
    height: 60,
    borderRadius: 30, // To make it circular
    marginRight: 10,
  },
  profileText: {
    alignItems: 'flex-start',
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  username: {
    fontSize: 14,
    color: 'gray',
  },
  paymentInfo: {
    fontSize: 16,
    textAlign: 'center',
  },
  amount: {
    fontWeight: '800',
  },
});

export default VerificationPayment;
