// import React, { useRef, useState } from 'react';
// import { Dimensions, StyleSheet, Text, TextInput, View, Button, TouchableOpacity } from "react-native";
// import { Formik } from 'formik';
// import * as Yup from 'yup';
// import { RFValue } from "react-native-responsive-fontsize";
// import BottomSheet from '@gorhom/bottom-sheet';
// import TitleBar from "@/components/TitleBar/TitleBar";
// import { TouchableOpacity as GestureTouchableOpacity } from "react-native-gesture-handler";


// // Import images from assets
// const publicIcon = require('@/assets/svg/globe.svg');
// const privateIcon = require('@/assets/svg/lock.svg');
// const friendsOnlyIcon = require('@/assets/svg/followers.svg');
// const customIcon = require('@/assets/svg/group.svg');

// const { height } = Dimensions.get('window');

// const categories = ['Conference', 'Workshop', 'Meetup', 'Webinar'];
// const eventTypes = ['In-Person', 'Virtual', 'Hybrid'];
// const privacyOptions = [
//   { label: 'Public', icon: publicIcon, description: 'This event is open to everyone. Anyone can join.' },
//   { label: 'Private', icon: privateIcon, description: 'This event is for invited guests only.' },
//   { label: 'Friends Only', icon: friendsOnlyIcon, description: 'Only your friends can see this event.' },
//   { label: 'Custom', icon: customIcon, description: 'You can select specific people to invite.' },
// ];

// const CreateEvents = () => {
//   const [categorySelected, setCategorySelected] = useState('');
//   const [eventTypeSelected, setEventTypeSelected] = useState('');
//   const [privacySelected, setPrivacySelected] = useState('');
//   const categoryBottomSheetRef = useRef<BottomSheet>(null);
//   const eventTypeBottomSheetRef = useRef<BottomSheet>(null);
//   const privacyBottomSheetRef = useRef<BottomSheet>(null);
//   const [eventDateSelected, setEventDateSelected] = useState('');


//   // Open and close bottom sheets
//   const openCategoryBottomSheet = () => categoryBottomSheetRef.current?.expand();
//   const closeCategoryBottomSheet = () => categoryBottomSheetRef.current?.close();
//   const openEventTypeBottomSheet = () => eventTypeBottomSheetRef.current?.expand();
//   const closeEventTypeBottomSheet = () => eventTypeBottomSheetRef.current?.close();
//   const openPrivacyBottomSheet = () => privacyBottomSheetRef.current?.expand();
//   const closePrivacyBottomSheet = () => privacyBottomSheetRef.current?.close();

//   // Form validation schema
//   const validationSchema = Yup.object().shape({
//     addPhoto: Yup.mixed().nullable(),
//     eventTitle: Yup.string().required('Event title is required'),
//     eventCategory: Yup.string().required('Event category is required'),
//     eventDate: Yup.date().required('Event date is required'),
//     startTime: Yup.string().required('Start time is required'),
//     endTime: Yup.string().nullable(), // Optional field
//     eventType: Yup.string().required('Event type is required'),
//     location: Yup.string().required('Location is required'),
//     eventPrivacy: Yup.string().required('Event privacy is required'),
//     otherDetails: Yup.string().nullable(), // Optional field
//   });

//   // Form submission handler
//   const handleSubmit = (values: any) => {
//     console.log('Form values:', values);
//   };

//   return (
//     <>
//       <TitleBar>
//         <Text style={styles.titleText}>Create Events</Text>
//         <GestureTouchableOpacity>
//           <Text>Clear</Text>
//         </GestureTouchableOpacity>
//       </TitleBar>

//       <Formik
//         initialValues={{
//           addPhoto: null,
//           eventTitle: '',
//           eventCategory: '',
//           eventDate: '',
//           startTime: '',
//           endTime: '',
//           eventType: '',
//           location: '',
//           eventPrivacy: '',
//           otherDetails: '',
//         }}
//         validationSchema={validationSchema}
//         onSubmit={handleSubmit}
//       >
//         {({ handleChange, handleBlur, handleSubmit, setFieldValue, values, errors, touched }) => (
//           <View style={styles.formContainer}>
//             {/* Add Photo */}
//             <Button
//               title="Add Photo"
//               onPress={() => {
//                 setFieldValue('addPhoto', 'photo.jpg');
//               }}
//             />
//             {values.addPhoto && <Text>Photo: {values.addPhoto}</Text>}
//             {touched.addPhoto && errors.addPhoto && <Text style={styles.errorText}>{errors.addPhoto}</Text>}

