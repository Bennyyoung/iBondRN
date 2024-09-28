import React, { useRef, useState } from 'react';
import { Dimensions, StyleSheet, Text, TextInput, View, TouchableOpacity } from "react-native";
import { Formik } from 'formik';
import * as Yup from 'yup';
import { RFValue } from "react-native-responsive-fontsize";
import BottomSheet from '@gorhom/bottom-sheet';
import DatePicker from 'react-native-date-picker'; // Date picker for event date
import TitleBar from "@/components/TitleBar/TitleBar";
import { TouchableOpacity as GestureTouchableOpacity, ScrollView } from "react-native-gesture-handler";
import Title from '@/components/Title/Title';
import Box from '@/components/Box';
import PlusIcon from '@/assets/svg/plusIcon.svg';
import { useNavigation } from '@react-navigation/native';
import CustomInput from '@/components/CustomInput';

// Import images from assets
const publicIcon = require('@/assets/svg/globe.svg');
const privateIcon = require('@/assets/svg/lock.svg');
const friendsOnlyIcon = require('@/assets/svg/followers.svg');
const customIcon = require('@/assets/svg/group.svg');

const { height } = Dimensions.get('window');

// Static options for dropdowns
const categories = ['Conference', 'Workshop', 'Meetup', 'Webinar'];
const eventTypes = ['In-Person', 'Virtual', 'Hybrid'];
const privacyOptions = [
  { label: 'Public', icon: publicIcon, description: 'This event is open to everyone. Anyone can join.' },
  { label: 'Private', icon: privateIcon, description: 'This event is for invited guests only.' },
  { label: 'Friends Only', icon: friendsOnlyIcon, description: 'Only your friends can see this event.' },
  { label: 'Custom', icon: customIcon, description: 'You can select specific people to invite.' },
];

