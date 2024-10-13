import React, { useRef } from 'react';
import { ScrollView, Image, Switch, TouchableOpacity, View, StyleSheet, Platform, Animated, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/core';
import Box from '@/components/Box';
import Text from '@/components/Text';
import { RFValue } from 'react-native-responsive-fontsize';
import { SvgIcon } from '@/assets/icons';
import { Formik, FormikHelpers, FormikProps } from 'formik';
import * as Yup from 'yup';
import CustomInput from '@/components/CustomInput';
import TitleBar from '@/components/TitleBar/TitleBar';
import ImageUpload from '@/components/ImageUpload/ImageUpload';

const { height } = Dimensions.get('window')

interface ProfileValues {
    profilePicture: string;
    username: string;
    intro: string;
    dateOfBirth: string;
    website: string;
}

const validationSchema = Yup.object().shape({
    profilePicture: Yup.mixed()
        .test(
            'fileType',
            'Unsupported file type',
            (value) => {
                if (value && value.type) {
                    // Check the MIME type directly
                    return ['image/jpeg', 'image/png', 'image/jpg'].includes(value.type);
                }
                return false;
            }
        ),
    username: Yup.string().required('Username is required'),
    intro: Yup.string().max(200, 'Max 200 characters allowed'),
    dateOfBirth: Yup.string().required('Date of Birth is required'),
    website: Yup.string().url('Enter a valid URL'),
});

const initialValues: ProfileValues = {
    username: 'official_segunowo',
    intro: 'Creative Design | UI/UX Design | Brand Identity...',
    dateOfBirth: '16/05/1987',
    website: 'https://shegunowo.xyz/portfolio/minion-commodor',
};

const EditProfileScreen: React.FC = () => {
    const navigation = useNavigation();
    const [isStudent, setIsStudent] = React.useState(true);

    const handleSubmit = (
        values: ProfileValues,
        { resetForm }: FormikHelpers<ProfileValues>
    ) => {
        console.log('Form Values:', values);
        // Save logic here
        resetForm();
    };

    return (
        <ScrollView
            contentContainerStyle={{
                flexGrow: 1,
                paddingBottom: 20,
                backgroundColor: '#fff',
            }}
        >
            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
            >
                {({ handleChange, handleBlur, handleSubmit, setFieldValue, values, errors, touched, resetForm }) => (
                    <>
                        {/* Header */}

                        <TitleBar>
                            <Box style={styles.title}>
                                <Text style={styles.editProfile}>
                                    Edit Profile
                                </Text>
                            </Box>
                            <TouchableOpacity onPress={() => { }}>
                                <Text style={styles.clear}>
                                    Save
                                </Text>
                            </TouchableOpacity>
                        </TitleBar>

                        {/* Cover and Profile Image */}
                        <Box marginVertical="sm" alignItems="center">
                            <ImageUpload
                                setFieldValue={setFieldValue}
                                error={touched.profilePicture && errors.profilePicture}
                            />
                            <TouchableOpacity
                                style={{
                                    position: 'absolute',
                                    top: 60,
                                    left: '40%',
                                    backgroundColor: 'rgba(0, 0, 0, 0.5)',
                                    padding: 8,
                                    borderRadius: 20,
                                }}
                            >
                                <SvgIcon name="camera" size="md" color="white" />
                                <Text>Change Cover</Text>
                            </TouchableOpacity>

                            <Box marginTop="sm" alignItems="center">
                                <Image
                                    source={{ uri: 'https://your-profile-image-url.com' }}
                                    style={{
                                        width: 80,
                                        height: 80,
                                        borderRadius: 40,
                                        borderWidth: 2,
                                        borderColor: 'white',
                                    }}
                                />
                                <TouchableOpacity
                                    style={{
                                        position: 'absolute',
                                        bottom: -5,
                                        right: 5,
                                        backgroundColor: 'white',
                                        borderRadius: 20,
                                        padding: 5,
                                    }}
                                >
                                    <SvgIcon name="camera" size="sm" />
                                </TouchableOpacity>
                            </Box>
                        </Box>

                        {/* Form Fields using CustomInput */}
                        <Box paddingHorizontal="sm">
                            <CustomInput
                                label="Username"
                                value={values.username}
                                onChangeText={handleChange('username')}
                                onBlur={handleBlur('username')}
                                error={touched.username && errors.username}
                                placeholder="Enter your username"
                                iconSize="sm"
                            />

                            <CustomInput
                                label="Intro"
                                value={values.intro}
                                onChangeText={handleChange('intro')}
                                onBlur={handleBlur('intro')}
                                error={touched.intro && errors.intro}
                                placeholder="Tell us about yourself"
                                multiline
                            />

                            <CustomInput
                                label="Date of Birth"
                                value={values.dateOfBirth}
                                onChangeText={handleChange('dateOfBirth')}
                                onBlur={handleBlur('dateOfBirth')}
                                error={
                                    touched.dateOfBirth &&
                                    errors.dateOfBirth
                                }
                                iconName="calendar"
                            />

                            <CustomInput
                                label="Website URL"
                                value={values.website}
                                onChangeText={handleChange('website')}
                                onBlur={handleBlur('website')}
                                error={touched.website && errors.website}
                                placeholder="Enter your website URL"
                            />

                            {/* Student Status Switch */}
                            <Box
                                flexDirection="row"
                                justifyContent="space-between"
                                alignItems="center"
                                marginVertical="sm"
                            >
                                <Text>I am a student</Text>
                                <Switch
                                    value={isStudent}
                                    onValueChange={setIsStudent}
                                    thumbColor={isStudent ? 'purple' : 'grey'}
                                />
                            </Box>

                            {/* Non-editable Fields */}
                            <CustomInput
                                label="School"
                                value="Ladoke Akintola University of Technology"
                                editable={false}
                            />
                            <CustomInput
                                label="Faculty"
                                value="Faculty of Engineering"
                                editable={false}
                            />
                            <CustomInput
                                label="Department"
                                value="Computer Science"
                                editable={false}
                            />
                        </Box>
                    </>
                )}
            </Formik>
        </ScrollView>
    );
};

export default EditProfileScreen;

const styles = StyleSheet.create({
    title: {
        paddingRight: RFValue(16),
        paddingLeft: RFValue(0),
        justifyContent: 'space-between',
        flexDirection: 'row',
        alignItems: 'center',
        gap: 16
    },
    editProfile: {
        fontWeight: '600',
        fontSize: RFValue(17, height),
    },
    clear: {
        fontWeight: '400',
        fontSize: RFValue(17, height),
        color: '#6500E0'
    },
    input: {
        fontSize: RFValue(14),
        color: '#151619',
        height: '100%',
    },
    inputContainer: {
        height: Platform.OS === 'ios' ? RFValue(48) : RFValue(56),
        borderWidth: 1,
        borderColor: '#E0E0E0',
        borderRadius: RFValue(12),
        paddingHorizontal: RFValue(6),
        justifyContent: 'center',
    },
})