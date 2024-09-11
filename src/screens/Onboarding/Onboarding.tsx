/* eslint-disable react-native/no-inline-styles */
import React, { useState, useRef, useCallback, useEffect } from 'react';
import {
  Animated,
  Dimensions,
  ViewToken,
  FlatList,
  StatusBar,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Box from '@/components/Box';
import slides from './files/slides';
import OnboardingItem from './components/OnboardingItem';
import Paginator from './components/Paginator';
import { CustomButton } from '@/components/CustomButton';
import { ImageBackground } from '@/components/ImageBackground';
import background from '@/assets/images/bg-image.png';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

const { width } = Dimensions.get('window');

const viewedOnboarding = async () => {
  try {
    await AsyncStorage.setItem('@viewedOnboarding', 'true');
  } catch (error) {}
};

const Onboarding = () => {
  const scrollX = useRef(new Animated.Value(0)).current;
  const slidesRef = useRef<FlatList>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [completeOnboarding, setCompleteOnboarding] = useState(false);
  const navigation = useNavigation<StackNavigationProp<any>>();

  const viewableItemsChanged = useCallback(
    ({ viewableItems }: { viewableItems: ViewToken[] }) => {
      if (viewableItems && viewableItems.length > 0) {
        setCurrentIndex(viewableItems[0].index!);
      }
    },
    [],
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
    <Box flex={1}>
      <StatusBar translucent backgroundColor="transparent" />
      <ImageBackground
        source={background}
        style={{ flex: 1, width: '100%', height: '100%' }}
        resizeMode="cover">
        <Box
          flex={1}
          justifyContent="space-between"
          style={{
            paddingTop: StatusBar.currentHeight,
          }}>
          <Box flex={3} width={width}>
            <FlatList
              data={slides}
              renderItem={({ item }) => <OnboardingItem item={item} />}
              horizontal
              showsHorizontalScrollIndicator={false}
              pagingEnabled
              bounces={false}
              keyExtractor={item => item.id}
              onScroll={Animated.event(
                [{ nativeEvent: { contentOffset: { x: scrollX } } }],
                { useNativeDriver: false },
              )}
              scrollEventThrottle={32}
              onViewableItemsChanged={viewableItemsChanged}
              viewabilityConfig={viewConfig}
              ref={slidesRef}
            />
          </Box>
          <Box
            alignItems="center"
            justifyContent="flex-end"
            paddingHorizontal="md"
            width="100%"
            paddingBottom="md">
            <Paginator data={slides} scrollX={scrollX} />
            <CustomButton
              label="Get Started"
              onPress={() => {
                viewedOnboarding();
                navigation.navigate('Login');
              }}
              backgroundColor="white"
              labelProps={{ color: 'primary' }}
              borderRadius="smm"
              paddingVertical="sm"
              containerProps={{ width: '100%' }}
            />
          </Box>
        </Box>
      </ImageBackground>
    </Box>
  );
};

export default Onboarding;
