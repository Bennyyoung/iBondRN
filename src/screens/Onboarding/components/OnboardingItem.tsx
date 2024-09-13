/* eslint-disable react-native/no-inline-styles */
import Box from '@/components/Box';
import Text from '@/components/Text';
import React from 'react';
import { useWindowDimensions } from 'react-native';
import { OnboardingSlideItem } from '../files/slides';

type OnboardingItemProps = {
  item: OnboardingSlideItem;
};

const OnboardingItem: React.FC<OnboardingItemProps> = ({ item }) => {
  const { width } = useWindowDimensions();

  return (
    <Box
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        width: width,
      }}>
      <Box flex={0.85} justifyContent="center" />
      <Box flex={0.15} paddingHorizontal="md">
        <Text
          variant="medium22"
          color="white"
          textAlign="left"
          numberOfLines={3}>
          {item.description}
        </Text>
      </Box>
    </Box>
  );
};

export default OnboardingItem;
