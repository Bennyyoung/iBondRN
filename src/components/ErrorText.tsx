/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { RFValue } from 'react-native-responsive-fontsize';
import Text from './Text';

const NewErrorText = ({ error }: { error: boolean | string | null }) =>
  error ? (
    <Text style={[{ color: 'red', marginTop: RFValue(3) }]} variant="regular14">
      {error}
    </Text>
  ) : null;
export default NewErrorText;
