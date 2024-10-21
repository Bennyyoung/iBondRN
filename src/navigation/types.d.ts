import { Event } from "@/components/types";

export type AppNavRoutes = {
  // authentication navigation types
  Onboarding: undefined;
  Login: undefined;
  ForgotPassword: undefined;
  EmailConfirmation: undefined;
  PhoneNumberConfirmation: undefined;
  PasswordCreation: undefined;
  UsernameSelection: undefined;
  ForgotPasswordConfirmation: undefined;
  SuccessScreen: {
    title: string;
    message: string;
    buttonText: string;
    nextScreen: string;
    iconName?: SvgIconPackType;
  };
  PostSignUpScreen: undefined;
  PhotoUploadScreen: undefined;
  FindFriendsFromContacts: undefined;
  SearchInterests: undefined;
  HomeScreen: undefined;
  ResetPasswordLanding: undefined;
  ResetPassword: undefined;
  LoginAnotherUser: undefined;
  EmailSentScreen: undefined;
  ResetSuccessScreen: undefined;
  PhoneNumberVerification: undefined;
  VerifyResetPin: undefined;
  CompleteSignUp: undefined;
  AuthLanding: undefined;
  VerifyOtp: undefined;
  PhoneOtpVerification: undefined;
  SuccessScreen: {
    hasForwardButton: boolean;
    onPressForwardButtonScreen: string;
    forwardButtonText: string;
    statusMessage: string;
  };
  // End of authentication types

  // Home Dashboard types
  DashboardTab: undefined;
  BottomTab: undefined;
  Events: undefined;
  EventDetails: undefined;
  // Security Question types
  SecurityScreen: undefined;

  // AboutUs Screen
  AboutUsScreen: undefined;
  // Support Screen
  SupportScreen: undefined;
  ChatScreen: undefined;
  FaqScreen: undefined;
  TermsOfService: undefined;
  // Change PIN
  ChangePin: undefined;
  ChangePassword: undefined;
  // New PIN
  NewPin: {
    changePin: string;
  };
  NewPinSuccess: undefined;
  // Change password
  ChangePassword: undefined;
  // Change password success
  ChangePasswordSuccess: undefined;
  PersonalDataScreen: undefined;
  PersonalDataSuccess: undefined;
  CreateEvents: undefined;
  EventDetailScreen: undefined;
  BrowseEvents: undefined;

  // AccountSettingsScreen
  Settings: undefined;
  AccountSettingsScreen: undefined;

  ProfileScreen: undefined;
  EditProfileScreen: undefined;

  VerificationScreen: undefined;
  VerificationSettingScreen: undefined;
  PrivacyPolicyScreen: undefined;
  AppearanceSettingsScreen: undefined;
  TermsOfServiceScreen: undefined;
  NotificationSettingsScreen: undefined;
  PostsAndCommentsScreen: undefined;
  TagsAndMentionsScreen: undefined;
  NewFollowersScreen: undefined;
  SharesLikesRepostsScreen: undefined;
  ProfileViewsScreen: undefined;
  MessagingScreen: undefined;
  SuggestedPostsScreen: undefined;
  PeopleYouMayKnowScreen: undefined;
  EventsSettingsScreen: undefined;
  LiveVideoScreen: undefined;
  MarketPlaceScreen: undefined;
  LifeEventsScreen: undefined;
  NewsletterScreen: undefined;
  PromotionScreen: undefined;
  AppUpdateScreen: undefined;
  OtherNotificationsScreen: undefined;
  PaymentSuccessScreen: undefined;
  DocumentType: undefined;
  SchoolID: undefined;
  FrontID: {
    handleConfirmTakePhoto: () => void,
    handleUpload: (files: File[]) => Promise<void>,
    pictureData: {
      path: string;
      photograph: string;
    }
  };
  UploadHoldIDScreen: undefined;
  SelfieScreen: undefined;
  SelfieTaken: {
    selfie: {
      path: string;
      photograph: string;
    }
    requestCameraPermission: () => Promise<void>
  };
  VerificationRequestSubmitted: undefined
  FeedPreferencesScreen: undefined
  AutoPlayScreen: undefined
  PaymentCardsScreen: undefined
  WithdrawalBankScreen: undefined

};

// Events

type EventDetailRouteProp = RouteProp<{
  EventDetailScreen: { event: Event };
}, 'EventDetailScreen'>;

// Define props type for the component
type EventDetailScreenProps = {
  route: EventDetailRouteProp;
};

// Dashboard Bottom tab routes
type MyTabRoutes = {
  HomeDashboard: undefined;
  ProfileScreen: undefined;
  HistoryLanding: undefined;
  SettingsLanding: undefined;
};



export type StackParamsList = AppNavRoutes;
export type BottomStackParamsList = MyTabRoutes;
export type RootStackParamsList =
  declare global {
    namespace ReactNavigation {
      type RootParamList = StackParamsList;
      type BottomTabParamList = BottomStackParamsList;
    }
  }
