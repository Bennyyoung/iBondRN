import React, { useState } from 'react';
import { Dimensions, StyleSheet, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native'; // Import the hook
import Box from '@/components/Box';
import { CustomButton } from '@/components/CustomButton';
import VerificationPayment from '@/components/VerificationPayment/VerificationPayment';
import VerifyInfo from '@/components/VerifyInfo/VerifyInfo';
import TitleBar from '@/components/TitleBar/TitleBar';
import { RFValue } from 'react-native-responsive-fontsize';
import Text from '@/components/Text';
import SimpleBottomSheet from '@/components/SimpleBottomSheet/SimpleBottomSheet';
import PaymentSummaryCard from '@/components/PaymentSummaryCard/PaymentSummaryCard';
import PaymentConfirmationCard from '@/components/PaymentConfrimationCard/PaymentConfirmationCard';
import { StackNavigationProp } from '@react-navigation/stack';
import { StackParamsList } from '@/navigation/types';

const { height } = Dimensions.get('window');

const VerificationSettingScreen = () => {
  const [isSheetVisible, setIsSheetVisible] = useState(false);
  const [isConfirmation, setIsConfirmation] = useState(false); // Track current step
  const navigation = useNavigation<StackNavigationProp<StackParamsList>>(); // Initialize navigation

  const handleOpenBottomSheet = () => {
    setIsSheetVisible(true);
  };

  const handleCloseBottomSheet = () => {
    setIsSheetVisible(false);
  };

  const handleSwipeNext = () => {
    setIsConfirmation(true); // Move to the confirmation step
  };

  const handleProceed = () => {
    // Navigate to the "Success" screen
    navigation.navigate('PaymentSuccessScreen'); // Navigate to the next screen
    handleCloseBottomSheet(); // Optionally close the bottom sheet
  };

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1, backgroundColor: '#fff', paddingHorizontal: 20 }}>
      <TitleBar>
        <Box style={styles.container}>
          <Text style={styles.title}>Verifications</Text>
        </Box>
      </TitleBar>

      <VerificationPayment />
      <VerifyInfo />

      <Text style={styles.bottomText}>
        I understand that if my identity can’t be verified, I will still pay a process fee of ₦4,000 and get a refund of the original payment with a deduction of ₦4,000 process fee.
      </Text>

      <CustomButton
        label="Pay N3000"
        labelProps={{ color: 'whiteColor' }}
        borderRadius="sm"
        onPress={handleOpenBottomSheet}
      />

      <SimpleBottomSheet
        title={isConfirmation ? "Pay for Verification" : "App Store"}
        content={
          isConfirmation ? (
            <PaymentConfirmationCard onProceed={handleProceed} />
          ) : (
            <PaymentSummaryCard setShowNext={handleSwipeNext} />
          )
        }
        isVisible={isSheetVisible}
        onClose={handleCloseBottomSheet}
      />
    </ScrollView>
  );
};

export default VerificationSettingScreen;

const styles = StyleSheet.create({
  container: {
    paddingVertical: RFValue(10),
    paddingRight: RFValue(16),
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    fontWeight: '600',
    fontSize: RFValue(17, height),
  },
  bottomText: {
    marginTop: 30,
    marginBottom: 20,
    fontWeight: '400',
    fontSize: RFValue(13, height),
    textAlign: 'center',
  },
});
