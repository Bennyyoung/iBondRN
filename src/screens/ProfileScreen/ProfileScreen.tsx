import React, { ReactElement, useRef, useState } from 'react';
import { Dimensions, StyleSheet, TextInput, View, TouchableOpacity, Button } from "react-native";
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
import { User } from '@/components/types';
import UsersBox from '@/components/UsersBox/UsersBox';
import SegunOwoPrivateClub from "@/assets/svg/segunOwoPrivateClub.svg"
import { TimeInput } from '@/components/TimeInput/TimeInput';
import useTextInputDropdown from '@/components/BottomSheetHooks/useSelectInputDropdown';
import SelectedArray from '@/components/SelectedArray/SelectedArray';
import { IconVector } from '@/assets/icons/IconVector';
import Text from '@/components/Text';
import useCreateEvent from '@/utils/hooks/CreateEvent/useEvent';

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

type EventHost = {
  id: number
  iconName?: JSX.Element
  image: JSX.Element
  label: string
  value: string
}

interface FormValues {
  eventPhoto: string;
  eventTitle: string;
  eventCategory: string;
  eventDate: string;
  startTime: string;
  endTime: string;
  eventType: string;
  location: string;
  eventPrivacy: string;
  group: string;
  eventHost: EventHost[]; // The array of hosts with specified types
  otherDetails: string;
}

const CreateEvents = () => {
  const { createAnEvent, isLoading, isSuccess } = useCreateEvent()

  const navigation = useNavigation()
  const [hosts, setHosts] = useState<User[]>([])
  const [showAllHosts, setShowHosts] = useState(false)
  const [count, setCount] = useState(0)

  const userOptions = users.map(user => ({
    id: user.id,
    value: `${user.userName} . ${user.handle}`,
    image: user.profileImage,
    label: user.university
  }))

  const toggleHosts = () => {
    setShowHosts(!showAllHosts)
  }

  // Validation schema for Formik
  const validationSchema = Yup.object().shape({
    eventTitle: Yup.string().required('Name is required'),
    eventCategory: Yup.string().required('Event category is required'),
    eventDate: Yup.date().required('Event date is required'),
    startTime: Yup.string().required('Start time is required'),
    eventType: Yup.string().required('Event type is required'),
    location: Yup.string().required('Location is required'),
    eventPrivacy: Yup.string().required('Event privacy is required'),
    group: Yup.string().required('Event privacy is required'),
    eventHost: Yup.array().required(),
    otherDetails: Yup.string()
  });

  const handleTransform = (values: FormValues) => {

    const hostName = values.eventHost.map((host: { value: any; }) => host.value)

    return {
      eventTitle: values.eventTitle,
      date: values.startTime,
      startDateTime: values.startTime,
      endDateTime: values.endTime,
      location: values.location,
      eventType: values.eventType,
      eventPrivacy: values.eventPrivacy,
      category: values.eventCategory,
      hostName: hostName,
      eventUrl: "string",
      imageUrl: "string",
      attendees: [
        0
      ],
      channel: "string",
      otherDetails: values.otherDetails,
      groupName: values.group,
      createdBy: "string"
    }
  }

  // Form submission handler
  const handleSubmit = async (values: any) => {
    const data = handleTransform(values)
    await createAnEvent(data)
    
  };

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1, backgroundColor: '#fff' }}>
      <TitleBar>
        <Box style={styles.title}>
          <Text style={styles.createEvent}>
            Edit Profile
          </Text>
        </Box>
        <TouchableOpacity onPress={() => navigation.navigate('MyEvents')}>
          <Text style={styles.clear}>
            Save
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
          eventHost: [] as EventHost[],
          eventChanel: '',
          otherDetails: ''
        }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ handleChange, handleBlur, handleSubmit, setFieldValue, values, errors, touched }) => {

          console.log('values', values);




          return (
            <View style={styles.formContainer}>
              <ImageUpload
                setFieldValue={setFieldValue}
              />

              {/* Event Title */}
              <CustomInput
                label={'Name'}
                onBlur={handleBlur('eventTitle')}
                value={values.eventTitle}
                onChangeText={handleChange('eventTitle')}
                error={touched.eventTitle && errors.eventTitle}
              />
              <CustomInput
                label={'Unername'}
                onBlur={handleBlur('eventTitle')}
                value={values.eventTitle}
                onChangeText={handleChange('eventTitle')}
                error={touched.eventTitle && errors.eventTitle}
              />
              <CustomInput
                label={'Intro'}
                onBlur={handleBlur('eventTitle')}
                value={values.eventTitle}
                onChangeText={handleChange('eventTitle')}
                error={touched.eventTitle && errors.eventTitle}
              />

              {/* Category */}
              <SelectInput
                label={'Gender'}
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
                label={'Date of birth'}
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

                {/* website URL */}
              <CustomInput
                label={'Website URL'}
                onBlur={handleBlur('eventTitle')}
                value={values.eventTitle}
                onChangeText={handleChange('eventTitle')}
                error={touched.eventTitle && errors.eventTitle}
              />

              

              {/* Event Type */}
              <SelectInput
                label={'School'}
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

              

              {/* Event Privacy */}
              <SelectInput
                label={'Faculty'}
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

              {/* Event Privacy */}
              <SelectInput
                label={'Department'}
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



              
            </View>
          )
        }}
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







