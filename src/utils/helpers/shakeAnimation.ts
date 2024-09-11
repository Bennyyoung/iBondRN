import { Animated } from 'react-native';

export const triggerShakeAnimation = (animValue: Animated.Value) => {
  Animated.sequence([
    Animated.timing(animValue, {
      toValue: -10,
      duration: 100,
      useNativeDriver: true,
    }),
    Animated.timing(animValue, {
      toValue: 10,
      duration: 100,
      useNativeDriver: true,
    }),
    Animated.timing(animValue, {
      toValue: -10,
      duration: 100,
      useNativeDriver: true,
    }),
    Animated.timing(animValue, {
      toValue: 0,
      duration: 100,
      useNativeDriver: true,
    }),
  ]).start();
};
