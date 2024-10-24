/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NavigationContainer } from '@react-navigation/native';
import {
  CardStyleInterpolators,
  createStackNavigator,
  StackScreenProps,
} from '@react-navigation/stack';
import { useEffect, useState } from 'react';
import { withTranslation } from 'react-i18next';
import { ActivityIndicator } from 'react-native';

import Onboarding from '@/screens/Onboarding/Onboarding';
import AuthLanding from '@/screens/Auth/AuthLanding';
import Login from '@/screens/Auth/Login';

import type { AppNavRoutes } from './types';
import DashboardTab from './DashboardTab';
import { useSelector } from 'react-redux';
import { RootState } from '@/reduxFolder/store';
import ForgotPassword from '@/screens/Auth/ForgotPassword';
import EmailConfirmation from '@/screens/Auth/EmailConfirmation';
import UsernameSelection from '@/screens/Auth/UsernameSelection';
import PasswordCreation from '@/screens/Auth/PasswordCreation';
import ForgotPasswordConfirmation from '@/screens/Auth/ForgotPasswordConfirmation';
import ChangePassword from '@/screens/Auth/ChangePassword';
import SuccessScreen from '@/features/SuccessScreen';
import PostSignUpScreen from '@/screens/Auth/PostSignUp';
import PhotoUploadScreen from '@/screens/Auth/PhotoUploadScreen';
import EventDetails from '@/screens/Events/EventDetailScreen/EventDetailScreen';
import CreateEvents from '@/screens/Events/CreateEvents/CreateEvents';
import BrowseEvents from '@/screens/Events/BrowseEvents/BrowseEvents';
import EventDetailScreen from '@/screens/Events/EventDetailScreen/EventDetailScreen';
import FindFriendsFromContacts from '@/screens/Auth/FindFriendsFromContacts';
import SearchInterests from '@/screens/Auth/SearchInterests';
import AccountSettings from '@/screens/Settings/AccountSettings/AccountSettings';
import Verification from '@/screens/Settings/AccountSettings/Verification';
import VerificationSettingScreen from '@/screens/VerificationSettingScreen/VerificationSettingScreen';
import EditProfile from '@/screens/Settings/AccountSettings/EditProfile';
import TermsOfService from '@/screens/Settings/TermsOfService';
import PrivacyPolicy from '@/screens/Settings/PrivacyPolicy';
import Appearance from '@/screens/Settings/Appearance';
import Notifications from '@/screens/Settings/Notifications/Notifications';
import PostsAndComments from '@/screens/Settings/Notifications/PostsAndComments';
import TagsAndMentions from '@/screens/Settings/Notifications/TagsAndMentions';
import NewFollowers from '@/screens/Settings/Notifications/NewFollowers';
import SharesLikesReposts from '@/screens/Settings/Notifications/SharesLikesReposts';
import ProfileViews from '@/screens/Settings/Notifications/ProfileViews';
import MessagingNotification from '@/screens/Settings/Notifications/MessagingNotification';
import SuggestedPosts from '@/screens/Settings/Notifications/SuggestedPosts';
import PeopleYouMayKnow from '@/screens/Settings/Notifications/PeopleYouMayKnow';
import EventsSettings from '@/screens/Settings/Notifications/EventsSettings';
import LiveVideo from '@/screens/Settings/Notifications/LiveVideo';
import MarketPlace from '@/screens/Settings/Notifications/MarketPlace';
import LifeEvents from '@/screens/Settings/Notifications/LifeEvents';
import Newsletter from '@/screens/Settings/Notifications/Newsletter';
import Promotion from '@/screens/Settings/Notifications/Promotion';
import AppUpdate from '@/screens/Settings/Notifications/AppUpdate';
import OtherNotifications from '@/screens/Settings/Notifications/OtherNotifications';
import PaymentSuccessScreen from '@/screens/PaymentSuccessScreen/PaymentSuccessScreen';
import DocumentType from '@/screens/Settings/AccountSettings/DocumentType';
import SchoolID from '@/screens/Settings/AccountSettings/SchoolID/SchoolID';
import FrontID from '@/screens/Settings/AccountSettings/SchoolID/FrontID';
import UploadHoldID from '@/screens/Settings/AccountSettings/SchoolID/UploadHoldID';
import SelfieScreen from '@/screens/Settings/AccountSettings/Selfie/Selfie';
import SelfieTaken from '@/screens/Settings/AccountSettings/Selfie/SelfieTaken';
import Settings from '@/screens/Settings/Settings';
import VerificationRequestSubmitted from '@/screens/Settings/AccountSettings/VerificationRequestSubmitted';
import FeedPreferences from '@/screens/Settings/AccountSettings/FeedPreference';
import AutoPlay from '@/screens/Settings/AccountSettings/AutoPlay';
import PaymentCards from '@/screens/Settings/AccountSettings/PaymentCards';
import WithdrawalBank from '@/screens/Settings/AccountSettings/WithdrawalBank';
import PhoneNumberConfirmation from '@/screens/Auth/PhoneNumberConfirmation';
import AccountStatus from '@/screens/Settings/AccountSettings/AccountStatus';
import DeactivateDeleteAccountScreen from '@/screens/Settings/AccountSettings/DeactivateDeleteAccount/DeactivateDeleteAccountScreen';
import DeactivateAccountScreen from '@/screens/Settings/AccountSettings/DeactivateDeleteAccount/DeactivateAccountScreen';
import DeleteAccountScreen from '@/screens/Settings/AccountSettings/DeactivateDeleteAccount/DeleteAccountScreen';
import Security from '@/screens/Settings/PrivacyAndSafetySettingsScreen/Security/Security';
import EmailAddresses from '@/screens/Settings/PrivacyAndSafetySettingsScreen/Security/EmailAddresses';
import PhoneNumbers from '@/screens/Settings/PrivacyAndSafetySettingsScreen/Security/PhoneNumbers';
import ChangePasswordSecurity from '@/screens/Settings/PrivacyAndSafetySettingsScreen/Security/ChangePasswordSecurity';
import ForgotPasswordScreen from '@/screens/Settings/PrivacyAndSafetySettingsScreen/Security/ForgotPassword';
import ConfirmAccountScreen from '@/screens/Settings/PrivacyAndSafetySettingsScreen/Security/ConfirmAccount';
import NewPasswordScreen from '@/screens/Settings/PrivacyAndSafetySettingsScreen/Security/NewPassword';
import ConnectedDevices from '@/screens/Settings/PrivacyAndSafetySettingsScreen/Security/ConnectedDevices';
import TwoStepAuthentication from '@/screens/Settings/PrivacyAndSafetySettingsScreen/Security/TwoStepAuthentication/TwoStepAuthentication';
import TwoStepAuthenticationOTP from '@/screens/Settings/PrivacyAndSafetySettingsScreen/Security/TwoStepAuthentication/TwoStepAuthenticationOTP';
import AuthenticationApp from '@/screens/Settings/PrivacyAndSafetySettingsScreen/Security/TwoStepAuthentication/AuthenticationApp';
import AuthenticationCode from '@/screens/Settings/PrivacyAndSafetySettingsScreen/Security/TwoStepAuthentication/AuthenticationCode';
import SelectAuthenticationMethod from '@/screens/Settings/PrivacyAndSafetySettingsScreen/Security/TwoStepAuthentication/SelectAuthenticationMethod';
import SelectAuthenticationMethodOTP from '@/screens/Settings/PrivacyAndSafetySettingsScreen/Security/TwoStepAuthentication/SelectAuthenticationMethodOTP';
import TwoStepAuthenticationSetupComplete from '@/screens/Settings/PrivacyAndSafetySettingsScreen/Security/TwoStepAuthentication/TwoStepAuthenticationSetupComplete';
import PrivacyAndSafety from '@/screens/Settings/PrivacyAndSafetySettingsScreen/PrivacyAndSafety/PrivacyAndSafety';
import AccountPrivacy from '@/screens/Settings/PrivacyAndSafetySettingsScreen/PrivacyAndSafety/AccountPrivacy';
import Blocked from '@/screens/Settings/PrivacyAndSafetySettingsScreen/PrivacyAndSafety/Blocked';
import Posts from '@/screens/Settings/PrivacyAndSafetySettingsScreen/PrivacyAndSafety/Posts';
import Vibez from '@/screens/Settings/PrivacyAndSafetySettingsScreen/PrivacyAndSafety/Vibez';
import Comments from '@/screens/Settings/PrivacyAndSafetySettingsScreen/PrivacyAndSafety/Comments';
import Messaging from '@/screens/Settings/PrivacyAndSafetySettingsScreen/PrivacyAndSafety/Messaging';
import AdsPreferences from '@/screens/Settings/PrivacyAndSafetySettingsScreen/PrivacyAndSafety/AdsPreferences';
// import SettingsScreen from '@/screens/Settings/SettingsScreen';

