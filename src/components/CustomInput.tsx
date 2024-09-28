import React, { useState, useRef, useEffect } from 'react';
import {
  Animated,
  TouchableOpacity,
  View,
  StyleSheet,
  Platform,
} from 'react-native';
import { Eye, EyeOff } from 'lucide-react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import Text from '@/components/Text';
import TextInput from './TextInput';
import { triggerShakeAnimation } from '@/utils/helpers/shakeAnimation';
import Box from './Box';
import { SvgIcon } from '@/assets/icons/SvgIcon';
import { SvgIconPackType } from '@/assets/icons/svgIconPack';
import { Theme } from '@/constants/theme';

interface CustomInputProps {
  label: string;
  value: string;
  onChangeText: (text: string) => void;
  onBlur?: (e: any) => void;
  onFocus?: (e: any) => void;
  secureTextEntry?: boolean;
  error?: string | boolean;
  keyboardType?:
    | 'default'
    | 'numeric'
    | 'email-address'
    | 'ascii-capable'
    | 'numbers-and-punctuation'
    | 'url'
    | 'number-pad'
    | 'phone-pad'
    | 'name-phone-pad'
    | 'decimal-pad'
    | 'twitter'
    | 'web-search'
    | 'visible-password';
  containerProps?: object;
  iconName?: SvgIconPackType;
  iconSize?: keyof Theme['iconSizes'];
  placeholder?: string
}

const CustomInput: React.FC<CustomInputProps> = ({
  label,
  value,
  onChangeText,
  onBlur,
  onFocus,
  secureTextEntry = false,
  error,
  keyboardType = 'default',
  containerProps,
  iconName,
  iconSize,
  placeholder
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const animatedIsFocused = useRef(
    new Animated.Value(value === '' ? 0 : 1),
  ).current;
  const animValue = useRef(new Animated.Value(0)).current;

  const handleFocus = (e: any) => {
    setIsFocused(true);
    if (onFocus) {
      onFocus(e);
    }
  };

  const handleBlur = (e: any) => {
    setIsFocused(false);
    if (onBlur) {
      onBlur(e);
    }
  };

  useEffect(() => {
    Animated.timing(animatedIsFocused, {
      toValue: isFocused || value !== '' ? 1 : 0,
      duration: 200,
      useNativeDriver: false,
    }).start();
  }, [animatedIsFocused, isFocused, value]);

  useEffect(() => {
    if (error) {
      triggerShakeAnimation(animValue);
    }
  }, [animValue, error]);

  const labelStyle = {
    position: 'absolute',
    left: Platform.OS === 'ios' ? RFValue(6) : RFValue(8),
    top: animatedIsFocused.interpolate({
      inputRange: [0, 1],
      outputRange: [RFValue(16), RFValue(8)],
    }),
    fontSize: animatedIsFocused.interpolate({
      inputRange: [0, 1],
      outputRange: [RFValue(14), RFValue(11)],
    }),
    color: animatedIsFocused.interpolate({
      inputRange: [0, 1],
      outputRange: ['#888', '#888'],
    }),
  };

  return (
    <Animated.View
      style={[{ transform: [{ translateX: animValue }] }, containerProps]}>
      <View style={styles.container}>
        <View
          style={[
            styles.inputContainer,
            isFocused && styles.inputContainerFocused,
            error && styles.inputContainerError,
          ]}>
          <Animated.Text style={labelStyle}>{label}</Animated.Text>
          <TextInput
            style={styles.input}
            value={value}
            onChangeText={onChangeText}
            onFocus={handleFocus}
            onBlur={handleBlur}
            secureTextEntry={secureTextEntry && !isPasswordVisible}
            blurOnSubmit
            keyboardType={keyboardType}
            placeholder={placeholder}
          />
          {secureTextEntry && (
            <TouchableOpacity
              style={styles.eyeIcon}
              onPress={() => setIsPasswordVisible(!isPasswordVisible)}>
              {isPasswordVisible ? (
                <EyeOff color={error ? '#FF3B30' : '#888'} size={RFValue(20)} />
              ) : (
                <Eye color={error ? '#FF3B30' : '#888'} size={RFValue(20)} />
              )}
            </TouchableOpacity>
          )}
          {iconName && iconSize && (
            <Box position="absolute" right={RFValue(16)}>
              <SvgIcon name={iconName} size={iconSize} />
            </Box>
          )}
        </View>
        {error && typeof error === 'string' && (
          <Text style={styles.errorText}>{error}</Text>
        )}
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: RFValue(8),
  },
  inputContainer: {
    height: Platform.OS === 'ios' ? RFValue(48) : RFValue(56),
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: RFValue(12),
    paddingHorizontal: RFValue(6),
    justifyContent: 'center',
  },
  inputContainerFocused: {
    borderColor: '#CFB0F5',
  },
  inputContainerError: {
    borderColor: '#FF3B30',
  },
  input: {
    fontSize: RFValue(14),
    color: '#151619',
    // Is this needed Adeyemo
    // paddingTop: Platform.OS === 'ios' ? RFValue(24) : RFValue(26),
    // paddingBottom: Platform.OS === 'ios' ? RFValue(8) : RFValue(10),
    height: '100%',
  },
  eyeIcon: {
    position: 'absolute',
    right: RFValue(16),
    top: '50%',
    transform: [{ translateY: -RFValue(10) }],
  },
  errorText: {
    color: '#FF3B30',
    fontSize: RFValue(12),
    marginTop: RFValue(4),
  },
});

export default CustomInput;
