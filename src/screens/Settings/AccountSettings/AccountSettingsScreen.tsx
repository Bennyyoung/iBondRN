
// Settings.tsx
import { Dimensions, ScrollView, StyleSheet, Text, TouchableOpacity } from "react-native";
import TitleBar from "@/components/TitleBar/TitleBar";
import Box from "@/components/Box";
import { RFValue } from "react-native-responsive-fontsize";
import SettingsRow from "@/components/SettingsRow/SettingsRow";
import { useNavigation } from '@react-navigation/native'; // Import useNavigation

const { height } = Dimensions.get('window');

const accountSettingsOptions = [
  {
    id: 1,
    title: 'Profile',
    link: 'EditProfileScreen',
  },
  {
    id: 2,
    title: 'Verifications',
    link: 'VerificationScreen',
  },
  {
    id: 3,
    section: 'Content Management',
    options: [
      { id: 4, title: 'Feed preferences', link: 'FeedPreferencesScreen' },
      { id: 5, title: 'Interests', link: 'InterestsScreen' },
      { id: 6, title: 'Autoplay', link: 'AutoplayScreen' },
    ],
  },
  {
    id: 7,
    section: 'Payments',
    options: [
      { id: 8, title: 'Payment cards', link: 'PaymentCardsScreen' },
      { id: 9, title: 'Withdrawal Banks', link: 'WithdrawalBanksScreen' },
    ],
  },
  {
    id: 10,
    section: 'Account Management',
    options: [
      { id: 11, title: 'Account status', link: 'AccountStatusScreen' },
      { id: 12, title: 'Deactivate or delete account', link: 'DeactivateDeleteAccountScreen' },
    ],
  },
];

const AccountSettingsScreen = () => {
  const navigation = useNavigation(); // Get the navigation object

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <TitleBar>
        <Box style={styles.title}>
          <Text style={styles.settings}>Settings</Text>
        </Box>
        <Box />
      </TitleBar>

      {accountSettingsOptions.map((accountSetting) => (
        <Box key={accountSetting.id}>
          {/* Render Section Header if section exists */}
          {accountSetting.section && (
            <Text style={styles.sectionHeader}>{accountSetting.section}</Text>
          )}

          {/* Render Options inside a section or individual rows */}
          {accountSetting.options
            ? accountSetting.options.map((option) => (
                <TouchableOpacity 
                  key={option.id} 
                  onPress={() => navigation.navigate(option.link)} // Navigate to option.link
                >
                  <SettingsRow title={option.title} />
                </TouchableOpacity>
              ))
            : (
              <TouchableOpacity 
                onPress={() => navigation.navigate(accountSetting.link)} // Navigate to accountSetting.link
              >
                <SettingsRow title={accountSetting.title} />
              </TouchableOpacity>
            )}
        </Box>
      ))}
    </ScrollView>
  );
};

export default AccountSettingsScreen;

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 20,
  },
  title: {
    paddingVertical: RFValue(10),
    paddingRight: RFValue(16),
    paddingLeft: RFValue(0),
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  settings: {
    fontWeight: '600',
    fontSize: RFValue(17, height),
    color: '#151619',
  },
  sectionHeader: {
    fontSize: RFValue(14, height),
    fontWeight: '300',
    color: '#3D3F4B',
    marginTop: RFValue(5, height),
    marginBottom: RFValue(10, height),
    padding: RFValue(12)
  },
});
