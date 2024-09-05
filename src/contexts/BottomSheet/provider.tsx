/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/react-in-jsx-scope */
import {
  BottomSheetBackdrop,
  BottomSheetBackdropProps,
  BottomSheetModal,
} from '@gorhom/bottom-sheet';
import { Portal } from '@gorhom/portal';
import {
  ReactNode,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import {
  Keyboard,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

import BottomSheetContext, {
  BottomSheetProps,
  BottomSheetProviderProps,
} from './context';
import { RFValue } from 'react-native-responsive-fontsize';
import Box from '@/components/Box';
import Text from '@/components/Text';
import { palette } from '@/constants/theme';

const Header = ({
  title,
  onClose,
}: {
  title: ReactNode;
  onClose: () => void;
}) => (
  <Box
    flexDirection="row"
    justifyContent="center"
    alignItems="center"
    marginTop="md"
    paddingHorizontal="md"
    paddingVertical="sm"
    position="relative">
    <Box position="absolute" left={0} right={0} alignItems="center">
      <Text variant="medium16" color="black">
        {title}
      </Text>
    </Box>
    <TouchableOpacity
      onPress={onClose}
      style={{
        position: 'absolute',
        right: RFValue(16),
        width: RFValue(28),
        height: RFValue(28),
        borderRadius: RFValue(14),
        backgroundColor: 'rgba(0, 0, 0, 0.3)',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <Icon name="close" size={RFValue(18)} color={palette.black} />
    </TouchableOpacity>
  </Box>
);

export let createBottomSheet: (props: BottomSheetProps) => void;

const BottomSheetProvider = ({ children }: BottomSheetProviderProps) => {
  const [isVisible, setIsVisible] = useState(false);

  const bottomSheetRef = useRef<BottomSheetModal>(null);

  const [snapPoints, setSnapPoints] = useState(['0%', '50%', '90%']);

  const [title, setTitle] = useState<ReactNode | null>(null);
  const [content, setContent] = useState<ReactNode | null>(null);

  const closeBottomSheet = useCallback(() => {
    setIsVisible(false);
  }, []);

  useEffect(() => {
    if (isVisible) {
      bottomSheetRef.current?.present();
    } else {
      bottomSheetRef.current?.dismiss();
    }
  }, [isVisible]);

  const [onDismiss] = useState(() => () => {});

  createBottomSheet = (props: BottomSheetProps) => {
    const { _snapPoints: SnapPoints, _content: Content, _title: Title } = props;

    if (Title) {
      setTitle(typeof Title === 'function' ? <Title /> : Title);
    }

    setContent(typeof Content === 'function' ? <Content /> : Content);
    setSnapPoints(SnapPoints);
    setIsVisible(true);
  };

  const CustomBackdrop = useCallback(
    (props: BottomSheetBackdropProps) => (
      <BottomSheetBackdrop {...props} appearsOnIndex={0} disappearsOnIndex={-1}>
        <Box
          style={{
            ...StyleSheet.absoluteFillObject,
            backgroundColor: 'rgba(0, 0, 0, 0.5',
          }}
        />
      </BottomSheetBackdrop>
    ),
    [],
  );

  const contextValue = useMemo(
    () => ({
      createBottomSheet,
      dismissBottomSheet: closeBottomSheet,
    }),
    [closeBottomSheet],
  );

  return (
    <BottomSheetContext.Provider value={contextValue}>
      {children}
      <Portal>
        <BottomSheetModal
          android_keyboardInputMode="adjustResize"
          backdropComponent={CustomBackdrop}
          backgroundStyle={{
            backgroundColor: palette.white,
          }}
          index={1}
          keyboardBehavior="interactive"
          keyboardBlurBehavior="restore"
          onDismiss={() => {
            closeBottomSheet();
            onDismiss();
          }}
          ref={bottomSheetRef}
          snapPoints={snapPoints}>
          <Box flex={1}>
            <Header title={title} onClose={closeBottomSheet} />
            <Box mt="md" />
            <Box flex={1}>
              <TouchableWithoutFeedback
                onPress={() => {
                  Keyboard.dismiss();
                }}
                style={{
                  flex: 1,
                  height: '100%',
                }}>
                <Box
                  style={{
                    flexGrow: 1,
                  }}>
                  {content}
                </Box>
              </TouchableWithoutFeedback>
            </Box>
          </Box>
        </BottomSheetModal>
      </Portal>
    </BottomSheetContext.Provider>
  );
};

export default BottomSheetProvider;
