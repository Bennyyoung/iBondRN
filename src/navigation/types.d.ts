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
  Security: undefined;

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

  // AccountSettings
  Settings: undefined;
  AccountSettings: undefined;

  ProfileScreen: undefined;
  EditProfile: undefined;

  Verification: undefined;
  VerificationSettingScreen: undefined;
  PrivacyPolicy: undefined;
  Appearance: undefined;
  Notifications: undefined;
  PostsAndComments: undefined;
  TagsAndMentions: undefined;
  NewFollowers: undefined;
  SharesLikesReposts: undefined;
  ProfileViews: undefined;
  MessagingNotification: undefined;
  SuggestedPosts: undefined;
  PeopleYouMayKnow: undefined;
  EventsSettings: undefined;
  LiveVideo: undefined;
  MarketPlace: undefined;
  LifeEvents: undefined;
  Newsletter: undefined;
  Promotion: undefined;
  AppUpdate: undefined;
  OtherNotifications: undefined;
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
  UploadHoldID: undefined;
  SelfieScreen: undefined;
  SelfieTaken: {
    selfie: {
      path: string;
      photograph: string;
    }
    requestCameraPermission: () => Promise<void>
  };
  VerificationRequestSubmitted: undefined
  FeedPreferences: undefined
  AutoPlay: undefined
  PaymentCards: undefined
  WithdrawalBank: undefined
  AccountStatus: undefined
  DeactivateDeleteAccountScreen: undefined
  DeactivateAccountScreen: undefined
  DeleteAccountScreen: undefined
  Security: undefined
  EmailAddresses: undefined
  PhoneNumbers: undefined
  ChangePassword: undefined
  ForgotPasswordScreen: undefined
  ConfirmAccountScreen: undefined
  NewPasswordScreen: undefined
  ConnectedDevices: undefined
  TwoStepAuthentication: undefined
  TwoStepAuthenticationOTP: undefined
  SelectAuthenticationMethod: undefined
  SelectAuthenticationMethodOTP: undefined
  TwoStepAuthenticationSetupComplete: undefined
  AuthenticationApp: undefined
  AuthenticationCode: undefined
  PrivacyAndSafety: undefined
  AccountPrivacy: undefined
  Blocked: undefined
  Posts: undefined
  Vibez: undefined
  Comments: undefined
  Messaging: undefined
  AdsPreferences: undefined
  ChangePasswordSecurity: undefined

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
