import React, { ReactElement, useRef, useState } from 'react';
import { Dimensions, StyleSheet, Text, TextInput, View, TouchableOpacity, Button } from "react-native";
import { Formik } from 'formik';
import * as Yup from 'yup';
import { RFValue } from "react-native-responsive-fontsize";
import BottomSheet from '@gorhom/bottom-sheet';
import DatePicker from 'react-native-date-picker'; // Date picker for event date
import TitleBar from "@/components/TitleBar/TitleBar";
import { TouchableOpacity as GestureTouchableOpacity, ScrollView, TouchableHighlight } from "react-native-gesture-handler";
import Title from '@/components/Title/Title';
import Box from '@/components/Box';
import PlusIcon from '@/assets/svg/plusIcon.svg';
import { useNavigation } from '@react-navigation/native';
import CustomInput from '@/components/CustomInput';
import ImageUpload from '@/components/ImageUpload/ImageUpload';
import CustomSelectDropdown from '@/components/CustomSelectDropdown/CustomSelectDropdown';
import SelectInput from '@/components/SelectInput';
import DateInput from '@/components/DateInput';
import { CustomButton } from '@/components/CustomButton';
import SubTitle from '@/components/SubTitle/SubTitle';
import users from '@/utils/users';
import PurplePlusIcon from "@/assets/svg/purplePlusIcon.svg"
import { User } from '@/components/types';
import UsersBox from '@/components/UsersBox/UsersBox';
import SegunOwoPrivateClub from "@/assets/svg/segunOwoPrivateClub.svg"

// Import images from assets
const customIcon = require('@/assets/svg/group.svg');

const { height } = Dimensions.get('window');

// Static options for dropdowns
const categoryOptions = [
  {
    id: 'corporate',
    value: 'Corporate'
  },
  {
    id: 'education',
    value: 'Education'
  },
  {
    id: 'career',
    value: 'Career'
  },
  {
    id: 'culture',
    value: 'Culture'
  },
  {
    id: 'entertainment',
    value: 'Entertainment'
  },
  {
    id: 'social',
    value: 'Social'
  },
  {
    id: 'sport',
    value: 'Sport'
  },
];

const eventType = [
  {
    id: 'physical',
    value: 'Physical'
  },
  {
    id: 'virtual',
    value: 'Virtual'
  },
];

const privacyOptions = [
  {
    id: 'public',
    value: 'Public',
    iconName: 'globe',
    label: 'Anyone on and off iBond Elite'
  },
  {
    id: 'private',
    value: 'Private',
    iconName: 'lock',
    label: 'Only people you invite can see and join event'
  },
  {
    id: 'followers',
    value: 'Followers Only',
    iconName: 'followers',
    label: "It'll be shown only to your followers"
  },
  {
    id: 'group',
    value: 'Group',
    iconName: 'group',
    label: 'Members of a group that you belong',
    arrowRight: 'rightArrow'
  },
];

const groupOptions = [
  {
    id: 'segun owo',
    value: 'Segun OWO Private club',
    image: <SegunOwoPrivateClub style={{ marginRight: 20 }} />
  },
  {
    id: 'finesse gub',
    value: 'Finesse Hub',
    image: <SegunOwoPrivateClub style={{ marginRight: 20 }} />
  },
  {
    id: 'dpa mastermind community',
    value: 'The DPA Priate Mastermind Community',
    image: <SegunOwoPrivateClub style={{ marginRight: 20 }} />
  },
  {
    id: 'ui/ux desingners',
    value: 'UI/UX Designers & Developers',
    image: <SegunOwoPrivateClub style={{ marginRight: 20 }} />
  },
  {
    id: 'lautech',
    value: 'LAUTECH Student UNION',
    image: <SegunOwoPrivateClub style={{ marginRight: 20 }} />
  },
]

