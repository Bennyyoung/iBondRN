import Box from '@/components/Box'
import SecurityFieldManager from '@/components/SecurityFieldManager/SecurityFieldManager'
import Text from '@/components/Text'
import TitleBar from '@/components/TitleBar/TitleBar'
import React, { useRef, useState } from 'react'
import { Animated, Dimensions, NativeScrollEvent, NativeSyntheticEvent, ScrollView, StyleSheet } from 'react-native'
import { RFValue } from 'react-native-responsive-fontsize'
import { useAppSelector } from '@/reduxFolder/index'
import SimpleBottomSheet from '@/components/SimpleBottomSheet/SimpleBottomSheet'
import AddEmailAddressOTP from '@/components/AddEmailAddressOTP/AddEmailAddressOTP'
import AddEmailAddressForm from '@/components/AddEmailAddressForm/AddEmailAddressForm'
import { CustomButton } from '@/components/CustomButton'
import AddPhoneNumberOTP from '@/components/AddPhoneNumberOTP/AddPhoneNumberOTP'
import AddPhoneNumberForm from '@/components/AddPhoneNumberForm/AddPhoneNumberForm'
import VerifyPhoneNumber from '@/components/VerifyPhoneNumber/VerifyPhoneNumber'

const { width, height } = Dimensions.get('window')

const PhoneNumbers = () => {


    const [isSheetVisible, setIsSheetVisible] = useState(false)
    const userData = useAppSelector(state => state.user.userData)
    const [activeIndex, setActiveIndex] = useState(0)
    const scrollViewRef = useRef<ScrollView>(null)
    const [phoneNumberData, setPhoneNumberFormData] = useState({ phoneNumber: '', password: '' })
    const [code, setCode] = useState('');
    const [error, setError] = useState('');

    const phoneNumberItems = [
        {
            id: '1',
            value: userData?.phoneNumber,
            isPrimary: true,
            isVerified: true,
        },
        {
            id: '2',
            value: userData?.phoneNumber,

        }
    ]

    const handleNextSlide = () => {

        if (activeIndex < slides.length - 1) {
            console.log('hello');
            const nextIndex = activeIndex + 1
            console.log('nextIndex', nextIndex);

            scrollViewRef.current?.scrollTo({ x: nextIndex * width * 0.9, animated: true })
            setActiveIndex(prevIndex => prevIndex + 1)
        }
    }

    console.log('activeIndex', activeIndex);



    const slides = [
        {
            id: 1,
            content: (
                <Box flex={1} >
                    <AddPhoneNumberOTP
                        setCode={setCode}
                        error={error}
                    />
                    <Box style={styles.buttonContainer}>
                        <CustomButton
                            label="Continue"
                            backgroundColor="primary"
                            labelProps={{ color: 'whiteColor' }}
                            borderRadius="sm"
                            onPress={handleNextSlide}
                            disabled={!code || code.length < 6}
                        />
                    </Box>
                </Box>
            )
        },
        {
            id: 2,
            content: (
                <Box flex={1}>
                    <AddPhoneNumberForm
                        handleNextSlide={handleNextSlide}
                    />
                </Box>
            )
        },
        {
            id: 3,
            content: (
                <Box flex={1}>
                    <VerifyPhoneNumber
                        setCode={setCode}
                        error={error}
                    />

                    <Box style={styles.buttonContainer}>
                        <CustomButton
                            label="Verify"
                            backgroundColor="primary"
                            labelProps={{ color: 'whiteColor' }}
                            borderRadius="sm"
                            onPress={() => { }}
                            // disabled={!code || code.length < 6}
                        />
                    </Box>
                </Box>
            )
        },
    ]

    const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
        const scrollPosition = event.nativeEvent.contentOffset.x
        const currentIndex = Math.round(scrollPosition / width)
        setActiveIndex(currentIndex)
    }

    const handleCloseBottomSheet = () => {
        setIsSheetVisible(false)
        // Reset state when closing the sheet
        setActiveIndex(0)
        setCode('')
        setPhoneNumberFormData({ phoneNumber: '', password: '' })
    }

    return (
        <Box flex={1} backgroundColor="white">
            <TitleBar>
                <Box style={styles.title}>
                    <Text style={styles.emailAddresses}>Email addresses</Text>
                </Box>
                <Box />
            </TitleBar>

            <Box paddingHorizontal="sml">
                <SecurityFieldManager
                    items={phoneNumberItems}
                    onAdd={() => setIsSheetVisible(true)}
                    fieldType="phone"
                    showVerificationStatus
                    onDelete={(id) => { }}
                    onVerify={(id) => { }}
                    onChange={(id) => { }}
                />
            </Box>

            <SimpleBottomSheet
                title={activeIndex === 2 ? "Verify phone number" : "Add phone number"}
                isVisible={isSheetVisible}
                onClose={handleCloseBottomSheet}
                content={
                    <Box flex={1}>
                        <Animated.ScrollView
                            ref={scrollViewRef}
                            horizontal
                            pagingEnabled
                            showsHorizontalScrollIndicator={false}
                            onScroll={handleScroll}
                            scrollEventThrottle={16}
                            contentContainerStyle={styles.scrollContent}
                            scrollEnabled={false}
                        >
                            {slides.map((slide) => (
                                <Box key={slide.id} style={styles.slide}>
                                    {slide.content}
                                </Box>
                            ))}
                        </Animated.ScrollView>

                        <Box style={styles.paginationContainer}>
                            {slides.map((_, index) => (
                                <Box
                                    key={index}
                                    style={[
                                        styles.paginationDot,
                                        activeIndex === index && styles.paginationDotActive
                                    ]}
                                />
                            ))}
                        </Box>
                    </Box>
                }
            />
        </Box>
    )
}

export default PhoneNumbers

const styles = StyleSheet.create({
    title: {
        paddingVertical: RFValue(10),
        paddingRight: RFValue(16),
        paddingLeft: RFValue(0),
        justifyContent: 'space-between',
        flexDirection: 'row',
        alignItems: 'center',
        gap: 16,
    },
    emailAddresses: {
        fontWeight: '600',
        fontSize: RFValue(17, height),
        color: '#151619',
    },
    scrollContent: {
        flexGrow: 0,
    },
    slide: {
        width: width * 0.9,
        paddingHorizontal: 16,
        paddingVertical: 20,
    },
    buttonContainer: {
        paddingHorizontal: 20,
        paddingVertical: 16,
        backgroundColor: '#fff',
        bottom: 0,
        // position: 'absolute'
        marginTop: 20,
    },
    paginationContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 16,
    },
    paginationDot: {
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: '#E0E0E0',
        marginHorizontal: 4,
    },
    paginationDotActive: {
        backgroundColor: '#6200EE',
        width: 10,
        height: 10,
    },
})