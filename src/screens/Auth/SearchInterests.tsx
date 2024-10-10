/* eslint-disable react-native/no-inline-styles */
import React, { useState, useEffect } from 'react';
import { Platform, FlatList, TouchableOpacity, ScrollView } from 'react-native';
import Box from '@/components/Box';
import Text from '@/components/Text';
import { CustomButton } from '@/components/CustomButton';
import { SafeAreaView } from 'react-native-safe-area-context';
import { RFValue } from 'react-native-responsive-fontsize';
import { ChevronLeft, X } from 'lucide-react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { SearchBar } from '@/components/SearchBar';
import AsyncStorage from '@react-native-async-storage/async-storage';
import useUpdateUserInterests from '@/utils/hooks/Auth/useUpdateUserInterests';

const interestsList = [
  'Politics',
  'Design Thinking',
  'Technology',
  'Art',
  'Music',
  'Sports',
  'Travel',
  'Food',
  'Fashion',
  'Literature',
  'Science',
  'History',
  'Philosophy',
  'Photography',
  'Cinema',
  'Fitness',
  'Nature',
  'Gaming',
  'Cooking',
  'Dance',
];

const SearchInterests = () => {
  const navigation = useNavigation<StackNavigationProp<any>>();
  const [searchInput, setSearchInput] = useState('');
  const [filteredInterests, setFilteredInterests] = useState(interestsList);
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);

  const { updateInterests, isLoading } = useUpdateUserInterests();

  useEffect(() => {
    if (searchInput) {
      const filtered = interestsList.filter(interest =>
        interest.toLowerCase().includes(searchInput.toLowerCase()),
      );
      setFilteredInterests(filtered);
    } else {
      setFilteredInterests(interestsList);
    }
  }, [searchInput]);

  const handleSearchInput = (text: string) => {
    setSearchInput(text);
  };

  const handleInterestSelect = (interest: string) => {
    if (selectedInterests.includes(interest)) {
      setSelectedInterests(selectedInterests.filter(item => item !== interest));
    } else if (selectedInterests.length < 20) {
      setSelectedInterests([...selectedInterests, interest]);
    }
  };

  const viewedInterestsScreen = async () => {
    try {
      await AsyncStorage.removeItem('@shouldupdateinterests');
    } catch {}
  };

  const handleContinue = async () => {
    const response = await updateInterests(selectedInterests);
    if (response) {
      await viewedInterestsScreen();
      navigation.navigate('DashboardTab');
    }
  };

  const handleSkip = () => {
    viewedInterestsScreen();
    navigation.navigate('DashboardTab');
  };

  const renderInterestItem = ({ item }: { item: string }) => (
    <TouchableOpacity
      onPress={() => handleInterestSelect(item)}
      style={{
        backgroundColor: '#F0F0F0',
        paddingHorizontal: RFValue(16),
        paddingVertical: RFValue(8),
        borderRadius: RFValue(20),
        margin: RFValue(4),
      }}>
      <Text variant="regular14" color="black">
        {item}
      </Text>
    </TouchableOpacity>
  );

  const renderSelectedInterestItem = (item: string) => (
    <TouchableOpacity
      key={item}
      onPress={() => handleInterestSelect(item)}
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#F0F0F0',
        paddingHorizontal: RFValue(16),
        paddingVertical: RFValue(8),
        borderRadius: RFValue(20),
        marginRight: RFValue(8),
        marginBottom: RFValue(8),
      }}>
      <Text variant="regular14" color="black">
        {item}
      </Text>
      <Box marginLeft="xs">
        <X color="black" size={RFValue(15)} />
      </Box>
    </TouchableOpacity>
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
      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{
          padding: RFValue(16),
          paddingBottom: RFValue(160),
        }}>
        <Text variant="medium22" textAlign="left" mb="sm">
          Search new interests
        </Text>
        <Text variant="regular14" textAlign="left" color="black" mb="md">
          Pick up to 20 favorite interests that helps us serve you personalized
          contents
        </Text>
        <SearchBar
          getSearchInput={handleSearchInput}
          placeholder="Search interests"
          backgroundColor="#F7F7F7"
          paddingHorizontal={RFValue(16)}
          height={RFValue(50)}
        />
        <Text variant="medium16" mt="md" mb="sm">
          Your interests
        </Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <Box flexDirection="row" flexWrap="wrap" maxWidth={RFValue(300)}>
            {selectedInterests.map(renderSelectedInterestItem)}
          </Box>
        </ScrollView>
        <Text variant="medium16" mt="md" mb="sm">
          Suggested interests
        </Text>
        <FlatList
          data={filteredInterests.filter(
            item => !selectedInterests.includes(item),
          )}
          renderItem={renderInterestItem}
          keyExtractor={item => item}
          numColumns={3}
          columnWrapperStyle={{ justifyContent: 'space-between' }}
          scrollEnabled={false}
        />
      </ScrollView>
      <Box
        position="absolute"
        bottom={Platform.OS === 'ios' ? RFValue(20) : RFValue(10)}
        left={0}
        right={0}
        paddingHorizontal="md">
        <CustomButton
          label={isLoading ? 'Saving...' : 'Continue'}
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

export default SearchInterests;
