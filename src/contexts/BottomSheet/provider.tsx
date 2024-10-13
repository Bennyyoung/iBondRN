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
  Dimensions,
  Keyboard,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
const { height } = Dimensions.get('window')

import BottomSheetContext, {
  BottomSheetProps,
  BottomSheetProviderProps,
} from './context';
import { RFValue } from 'react-native-responsive-fontsize';
import Box from '@/components/Box';
import Text from '@/components/Text';
import { palette } from '@/constants/theme';
import { SvgIcon } from '@/assets/icons';
import { useSelector } from 'react-redux';
import { useAppSelector, useAppDispatch } from '@/reduxFolder/index';
import { showModal } from '@/reduxFolder/reducers/modal.reducer';

// const {}

const Header = ({
  title,
  onClose,
  action
}: {
  title: ReactNode;
  onClose: () => void;
  action: ReactNode;
}) => (
  <Box
    flexDirection="row"
    justifyContent="space-between"
    alignItems="center"
    marginTop="xs"
    paddingHorizontal="md"
    paddingVertical="sm"
  // position="relative"
  >
    <TouchableOpacity
      onPress={onClose}
      style={{
        width: RFValue(28),
        height: RFValue(28),
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <SvgIcon name="closeCircle" size="sml" />
    </TouchableOpacity>
    <Box alignItems="center">
      <Text variant="regular16" style={{ color: '#151619', fontWeight: '600', fontSize: RFValue(17, height) }}>
        {title}
      </Text>
    </Box>
    <TouchableOpacity
      style={{
        justifyContent: 'center',
        alignItems: 'center',
      }}

    >
      <Text style={{ color: '#6500E0', fontSize: RFValue(17, height) }}>{action}</Text>
    </TouchableOpacity>
  </Box>
);

export let createBottomSheet: (props: BottomSheetProps) => void;

const BottomSheetProvider = ({ children }: BottomSheetProviderProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const dispatch = useAppDispatch()


  const bottomSheetRef = useRef<BottomSheetModal>(null);

  const [snapPoints, setSnapPoints] = useState(['0%', '50%', '90%']);
  const [showHeader, setShowHeader] = useState<boolean>(false);

  const [title, setTitle] = useState<ReactNode | null>(null);
  const [content, setContent] = useState<ReactNode | null>(null);
  const [action, setAction] = useState<ReactNode | null>(null);

  const closeBottomSheet = useCallback(() => {
    dispatch(showModal(true))
    setIsVisible(false);
  }, []);

  useEffect(() => {
    if (isVisible) {
      bottomSheetRef.current?.present();
    } else {
      bottomSheetRef.current?.dismiss();
    }
  }, [isVisible]);

  const [onDismiss] = useState(() => () => { });

  createBottomSheet = (props: BottomSheetProps) => {
    const {
      _snapPoints: SnapPoints,
      _content: Content,
      _title: Title,
      _showHeader: ShowHeader,
      _action: Action
    } = props;

    if (Title) {
      setTitle(typeof Title === 'function' ? <Title /> : Title);
    }
    if (Action) {
      setAction(typeof Action === 'function' ? <Action /> : Action);
    }
    setContent(typeof Content === 'function' ? <Content /> : Content);
    setSnapPoints(SnapPoints);
    setShowHeader(ShowHeader);
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
            {showHeader && <Header
              title={title}
              onClose={closeBottomSheet}
              action={action}
            />}
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
