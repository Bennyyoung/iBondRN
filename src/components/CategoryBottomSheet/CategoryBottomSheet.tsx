import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import BottomSheet from '@gorhom/bottom-sheet';

interface CategoryBottomSheetProps {
  bottomSheetRef: React.RefObject<BottomSheet>;
  categories: string[];
  onSelect: (category: string) => void;
  closeBottomSheet: () => void;
}

const CategoryBottomSheet: React.FC<CategoryBottomSheetProps> = ({ bottomSheetRef, categories, onSelect, closeBottomSheet }) => {
  return (
    <BottomSheet ref={bottomSheetRef} index={-1} snapPoints={['50%']}>
      <View style={styles.bottomSheetContainer}>
        <TouchableOpacity onPress={closeBottomSheet} style={styles.closeButton}>
          <Text style={styles.closeButtonText}>Close</Text>
        </TouchableOpacity>
        {categories.map((category) => (
          <TouchableOpacity key={category} onPress={() => { onSelect(category); closeBottomSheet(); }} style={styles.categoryItem}>
            <Text>{category}</Text>
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

export default CategoryBottomSheet;
