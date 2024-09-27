import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import BottomSheet from '@gorhom/bottom-sheet';

interface EventTypeBottomSheetProps {
  bottomSheetRef: React.RefObject<BottomSheet>;
  eventTypes: string[];
  onSelect: (eventType: string) => void;
  closeBottomSheet: () => void;
}

const EventTypeBottomSheet: React.FC<EventTypeBottomSheetProps> = ({ bottomSheetRef, eventTypes, onSelect, closeBottomSheet }) => {
  return (
    <BottomSheet ref={bottomSheetRef} index={-1} snapPoints={['50%']}>
      <View style={styles.bottomSheetContainer}>
        <TouchableOpacity onPress={closeBottomSheet} style={styles.closeButton}>
          <Text style={styles.closeButtonText}>Close</Text>
        </TouchableOpacity>
        {eventTypes.map((eventType) => (
          <TouchableOpacity key={eventType} onPress={() => { onSelect(eventType); closeBottomSheet(); }} style={styles.categoryItem}>
            <Text>{eventType}</Text>
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

export default EventTypeBottomSheet;
