export type AppNavRoutes = {
  // authentication navigation types
  Onboarding: undefined;
  Login: undefined;
  ForgotPassword: undefined;
  EmailConfirmation: undefined;
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
};

// Events
export type Event = {
  id: number;
  eventTitle: string;
  eventPlatform: string;
  eventType: string;
  eventStatus: string;
  statusColor: string;
  statusIcon: string;
  eventTime: string;
  meetingIcon: React.JSX.Element;  // For the SVG component
  platformIcon: React.JSX.Element; // For the SVG component
  eventImage: React.JSX.Element; // For the SVG component
  eventTimeIcon: React.JSX.Element,
  organizer: {
    organizerPicture: React.JSX.Element,
    organizerName: string,
    organizerUniversity: string,
    isVerified: boolean
  }
}

export type EventDetails = {
  event: Event
}

export type RouteParams = EventDetails


type EventDetailsScreenRouteProp = RouteProp<RouteParams, 'EventDetails'>;

export type EventDetailsProps = {
  route: EventDetailsScreenRouteProp;
}

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