const CreateEvents = () => {
  const navigation = useNavigation()

  const [categorySelected, setCategorySelected] = useState('');
  const [eventTypeSelected, setEventTypeSelected] = useState('');
  const [privacySelected, setPrivacySelected] = useState('');
  const [eventDateSelected, setEventDateSelected] = useState(new Date());
  const [startTimeSelected, setStartTimeSelected] = useState(new Date());

  const categoryBottomSheetRef = useRef<BottomSheet>(null);
  const eventTypeBottomSheetRef = useRef<BottomSheet>(null);
  const privacyBottomSheetRef = useRef<BottomSheet>(null);
  const eventDateBottomSheetRef = useRef<BottomSheet>(null);
  const startTimeBottomSheetRef = useRef<BottomSheet>(null); // New ref for start time

  // Open and close bottom sheets
  const openCategoryBottomSheet = () => categoryBottomSheetRef.current?.expand();
  const closeCategoryBottomSheet = () => categoryBottomSheetRef.current?.close();
  const openEventTypeBottomSheet = () => eventTypeBottomSheetRef.current?.expand();
  const closeEventTypeBottomSheet = () => eventTypeBottomSheetRef.current?.close();
  const openPrivacyBottomSheet = () => privacyBottomSheetRef.current?.expand();
  const closePrivacyBottomSheet = () => privacyBottomSheetRef.current?.close();
  const openEventDateBottomSheet = () => eventDateBottomSheetRef.current?.expand();
  const closeEventDateBottomSheet = () => eventDateBottomSheetRef.current?.close();
  const openStartTimeBottomSheet = () => startTimeBottomSheetRef.current?.expand(); // Open start time bottom sheet
  const closeStartTimeBottomSheet = () => startTimeBottomSheetRef.current?.close(); // Close start time bottom sheet

  // Validation schema for Formik
  const validationSchema = Yup.object().shape({
    eventTitle: Yup.string().required('Event title is required'),
    eventCategory: Yup.string().required('Event category is required'),
    eventDate: Yup.date().required('Event date is required'),
    startTime: Yup.string().required('Start time is required'),
    eventType: Yup.string().required('Event type is required'),
    location: Yup.string().required('Location is required'),
    eventPrivacy: Yup.string().required('Event privacy is required'),
  });

  // Form submission handler
  const handleSubmit = (values: any) => {
    console.log('Form values:', values);
  };

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1, backgroundColor: '#fff' }}>
      <TitleBar>
        <Box style={styles.title}>
          <TouchableOpacity onPress={() => navigation.navigate('MyEvents')}>
            <Text style={styles.createEvent}>
              Create Event
            </Text>
          </TouchableOpacity>
        </Box>
        <TouchableOpacity onPress={() => navigation.navigate('MyEvents')}>
          <Text style={styles.clear}>
            Clear
          </Text>
        </TouchableOpacity>
      </TitleBar>


      <Formik
        initialValues={{
          eventTitle: '',
          eventCategory: '',
          eventDate: '',
          startTime: '',
          endTime: '',
          eventType: '',
          location: '',
          eventPrivacy: '',
        }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ handleChange, handleBlur, handleSubmit, setFieldValue, values, errors, touched }) => (
          <View style={styles.formContainer}>
            {/* Event Title */}
            {/* <TextInput
              placeholder="Event Title"
              onChangeText={handleChange('eventTitle')}
              onBlur={handleBlur('eventTitle')}
              value={values.eventTitle}
              style={styles.inputField}
            /> */}
            
            <CustomInput
              label={''}
              onBlur={handleBlur('eventTitle')}
              value={values.eventTitle}
              onChangeText={handleChange('eventTitle')}
            />
            {touched.eventTitle && errors.eventTitle && <Text style={styles.errorText}>{errors.eventTitle}</Text>}

            {/* Event Category (Dropdown with Bottom Sheet) */}
            <TouchableOpacity onPress={openCategoryBottomSheet}>
              <View style={[styles.inputField, { borderColor: touched.eventCategory && errors.eventCategory ? 'red' : '#ccc' }]}>
                <Text>{categorySelected || 'Select Event Category'}</Text>
              </View>
            </TouchableOpacity>
            {touched.eventCategory && errors.eventCategory && <Text style={styles.errorText}>{errors.eventCategory}</Text>}

            {/* Event Date (Bottom Sheet for Date Picker) */}
            <TouchableOpacity onPress={openEventDateBottomSheet}>
              <View style={[styles.inputField, { borderColor: touched.eventDate && errors.eventDate ? 'red' : '#ccc' }]}>
                <Text>{values.eventDate || 'Select Event Date'}</Text>
              </View>
            </TouchableOpacity>
            {touched.eventDate && errors.eventDate && <Text style={styles.errorText}>{errors.eventDate}</Text>}

            {/* Bottom Sheet for Event Date */}
            <BottomSheet ref={eventDateBottomSheetRef} index={-1} snapPoints={['50%']}>
              <View style={styles.bottomSheetContainer}>
                <TouchableOpacity onPress={closeEventDateBottomSheet} style={styles.closeButton}>
                  <Text style={styles.closeButtonText}>Close</Text>
                </TouchableOpacity>
                <DatePicker
                  date={eventDateSelected}
                  onDateChange={(date) => {
                    setEventDateSelected(date);
                    setFieldValue('eventDate', date.toISOString().split('T')[0]);
                  }}
                  mode="date"
                />
              </View>
            </BottomSheet>

            {/* Start Time */}
            <TouchableOpacity onPress={openStartTimeBottomSheet}>
              <View style={[styles.inputField, { borderColor: touched.startTime && errors.startTime ? 'red' : '#ccc' }]}>
                <Text>{values.startTime || 'Select Start Time'}</Text>
              </View>
            </TouchableOpacity>
            {touched.startTime && errors.startTime && <Text style={styles.errorText}>{errors.startTime}</Text>}

            {/* Bottom Sheet for Start Time */}
            <BottomSheet ref={startTimeBottomSheetRef} index={-1} snapPoints={['50%']}>
              <View style={styles.bottomSheetContainer}>
                <TouchableOpacity onPress={closeStartTimeBottomSheet} style={styles.closeButton}>
                  <Text style={styles.closeButtonText}>Close</Text>
                </TouchableOpacity>
                <DatePicker
                  date={startTimeSelected}
                  onDateChange={(time) => {
                    setStartTimeSelected(time);
                    setFieldValue('startTime', time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
                  }}
                  mode="time" // Use 'time' mode for start time
                />
              </View>
            </BottomSheet>

            {/* Event Type (Dropdown with Bottom Sheet) */}
            <TouchableOpacity onPress={openEventTypeBottomSheet}>
              <View style={[styles.inputField, { borderColor: touched.eventType && errors.eventType ? 'red' : '#ccc' }]}>
                <Text>{eventTypeSelected || 'Select Event Type'}</Text>
              </View>
            </TouchableOpacity>
            {touched.eventType && errors.eventType && <Text style={styles.errorText}>{errors.eventType}</Text>}

            {/* Bottom Sheet for Event Type */}
            <BottomSheet ref={eventTypeBottomSheetRef} index={-1} snapPoints={['50%']}>
              <View style={styles.bottomSheetContainer}>
                <TouchableOpacity onPress={closeEventTypeBottomSheet} style={styles.closeButton}>
                  <Text style={styles.closeButtonText}>Close</Text>
                </TouchableOpacity>
                {eventTypes.map((type, index) => (
                  <TouchableOpacity key={index} onPress={() => {
                    setEventTypeSelected(type);
                    setFieldValue('eventType', type);
                    closeEventTypeBottomSheet();
                  }}>
                    <Text style={styles.optionText}>{type}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            </BottomSheet>

            {/* Location */}
            <TextInput
              placeholder="Location"
              onChangeText={handleChange('location')}
              onBlur={handleBlur('location')}
              value={values.location}
              style={styles.inputField}
            />
            {touched.location && errors.location && <Text style={styles.errorText}>{errors.location}</Text>}

            {/* Event Privacy (Dropdown with Bottom Sheet) */}
            <TouchableOpacity onPress={openPrivacyBottomSheet}>
              <View style={[styles.inputField, { borderColor: touched.eventPrivacy && errors.eventPrivacy ? 'red' : '#ccc' }]}>
                <Text>{privacySelected || 'Select Event Privacy'}</Text>
              </View>
            </TouchableOpacity>
            {touched.eventPrivacy && errors.eventPrivacy && <Text style={styles.errorText}>{errors.eventPrivacy}</Text>}

            {/* Bottom Sheet for Event Privacy */}
            <BottomSheet ref={privacyBottomSheetRef} index={-1} snapPoints={['50%']}>
              <View style={styles.bottomSheetContainer}>
                <TouchableOpacity onPress={closePrivacyBottomSheet} style={styles.closeButton}>
                  <Text style={styles.closeButtonText}>Close</Text>
                </TouchableOpacity>
                {privacyOptions.map((option, index) => (
                  <TouchableOpacity key={index} onPress={() => {
                    setPrivacySelected(option.label);
                    setFieldValue('eventPrivacy', option.label);
                    closePrivacyBottomSheet();
                  }}>
                    <Text style={styles.optionText}>{option.label}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            </BottomSheet>

            {/* Submit Button */}
            <TouchableOpacity onPress={handleSubmit} style={styles.submitButton}>
              <Text style={styles.submitButtonText}>Create Event</Text>
            </TouchableOpacity>
          </View>
        )}
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
});

export default CreateEvents;
