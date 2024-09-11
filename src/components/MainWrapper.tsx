import React, { ReactNode } from 'react';
import { StatusBar, ViewStyle, ImageSourcePropType } from 'react-native';
import { ImageBackground } from '@/components/ImageBackground';
import Box from '@/components/Box';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { styles } from '@/components/styles/styles';

interface MainWrapperProps {
  children: ReactNode;
  backgroundImage: ImageSourcePropType;
  contentContainerStyle?: ViewStyle;
  extraScrollHeight?: number;
}

const MainWrapper: React.FC<MainWrapperProps> = ({
  children,
  backgroundImage,
  contentContainerStyle,
  extraScrollHeight = 180,
}) => {
  return (
    <Box flex={1}>
      <StatusBar translucent backgroundColor="transparent" />
      <ImageBackground
        source={backgroundImage}
        style={styles.backgroundImage}
        resizeMode="cover">
        <KeyboardAwareScrollView
          contentContainerStyle={[
            styles.scrollViewContent,
            contentContainerStyle,
          ]}
          extraHeight={extraScrollHeight}>
          <Box paddingHorizontal="sml" paddingBottom="lg">
            <Box backgroundColor="white" borderRadius="md" padding="lg">
              {children}
            </Box>
          </Box>
        </KeyboardAwareScrollView>
      </ImageBackground>
    </Box>
  );
};

export default MainWrapper;