//             {/* Event Title */}
//             <TextInput
//               placeholder="Event Title"
//               onChangeText={handleChange('eventTitle')}
//               onBlur={handleBlur('eventTitle')}
//               value={values.eventTitle}
//               style={styles.inputField}
//             />
//             {touched.eventTitle && errors.eventTitle && <Text style={styles.errorText}>{errors.eventTitle}</Text>}

//             {/* Event Category (Dropdown with Bottom Sheet) */}
//             <TouchableOpacity onPress={openCategoryBottomSheet}>
//               <View style={[styles.inputField, { borderColor: touched.eventCategory && errors.eventCategory ? 'red' : '#ccc' }]}>
//                 <Text>{categorySelected || 'Select Event Category'}</Text>
//               </View>
//             </TouchableOpacity>
//             {touched.eventCategory && errors.eventCategory && <Text style={styles.errorText}>{errors.eventCategory}</Text>}

//             {/* Event Date */}
//             <TextInput
//               placeholder="Event Date"
//               onChangeText={handleChange('eventDate')}
//               onBlur={handleBlur('eventDate')}
//               value={values.eventDate}
//               style={styles.inputField}
//             />
//             {touched.eventDate && errors.eventDate && <Text style={styles.errorText}>{errors.eventDate}</Text>}

//             {/* Start and End Time Container */}
//             <View style={styles.timeContainer}>
//               {/* Start Time */}
//               <View style={styles.timeFieldContainer}>
//                 <TextInput
//                   placeholder="Start Time"
//                   onChangeText={handleChange('startTime')}
//                   onBlur={handleBlur('startTime')}
//                   value={values.startTime}
//                   style={styles.inputField}
//                 />
//                 {touched.startTime && errors.startTime && <Text style={styles.errorText}>{errors.startTime}</Text>}
//               </View>

//               {/* End Time (Optional) */}
//               <View style={styles.timeFieldContainer}>
//                 <TextInput
//                   placeholder="End Time (Optional)"
//                   onChangeText={handleChange('endTime')}
//                   onBlur={handleBlur('endTime')}
//                   value={values.endTime}
//                   style={styles.inputField}
//                 />
//                 {touched.endTime && errors.endTime && <Text style={styles.errorText}>{errors.endTime}</Text>}
//               </View>
//             </View>

//             {/* Event Type (Dropdown with Bottom Sheet) */}
//             <TouchableOpacity onPress={openEventTypeBottomSheet}>
//               <View style={[styles.inputField, { borderColor: touched.eventType && errors.eventType ? 'red' : '#ccc' }]}>
//                 <Text>{eventTypeSelected || 'Select Event Type'}</Text>
//               </View>
//             </TouchableOpacity>
//             {touched.eventType && errors.eventType && <Text style={styles.errorText}>{errors.eventType}</Text>}

//             {/* Location */}
//             <TextInput
//               placeholder="Location"
//               onChangeText={handleChange('location')}
//               onBlur={handleBlur('location')}
//               value={values.location}
//               style={styles.inputField}
//             />
//             {touched.location && errors.location && <Text style={styles.errorText}>{errors.location}</Text>}

//             {/* Event Privacy (Dropdown with Bottom Sheet) */}
//             <TouchableOpacity onPress={openPrivacyBottomSheet}>
//               <View style={[styles.inputField, { borderColor: touched.eventPrivacy && errors.eventPrivacy ? 'red' : '#ccc' }]}>
//                 <Text>{privacySelected || 'Select Event Privacy'}</Text>
//               </View>
//             </TouchableOpacity>
//             {touched.eventPrivacy && errors.eventPrivacy && <Text style={styles.errorText}>{errors.eventPrivacy}</Text>}

//             {/* Other Details (Optional) */}
//             <TextInput
//               placeholder="Other Details (Optional)"
//               onChangeText={handleChange('otherDetails')}
//               onBlur={handleBlur('otherDetails')}
//               value={values.otherDetails}
//               style={styles.inputField}
//             />
//             {touched.otherDetails && errors.otherDetails && <Text style={styles.errorText}>{errors.otherDetails}</Text>}

//             {/* Submit Button */}
//             <Button onPress={handleSubmit} title="Submit" />

//             {/* Bottom Sheet for Event Category */}
//             <BottomSheet
//               ref={categoryBottomSheetRef}
//               index={-1} // Initial state is hidden
//               snapPoints={['50%']} // The height of the bottom sheet
//             >
//               <View style={styles.bottomSheetContainer}>
//                 <TouchableOpacity onPress={closeCategoryBottomSheet} style={styles.closeButton}>
//                   <Text style={styles.closeButtonText}>Close</Text>
//                 </TouchableOpacity>
//                 {categories.map((category) => (
//                   <TouchableOpacity
//                     key={category}
//                     onPress={() => {
//                       setFieldValue('eventCategory', category);
//                       setCategorySelected(category);
//                       closeCategoryBottomSheet();
//                     }}
//                     style={styles.categoryItem}
//                   >
//                     <Text>{category}</Text>
//                   </TouchableOpacity>
//                 ))}
//               </View>
//             </BottomSheet>

