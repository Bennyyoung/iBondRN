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
import { useDispatch } from 'react-redux';
import { updateRegistrationData } from '@/redux/features/auth/slices';
import { showErrorToast } from '@/utils/helpers/toastHelper';
import useFetchInstitutions from '@/utils/hooks/Utility/useInstitutions';
import useFetchFacultiesAndDepartments from '@/utils/hooks/Utility/useFacultiesAndDepartments';

const PostSignUpScreen = () => {
  const [userType, setUserType] = useState<string | number>('');
  const [school, setSchool] = useState<string | number>('');
  const [faculty, setFaculty] = useState<string | number>('');
  const [department, setDepartment] = useState<string | number>('');
  const [classYear, setClassYear] = useState<string | number>('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [location, setLocation] = useState('');
  const [error, setError] = useState('');

  const navigation = useNavigation<StackNavigationProp<any>>();
  const dispatch = useDispatch();

  const { data: institutions, isLoading: isLoadingInstitutions } =
    useFetchInstitutions();
  const { data: facultiesAndDepartments, isLoading: isLoadingFaculties } =
    useFetchFacultiesAndDepartments();

  const schoolOptions =
    institutions?.map(inst => ({
      id: inst.id,
      value: inst.name,
    })) || [];

  const facultyOptions = facultiesAndDepartments
    ? Object.keys(facultiesAndDepartments.Faculties).map(faclty => ({
        id: faclty,
        value: faclty,
      }))
    : [];

  const departmentOptions =
    faculty && facultiesAndDepartments
      ? (facultiesAndDepartments.Faculties[faculty] || []).map(dept => ({
          id: dept,
          value: dept,
        }))
      : [];

  const handleLocation = (text: string) => {
    setLocation(text);
    setError('');
  };

  const handleContinue = () => {
    setIsSubmitting(true);

    if (
      userType === 'student' &&
      (!school || !faculty || !department || !classYear)
    ) {
      showErrorToast('Please fill out all fields for students.');
      setIsSubmitting(false);
      return;
    }

    if (userType === 'non-student' && !location) {
      showErrorToast('Please fill out your location.');
      setIsSubmitting(false);
      return;
    }

    if (userType === 'non-student' && location) {
      if (location.length < 8) {
        setError('Provide a valid address.');
        setIsSubmitting(false);
        return;
      }
    }

    dispatch(
      updateRegistrationData({
        student: userType === 'student' ? true : false,
        studentDto: {
          school: userType === 'non-student' ? '' : (school as string),
          faculty: faculty as string,
          department: department as string,
          level: classYear as string,
        },
        location,
        closeSchool: userType === 'non-student' ? (school as string) : '',
      }),
    );

    setIsSubmitting(false);
    navigation.navigate('PhotoUploadScreen');
  };

  useEffect(() => {
    if (userType === 'student') {
      setLocation('');
    } else if (userType === 'non-student') {
      setSchool('');
      setFaculty('');
      setDepartment('');
      setClassYear('');
    }
  }, [userType]);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
      <StatusBar barStyle="dark-content" backgroundColor="white" />
      <ScrollView>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
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
            <>
              <SelectInput
                label="School"
                getSelectedValue={setSchool}
                list={schoolOptions}
                placeholder="Select School"
                selectedValue={school}
                modulePalette="primary"
                iconName="chevron_downward"
                iconSize="sml"
                searchable
                showHeader
                useSelectedValue
                isLoading={isLoadingInstitutions}
              />

              {school && (
                <SelectInput
                  label="Faculty"
                  getSelectedValue={setFaculty}
                  list={facultyOptions}
                  placeholder="Select Faculty"
                  selectedValue={faculty}
                  modulePalette="primary"
                  iconName="chevron_downward"
                  iconSize="sml"
                  searchable
                  showHeader
                  isLoading={isLoadingFaculties}
                />
              )}

              {faculty && (
                <SelectInput
                  label="Department"
                  getSelectedValue={setDepartment}
                  list={departmentOptions}
                  placeholder="Select Department"
                  selectedValue={department}
                  modulePalette="primary"
                  iconName="chevron_downward"
                  iconSize="sml"
                  searchable
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
                  placeholder="Select Class"
                  selectedValue={classYear}
                  modulePalette="primary"
                  iconName="chevron_downward"
                  iconSize="sml"
                  showHeader
                />
              )}
            </>
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
                getSelectedValue={setSchool}
                list={schoolOptions}
                placeholder="Select Closest School"
                selectedValue={school}
                modulePalette="primary"
                iconName="chevron_downward"
                iconSize="sml"
                searchable
                useSelectedValue
                showHeader
              />
            </>
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
