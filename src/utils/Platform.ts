import {Dimensions, Platform} from 'react-native';

export const isIOS = Platform.OS === 'ios';

export const screenDimensions = Dimensions.get('screen');
