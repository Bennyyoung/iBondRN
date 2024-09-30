/* eslint-disable react-native/no-inline-styles */
import React, { useState } from 'react';
import {
  Platform,
  FlatList,
  Image,
  PermissionsAndroid,
  TouchableOpacity,
} from 'react-native';
import Box from '@/components/Box';
import Text from '@/components/Text';
import { CustomButton } from '@/components/CustomButton';
import { SafeAreaView } from 'react-native-safe-area-context';
import { RFValue } from 'react-native-responsive-fontsize';
import { ChevronLeft } from 'lucide-react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { IconVector } from '@/assets/icons/IconVector';
import Contacts from 'react-native-contacts';

const FindFriendsFromContacts = () => {
  const navigation = useNavigation<StackNavigationProp<any>>();
  const [contacts, setContacts] = useState([]);
  const [showContacts, setShowContacts] = useState(false);

  const requestContactsPermission = async () => {
    if (Platform.OS === 'android') {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.READ_CONTACTS,
        {
          title: 'Contacts Permission',
          message: 'This app needs access to your contacts to find friends.',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        loadContacts();
      }
    } else {
      loadContacts();
    }
  };

  const loadContacts = () => {
    Contacts.getAll()
      .then((contcts: any) => {
        setContacts(contcts);
        setShowContacts(true);
      })
      .catch(e => {
        console.log(e);
      });
  };

  const handleContinue = () => {
    navigation.navigate('SearchInterests');
  };

  const handleSkip = () => {
    navigation.navigate('SearchInterests');
  };

  const renderFollowButton = status => {
    let buttonText, buttonColor, textColor;

    switch (status) {
      case 'following':
        buttonText = 'Following';
        buttonColor = '#FBF7FF';
        textColor = '#6500E0';
        break;
      case 'mutual':
        buttonText = 'Follow back';
        buttonColor = '#6500E0';
        textColor = 'white';
        break;
      default:
        buttonText = 'Follow';
        buttonColor = '#6500E0';
        textColor = 'white';
    }

    return (
      <TouchableOpacity
        onPress={() => {}}
        style={{
          backgroundColor: buttonColor,
          paddingHorizontal: RFValue(16),
          paddingVertical: RFValue(8),
          borderRadius: RFValue(20),
        }}>
        <Text variant="regular12" color={textColor}>
          {buttonText}
        </Text>
      </TouchableOpacity>
    );
  };

  const renderContactItem = ({ item }: any) => (
    <Box
      flexDirection="row"
      alignItems="center"
      justifyContent="space-between"
      padding="sm"
      borderBottomWidth={1}
      borderBottomColor="primaryGrey">
      <Box flexDirection="row" alignItems="center" flex={1}>
        <Image
          source={{
            uri: item.thumbnailPath || 'https://via.placeholder.com/50',
          }}
          style={{ width: 50, height: 50, borderRadius: 25 }}
        />
        <Box marginLeft="sm" flex={1}>
          <Text
            variant="regular16"
            numberOfLines={1}>{`${item.givenName} ${item.familyName}`}</Text>
          <Text variant="regular14" color="black" mt="xs" numberOfLines={1}>
            {item.phoneNumbers[0]?.number || 'No number'}
          </Text>
        </Box>
      </Box>
      {renderFollowButton(item.status)}
    </Box>
  );

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
      <Box
        flexDirection="row"
        justifyContent="space-between"
        alignItems="center"
        padding="md">
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <ChevronLeft color="black" size={RFValue(30)} />
        </TouchableOpacity>
        <TouchableOpacity onPress={handleSkip}>
          <Text variant="regular16" color="primary">
            Skip for now
          </Text>
        </TouchableOpacity>
      </Box>
      <Box flex={1} padding="md" backgroundColor="white">
        <Text variant="medium22" textAlign="left" mb="sm">
          Start connecting
        </Text>
        {!showContacts ? (
          <>
            <Text variant="regular14" textAlign="left" color="black" mb="xxl">
              Allow iBond access to your contacts and we'll help you connect
              with your friends faster.
            </Text>
            <TouchableOpacity onPress={requestContactsPermission}>
              <Box alignSelf="center" justifyContent="center" mb="xxl" mt="xl">
                <IconVector name="contact_list" size="xxxl" />
              </Box>
            </TouchableOpacity>
          </>
        ) : (
          <FlatList
            data={contacts}
            renderItem={renderContactItem}
            keyExtractor={item => item?.recordID}
          />
        )}
      </Box>
      <Box
        position="absolute"
        bottom={Platform.OS === 'ios' ? RFValue(20) : RFValue(10)}
        left={0}
        right={0}
        paddingHorizontal="md">
        <CustomButton
          label="Continue"
          onPress={handleContinue}
          backgroundColor="primary"
          labelProps={{ color: 'white', variant: 'regular14' }}
          borderRadius="smm"
          height={Platform.OS === 'ios' ? RFValue(42) : RFValue(52)}
        />
      </Box>
    </SafeAreaView>
  );
};

export default FindFriendsFromContacts;
