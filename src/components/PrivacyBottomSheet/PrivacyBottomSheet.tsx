import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import BottomSheet from '@gorhom/bottom-sheet';

interface PrivacyOption {
  label: string;
  icon: any;
  description: string;
}

interface PrivacyBottomSheetProps {
  bottomSheetRef: React.RefObject<BottomSheet>;
  privacyOptions: PrivacyOption[];
  onSelect: (privacy: string) => void;
  closeBottomSheet: () => void;
}

const PrivacyBottomSheet: React.FC<PrivacyBottomSheetProps> = ({ bottomSheetRef, privacyOptions, onSelect, closeBottomSheet }) => {
  return (
    <BottomSheet ref={bottomSheetRef} index={-1} snapPoints={['50%']}>
      <View style={styles.bottomSheetContainer}>
        <TouchableOpacity onPress={closeBottomSheet} style={styles.closeButton}>
          <Text style={styles.closeButtonText}>Close</Text>
        </TouchableOpacity>
        {privacyOptions.map(({ label }) => (
          <TouchableOpacity key={label} onPress={() => { onSelect(label); closeBottomSheet(); }} style={styles.categoryItem}>
            <Text>{label}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </BottomSheet>
  );
};

const styles = StyleSheet.create({
  bottomSheetContainer: { padding: 20 },
  closeButton: { alignItems: 'flex-end', marginBottom: 16 },
  closeButtonText: { fontSize: 16, fontWeight: 'bold' },
  categoryItem: { padding: 12, borderBottomWidth: 1, borderBottomColor: '#ccc' },
});

export default PrivacyBottomSheet;