//             {/* Bottom Sheet for Event Type */}
//             <BottomSheet
//               ref={eventTypeBottomSheetRef}
//               index={-1} // Initial state is hidden
//               snapPoints={['50%']}
//             >
//               <View style={styles.bottomSheetContainer}>
//                 <TouchableOpacity onPress={closeEventTypeBottomSheet} style={styles.closeButton}>
//                   <Text style={styles.closeButtonText}>Close</Text>
//                 </TouchableOpacity>
//                 {eventTypes.map((eventType) => (
//                   <TouchableOpacity
//                     key={eventType}
//                     onPress={() => {
//                       setFieldValue('eventType', eventType);
//                       setEventTypeSelected(eventType);
//                       closeEventTypeBottomSheet();
//                     }}
//                     style={styles.categoryItem}
//                   >
//                     <Text>{eventType}</Text>
//                   </TouchableOpacity>
//                 ))}
//               </View>
//             </BottomSheet>

//             {/* Bottom Sheet for Privacy Options */}
//             <BottomSheet
//               ref={privacyBottomSheetRef}
//               index={-1} // Initial state is hidden
//               snapPoints={['50%']}
//             >
//               <View style={styles.bottomSheetContainer}>
//                 <TouchableOpacity onPress={closePrivacyBottomSheet} style={styles.closeButton}>
//                   <Text style={styles.closeButtonText}>Close</Text>
//                 </TouchableOpacity>
//                 {privacyOptions.map(({ label, icon }) => (
//                   <TouchableOpacity
//                     key={label}
//                     onPress={() => {
//                       setFieldValue('eventPrivacy', label);
//                       setPrivacySelected(label);
//                       closePrivacyBottomSheet();
//                     }}
//                     style={styles.categoryItem}
//                   >
//                     <Text>{label}</Text>
//                   </TouchableOpacity>
//                 ))}
//               </View>
//             </BottomSheet>
//           </View>
//         )}
//       </Formik>
//     </>
//   );
// };

// // Styles
// const styles = StyleSheet.create({
//   formContainer: {
//     flex: 1,
//     padding: 20,
//     backgroundColor: '#fff',
//   },
//   titleText: {
//     fontSize: RFValue(24),
//     fontWeight: 'bold',
//     textAlign: 'center',
//   },
//   inputField: {
//     borderWidth: 1,
//     borderColor: '#ccc',
//     borderRadius: 8,
//     padding: 12,
//     marginVertical: 8,
//     backgroundColor: '#f9f9f9',
//   },
//   errorText: {
//     color: 'red',
//     fontSize: RFValue(12),
//     marginBottom: 8,
//   },
//   timeContainer: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//   },
//   timeFieldContainer: {
//     flex: 1,
//     marginHorizontal: 4,
//   },
//   bottomSheetContainer: {
//     flex: 1,
//     padding: 20,
//   },
//   closeButton: {
//     alignItems: 'flex-end',
//     marginBottom: 16,
//   },
//   closeButtonText: {
//     fontSize: RFValue(16),
//     fontWeight: 'bold',
//   },
//   categoryItem: {
//     padding: 12,
//     borderBottomWidth: 1,
//     borderBottomColor: '#ccc',
//   },
// });

// export default CreateEvents;









import React, { useRef, useState } from 'react';
import { Dimensions, StyleSheet, Text, TextInput, View, TouchableOpacity } from "react-native";
import { Formik } from 'formik';
import * as Yup from 'yup';
import { RFValue } from "react-native-responsive-fontsize";
import BottomSheet from '@gorhom/bottom-sheet';
import DatePicker from 'react-native-date-picker'; // Date picker for event date
import TitleBar from "@/components/TitleBar/TitleBar";
import { TouchableOpacity as GestureTouchableOpacity } from "react-native-gesture-handler";
import Title from '@/components/Title/Title';

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
    <>
      <Title>Events</Title>


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
            <TextInput
              placeholder="Event Title"
              onChangeText={handleChange('eventTitle')}
              onBlur={handleBlur('eventTitle')}
              value={values.eventTitle}
              style={styles.inputField}
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
    </>
  );
};

const styles = StyleSheet.create({
  titleText: {
    fontSize: RFValue(24),
    fontWeight: 'bold',
    marginBottom: 20,
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
