/* eslint-disable react-native/no-inline-styles */
import React, { useEffect, useState } from 'react';
import {
  Platform,
  ScrollView,
  StatusBar,
  TouchableOpacity,
} from 'react-native';
import Box from '@/components/Box';
import Text from '@/components/Text';
import SelectInput from '@/components/SelectInput';
import { CustomButton } from '@/components/CustomButton';
import { SafeAreaView } from 'react-native-safe-area-context';
import { RFValue } from 'react-native-responsive-fontsize';
import { ChevronLeft } from 'lucide-react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import CustomInput from '@/components/CustomInput';

const PostSignUpScreen = () => {
  const [userType, setUserType] = useState<string | number>('');
  const [school, setSchool] = useState<string | number>('');
  const [closestSchool, setClosestSchool] = useState<string | number>('');
  const [location, setLocation] = useState('');
  const [error, setError] = useState('');
  const [faculty, setFaculty] = useState<string | number>('');
  const [department, setDepartment] = useState<string | number>('');
  const [classYear, setClassYear] = useState<string | number>('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleLocation = (text: string) => {
    setLocation(text);
    if (text.length < 8) {
      setError('Location is required.');
    } else {
      setError('');
    }
  };

  const handleContinue = () => {
    // Handle continuation logic here
    console.log({ userType, school, faculty, department, classYear });
    setIsSubmitting(true);
    // If successful, navigate to the next screen
    setTimeout(() => {
      navigation.navigate('PhotoUploadScreen');
      setIsSubmitting(false);
    }, 3000);
  };

  const navigation = useNavigation<StackNavigationProp<any>>();

  useEffect(() => {
    if (userType && userType === 'student') {
      setLocation('');
      setClosestSchool('');
    }
    if (userType && userType === 'non-student') {
      setFaculty('');
      setSchool('');
      setClassYear('');
      setDepartment('');
    }
  }, [userType]);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
      <StatusBar barStyle="dark-content" backgroundColor="white" />
      <ScrollView>
        <TouchableOpacity
          onPress={() => {
            navigation.goBack();
          }}
          style={{
            position: 'relative',
            top: RFValue(10),
            zIndex: 1,
            padding: RFValue(10),
          }}>
          <ChevronLeft color="black" size={RFValue(30)} />
        </TouchableOpacity>
        <Box flex={1} padding="md" backgroundColor="white" position="relative">
          <Text variant="medium22" textAlign="left" mb="sm">
            Almost There!
          </Text>
          <Text variant="regular14" textAlign="left" color="black" mb="xxl">
            Just a little more to personalize your experience
          </Text>

          <SelectInput
            label="I am a..."
            getSelectedValue={setUserType}
            list={[
              { id: 'student', value: 'Student' },
              { id: 'non-student', value: 'Non-student' },
            ]}
            placeholder="Select user type"
            selectedValue={userType}
            modulePalette="primary"
            iconName="chevron_downward"
            iconSize="sml"
            showHeader={false}
          />

          {userType === 'student' && (
            <SelectInput
              label="School"
              getSelectedValue={setSchool}
              list={[
                { id: 'abia', value: 'Abia State University' },
                { id: 'abubakar', value: 'Abubakar Tafawa Balewa University' },
                { id: 'adamawa', value: 'Adamawa State University' },
              ]}
              placeholder="School"
              selectedValue={school}
              modulePalette="primary"
              iconName="chevron_downward"
              iconSize="sml"
              showHeader
            />
          )}

          {userType === 'non-student' && (
            <>
              <CustomInput
                label="Location"
                value={location}
                onChangeText={handleLocation}
                error={error}
              />
              <SelectInput
                label="Closest School (optional)"
                getSelectedValue={v => {
                  setClosestSchool(v);
                }}
                list={[
                  { id: 'abia', value: 'Abia State University' },
                  {
                    id: 'abubakar',
                    value: 'Abubakar Tafawa Balewa University',
                  },
                  { id: 'adamawa', value: 'Adamawa State University' },
                ]}
                placeholder="School"
                selectedValue={closestSchool}
                modulePalette="primary"
                iconName="chevron_downward"
                iconSize="sml"
                showHeader
              />
            </>
          )}

          {school && (
            <SelectInput
              label="Faculty"
              getSelectedValue={setFaculty}
              list={[
                { id: 'agriculture', value: 'Agriculture' },
                { id: 'art', value: 'Art' },
                { id: 'basic_science', value: 'Basic Science' },
              ]}
              placeholder="Faculty"
              selectedValue={faculty}
              modulePalette="primary"
              iconName="chevron_downward"
              iconSize="sml"
              showHeader
            />
          )}

          {faculty && (
            <SelectInput
              label="Department"
              getSelectedValue={setDepartment}
              list={[
                { id: 'dept1', value: 'Department 1' },
                { id: 'dept2', value: 'Department 2' },
                { id: 'dept3', value: 'Department 3' },
              ]}
              placeholder="Department"
              selectedValue={department}
              modulePalette="primary"
              iconName="chevron_downward"
              iconSize="sml"
              showHeader
            />
          )}

          {department && (
            <SelectInput
              label="Class"
              getSelectedValue={setClassYear}
              list={[
                { id: '100', value: '100 Level' },
                { id: '200', value: '200 Level' },
                { id: '300', value: '300 Level' },
                { id: '400', value: '400 Level' },
                { id: '500', value: '500 Level' },
              ]}
              placeholder="Class"
              selectedValue={classYear}
              modulePalette="primary"
              iconName="chevron_downward"
              iconSize="sml"
              showHeader
            />
          )}
        </Box>
      </ScrollView>
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
          disabled={isSubmitting}
          isLoading={isSubmitting}
        />
      </Box>
    </SafeAreaView>
  );
};

export default PostSignUpScreen;
