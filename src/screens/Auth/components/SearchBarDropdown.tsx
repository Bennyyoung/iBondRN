/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { TouchableOpacity, ScrollView } from 'react-native';
import Text from '@/components/Text';
import { RFValue } from 'react-native-responsive-fontsize';

interface InterestDropdownProps {
  interests: string[];
  onInterestSelect: (interest: string) => void;
}

const InterestDropdown: React.FC<InterestDropdownProps> = ({
  interests,
  onInterestSelect,
}) => {
  return (
    <ScrollView
      style={{
        maxHeight: RFValue(150),
        backgroundColor: '#F0F0F0',
        borderRadius: RFValue(10),
        padding: RFValue(8),
      }}>
      {interests.map((interest, index) => (
        <TouchableOpacity
          key={interest}
          onPress={() => onInterestSelect(interest)}
          style={{
            padding: RFValue(10),
            borderBottomWidth: index === interests.length - 1 ? 0 : 1,
            borderBottomColor: '#CCC',
            paddingBottom:
              index === interests.length - 1 ? RFValue(20) : RFValue(10),
          }}>
          <Text variant="regular14" color="black">
            {interest}
          </Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};

export default InterestDropdown;
