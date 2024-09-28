import React, { useState, useRef, useMemo } from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import BottomSheet from '@gorhom/bottom-sheet';
import Box from '../Box';

const CustomSelectDropdown = ({ data, label }) => {
  const bottomSheetRef = useRef(null);
  const snapPoints = useMemo(() => ['25%', '50%'], []);

  const [selectedItem, setSelectedItem] = useState(null);

  const handleOpenBottomSheet = () => {
    bottomSheetRef.current?.expand();
  };

  const handleSelectItem = (item) => {
    setSelectedItem(item);
    bottomSheetRef.current?.close();
  };

  return (
    <Box style={styles.container}>
      {/* Trigger to open the bottom sheet */}
      <TouchableOpacity style={styles.triggerButton} onPress={handleOpenBottomSheet}>
        <Text>{selectedItem ? selectedItem : label}</Text>
      </TouchableOpacity>

      {/* Bottom sheet with dropdown options */}
      <BottomSheet
        ref={bottomSheetRef}
        snapPoints={snapPoints}
        index={-1}
        onClose={() => bottomSheetRef.current?.close()}
        style={styles.bottomSheet} // Make sure it has position absolute and zIndex
      >
        <Box style={styles.contentContainer}>
          {data.map((item, index) => (
            <TouchableOpacity key={index} onPress={() => handleSelectItem(item)} style={styles.item}>
              <Text>{item}</Text>
            </TouchableOpacity>
          ))}
        </Box>
      </BottomSheet>
    </Box>
  );
};

export default CustomSelectDropdown;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  triggerButton: {
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingHorizontal: 10,
    zIndex: 1, // Make sure the button stays on top when the bottom sheet is closed
  },
  bottomSheet: {
    position: 'absolute',
    zIndex: 10, // Higher zIndex to ensure it's above other content
  },
  contentContainer: {
    padding: 20,
  },
  item: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
});
