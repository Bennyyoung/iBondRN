import { showMessage } from 'react-native-flash-message';
import { Colors } from '../../constants/colors.constants';

export const showErrorToast = (message: string, options = {}) => {
  showMessage({
    message: message,
    type: 'danger',
    backgroundColor: Colors.red400,
    color: Colors.neutral900,
    ...options,
  });
};

export const showToast = (message: string, options = {}) => {
  showMessage({
    message: message,
    type: 'default',
    ...options,
  });
};

export const showChatToast = (message: string, options = {}) => {
  showMessage({
    message: message,
    type: 'info',
    position: 'top',
    ...options,
  });
};

export const showSuccessToast = (message: string, options = {}) => {
  showMessage({
    message: message,
    type: 'success',
    backgroundColor: Colors.green500,
    color: Colors.neutral100,
    ...options,
  });
};

export const showGeneralErrorToast = (options = {}) =>
  showErrorToast('An error occurred\nPlease try again later', options);
