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
import BottomTab from '@/navigation/tabs/BottomTab';
import EventDetails from '@/screens/Events/EventDetailScreen/EventDetailScreen';
import CreateEvents from '@/screens/Events/CreateEvents/CreateEvents';
import BrowseEvents from '@/screens/Events/BrowseEvents/BrowseEvents';
import EventDetailScreen from '@/screens/Events/EventDetailScreen/EventDetailScreen';
import FindFriendsFromContacts from '@/screens/Auth/FindFriendsFromContacts';
import SearchInterests from '@/screens/Auth/SearchInterests';
import AccountSettingsScreen from '@/screens/Settings/AccountSettings/AccountSettingsScreen';
import ProfileScreen from '@/screens/ProfileScreen/ProfileScreen';
import VerificationScreen from '@/screens/VerificationScreen/VerificationScreen';
import VerificationSettingScreen from '@/screens/VerificationSettingScreen/VerificationSettingScreen';
import EditProfileScreen from '@/screens/Settings/AccountSettings/EditProfileScreen/EditProfileScreen';
import PrivacyPolicyScreen from '@/screens/Settings/PrivacyPolicyScreen/PrivacyPolicyScreen';
import AppearanceSettingsScreen from '@/screens/AppearanceSettingsScreen/AppearanceSettingsScreen';
import NotificationSettingsScreen from '@/screens/Settings/Notifications/NotificationSettingsScreen/NotificationSettingsScreen';
import TermsOfServiceScreen from '@/screens/Settings/TermsOfServiceScreen/TermsOfServiceScreen';
import PostsAndCommentsScreen from '@/screens/Settings/Notifications/PostsAndCommentsScreen/PostsAndCommentsScreen';
import TagsAndMentionsScreen from '@/screens/Settings/Notifications/TagsAndMentionsScreen/TagsAndMentionsScreen';
import NewFollowersScreen from '@/screens/Settings/Notifications/NewFollowersScreen/NewFollowersScreen';
import SharesLikesRepostsScreen from '@/screens/Settings/Notifications/SharesLikesRepostsScreen/SharesLikesRepostsScreen';
import ProfileViewsScreen from '@/screens/Settings/Notifications/ProfileViews/ProfileViews';
import MessagingScreen from '@/screens/Settings/Notifications/MessagingScreen/MessagingScreen';
import SuggestedPostsScreen from '@/screens/Settings/Notifications/SuggestedPostsScreen/SuggestedPostsScreen';
import PeopleYouMayKnowScreen from '@/screens/Settings/Notifications/PeopleYouMayKnowScreen/PeopleYouMayKnowScreen';
import EventsSettingsScreen from '@/screens/Settings/Notifications/EventsSettingsScreen/EventsSettingsScreen';
import LiveVideoScreen from '@/screens/Settings/Notifications/LiveVideoScreen/LiveVideoScreen';
import MarketPlaceScreen from '@/screens/Settings/Notifications/MarketPlaceScreen/MarketPlaceScreen';
import LifeEventsScreen from '@/screens/Settings/Notifications/LifeEventsScreen/LifeEventsScreen';
import NewsletterScreen from '@/screens/Settings/Notifications/NewsletterScreen/NewsletterScreen';
import PromotionScreen from '@/screens/Settings/Notifications/PromotionScreen/PromotionScreen';
import AppUpdateScreen from '@/screens/Settings/Notifications/AppUpdateScreen/AppUpdateScreen';
import OtherNotificationsScreen from '@/screens/Settings/Notifications/OtherNotificationsScreen/OtherNotificationsScreen';
import PaymentSuccessScreen from '@/screens/PaymentSuccessScreen/PaymentSuccessScreen';
import DocumentType from '@/screens/Settings/AccountSettings/DocumentType/DocumentType';
import SchoolID from '@/screens/Settings/AccountSettings/SchoolID/SchoolID';
import FrontID from '@/screens/Settings/AccountSettings/SchoolID/FrontID/FrontID';
import UploadHoldIDScreen from '@/screens/Settings/AccountSettings/SchoolID/UploadHoldIDScreen/UploadHoldIDScreen';
import SelfieScreen from '@/screens/Settings/AccountSettings/SelfieScreen/SelfieScreen';
import SelfieTaken from '@/screens/Settings/AccountSettings/SelfieScreen/SelfieTaken/SelfieTaken';
import Settings from '@/screens/Settings/Settings';
import VerificationRequestSubmitted from '@/screens/Settings/AccountSettings/VerificationRequestSubmitted/VerificationRequestSubmitted';
import FeedPreferencesScreen from '@/screens/Settings/AccountSettings/FeedPreferencesScreen/FeedPreferencesScreen';
import AutoPlayScreen from '@/screens/Settings/AccountSettings/AutoPlayScreen/AutoPlayScreen';
import PaymentCardsScreen from '@/screens/Settings/AccountSettings/PaymentCardsScreen/PaymentCardsScreen';
import WithdrawalBankScreen from '@/screens/Settings/AccountSettings/WithdrawalBankScreen/WithdrawalBankScreen';
import PhoneNumberConfirmation from '@/screens/Auth/PhoneNumberConfirmation';

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
      {/* <Stack.Screen component={DashboardTab} name="DashboardTab" /> */}
      <Stack.Screen component={BottomTab} name='BottomTab' />
      <Stack.Screen component={BrowseEvents} name='BrowseEvents' />
      <Stack.Screen component={CreateEvents} name='CreateEvents' />
      <Stack.Screen component={EventDetailScreen} name='EventDetailScreen' />
      <Stack.Screen component={Settings} name='Settings' />
      <Stack.Screen component={AccountSettingsScreen} name='AccountSettingsScreen' />
      <Stack.Screen component={ProfileScreen} name='ProfileScreen' />
      <Stack.Screen component={EditProfileScreen} name='EditProfileScreen' />
      <Stack.Screen component={VerificationScreen} name='VerificationScreen' />
      <Stack.Screen component={PrivacyPolicyScreen} name='PrivacyPolicyScreen' />
      <Stack.Screen component={TermsOfServiceScreen} name='TermsOfServiceScreen' />
      <Stack.Screen component={AppearanceSettingsScreen} name='AppearanceSettingsScreen' />
      <Stack.Screen component={VerificationSettingScreen} name='VerificationSettingScreen' />
      <Stack.Screen component={NotificationSettingsScreen} name='NotificationSettingsScreen' />
      <Stack.Screen component={PostsAndCommentsScreen} name='PostsAndCommentsScreen' />
      <Stack.Screen component={TagsAndMentionsScreen} name='TagsAndMentionsScreen' />
      <Stack.Screen component={NewFollowersScreen} name='NewFollowersScreen' />
      <Stack.Screen component={SharesLikesRepostsScreen} name='SharesLikesRepostsScreen' />
      <Stack.Screen component={ProfileViewsScreen} name='ProfileViewsScreen' />
      <Stack.Screen component={MessagingScreen} name='MessagingScreen' />
      <Stack.Screen component={SuggestedPostsScreen} name='SuggestedPostsScreen' />
      <Stack.Screen component={PeopleYouMayKnowScreen} name='PeopleYouMayKnowScreen' />
      <Stack.Screen component={EventsSettingsScreen} name='EventsSettingsScreen' />
      <Stack.Screen component={LiveVideoScreen} name='LiveVideoScreen' />
      <Stack.Screen component={MarketPlaceScreen} name='MarketPlaceScreen' />
      <Stack.Screen component={LifeEventsScreen} name='LifeEventsScreen' />
      <Stack.Screen component={NewsletterScreen} name='NewsletterScreen' />
      <Stack.Screen component={PromotionScreen} name='PromotionScreen' />
      <Stack.Screen component={AppUpdateScreen} name='AppUpdateScreen' />
      <Stack.Screen component={OtherNotificationsScreen} name='OtherNotificationsScreen' />
      <Stack.Screen component={PaymentSuccessScreen} name='PaymentSuccessScreen' />
      <Stack.Screen component={DocumentType} name='DocumentType' />
      <Stack.Screen component={SchoolID} name='SchoolID' />
      <Stack.Screen component={FrontID} name='FrontID' />
      <Stack.Screen component={UploadHoldIDScreen} name='UploadHoldIDScreen' />
      <Stack.Screen component={SelfieScreen} name='SelfieScreen' />
      <Stack.Screen component={SelfieTaken} name='SelfieTaken' />
      <Stack.Screen component={VerificationRequestSubmitted} name='VerificationRequestSubmitted' />
      <Stack.Screen component={FeedPreferencesScreen} name='FeedPreferencesScreen' />
      <Stack.Screen component={AutoPlayScreen} name='AutoPlayScreen' />
      <Stack.Screen component={PaymentCardsScreen} name='PaymentCardsScreen' />
      <Stack.Screen component={WithdrawalBankScreen} name='WithdrawalBankScreen' />
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
      {/* <Stack.Screen component={Login} name="Login" />
      <Stack.Screen component={ForgotPassword} name="ForgotPassword" />
      <Stack.Screen component={EmailConfirmation} name="EmailConfirmation" /> */}
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
      {/* <Stack.Screen component={AuthLanding} name="AuthLanding" /> */}
    </Stack.Navigator>
  );
}

function Navigation() {
  const { isAuthenticated } = useSelector((state: RootState) => state.user);

  return (
    <NavigationContainer>
      {isAuthenticated ? <AuthenticatedStack /> : <UnauthenticatedStack />}
    </NavigationContainer>
  );
}

export default withTranslation()(Navigation);
