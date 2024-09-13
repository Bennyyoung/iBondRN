import React, { useState, useRef, useEffect } from 'react';
import { View, TextInput, StyleSheet, Animated } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import Text from '@/components/Text';
import { triggerShakeAnimation } from '@/utils/helpers/shakeAnimation';

interface OTPInputProps {
  onCodeComplete: (code: string) => void;
  error?: string | boolean;
}

const OTPInput: React.FC<OTPInputProps> = ({ onCodeComplete, error }) => {
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const inputRefs = useRef<Array<TextInput | null>>([]);
  const animValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (error) {
      triggerShakeAnimation(animValue);
    }
  }, [animValue, error]);

  const handleOtpChange = (value: string, index: number) => {
    if (!/^\d*$/.test(value)) {
      return;
    }

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value !== '') {
      if (index < 5) {
        inputRefs.current[index + 1]?.focus();
      } else {
        inputRefs.current[index]?.blur();
        if (newOtp.every(digit => digit !== '')) {
          onCodeComplete(newOtp.join(''));
        }
      }
    } else if (index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleKeyPress = (e: any, index: number) => {
    if (e.nativeEvent.key === 'Backspace' && index > 0 && otp[index] === '') {
      inputRefs.current[index - 1]?.focus();
    }
  };

  return (
    <Animated.View style={{ transform: [{ translateX: animValue }] }}>
      <View style={styles.otpContainer}>
        {otp.map((digit, index) => (
          <TextInput
            key={index}
            ref={ref => (inputRefs.current[index] = ref)}
            style={[styles.otpInput, error && styles.otpInputError]}
            value={digit}
            onChangeText={value => handleOtpChange(value, index)}
            onKeyPress={e => handleKeyPress(e, index)}
            keyboardType="number-pad"
            maxLength={1}
            selectTextOnFocus
            onFocus={() => {
              if (index > 0 && otp[index - 1] === '') {
                inputRefs.current[otp.findIndex(d => d === '')]?.focus();
              }
            }}
          />
        ))}
      </View>
      {error && typeof error === 'string' && (
        <Text style={styles.errorText}>{error}</Text>
      )}
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  otpContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: RFValue(8),
  },
  otpInput: {
    width: RFValue(46),
    height: RFValue(48),
    borderWidth: 1,
    borderColor: '#CFB0F5',
    borderRadius: RFValue(12),
    textAlign: 'center',
    fontSize: RFValue(18),
    color: '#151619',
  },
  otpInputError: {
    borderColor: '#FF3B30',
  },
  errorText: {
    color: '#FF3B30',
    fontSize: RFValue(12),
    marginLeft: RFValue(10),
  },
});

export default OTPInput;
