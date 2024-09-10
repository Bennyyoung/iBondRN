/* eslint-disable react-native/no-inline-styles */
import Box from '@/components/Box';
import React from 'react';
import { RFValue } from 'react-native-responsive-fontsize';
import { OnboardingSlideItem } from '../files/slides';
import { Animated, useWindowDimensions } from 'react-native';

type PaginatorProps = {
  data: OnboardingSlideItem[];
  scrollX: any;
};

const Paginator: React.FC<PaginatorProps> = ({ data, scrollX }) => {
  const { width } = useWindowDimensions();

  return (
    <Box flexDirection="row" height={RFValue(30)}>
      {data.map((_, i) => {
        const inputRange = [(i - 1) * width, i * width, (i + 1) * width];

        const dotWidth = scrollX.interpolate({
          inputRange,
          outputRange: [10, 40, 10],
          extrapolate: 'clamp',
        });

        const opacity = scrollX.interpolate({
          inputRange,
          outputRange: [0.3, 1, 0.3],
          extrapolate: 'clamp',
        });

        return (
          <Animated.View
            style={{
              borderRadius: 5,
              backgroundColor: '#FFFFFF',
              marginHorizontal: 8,
              height: 6,
              opacity,
              width: dotWidth,
            }}
            key={i.toString()}
          />
        );
      })}
    </Box>
  );
};

export default Paginator;
