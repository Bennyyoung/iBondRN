


// PaymentConfirmationCard.tsx
import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { CustomButton } from '@/components/CustomButton';
import Box from '@/components/Box';
import VisaIcon from '@/assets/svg/visa.svg'
import { useNavigation } from '@react-navigation/native'; // Import the hook
import { StackNavigationProp } from '@react-navigation/stack';
import { StackParamsList } from '@/navigation/types';


const { height } = Dimensions.get('window');

const PaymentConfirmationCard = ({ onGoBack }: { onGoBack: () => void }) => {
    const navigation = useNavigation<StackNavigationProp<StackParamsList>>()
  return (
    
    <View style={styles.container}>
      {/* Header Section */}
      <Box style={styles.header}>
      <View style={styles.line} />
        <Text style={styles.title}>Payment Method</Text>
       
      </Box>

      {/* Payment Method Section */}
      <View style={styles.paymentCardContainer}>
        {/* Left Section: Logo and Card Info */}
        <View style={styles.leftSection}>
          <VisaIcon
            style={styles.logo}
            resizeMode="contain"
          />
          <Text style={styles.cardText}>Visa ••••4125</Text>
        </View>

        {/* Right Section: Change Button */}
        <TouchableOpacity>
          <Text style={styles.changeText}>Change</Text>
        </TouchableOpacity>
      </View>

      {/* Footer Button */}
      <CustomButton
        label="Pay N30,000"
        onPress={() => navigation.navigate('PaymentSuccessScreen')}
        borderRadius="md"
        labelProps={{ color: 'whiteColor' }}
      />
      <Text style={styles.bodyText}>
       By tapping "Continue" you accept our
      </Text>
      <Text style={styles.termsText}>
       Terms of usage and Privacy Policy
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'space-between',
    padding: RFValue(20),
    backgroundColor: '#fff',
  },
 
  title: {
    fontSize: RFValue(18, height),
    fontWeight: 'bold',
    marginBottom: 30,
    color: '#000'
  
  },
  description: {
    fontSize: RFValue(14, height),
    color: '#555',
    
  },
  paymentCardContainer: {
    backgroundColor: '#fff',
    borderRadius: 8,
    marginBottom: 50,
 
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
   
  },
  leftSection: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logo: {
    width: 40,
    height: 24,
    borderRadius: 4,
  },
  cardText: {
   
    fontSize: 16,
    fontWeight: '500',
    color: '#000',
  },
  changeText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#6B4EFF', // Purple matching the design
  },
  bodyText: {
    textAlign: 'center',
    color: '#444',
    marginTop: 35,
  },
  termsText: {
    textAlign: 'center',
    color: '#444',
    fontWeight: 'bold'
  },
  line: {
    height: 1, 
    width: '150%',
    backgroundColor: '#ccc', 
    marginBottom: RFValue(5),
    marginLeft: -100
  },
});

export default PaymentConfirmationCard;
