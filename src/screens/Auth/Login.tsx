import React, { useState } from 'react';
import { StatusBar, StyleSheet, TouchableOpacity, View } from 'react-native';
import { ImageBackground } from '@/components/ImageBackground';
import Box from '@/components/Box';
import Text from '@/components/Text';
import CustomInput from '@/components/CustomInput';
import background from '@/assets/images/bg-image.png';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const handleLogin = () => {
    setPasswordError('Incorrect password');
  };

  return (
    <Box flex={1}>
      <StatusBar translucent backgroundColor="transparent" />
      <ImageBackground
        source={background}
        style={styles.backgroundImage}
        resizeMode="cover">
        <Box flex={1} justifyContent="center" paddingHorizontal="lg">
          <Box backgroundColor="white" borderRadius="md" padding="lg">
            <Text fontSize={24} fontWeight="bold" mb="lg">
              Log in to <Text color="primary">iBond</Text>
            </Text>

            <CustomInput
              label="Username or email"
              value={username}
              onChangeText={setUsername}
            />

            <CustomInput
              label="Password"
              value={password}
              onChangeText={text => {
                setPassword(text);
                setPasswordError('');
              }}
              secureTextEntry
              error={passwordError}
            />

            <TouchableOpacity>
              <Text color="primary" mb="md">
                Forgotten Password?
              </Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
              <Text color="white" fontWeight="bold">
                Log In
              </Text>
            </TouchableOpacity>

            <Text textAlign="center" my="md">
              or sign in with
            </Text>

            <View style={styles.socialButtons}>
              <TouchableOpacity style={styles.googleButton}>
                <Text>Google</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.appleButton}>
                <Text color="white">Apple</Text>
              </TouchableOpacity>
            </View>

            <Text textAlign="center" mt="lg">
              New to iBond? <Text color="primary">Create an account</Text>
            </Text>
          </Box>
        </Box>
      </ImageBackground>
    </Box>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  loginButton: {
    backgroundColor: '#6500E0',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  socialButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  googleButton: {
    flex: 1,
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#E0E0E0',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginRight: 8,
  },
  appleButton: {
    flex: 1,
    backgroundColor: 'black',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginLeft: 8,
  },
});

export default Login;
