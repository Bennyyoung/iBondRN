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
import moment from 'moment';
import useImageUpload from '@/utils/hooks/UploadImage/useUploadImageMutation';

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
    eventTitle: Yup.string().required('Event title is required'),
    eventCategory: Yup.string().required('Event category is required'),
    eventPhoto: Yup.mixed()
    .test(
      'fileType',
      'Unsupported file type',
      (value) => value && ['image/jpeg', 'image/png', 'image/jpg'].includes(value.type)
    ),
    eventDate: Yup.date().required('Event date is required'),
    startTime: Yup.string().required('Start time is required'),
    eventType: Yup.string().required('Event type is required'),
    location: Yup.string().required('Location is required'),
    eventPrivacy: Yup.string().required('Event privacy is required'),
    group: Yup.string(),
    eventHost: Yup.array().required(),
    otherDetails: Yup.string()
  });

  const downloadImageUrl = () => {

  }

  const handleTransform = (values: FormValues) => {
    console.log('values.eventPhoto', values.eventPhoto);

    const hostName = values.eventHost.map((host: { value: any; }) => host.value)

    const uploadImage = async () => {
      const folderName = 'profile-picture'
      const bucketName = 'cloud-storage'

      const data = {
        file: values.eventPhoto,
        folderName,
        bucketName
      }

      const { uploadAnImage } = useImageUpload()
      const imageUrl = uploadAnImage(data)
    }

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
      channel: "string",
      otherDetails: values.otherDetails,
      groupName: values.group || null,
      createdBy: "string"
    }
  }

  // Form submission handler
  const handleCreateEvent = async (values: any) => {
    const data = handleTransform(values)
    // console.log('data', data);

    // await createAnEvent(data)

  };

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1, backgroundColor: '#fff' }}>

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
        onSubmit={handleCreateEvent}
      >
        {({ handleChange, handleBlur, handleSubmit, setFieldValue, values, errors, touched, resetForm }) => {

          return (
            <>
              <TitleBar>
                <Box style={styles.title}>
                  <Text style={styles.createEvent}>
                    Create Event
                  </Text>
                </Box>
                <TouchableOpacity onPress={() => resetForm()}>
                  <Text style={styles.clear}>
                    Clear
                  </Text>
                </TouchableOpacity>
              </TitleBar>

              <View style={styles.formContainer}>
                <ImageUpload
                  setFieldValue={setFieldValue}
                />

                {/* Event Title */}
                <CustomInput
                  label={'Event Title'}
                  onBlur={handleBlur('eventTitle')}
                  value={values.eventTitle}
                  onChangeText={handleChange('eventTitle')}
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
                    <TimeInput
                      label={'Start Time'}
                      getSelectedTime={time => {
                        const formattedTime = moment(time).format('HH:mm'); // Format to HH:mm
                        console.log('formattedTime', formattedTime);

                        setFieldValue('startTime', formattedTime);
                      }}
                      errorMessage={touched.startTime && errors.startTime}
                      modulePalette="primary"
                      iconSize='sml'
                      iconName='clock'
                    />
                  </Box>

                  <Box flex={1} marginRight="xs">
                    {/* End Time */}
                    <TimeInput
                      label={'End Time (optional)'}
                      getSelectedTime={time => {
                        const formattedTime = time.toISOString().split('T')[1].slice(0, 5); // Format to HH:mm
                        setFieldValue('endTime', formattedTime);
                      }}
                      errorMessage={touched.endTime && errors.endTime}
                      modulePalette="primary"
                      iconSize='sml'
                      iconName='clock'
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
                // iconName='location'
                // iconSize="sml"
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
                  iconName={showAllHosts ? 'chevron_downward' : 'chevron_upward'}
                  iconSize='sml'
                  onPress={toggleHosts}
                />

                {
                  showAllHosts ? values.eventHost.map(el => (
                    <Box
                      alignItems="center"
                      borderColor="grey"
                      flexDirection="row"
                      paddingTop="md"
                      paddingVertical="sm"
                      key={el.id}
                    >
                      {
                        el.iconName ? (
                          <IconVector
                            name={el?.iconName}
                            size="xxl"
                          />
                        ) : (
                          el.image
                        )
                      }

                      <Box>
                        <Text numberOfLines={1}>{el.value}</Text>
                        {
                          el.label && (
                            <Box mt="sm">
                              <Text numberOfLines={1}>{el.label}</Text>
                            </Box>
                          )
                        }
                      </Box>

                    </Box>
                  )) : null

                }
                <SelectedArray
                  getSelectedValue={value => {
                    setFieldValue('eventHost', [...values.eventHost, value]);
                  }}
                  label="Add Host"
                  placeholder={'Add Host'}
                  list={userOptions}
                  searchable={true}
                  showHeader={true}
                />


                {/* Submit Button */}
                <CustomButton
                  label={'Create Event'}
                  labelProps={{ color: 'whiteColor' }}
                  borderRadius="sm"
                  onPress={handleSubmit}
                />
              </View>
            </>
          )
        }}
      </Formik>
    </ScrollView>
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