const CreateEvents = () => {
  const navigation = useNavigation()
  const [hosts, setHosts] = useState<User[]>([])
  const [showAllHosts, setShowHosts] = useState(false)
  const [count, setCount] = useState(0)

  const addHosts = (user: User) => {

    setHosts(prevHosts => [...prevHosts, user]);
    setCount(prevCount => prevCount + 1)
  }

  const toggleHosts = () => {
    setShowHosts(!showAllHosts)
  }


  // Validation schema for Formik
  const validationSchema = Yup.object().shape({
    eventTitle: Yup.string().required('Event title is required'),
    eventCategory: Yup.string().required('Event category is required'),
    eventDate: Yup.date().required('Event date is required'),
    startTime: Yup.string().required('Start time is required'),
    eventType: Yup.string().required('Event type is required'),
    location: Yup.string().required('Location is required'),
    eventPrivacy: Yup.string().required('Event privacy is required'),
    group: Yup.string().required('Event privacy is required'),
    otherDetails: Yup.string()
  });

  // Form submission handler
  const handleSubmit = (values: any) => {
    console.log('Form values:', values);
  };

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1, backgroundColor: '#fff' }}>
      <TitleBar>
        <Box style={styles.title}>
          <Text style={styles.createEvent}>
            Create Event
          </Text>
        </Box>
        <TouchableOpacity onPress={() => navigation.navigate('MyEvents')}>
          <Text style={styles.clear}>
            Clear
          </Text>
        </TouchableOpacity>
      </TitleBar>


      <Formik
        initialValues={{
          eventPhoto: '',
          eventTitle: '',
          eventCategory: '',
          eventDate: '',
          startTime: '',
          endTime: '',
          eventType: '',
          location: '',
          eventPrivacy: '',
          group: '',
          otherDetails: ''
        }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ handleChange, handleBlur, handleSubmit, setFieldValue, values, errors, touched }) => (
          <View style={styles.formContainer}>
            <ImageUpload 
              setFieldValue={setFieldValue}
            />

            {/* Event Title */}
            <CustomInput
              // label={'Event Title'}
              onBlur={handleBlur('eventTitle')}
              value={values.eventTitle}
              onChangeText={handleChange('eventTitle')}
              placeholder='Event Title'
              error={touched.eventTitle && errors.eventTitle}
            />

            {/* Category */}
            <SelectInput
              label={'Category'}
              list={categoryOptions}
              getSelectedValue={value => {
                setFieldValue('eventCategory', value);
              }}
              placeholder="Category"
              selectedValue={values.eventCategory}
              errorMessage={touched.eventCategory && errors.eventCategory}
              modulePalette="primary"
              iconName="chevron_downward"
              iconSize="sml"
              showHeader={true}
            />

            {/* Date */}
            <DateInput
              label={'Date'}
              getSelectedDate={date => {
                const formattedDate = date.toISOString().split('T')[0];
                setFieldValue('eventDate', formattedDate);
              }}
              maximumDate={new Date()}
              errorMessage={touched.eventDate && errors.eventDate}
              modulePalette="primary"
              iconName="calender"
              iconSize="sml"
            />

            {/* Start Time and End Time */}
            <Box flexDirection="row" justifyContent="space-between">
              <Box flex={1} marginRight="xs">
                {/* Start Time */}
                <DateInput
                  label={'Start Time'}
                  getSelectedDate={date => {
                    const formattedDate = date.toISOString().split('T')[0];
                    setFieldValue('startTime', formattedDate);
                  }}
                  maximumDate={new Date()}
                  errorMessage={touched.startTime && errors.startTime}
                  modulePalette="primary"
                />
              </Box>

              <Box flex={1} marginRight="xs">
                {/* End Time */}
                <DateInput
                  label={'End Time'}
                  getSelectedDate={date => {
                    const formattedDate = date.toISOString().split('T')[0];
                    setFieldValue('endTime', formattedDate);
                  }}
                  maximumDate={new Date()}
                  errorMessage={touched.endTime && errors.endTime}
                  modulePalette="primary"
                />
              </Box>
            </Box>

            {/* Event Type */}
            <SelectInput
              label={'Event Type'}
              list={eventType}
              getSelectedValue={value => {
                setFieldValue('eventType', value);
              }}
              placeholder="Event Type"
              selectedValue={values.eventType}
              errorMessage={touched.eventType && errors.eventType}
              modulePalette="primary"
              iconName="chevron_downward"
              iconSize="sml"
              showHeader={true}
            />

            {/* Location */}
            <CustomInput
              label={'Location'}
              onBlur={handleBlur('location')}
              value={values.location}
              onChangeText={handleChange('location')}
              // placeholder='Location'
              // error
              iconName='location'
              iconSize="sml"
            />

            {/* Event Privacy */}
            <SelectInput
              label={'Event Privacy'}
              list={privacyOptions}
              getSelectedValue={value => {
                setFieldValue('eventPrivacy', value);
              }}
              placeholder="Event Privacy"
              selectedValue={values.eventPrivacy}
              errorMessage={touched.eventPrivacy && errors.eventPrivacy}
              modulePalette="primary"
              iconName="chevron_downward"
              iconSize="sml"
              showHeader={true}
            />

            {/* Group */}
            {values.eventPrivacy === 'group' && <SelectInput
              label={'Group'}
              list={groupOptions}
              getSelectedValue={value => {
                setFieldValue('group', value);
              }}
              placeholder="Group"
              selectedValue={values.group}
              errorMessage={touched.group && errors.group}
              modulePalette="primary"
              iconName="chevron_downward"
              iconSize="sml"
              showHeader={true}
            />
            }

            {/* Other Details */}
            <CustomInput
              label={''}
              onBlur={handleBlur('otherDetails')}
              value={values.otherDetails}
              onChangeText={handleChange('otherDetails')}
              placeholder='Other Details'
              error={touched.otherDetails && errors.otherDetails}
            />

            {/* Hosts */}
            <SubTitle
              title='Hosts'
              subtitle='Show more'
              iconName='chevron_downward'
              iconSize='sml'
              onPress={toggleHosts}
            />
            {
              (hosts.length > 0 && showAllHosts) && (
                <>
                  <UsersBox
                    users={hosts}
                  />
                </>
              )
            }

            <TouchableHighlight style={styles.addOtherHostsContainer} onPress={() => addHosts(users[count])}>
              <>
                <PurplePlusIcon />
                <Text style={styles.addHostText}>Add other hosts</Text>
              </>
            </TouchableHighlight>

            {/* Submit Button */}
            <CustomButton
              label={'Create Event'}
              labelProps={{ color: 'whiteColor' }}
              borderRadius="sm"
            />
          </View>
        )}
      </Formik>
    </ScrollView >
  );
};

