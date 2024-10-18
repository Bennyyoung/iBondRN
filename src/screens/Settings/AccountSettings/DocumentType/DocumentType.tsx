
import React, { useRef, useState } from 'react';
import { StyleSheet, TouchableOpacity, NativeScrollEvent, NativeSyntheticEvent, ScrollView, Dimensions } from 'react-native';
import RadioButtonCheckedIcon from '@/assets/svg/radioChecked.svg';
import RadioButtonUncheckedIcon from '@/assets/svg/radioUnchecked.svg';
import { CustomButton } from '@/components/CustomButton';
import RadioIcon from '@/assets/svg/radio.svg';
import { useNavigation } from '@react-navigation/core';
import { RFValue } from 'react-native-responsive-fontsize';
import Box from '@/components/Box';
import Text from '@/components/Text';
import TitleBar from '@/components/TitleBar/TitleBar';

const { width, height } = Dimensions.get('window');

interface VerificationItemProps {
  icon: React.ReactNode;
  title: string;
}

const slides = [
  {
    id: 1,
    title: 'Document type',
    description: 'Please choose the ID document you have on hand.',
    options: [
      {
        id: 1,
        icon: <RadioIcon width={45} height={45} marginTop={30} />,
        title: 'School ID'
      }
    ]
  },
  {
    id: 2,
    title: 'Document type',
    description: 'Please choose the ID document you have on hand.',
    options: [
      {
        id: 1,
        icon: <RadioIcon width={45} height={45} marginTop={30} />,
        title: 'Passport'
      },
      {
        id: 2,
        icon: <RadioIcon width={45} height={45} marginTop={30} />,
        title: 'National ID'
      },
      {
        id: 3,
        icon: <RadioIcon width={45} height={45} marginTop={30} />,
        title: "Driver's License"
      },
      {
        id: 4,
        icon: <RadioIcon width={45} height={45} marginTop={30} />,
        title: "Voter's Card"
      },
    ]
  }
]

const VerificationItem: React.FC<VerificationItemProps> = ({ icon, title }) => {
  const [checked, setChecked] = useState(false);

  return (
    <Box style={styles.item}>
      <Box style={styles.iconContainer}>{icon}</Box>
      <Box style={styles.textContainer}>
        <Text style={styles.itemTitle}>{title}</Text>
      </Box>
      <TouchableOpacity onPress={() => setChecked(!checked)}>
        {checked ? (
          <RadioButtonCheckedIcon width={25} height={25} />
        ) : (
          <RadioButtonUncheckedIcon width={25} height={25} />
        )}
      </TouchableOpacity>
    </Box>
  );
};

const DocumentType = () => {
  const navigation = useNavigation()
  const [activeIndex, setActiveIndex] = useState(0);
  const scrollViewRef = useRef<ScrollView | null>(null); // Reference for ScrollView

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const scrollPosition = event.nativeEvent.contentOffset.x;
    const currentIndex = Math.round(scrollPosition / width);
    setActiveIndex(currentIndex);
  };

  const handleNext = () => {
    if (activeIndex < slides.length - 1) {
      const nextIndex = activeIndex + 1;
      setActiveIndex(nextIndex);
      if (scrollViewRef.current) {  // Check if scrollViewRef.current is not null
        scrollViewRef.current.scrollTo({ x: nextIndex * width, animated: true });
      }
    } else {
      navigation.navigate('SchoolID');  // Replace with the correct route
    }
  };

  return (

    <Box style={{ flex: 1, backgroundColor: '#fff', paddingLeft: 30, paddingBottom: 20 }}>
      <TitleBar>
        <Box style={styles.mainTitleContainer}>
          <Text style={styles.appearance}>
            Verify Account
          </Text>
        </Box>
        <TouchableOpacity onPress={() => { }}>
          <Text>

          </Text>
        </TouchableOpacity>
      </TitleBar>
      <ScrollView
        ref={scrollViewRef}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={handleScroll}
        scrollEventThrottle={16}
      >
        {
          slides.map((slide) => (
            <Box style={styles.container} key={slide.id}>
              <Box style={{ marginTop: 100 }}>
                <Text style={styles.title}>{slide.title}</Text>
                <Text style={styles.subtitle}>{slide.description}</Text>
              </Box>

              <Box style={[styles.formContainer, { marginTop: 50 }]}>
                {slide.options.map((option) => (
                  <>
                    <VerificationItem
                      key={option.id}
                      icon={option.icon}
                      title={option.title}
                    />
                  </>
                ))}
              </Box>
            </Box>
          ))
        }
      </ScrollView>
      <Box style={styles.buttonContainer}>
        <CustomButton
          label={'Continue'}
          labelProps={{ color: 'whiteColor' }}
          borderRadius="sm"
          onPress={handleNext}
        />
      </Box>

      <Text style={styles.terms}>
        By tapping "Continue", you allow our partners to analyze your identity document and photos for identity verification and agree to the the {' '}
        <Text style={{ fontWeight: '600', fontSize: RFValue(13, height) }}>Data Privacy</Text> {' '}
        and {' '}
        <Text style={{ fontWeight: '600', fontSize: RFValue(13, height) }}>
          Retention Policies
        </Text>
      </Text>

    </Box>
  );
};

const styles = StyleSheet.create({
  container: {
    width: width,
    backgroundColor: '#fff',
  },
  mainTitleContainer: {
    paddingRight: RFValue(16),
    paddingLeft: RFValue(0),
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16
  },
  appearance: {
    fontWeight: '600',
    fontSize: RFValue(17, height),
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
  },
  subtitle: {
    fontSize: 16,
    color: '#333',
    marginBottom: 20,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconContainer: {
    marginRight: 10,
  },
  textContainer: {
    flex: 1,
  },
  itemTitle: {
    fontSize: 16,
    color: '#333',
  },
  buttonContainer: {
    // position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 20,
    backgroundColor: '#fff', // Optional background to separate from other content
  },
  formContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  terms: {
    fontWeight: '400',
    fontSize: RFValue(13, height),
    lineHeight: 18,
    color: '#151619'
    // marginTop: 30
  }
});

export default DocumentType;
