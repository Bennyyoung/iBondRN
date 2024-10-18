import React from 'react'
import Box from '@/components/Box'
import { Dimensions, ScrollView, StyleSheet, TouchableOpacity } from 'react-native'
import AccountVerificationCard from '@/components/AccountVerificationCard/AccountVerificationCard'
import VerificationInfo from '@/components/VerificationInfo/VerificationInfo'
import { CustomButton } from '@/components/CustomButton'
import { useNavigation } from '@react-navigation/core'
import { StackNavigationProp } from '@react-navigation/stack'
import TitleBar from '@/components/TitleBar/TitleBar'
import { RFValue } from 'react-native-responsive-fontsize'
import Text from '@/components/Text'
const { height } = Dimensions.get('window')

const VerificationScreen = () => {
  const navigation = useNavigation<StackNavigationProp<any>>();

  const handlePress = () => {
    // Navigate to VerificationSettings screen
    navigation.navigate('VerificationSettingScreen');
  }
  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1, backgroundColor: '#fff', paddingHorizontal: 20 }}>

      <TitleBar>
        <Box style={styles.container}>
          <Text style={styles.verifications}>
            Verifications
          </Text>
        </Box>
        <TouchableOpacity>

        </TouchableOpacity>
      </TitleBar>
      <AccountVerificationCard />


      <VerificationInfo />

      <Text style={styles.bottomText}>
        You’ll be required to provide a video, photo, and government-issued ID, and authorize us to process it. All information provided are subject to our {' '}

        <Text style={styles.privacyPolicy}>
          Privacy Policy
        </Text>
      </Text>

      {/* Submit Button */}
      <CustomButton
        label={'Get Started'}
        labelProps={{ color: 'whiteColor' }}
        borderRadius="sm"
        onPress={handlePress}
      />
    </ScrollView>
  )
}

export default VerificationScreen

const styles = StyleSheet.create({
  container: {
    paddingVertical: RFValue(10),
    paddingRight: RFValue(16),
    paddingLeft: RFValue(0),
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16
  },
  verifications: {
    fontWeight: '600',
    fontSize: RFValue(17, height),
  },
  bottomText: {
    marginTop: 30,
    marginBottom: 20,
    fontWeight: '400',
    fontSize: RFValue(13, height),
    alignItems: 'center'
  },
  privacyPolicy: {
    color: '#6500E0',
    fontSize: RFValue(13, height),
    fontWeight: '600',
  }
})