export type AuthRequest = {
  email: string;
  password: string;
};

export type RegisterRequest = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  gender: 'MALE' | 'FEMALE';
  dob: string;
  username: string;
  address: string;
  phoneNumber: string;
  profilePicture: string;
  location: string;
  closeSchool: string;
  student: boolean;
  studentDto: {
    school: string;
    faculty: string;
    department: string;
    level: string;
  };
  referralCode?: string;
};

export type AuthResponse = {
  status: number;
  message: string;
  data: {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    token: string;
    createdAt: string;
    updatedAt: string;
    address: string;
    dob: string;
    phoneNumber: string;
    profilePicture: string;
    gender: string;
    isVerified: boolean;
    isDeactivated: boolean;
    username: string;
    userType: string;
    closeSchool: string;
    location: string;
    referralCode: string;
    department: string;
    faculty: string;
    level: string;
    school: string;
    settings: {
      id: number;
      createdBy: string;
      lastModifiedBy: string;
      createdAt: string;
      updatedAt: string;
      playAudio: boolean;
      muteAutoPlayedVideo: boolean;
      twoFAEnabled: boolean;
      suggestion: boolean;
      active: boolean;
      tagsAndMentions: boolean;
      profileUpdate: boolean;
      location: boolean;
      privateAccount: boolean;
      postSharing: boolean;
      media: boolean;
      vibezSharing: boolean;
      filterComment: boolean;
      readReceipt: boolean;
      theme: 'LIGHT' | 'DARK';
      notificationSettings: {
        id: number;
        createdBy: string;
        lastModifiedBy: string;
        createdAt: string;
        updatedAt: string;
        name: string;
        email: boolean;
        pushNotification: boolean;
        sms: boolean;
      }[];
      email: boolean;
      sms: boolean;
      whoCanSeeMyProfile: string;
      spamFilter: string;
      personalizedAdz: boolean;
      whoCanSeeMyPost: string;
      whoCanSeeMyComment: string;
      whoCanSeeMyVibez: string;
      whoCanSeeMyCommentVibez: string;
      paymentGateway: string;
    };
    profileStatusDetails: {
      id: number;
      createdBy: string;
      lastModifiedBy: string;
      createdAt: string;
      updatedAt: string;
      status: string;
      headline: string;
      aboutMe: string;
      reasonsForDeactivationOrDeletion: string;
      emails: {
        id: number;
        createdBy: string;
        lastModifiedBy: string;
        createdAt: string;
        updatedAt: string;
        email: string;
        isPrimary: string;
        verified: boolean;
      }[];
      phoneNumbers: {
        id: number;
        createdBy: string;
        lastModifiedBy: string;
        createdAt: string;
        updatedAt: string;
        phone: string;
        isPrimary: string;
        verified: boolean;
        blocked: boolean;
      }[];
      devices: {
        id: number;
        createdBy: string;
        lastModifiedBy: string;
        createdAt: string;
        updatedAt: string;
        deviceName: string;
        deviceType: string;
        location: string;
      }[];
      violations: {
        id: number;
        createdBy: string;
        lastModifiedBy: string;
        createdAt: string;
        updatedAt: string;
        date: string;
        level: string;
      }[];
    };
    verificationDetails: {
      id: number;
      createdBy: string;
      lastModifiedBy: string;
      createdAt: string;
      updatedAt: string;
      identityType: string;
      identityImageUrl: string;
      expirationDate: string;
      issuer: string;
    };
    role: {
      id: number;
      createdBy: string;
      lastModifiedBy: string;
      createdAt: string;
      updatedAt: string;
      name: string;
      description: string;
      privileges: {
        id: number;
        createdBy: string;
        lastModifiedBy: string;
        createdAt: string;
        updatedAt: string;
        name: string;
        description: string;
        authority: string;
      }[];
    };
  };
};

export type GeneralResponseType = {
  status: number;
  message: string;
  data: string;
};

export type ForgotPasswordRequest = {
  emailOrPhoneNumber: string;
  newPassword: string;
  confirmNewPassword: string;
};

export type SendOtpRequest = {
  email: string;
};

export type ValidateOtpRequest = {
  email: string;
  otp: number;
};

export type ValidateUsernameResponse = {
  status: number;
  message: string;
  data: {
    username: string;
    suggestions: string[];
    itExist: boolean;
  };
};

export type ConnectUsersRequest = {
  phoneNumbers: string[];
  page: number;
  limit: number;
  sortBy: string;
  sortDirection: 'DESC' | 'ASC';
};

export type ConnectUsersResponse = {
  status: number;
  message: string;
  data: {
    iamFollowing: boolean;
    user: {
      id: number;
      firstName: string;
      lastName: string;
      phoneNumber: string;
      profilePicture: string;
      username: string;
      userType: string;
      closeSchool: string;
      location: string;
      department: string;
      faculty: string;
      level: string;
      school: string;
    };
    following: boolean;
    signedUp: boolean;
  }[];
};

export type UpdateUserInterests = {
  interests: string[];
};

export type GoogleSigninRequest = {
  data: {
    idToken: string;
    scopes: string[];
    serverAuthCode: {};
    user: {
      email: string;
      familyName: string;
      givenName: string;
      id: string;
      name: string;
      photo: string;
    };
  };
  type: string;
};
