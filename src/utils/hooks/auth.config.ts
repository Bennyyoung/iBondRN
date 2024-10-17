import { initializeApp } from 'firebase/app';
import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';

const firebaseConfig = {
  apiKey: 'AIzaSyBQlsy3iT3ylAdq0scMdWV7krY6BMD_6Ts',
  authDomain: 'ibondelite-b4d13.firebaseapp.com',
  projectId: 'ibondelite-b4d13',
  storageBucket: 'ibondelite-b4d13.appspot.com',
  messagingSenderId: '82867885870',
  appId: '1:82867885870:android:3d15d7e366172f262f4cbf',
  measurementId: '',
};

const firebaseApp = initializeApp(firebaseConfig);

const auth = initializeAuth(firebaseApp, {
  persistence: getReactNativePersistence(AsyncStorage),
});

export { auth };
