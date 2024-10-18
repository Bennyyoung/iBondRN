import React from 'react';
import { View, StyleSheet, Image, Dimensions } from 'react-native';
import Badmus from '@/assets/svg/badmus.svg'
import Text from '../Text';
import { RFValue } from 'react-native-responsive-fontsize';

const { height } = Dimensions.get('window')

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
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#fff',
    marginTop: 30
  },
  title: {
    fontSize: RFValue(24, height),
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
    fontSize: RFValue(16, height),
    fontWeight: 'bold',
  },
  username: {
    fontSize: RFValue(14, height),
    color: 'gray',
  },
  paymentInfo: {
    fontSize: RFValue(16, height),
    textAlign: 'center',
  },
  amount: {
    fontWeight: '800',
  },
});

export default VerificationPayment;
