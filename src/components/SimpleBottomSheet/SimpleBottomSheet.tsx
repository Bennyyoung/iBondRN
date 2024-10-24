import React, { useMemo, useRef, useCallback } from 'react';
import { StyleSheet, View, Animated, Dimensions, PanResponder } from 'react-native';
import BottomSheet, { BottomSheetBackdrop } from '@gorhom/bottom-sheet';
import Text from '../Text';
import Box from '../Box';
import { SvgIcon } from '@/assets/icons';

const { width, height } = Dimensions.get('window');

interface SimpleBottomSheetProps {
  title: string;
  content: React.ReactNode;
  isVisible: boolean;
  onClose: () => void;
}

const SimpleBottomSheet: React.FC<SimpleBottomSheetProps> = ({
  title,
  content,
  isVisible,
  onClose,
}) => {
  const bottomSheetRef = useRef<BottomSheet>(null);
  const translateX = useRef(new Animated.Value(0)).current;

  const snapPoints = useMemo(() => ['25%', '50%', '75%'], []);

  React.useEffect(() => {
    if (isVisible) {
      bottomSheetRef.current?.snapToIndex(1); // Open at 50%
    } else {
      bottomSheetRef.current?.close();
    }
  }, [isVisible]);

  const panResponder = PanResponder.create({
    onMoveShouldSetPanResponder: (_, gestureState) => Math.abs(gestureState.dx) > 10,
    onPanResponderMove: (_, gestureState) => {
      translateX.setValue(gestureState.dx); // Track horizontal swipe
    },
    onPanResponderRelease: (_, gestureState) => {
      if (gestureState.dx < -50) {
        // Swipe left detected
        Animated.timing(translateX, {
          toValue: -width,
          duration: 300,
          useNativeDriver: true,
        }).start(() => onClose()); // Close on swipe left
      } else {
        // Reset position if swipe is not enough
        Animated.spring(translateX, {
          toValue: 0,
          useNativeDriver: true,
        }).start();
      }
    },
  });

  const renderBackdrop = useCallback(
    (props) => <BottomSheetBackdrop {...props} opacity={0.5} />,
    []
  );

  return (
    <BottomSheet
      ref={bottomSheetRef}
      snapPoints={snapPoints}
      backdropComponent={renderBackdrop}
      enablePanDownToClose
      onClose={onClose}
    >
      <Animated.View
        style={[styles.contentContainer, { transform: [{ translateX }] }]}
        {...panResponder.panHandlers}
      >
        <Box flexDirection={'row'} justifyContent={"space-between"}>
          {title.length > 0 && <SvgIcon onPress={onClose} name="closeCircle" size="sml" />}
          <Text style={styles.title}>{title}</Text>
          <Box />
        </Box>
        <Box borderBottomWidth={0.3} style={{ borderBottomColor: '#c6c6c8' }} />
        <Box style={styles.content}>{content}</Box>
      </Animated.View>
    </BottomSheet>
  );
};

export default SimpleBottomSheet;

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
    backgroundColor: 'white',
    padding: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  content: {
    flex: 1,
  },
});
