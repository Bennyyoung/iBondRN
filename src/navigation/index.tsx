/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NavigationContainer } from '@react-navigation/native';
import {
  CardStyleInterpolators,
  createStackNavigator,
  StackScreenProps,
} from '@react-navigation/stack';
import { useEffect, useState } from 'react';
import { withTranslation } from 'react-i18next';
import { ActivityIndicator } from 'react-native';

import Onboarding from '@/screens/Onboarding/Onboarding';
import AuthLanding from '@/screens/Auth/AuthLanding';
import Login from '@/screens/Auth//Login';

import type { AppNavRoutes } from './types';
import DashboardTab from './DashboardTab';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';

export type AppNavScreenProps<Screen extends keyof AppNavRoutes> =
  StackScreenProps<AppNavRoutes, Screen>;

const Stack = createStackNavigator<AppNavRoutes>();

function AuthenticatedStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        headerShown: false,
      }}>
      <Stack.Screen component={DashboardTab} name="DashboardTab" />
      <Stack.Screen component={AuthLanding} name="AuthLanding" />
    </Stack.Navigator>
  );
}

function UnauthenticatedStack() {
  const [loading, setLoading] = useState(true);
  const [viewedOnboarding, setViewedOnboarding] = useState(false);

  const checkOnboarding = async () => {
    try {
      const value = await AsyncStorage.getItem('@viewedOnboarding');
      if (value !== null) {
        setViewedOnboarding(true);
      }
    } catch {
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    checkOnboarding();
  }, []);

  if (loading) {
    return (
      <ActivityIndicator
        animating
        size="large"
        style={{
          alignSelf: 'center',
          flex: 1,
          justifyContent: 'center',
        }}
      />
    );
  }
  return (
    <Stack.Navigator
      screenOptions={{
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        headerShown: false,
      }}>
      {!viewedOnboarding && (
        <Stack.Screen component={Onboarding} name="Onboarding" />
      )}
      <Stack.Screen component={AuthLanding} name="AuthLanding" />
      <Stack.Screen component={Login} name="Login" />
    </Stack.Navigator>
  );
}

function Navigation() {
  const { isAuthenticated } = useSelector((state: RootState) => state.user);

  return (
    <NavigationContainer>
      {isAuthenticated ? <AuthenticatedStack /> : <UnauthenticatedStack />}
    </NavigationContainer>
  );
}

export default withTranslation()(Navigation);
