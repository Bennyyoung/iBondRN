import React, { useState, useRef, useEffect } from 'react';
import {
  Animated,
  TouchableOpacity,
  View,
  StyleSheet,
  Platform,
  KeyboardType,
  Dimensions,
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

const { height } = Dimensions.get('window')

interface CustomInputProps {
  label: string;
  value: string;
  onChangeText: (text: string) => void;
  onBlur?: (e: any) => void;
  onFocus?: (e: any) => void;
  secureTextEntry?: boolean;
  error?: string | boolean;
  keyboardType?: KeyboardType;
  containerProps?: object;
  iconName?: SvgIconPackType;
  iconSize?: keyof Theme['iconSizes'];
  placeholder?: string
  max?: number;
  onPress?: () => void
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
  max = 100,
  containerProps,
  iconName,
  iconSize,
  placeholder,
  onPress
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
            maxLength={max}
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
            <TouchableOpacity style={{ position: 'absolute', right: RFValue(16) }} onPress={onPress}>
              <SvgIcon name={iconName} size={iconSize} />
            </TouchableOpacity>
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
    width: '100%'

  },
  inputContainer: {
    height: Platform.OS === 'ios' ? RFValue(48) : RFValue(56),
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: RFValue(12),
    paddingHorizontal: RFValue(6),
    justifyContent: 'center',
    width: '100%'

  },
  inputContainerFocused: {
    borderColor: '#CFB0F5',
  },
  inputContainerError: {
    borderColor: '#FF3B30',
  },
  input: {
    fontSize: RFValue(14, height),
    color: '#151619',
    // Is this needed Adeyemo
    // paddingTop: Platform.OS === 'ios' ? RFValue(24) : RFValue(26),
    // paddingBottom: Platform.OS === 'ios' ? RFValue(8) : RFValue(10),
    height: '100%',
    // width: '100%'

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
