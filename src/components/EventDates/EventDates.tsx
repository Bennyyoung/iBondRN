import React, { useRef, useState } from 'react';
import { Dimensions, StyleSheet, Text, View, TouchableOpacity, ScrollView } from 'react-native';
import BottomSheet from '@gorhom/bottom-sheet';

const { height } = Dimensions.get('window');

// Dummy date values for bottom sheet
const eventDates = Array.from({ length: 30 }, (_, i) => `2024-09-${String(i + 1).padStart(2, '0')}`);

interface DatePickerProps {
  selectedDate: string;
  onDateSelect: (date: string) => void;
}

const DatePicker: React.FC<DatePickerProps> = ({ selectedDate, onDateSelect }) => {
  const dateBottomSheetRef = useRef<BottomSheet>(null);

  // Open the bottom sheet
  const openDateBottomSheet = () => dateBottomSheetRef.current?.expand();

  // Close the bottom sheet
  const closeBottomSheet = () => dateBottomSheetRef.current?.close();

  return (
    <>
      <TouchableOpacity onPress={openDateBottomSheet}>
        <View style={styles.inputField}>
          <Text>{selectedDate || 'Select Event Date'}</Text>
        </View>
      </TouchableOpacity>

      {/* Bottom Sheet for Event Date */}
      <BottomSheet
        ref={dateBottomSheetRef}
        index={-1} // Hidden initially
        snapPoints={['25%', '75%']} // Snap points to allow for gesture scrolling
        enablePanDownToClose={true} // Allows closing by swiping down
      >
        <ScrollView contentContainerStyle={styles.bottomSheetContainer}>
          <TouchableOpacity onPress={closeBottomSheet} style={styles.closeButton}>
            <Text style={styles.closeButtonText}>Close</Text>
          </TouchableOpacity>

          {/* Date Picker Items */}
          {eventDates.map((date, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => {
                onDateSelect(date); // Pass the selected date to the parent component
                closeBottomSheet(); // Close the bottom sheet
              }}
              style={styles.dateItem}
            >
              <Text>{date}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </BottomSheet>
    </>
  );
};

// Styles
const styles = StyleSheet.create({
  inputField: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 12,
    marginVertical: 8,
    backgroundColor: '#f9f9f9',
  },
  bottomSheetContainer: {
    flexGrow: 1,
    padding: 20,
  },
  closeButton: {
    alignItems: 'flex-end',
    marginBottom: 16,
  },
  closeButtonText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#007AFF',
  },
  dateItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
});

export default DatePicker;
