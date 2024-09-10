/* eslint-disable react-native/no-inline-styles */
import Box from '@/components/Box';
import React, { useState, useRef, useCallback, useEffect } from 'react';
import slides from './files/slides';
import OnboardingItem from './components/OnboardingItem';
import { FlatList, Animated, Dimensions, ViewToken } from 'react-native';
import Paginator from './components/Paginator';
import { ImageBackground } from '@/components/ImageBackground';
import background from '@/assets/images/bg-image.png';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { CustomButton } from '@/components/CustomButton';

const { height } = Dimensions.get('window');

const viewedOnboarding = async () => {
  try {
    await AsyncStorage.setItem('@viewedOnboarding', 'true');
  } catch (error) {}
};

const Onboarding = () => {
  const scrollX = useRef(new Animated.Value(0)).current;
  const slidesRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [completeOnboarding, setCompleteOnboarding] = useState(false);

  const viewableItemsChanged = useCallback(
    ({ viewableItems }: { viewableItems: ViewToken[] | null }) => {
      if (viewableItems && viewableItems.length > 0) {
        setCurrentIndex(viewableItems[0].index!);
      }
    },
    [setCurrentIndex],
  );

  const viewConfig = useRef({ viewAreaCoveragePercentThreshold: 50 }).current;

  useEffect(() => {
    if (currentIndex === slides.length - 1 && !completeOnboarding) {
      setTimeout(() => {
        setCompleteOnboarding(true);
      }, 400);
    }
  }, [currentIndex, completeOnboarding]);

  return (
    <Box alignItems="center" flex={1} justifyContent="center">
      <ImageBackground
        height={height}
        resizeMode="cover"
        source={background}
        style={{
          alignItems: 'center',
          flex: 1,
          backgroundColor: '#6500E0',
          justifyContent: 'center',
        }}>
        <Box flex={3}>
          <FlatList
            bounces={false}
            data={slides}
            horizontal
            keyExtractor={item => item.id}
            renderItem={({ item }) => <OnboardingItem item={item} />}
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            onScroll={Animated.event(
              [{ nativeEvent: { contentOffset: { x: scrollX } } }],
              {
                useNativeDriver: false,
              },
            )}
            scrollEventThrottle={32}
            ref={slidesRef}
            onViewableItemsChanged={viewableItemsChanged}
            viewabilityConfig={viewConfig}
          />
        </Box>
        <Box alignItems="center" justifyContent="center" paddingHorizontal="md">
          <Paginator data={slides} scrollX={scrollX} />
          <CustomButton
            backgroundColor="white"
            borderRadius="smm"
            containerProps={{ width: '100%' }}
            label="Get Started"
            labelProps={{ color: 'primary' }}
            mb="sm"
            onPress={async () => await viewedOnboarding()}
            paddingVertical="sm"
          />
        </Box>
      </ImageBackground>
    </Box>
  );
};

export default Onboarding;
