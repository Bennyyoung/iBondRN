import React from 'react';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import Box from '@/components/Box';
import Text from '@/components/Text';
import { CustomButton } from '@/components/CustomButton';
import MainWrapper from '@/components/MainWrapper';
import background from '@/assets/images/bg-image.png';
import { StackParamsList } from '@/navigation/types';
import { SvgIcon } from '@/assets/icons/SvgIcon';

export type SuccessScreenParams = {
  title: string;
  message: string;
  buttonText: string;
  nextScreen: string;
  iconName: string;
};

const SuccessScreen: React.FC = () => {
  const navigation = useNavigation<StackNavigationProp<any>>();
  const route = useRoute<RouteProp<StackParamsList, 'SuccessScreen'>>();
  const { title, message, buttonText, nextScreen, iconName } = route.params;

  const handleContinue = () => {
    navigation.navigate(nextScreen);
  };

  return (
    <MainWrapper backgroundImage={background}>
      <Box flex={1} justifyContent="center" alignItems="center">
        <Box
          backgroundColor="white"
          borderRadius="lg"
          width="100%"
          alignItems="center">
          <Box marginVertical="lg">
            <SvgIcon name={iconName} size="pspxll" />
          </Box>
          <Box paddingHorizontal="xl">
            <Text variant="medium22" textAlign="center" mb="sm">
              {title}
            </Text>
          </Box>
          <Text
            variant="regular16"
            textAlign="center"
            color="secondaryGrey"
            mb="lg">
            {message}
          </Text>
          <CustomButton
            label={buttonText}
            onPress={handleContinue}
            backgroundColor="primary"
            labelProps={{ color: 'white', variant: 'regular14' }}
            borderRadius="smm"
            width="100%"
          />
        </Box>
      </Box>
    </MainWrapper>
  );
};

export default SuccessScreen;
