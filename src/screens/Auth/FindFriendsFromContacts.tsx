/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */
import React, { useEffect, useState } from 'react';
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
import Contacts from 'react-native-contacts';
import { useConnectUsersMutation } from '@/redux/features/auth/service';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { showErrorToast } from '@/utils/helpers/toastHelper';
import { ConnectUsersRequest } from '@/redux/features/auth/services.types';
import useUpdateUserFollowers from '@/utils/hooks/Auth/useFollowUser';
import { IconVector } from '@/assets/icons/IconVector';

const BATCH_SIZE = 100;

const FindFriendsFromContacts = () => {
  const navigation = useNavigation<StackNavigationProp<any>>();
  const [contacts, setContacts] = useState([]);
  const [filteredContacts, setFilteredContacts] = useState<any>([]);
  const [showContacts, setShowContacts] = useState(false);
  const [isPermissionGranted, setIsPermissionGranted] = useState(false);

  const [connectUsers, { isLoading }] = useConnectUsersMutation();
  const { updateFollowers } = useUpdateUserFollowers();

  useEffect(() => {
    if (contacts.length > 0) {
      batchAndSendContacts();
    }
  }, [contacts]);

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
      .then((contactsList: any) => {
        setContacts(contactsList);
        setShowContacts(true);
        setIsPermissionGranted(true);
      })
      .catch(e => {
        console.log(e);
      });
  };

  const viewedConnectScreen = async () => {
    try {
      await AsyncStorage.removeItem('@newlyregistered');
    } catch {}
  };

  const handleContinue = async () => {
    await viewedConnectScreen();
    navigation.navigate('SearchInterests');
  };

  const handleSkip = async () => {
    await viewedConnectScreen();
    navigation.navigate('SearchInterests');
  };

  const batchAndSendContacts = async () => {
    try {
      const phoneNumbers = contacts
        .map(contact =>
          contact.phoneNumbers.map(
            pn => '+234' + pn.number.replace(/\s+/g, '').slice(-10),
          ),
        )
        .flat();

      for (let i = 0; i < phoneNumbers.length; i += BATCH_SIZE) {
        const batch = phoneNumbers.slice(i, i + BATCH_SIZE);

        const requestData: ConnectUsersRequest = {
          phoneNumbers: batch,
          page: 1,
          limit: BATCH_SIZE,
          sortBy: 'name',
          sortDirection: 'ASC',
        };

        const response = await connectUsers(requestData).unwrap();

        if (response.status === 200) {
          setFilteredContacts(response.data);
        } else {
          throw new Error(response.message);
        }
      }
    } catch (err: any) {
      showErrorToast(err.message || 'Failed to sync contacts.');
    }
  };

  const handleFollowUser = async (id: number) => {
    await updateFollowers(id);

    return setFilteredContacts((prevContacts: any) =>
      prevContacts.map((contact: any) =>
        contact.user.id === id ? { ...contact, iamFollowing: true } : contact,
      ),
    );
  };

  const renderFollowButton = (item: any) => {
    let buttonText, buttonColor, textColor, handlePress;

    if (item.iamFollowing) {
      buttonText = 'Following';
      buttonColor = 'white';
      textColor = '#6500E0';
    } else if (item.following) {
      buttonText = 'Follow back';
      buttonColor = 'primary';
      textColor = 'white';
      handlePress = async () => {
        await handleFollowUser(item.user.id);
      };
    } else {
      buttonText = 'Follow';
      buttonColor = 'primary';
      textColor = 'white';
      handlePress = async () => {
        await handleFollowUser(item.user.id);
      };
    }

    return (
      <TouchableOpacity
        onPress={handlePress}
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

  const renderContactItem = ({ item }: any) => {
    if (!item.user) {
      return null;
    }

    return (
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
              uri:
                item.user?.profilePicture || 'https://via.placeholder.com/50',
            }}
            style={{ width: 50, height: 50, borderRadius: 25 }}
          />
          <Box marginLeft="sm" flex={1}>
            <Text
              variant="regular16"
              numberOfLines={
                1
              }>{`${item.user?.firstName} ${item.user?.lastName}`}</Text>
            <Text variant="regular14" color="black" mt="xs" numberOfLines={1}>
              {item.user?.phoneNumber}
            </Text>
          </Box>
        </Box>
        {renderFollowButton(item)}
      </Box>
    );
  };

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
            <Text variant="regular14" textAlign="left" color="black" mb="md">
              Allow iBond access to your contacts and we'll help you connect
              with your friends faster.
            </Text>
            <TouchableOpacity onPress={requestContactsPermission}>
              <Box alignSelf="center" justifyContent="center" mb="xxl" mt="xl">
                <IconVector name="contact_list" size="xxxl" />
              </Box>
              <Text variant="regular12" color="grey" textAlign="center" mt="sm">
                Tap the icon to connect your contacts.
              </Text>
            </TouchableOpacity>
          </>
        ) : (
          <FlatList
            data={filteredContacts}
            renderItem={renderContactItem}
            keyExtractor={(item, index) =>
              `${index}-${item.user?.id?.toString()}`
            }
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
          label={isPermissionGranted ? 'Continue' : 'Connect'}
          onPress={
            isPermissionGranted ? handleContinue : requestContactsPermission
          }
          backgroundColor="primary"
          labelProps={{ color: 'white', variant: 'regular14' }}
          borderRadius="smm"
          height={Platform.OS === 'ios' ? RFValue(42) : RFValue(52)}
          disabled={isLoading}
          isLoading={isLoading}
        />
      </Box>
    </SafeAreaView>
  );
};

export default FindFriendsFromContacts;
