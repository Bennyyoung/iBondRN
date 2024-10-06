
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
import useCreateEvent from '@/utils/hooksEvent/useCreateEvent';
import VerificationPayment from '@/components/VerificationPayment/VerificationPayment';
import VerifyInfo from '@/components/VerifyInfo/VerifyInfo';

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
            Settings
          </Text>
        </Box>
        <TouchableOpacity onPress={() => navigation.navigate('MyEvents')}>
          
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
              {/* <ImageUpload
                setFieldValue={setFieldValue}
              /> */}


              <VerificationPayment />

             
              <VerifyInfo />

            
            <View style={styles.container}>
            <Text style={styles.text}>
                You’ll be required to provide a video, photo, and government-issued ID, 
                and authorize us to process it. All information provided is subject to our 
                <Text style={styles.privacyPolicy}> Privacy Policy</Text>.
            </Text>
            </View>



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

              {/* Submit Button */}
              <CustomButton
                label={'Pay N3000'}
                labelProps={{ color: 'whiteColor' }}
                borderRadius="sm"
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
    marginTop: 50
  },
  
  optionText: {
    paddingVertical: 10,
  },
  container: {
    flex: 1,
    justifyContent: 'center', 
    alignItems: 'center', 
    padding: 20,
    marginBottom: 50
  },
  text: {
    textAlign: 'center', 
    fontSize: 15, 
    fontWeight: '300',

  },
  privacyPolicy: {
    color: 'purple', 
    fontWeight: '400', 
  },
});

export default CreateEvents;