export type AppNavScreenProps<Screen extends keyof AppNavRoutes> =
  StackScreenProps<AppNavRoutes, Screen>;

const Stack = createStackNavigator<AppNavRoutes>();

function AuthenticatedStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        headerShown: false,
      }}>
      <Stack.Screen component={DashboardTab} name="DashboardTab" />
      {/* <Stack.Screen component={BottomTab} name='BottomTab' /> */}
      <Stack.Screen component={BrowseEvents} name='BrowseEvents' />
      <Stack.Screen component={CreateEvents} name='CreateEvents' />
      <Stack.Screen component={EventDetailScreen} name='EventDetailScreen' />
      <Stack.Screen component={Settings} name='Settings' />
      <Stack.Screen component={AccountSettings} name='AccountSettings' />
      <Stack.Screen component={EditProfile} name='EditProfile' />
      <Stack.Screen component={Verification} name='Verification' />
      <Stack.Screen component={PrivacyPolicy} name='PrivacyPolicy' />
      <Stack.Screen component={TermsOfService} name='TermsOfService' />
      <Stack.Screen component={Appearance} name='Appearance' />
      <Stack.Screen component={VerificationSettingScreen} name='VerificationSettingScreen' />
      <Stack.Screen component={Notifications} name='Notifications' />
      <Stack.Screen component={PostsAndComments} name='PostsAndComments' />
      <Stack.Screen component={TagsAndMentions} name='TagsAndMentions' />
      <Stack.Screen component={NewFollowers} name='NewFollowers' />
      <Stack.Screen component={SharesLikesReposts} name='SharesLikesReposts' />
      <Stack.Screen component={ProfileViews} name='ProfileViews' />
      <Stack.Screen component={MessagingNotification} name='MessagingNotification' />
      <Stack.Screen component={SuggestedPosts} name='SuggestedPosts' />
      <Stack.Screen component={PeopleYouMayKnow} name='PeopleYouMayKnow' />
      <Stack.Screen component={EventsSettings} name='EventsSettings' />
      <Stack.Screen component={LiveVideo} name='LiveVideo' />
      <Stack.Screen component={MarketPlace} name='MarketPlace' />
      <Stack.Screen component={LifeEvents} name='LifeEvents' />
      <Stack.Screen component={Newsletter} name='Newsletter' />
      <Stack.Screen component={Promotion} name='Promotion' />
      <Stack.Screen component={AppUpdate} name='AppUpdate' />
      <Stack.Screen component={OtherNotifications} name='OtherNotifications' />
      <Stack.Screen component={PaymentSuccessScreen} name='PaymentSuccessScreen' />
      <Stack.Screen component={DocumentType} name='DocumentType' />
      <Stack.Screen component={SchoolID} name='SchoolID' />
      <Stack.Screen component={FrontID} name='FrontID' />
      <Stack.Screen component={UploadHoldID} name='UploadHoldID' />
      <Stack.Screen component={SelfieScreen} name='SelfieScreen' />
      <Stack.Screen component={SelfieTaken} name='SelfieTaken' />
      <Stack.Screen component={VerificationRequestSubmitted} name='VerificationRequestSubmitted' />
      <Stack.Screen component={FeedPreferences} name='FeedPreferences' />
      <Stack.Screen component={AutoPlay} name='AutoPlay' />
      <Stack.Screen component={PaymentCards} name='PaymentCards' />
      <Stack.Screen component={WithdrawalBank} name='WithdrawalBank' />
      <Stack.Screen component={AccountStatus} name='AccountStatus' />
      <Stack.Screen component={DeactivateDeleteAccountScreen} name='DeactivateDeleteAccountScreen' />
      <Stack.Screen component={DeactivateAccountScreen} name='DeactivateAccountScreen' />
      <Stack.Screen component={DeleteAccountScreen} name='DeleteAccountScreen' />
      <Stack.Screen component={Security} name='Security' />
      <Stack.Screen component={EmailAddresses} name='EmailAddresses' />
      <Stack.Screen component={PhoneNumbers} name='PhoneNumbers' />
      <Stack.Screen component={ChangePasswordSecurity} name='ChangePasswordSecurity' />
      <Stack.Screen component={ForgotPasswordScreen} name='ForgotPasswordScreen' />
      <Stack.Screen component={ConfirmAccountScreen} name='ConfirmAccountScreen' />
      <Stack.Screen component={NewPasswordScreen} name='NewPasswordScreen' />
      <Stack.Screen component={ConnectedDevices} name='ConnectedDevices' />
      <Stack.Screen component={TwoStepAuthentication} name='TwoStepAuthentication' />
      <Stack.Screen component={TwoStepAuthenticationOTP} name='TwoStepAuthenticationOTP' />
      <Stack.Screen component={SelectAuthenticationMethod} name='SelectAuthenticationMethod' />
      <Stack.Screen component={SelectAuthenticationMethodOTP} name='SelectAuthenticationMethodOTP' />
      <Stack.Screen component={TwoStepAuthenticationSetupComplete} name='TwoStepAuthenticationSetupComplete' />
      <Stack.Screen component={AuthenticationApp} name='AuthenticationApp' />
      <Stack.Screen component={AuthenticationCode} name='AuthenticationCode' />
      <Stack.Screen component={PrivacyAndSafety} name='PrivacyAndSafety' />
      <Stack.Screen component={AccountPrivacy} name='AccountPrivacy' />
      <Stack.Screen component={Blocked} name='Blocked' />
      <Stack.Screen component={Posts} name='Posts' />
      <Stack.Screen component={Vibez} name='Vibez' />
      <Stack.Screen component={Comments} name='Comments' />
      <Stack.Screen component={Messaging} name='Messaging' />
      <Stack.Screen component={AdsPreferences} name='AdsPreferences' />
      
      <Stack.Screen
        component={FindFriendsFromContacts}
        name="FindFriendsFromContacts"
      />
      <Stack.Screen component={SearchInterests} name="SearchInterests" />
      <Stack.Screen component={AuthLanding} name="AuthLanding" />
      <Stack.Screen component={SuccessScreen} name="SuccessScreen" />
    </Stack.Navigator>
  );
}

