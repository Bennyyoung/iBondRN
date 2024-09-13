/* eslint-disable react-native/no-inline-styles */
import React, { ReactNode } from 'react';
import {
  StatusBar,
  ViewStyle,
  ImageSourcePropType,
  TouchableOpacity,
} from 'react-native';
import { ImageBackground } from '@/components/ImageBackground';
import Box from '@/components/Box';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { styles } from '@/components/styles/styles';
import { ChevronLeft } from 'lucide-react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

interface MainWrapperProps {
  children: ReactNode;
  backgroundImage: ImageSourcePropType;
  contentContainerStyle?: ViewStyle;
  extraScrollHeight?: number;
  hasBackButton?: boolean;
}

const MainWrapper: React.FC<MainWrapperProps> = ({
  children,
  backgroundImage,
  contentContainerStyle,
  extraScrollHeight = 180,
  hasBackButton = false,
}) => {
  const navigation = useNavigation<StackNavigationProp<any>>();
  return (
    <Box flex={1}>
      <StatusBar translucent backgroundColor="transparent" />
      <ImageBackground
        source={backgroundImage}
        style={styles.backgroundImage}
        resizeMode="cover">
        {hasBackButton && (
          <TouchableOpacity
            onPress={() => {
              navigation.goBack();
            }}
            style={{
              position: 'absolute',
              top: RFValue(40),
              zIndex: 1,
              padding: RFValue(10),
            }}>
            <ChevronLeft color="white" size={RFValue(30)} />
          </TouchableOpacity>
        )}
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
