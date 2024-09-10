/* eslint-disable react-native/no-inline-styles */
import { BackgroundColorProps } from '@shopify/restyle';
import React, { ReactNode } from 'react';
import { Dimensions, Platform, SafeAreaView, StatusBar } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Box from './Box';
import { PaletteType, Theme } from '@/constants/theme';
import { IconProps, IconVector } from '@/assets/icons/IconVector';

const { height } = Dimensions.get('window');

interface Style {
  imageName?: number;
  children: ReactNode;
  moduleBackgorund?: PaletteType;
  backgroundColor?: BackgroundColorProps<Theme>['backgroundColor'];
  overlayIconName?: IconProps['name'];
}
const StatusBarImageContainer = ({
  children,
  backgroundColor = 'primary',
  overlayIconName = 'onboarding_background',
}: Style) => {
  const insets = useSafeAreaInsets();

  return (
    <Box backgroundColor={backgroundColor} flex={1}>
      <Box
        flex={1}
        height={height / 2}
        left={0}
        position="absolute"
        right={0}
        top={0}>
        <IconVector height="105%" name={overlayIconName} width="100%" />
      </Box>
      <SafeAreaView style={{ flex: 1 }}>
        <Box
          backgroundColor="transparent"
          height={Platform.OS === 'android' ? insets.top + 12 : 5}>
          <StatusBar
            animated
            backgroundColor="transparent"
            barStyle="light-content"
            translucent
          />
        </Box>
        {children}
      </SafeAreaView>
    </Box>
  );
};

export default StatusBarImageContainer;
