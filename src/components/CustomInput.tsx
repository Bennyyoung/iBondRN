import React, { useState } from 'react';
import { TouchableOpacity, View, StyleSheet } from 'react-native';
import { Eye, EyeOff } from 'lucide-react-native';
import Box from '@/components/Box';
import Text from '@/components/Text';
import TextInput from './TextInput';

interface CustomInputProps {
  label: string;
  value: string;
  onChangeText: (text: string) => void;
  secureTextEntry?: boolean;
  error?: string;
}

const CustomInput: React.FC<CustomInputProps> = ({
  label,
  value,
  onChangeText,
  secureTextEntry = false,
  error,
}) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  return (
    <Box mb="sm">
      <Text color="primary" mb="xs">
        {label}
      </Text>
      <View style={[styles.inputContainer, error ? styles.inputError : null]}>
        <TextInput
          style={styles.input}
          value={value}
          onChangeText={onChangeText}
          secureTextEntry={secureTextEntry && !isPasswordVisible}
        />
        {secureTextEntry && (
          <TouchableOpacity
            onPress={() => setIsPasswordVisible(!isPasswordVisible)}>
            {isPasswordVisible ? <EyeOff color="#888" /> : <Eye color="#888" />}
          </TouchableOpacity>
        )}
      </View>
      {error && (
        <Text color="error" mt="xs">
          {error}
        </Text>
      )}
    </Box>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 8,
    paddingHorizontal: 12,
  },
  inputError: {
    borderColor: 'red',
  },
  input: {
    flex: 1,
    height: 40,
  },
});

export default CustomInput;