function UnauthenticatedStack() {
  const [loading, setLoading] = useState(true);
  const [viewedOnboarding, setViewedOnboarding] = useState(false);

  const checkOnboarding = async () => {
    try {
      const value = await AsyncStorage.getItem('@viewedOnboarding');
      if (value !== null) {
        setViewedOnboarding(true);
      }
    } catch {
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    checkOnboarding();
  }, []);

  if (loading) {
    return (
      <ActivityIndicator
        animating
        size="large"
        color="#6500E0"
        style={{
          alignSelf: 'center',
          flex: 1,
          justifyContent: 'center',
        }}
      />
    );
  }
  return (
    <Stack.Navigator
      screenOptions={{
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        headerShown: false,
      }}>
      {!viewedOnboarding && (
        <Stack.Screen component={Onboarding} name="Onboarding" />
      )}
      <Stack.Screen component={Login} name="Login" />
      <Stack.Screen component={ForgotPassword} name="ForgotPassword" />
      <Stack.Screen component={EmailConfirmation} name="EmailConfirmation" />
      <Stack.Screen
        component={PhoneNumberConfirmation}
        name="PhoneNumberConfirmation"
      />
      <Stack.Screen component={UsernameSelection} name="UsernameSelection" />
      <Stack.Screen component={PasswordCreation} name="PasswordCreation" />
      <Stack.Screen
        component={ForgotPasswordConfirmation}
        name="ForgotPasswordConfirmation"
      />
      <Stack.Screen component={SuccessScreen} name="SuccessScreen" />
      <Stack.Screen component={ChangePassword} name="ChangePassword" />
      <Stack.Screen component={PostSignUpScreen} name="PostSignUpScreen" />
      <Stack.Screen component={PhotoUploadScreen} name="PhotoUploadScreen" />
      <Stack.Screen
        component={FindFriendsFromContacts}
        name="FindFriendsFromContacts"
      />
      <Stack.Screen component={SearchInterests} name="SearchInterests" />
      <Stack.Screen component={AuthLanding} name="AuthLanding" />
    </Stack.Navigator>
  );
}

function Navigation() {
  const { isAuthenticated } = useSelector((state: RootState) => state.user);

  return (
    <NavigationContainer>
      <AuthenticatedStack />
      {/* {isAuthenticated ? <AuthenticatedStack /> : <UnauthenticatedStack />} */}
    </NavigationContainer>
  );
}

export default withTranslation()(Navigation);
