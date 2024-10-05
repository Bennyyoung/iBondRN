import { showMessage } from 'react-native-flash-message';
import { Colors } from '../../constants/colors.constants';
import { RFValue } from 'react-native-responsive-fontsize';

export const showErrorToast = (message: string, options = {}) => {
  showMessage({
    message: message,
    type: 'danger',
    backgroundColor: Colors.red400,
    color: Colors.neutral900,
    floating: true,
    statusBarHeight: RFValue(25),
    textStyle: {
      fontSize: RFValue(14),
      lineHeight: RFValue(21),
    },
    ...options,
  });
};

export const showToast = (message: string, options = {}) => {
  showMessage({
    message: message,
    type: 'default',
    floating: true,
    statusBarHeight: RFValue(25),
    textStyle: {
      fontSize: RFValue(14),
      lineHeight: RFValue(21),
    },
    ...options,
  });
};

export const showChatToast = (message: string, options = {}) => {
  showMessage({
    message: message,
    type: 'info',
    position: 'top',
    floating: true,
    statusBarHeight: RFValue(25),
    textStyle: {
      fontSize: RFValue(14),
      lineHeight: RFValue(21),
    },
    ...options,
  });
};

export const showSuccessToast = (message: string, options = {}) => {
  showMessage({
    message: message,
    type: 'success',
    backgroundColor: Colors.green500,
    color: Colors.neutral100,
    floating: true,
    statusBarHeight: RFValue(25),
    textStyle: {
      fontSize: RFValue(14),
      lineHeight: RFValue(21),
    },
    ...options,
  });
};

export const showGeneralErrorToast = (options = {}) =>
  showErrorToast('An error occurred\nPlease try again later', options);
