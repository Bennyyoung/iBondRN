
import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { SvgIcon } from '@/assets/icons';
import VerificationItem from '../VerificationItem/VerificationItem';

const infos = [
  {
    id: 1,
    title: "Verification badge",
    icon: <SvgIcon name="purpleTickOutlined" size="sml" />,
    description: "A badge is a testament that an account is being operated by a real person. It helps build trust."
  },
  {
    id: 2,
    title: "Increased exposure",
    icon: <SvgIcon name="purpleEye" size="sml" />,
    description: "Verified accounts get their contents displayed to more audience with content prioritization."
  },
  {
    id: 3,
    title: "Better support experience",
    icon: <SvgIcon name="purpleMessageQuestion" size="sml" />,
    description: "You get a much faster resolve when you use our help and support channels."
  },
]

const VerificationInfo = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>When you are verified, you get:</Text>

      {
        infos.map(info => (
          <VerificationItem
            key={info.id}
            title={info.title}
            icon={info.icon}
            description={info.description}
          />
        ))
      }
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 16,
    fontWeight: '400',
    color: '#333',
    marginBottom: 20,
  },
});

export default VerificationInfo;
