import { useNavigation } from '@react-navigation/native';
import { Dimensions, ScrollView, StyleSheet, Text, TouchableOpacity } from "react-native";
import SettingsRow from "@/components/SettingsRow/SettingsRow";
import Box from "@/components/Box";
import TitleBar from "@/components/TitleBar/TitleBar";
import { RFValue } from "react-native-responsive-fontsize";
import { CustomButton } from "@/components/CustomButton";
import { StackNavigationProp } from '@react-navigation/stack';
import { StackParamsList } from '@/navigation/types';

const { height } = Dimensions.get('window');

// Define settingsOptions with link as a string
const settingsOptions: Array<{
  id: number;
  title: string;
  svgName: string;
  link: string; // Using 'string' instead of 'keyof AppNavRoutes'
}> = [
  {
    id: 1,
    title: 'Account Settings',
    svgName: 'profile',
    link: 'AccountSettings', // String route names
  },
  {
    id: 2,
    title: 'Security',
    svgName: 'security_lock',
    link: 'Security',
  },
  {
    id: 3,
    title: 'Privacy and safety',
    svgName: 'security',
    link: 'PrivacyAndSafety',
  },
  {
    id: 4,
    title: 'Notifications',
    svgName: 'notification',
    link: 'Notifications',
  },
  {
    id: 5,
    title: 'Terms of Service',
    svgName: 'book',
    link: 'TermsOfService',
  },
  {
    id: 6,
    title: 'Privacy Policy',
    svgName: 'database',
    link: 'PrivacyPolicy',
  },
  {
    id: 7,
    title: 'Appearance',
    svgName: 'moon',
    link: 'Appearance',
  },
  {
    id: 8,
    title: 'About',
    svgName: 'info_circle',
    link: 'About',
  },
];

const Settings = () => {
  const navigation = useNavigation<StackNavigationProp<StackParamsList>>(); // Use navigation from React Navigation

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <TitleBar>
        <Box style={styles.title}>
          <Text style={styles.settings}>Settings</Text>
        </Box>
        <Box />
      </TitleBar>

      <Box style={styles.verficationBadgeContainer}>
        <Box>
          <Text style={styles.verificationBadgeTitle}>Get verification badge</Text>
          <Text style={styles.verificationBadgeSubTitle}>Boost trust and show credibility</Text>
        </Box>
        <CustomButton
          label={'Verify now'}
          labelProps={{ color: 'whiteColor', fontSize: RFValue(13, height), fontWeight: '400' }}
          borderRadius="sm"
          style={{ width: 96, height: 34 }}
        />
      </Box>

      {settingsOptions.map((setting) => (
        <TouchableOpacity
          key={setting.id}
          onPress={() => navigation.navigate(setting.link)} // Navigation will accept a string link
        >
          <SettingsRow
            svgName={setting.svgName}
            title={setting.title}
          />
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};

export default Settings;

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
  verificationBadgeTitle: {
    color: '#151619',
    fontWeight: '600',
    fontSize: RFValue(15, height),
  },
  verificationBadgeSubTitle: {
    color: '#3D3F4B',
    fontWeight: '400',
    fontSize: RFValue(12, height),
  },
  verficationBadgeContainer: {
    backgroundColor: '#F0E6FC',
    flexDirection: 'row',
    padding: 16,
    borderRadius: 8,
    justifyContent: 'space-between',
    marginTop: 60,
  },
});
