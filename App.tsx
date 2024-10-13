/* eslint-disable react-native/no-inline-styles */
import './src/i18n';

import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import { ThemeProvider } from '@shopify/restyle';
import React, { useEffect } from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { enableScreens } from 'react-native-screens';
import FlashMessage from 'react-native-flash-message';
import SplashScreen from 'react-native-splash-screen';
import { Provider } from 'react-redux';
import Contexts from './src/contexts';

import theme from '@/constants/theme';
import Navigation from '@/navigation/';
import { persistor, store } from '@/reduxFolder/store';
import { PersistGate } from 'redux-persist/integration/react';

const App = () => {
  enableScreens(true);

  useEffect(() => {
    setTimeout(() => {
      SplashScreen.hide();
    }, 500);
  }, []);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <ThemeProvider theme={theme}>
            <SafeAreaProvider>
              <BottomSheetModalProvider>
                <Contexts.BottomSheet.BottomSheetProvider>
                  <Navigation />
                </Contexts.BottomSheet.BottomSheetProvider>
              </BottomSheetModalProvider>
            </SafeAreaProvider>
            <FlashMessage position="top" />
          </ThemeProvider>
        </PersistGate>
      </Provider>
    </GestureHandlerRootView>
  );
};

export default App;
