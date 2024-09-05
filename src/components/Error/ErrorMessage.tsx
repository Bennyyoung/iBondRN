import React from 'react';

import ExclamationIcon from '@/assets/svg/exclamation.svg';
import { Box, Text } from '@/components/';

import { RFValue } from 'react-native-responsive-fontsize';

interface ErrorMessageProps {
  text: string;
}

function ErrorMessage({ text }: ErrorMessageProps) {
  return (
    <Box alignItems="center" flexDirection="row">
      <ExclamationIcon height={RFValue(14)} width={RFValue(14)} />
      <Text color="error" marginLeft="xs" variant="regular14">
        {text}
      </Text>
    </Box>
  );
}

export { ErrorMessage };
