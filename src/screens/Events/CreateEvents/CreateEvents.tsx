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
import useCreateEvent from '@/utils/hooks/Event/useCreateEvent';
import moment from 'moment';
import useImageUpload from '@/utils/hooks/UploadImage/useUploadImageMutation';
import { categoryOptions, eventType, privacyOptions, groupOptions } from '@/utils/createEventsData';
import SelectedChannel from '@/components/SelectedChannel/SelectedChannel';
import { SvgIcon } from '@/assets/icons';

// Import images from assets
const customIcon = require('@/assets/svg/group.svg');

const { height } = Dimensions.get('window');

const initialValues = {
  eventPhoto: null,
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
  eventChannel: '',
  otherDetails: ''
}

// Static options for dropdowns


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
  eventChannel: string;
  location: string;
  eventPrivacy: string;
  group: string;
  eventHost: EventHost[]; // The array of hosts with specified types
  otherDetails: string;
}

const CreateEvents = () => {
  const { createAnEvent, isLoading, isSuccess } = useCreateEvent()
  const { uploadAnImage } = useImageUpload()
  const [openChannel, setOpenChannel] = useState(false)

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

  const channelOptions = [
    {
      id: 'iBondLive',
      value: 'iBond Live',
      image: <SvgIcon name="liveVideo" size="sml" style={{ marginRight: 15 }} />
    },
    {
      id: 'externalLink',
      value: 'External Link',
      image: <SvgIcon name="link" size="sml" style={{ marginRight: 15 }} />
    },
    {
      id: 'other',
      value: 'Other',
      image: <SvgIcon name="more2" size="sml" style={{ marginRight: 15 }} />
    },
  ]

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
        (value) => {
          if (value && value.type) {
            // Check the MIME type directly
            return ['image/jpeg', 'image/png', 'image/jpg'].includes(value.type);
          }
          return false;
        }
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
      hostName: hostName || 'Kelvin',
      eventUrl: "string",
      imageUrl: "string",
      channel: values.eventChannel,
      otherDetails: values.otherDetails,
      groupName: values.group || null,
      createdBy: "string"
    }
  }

  // Form submission handler
  const handleCreateEvent = async (values: any) => {

    const uploadImage = async () => {

      const folderName = 'profile-picture'
      const bucketName = 'cloud-storage'

      console.log('eventPhoto', values.eventPhoto);
      

      const formData = new FormData()
      formData.append('files', {
        uri: values.eventPhoto.uri,
        name: values.eventPhoto.name || 'image.jpg',
        type: values.eventPhoto.type || 'image/jpeg',
      });

      const imageUrl = uploadAnImage({
        formData,
        folderName,
        bucketName
      })


      // console.log('imageUrl', imageUrl);
      
    }

    await uploadImage()

  };

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1, backgroundColor: '#fff' }}>

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleCreateEvent}
      >
        {({ handleChange, handleBlur, handleSubmit, setFieldValue, values, errors, touched, resetForm }) => {
          // console.log('values.eventHost', values.eventHost);

          return (
            <>
              <TitleBar>
                <Box style={styles.title}>
                  <Text style={styles.createEvent}>
                    Create Event
                  </Text>
                </Box>
                <TouchableOpacity onPress={() => resetForm({ values: initialValues })}>
                  <Text style={styles.clear}>
                    Clear
                  </Text>
                </TouchableOpacity>
              </TitleBar>

              <Box style={styles.formContainer}>

                <ImageUpload
                  setFieldValue={setFieldValue}
                  error={touched.eventPhoto && errors.eventPhoto}
                  placeholders={{
                    withImage: {
                      title: 'Change Photo',
                      icon: <SvgIcon name="gallery_add" size="sml" />,
                    },
                    default: {
                      title: 'Add Photo',
                      icon: <SvgIcon name="galleryAddPurple" size="sml" />,
                    }
                  }}
                  recommendedText="Add a 16:9 cover photo. 1920x1080 recommended."
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
                  iconName="calendar"
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

                {
                  values.eventType === 'virtual' && (
                    <SelectedChannel
                      label={'Channel'}
                      list={channelOptions}
                      getSelectedValue={value => {
                        setFieldValue('eventChannel', value);
                      }}
                      placeholder="Channel"
                      selectedValue={values.eventChannel}
                      errorMessage={touched.eventChannel && errors.eventChannel}
                      modulePalette="primary"
                      iconName="chevron_downward"
                      iconSize="sml"
                      showHeader={true}
                      action='Done'
                    />
                    // <SelectedChannel
                    //   getSelectedValue={value => {
                    //     setFieldValue('eventChannel', value);
                    //   }}
                    //   label="Channel"
                    //   placeholder={'Channel'}
                    //   list={channelOptions}
                    // showHeader={true}
                    // action='Done'
                    // />
                  )
                }

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

                <CustomButton
                  label={'Create Event'}
                  labelProps={{ color: 'whiteColor' }}
                  borderRadius="sm"
                  onPress={() => handleSubmit()}
                />

                {/* This has the Button too */}
                {/* <SelectedChannel
                  getSelectedValue={value => {
                    setFieldValue('eventChannel', value);
                  }}
                  label="Channel"
                  placeholder={'Channel'}
                  list={channelOptions}
                  showHeader={true}
                  action='Done'
                /> */}

              </Box>


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