const styles = StyleSheet.create({
  title: {
    paddingVertical: RFValue(10),
    paddingRight: RFValue(16),
    paddingLeft: RFValue(0),
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16
  },
  createEvent: {
    fontWeight: '600',
    fontSize: RFValue(17, height),
  },
  clear: {
    fontWeight: '400',
    fontSize: RFValue(17, height),
    color: '#6500E0'
  },
  time: {
    // flexDirection: 'row',
    // justifyContent: 'space-between'
  },
  formContainer: {
    padding: 20,
  },
  inputField: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  errorText: {
    color: 'red',
    marginBottom: 10,
  },
  bottomSheetContainer: {
    padding: 20,
    height: height * 0.5, // Adjust height based on your design
  },
  closeButton: {
    alignSelf: 'flex-end',
    padding: 10,
  },
  closeButtonText: {
    fontWeight: 'bold',
  },
  submitButton: {
    backgroundColor: '#007bff',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  submitButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  optionText: {
    paddingVertical: 10,
  },
  addOtherHostsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: 119,
    marginBottom: 30
  },
  addHostText: {
    fontSize: RFValue(13, height),
    fontWeight: '600',
    color: '#6500E0',
    lineHeight: 18,
    // letterSpacing: -0.08
  }
});

export default CreateEvents;
