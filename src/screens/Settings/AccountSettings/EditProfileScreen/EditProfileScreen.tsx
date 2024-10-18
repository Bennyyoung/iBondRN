import React, { useRef, useState } from 'react';
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
import { StackNavigationProp } from '@react-navigation/stack';
import { StackParamsList } from '@/navigation/types';
import SelectInput from '@/components/SelectInput';
import { useDepartmentOptions } from '@/utils/useDepartmenttOptions';
import { useFacultyOptions } from '@/utils/useFacultyOptions';
import { values } from 'lodash';
import { useSchoolOptions } from '@/utils/hooks/useSchoolOptions';
import CustomSwitch from '@/components/CustomSwitch/CustomSwitch';

const { height, width } = Dimensions.get('window')

interface ProfileValues {
    coverPhoto: string;
    profilePicture: string;
    name: string;
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
    coverPhoto: '',
    profilePicture: '',
    name: 'Oluwasegun Badmus',
    username: 'official_segunowo',
    intro: 'Creative Design | UI/UX Design | Brand Identity...',
    dateOfBirth: '16/05/1987',
    website: 'https://shegunowo.xyz/portfolio/minion-commodor',
};

const EditProfileScreen: React.FC = () => {
    const navigation = useNavigation<StackNavigationProp<StackParamsList>>();
    const [isStudent, setIsStudent] = React.useState(false);
    const [imageUrl, setImageUrl] = useState('')
    const [school, setSchool] = useState<string | number>('');
    const [faculty, setFaculty] = useState<string | number>('');
    const [department, setDepartment] = useState<string | number>('');

    const { schoolOptions, isLoadingInstitutions } = useSchoolOptions();
    const { facultyOptions, isLoadingFaculties } = useFacultyOptions();
    const { departmentOptions, isLoadingFaculties: isLoadingDepartments } = useDepartmentOptions(values.faculty);


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
                                placeholders={{
                                    withImage: {
                                        title: 'Change Cover',
                                        icon: <SvgIcon name="cameraEdit" size="sml" />,
                                    },
                                    default: {
                                        title: 'Add Photo',
                                        icon: <SvgIcon name="galleryAddPurple" size="sml" />,
                                    }
                                }}
                                recommendedText="Add a 16:9 cover photo. 1920x1080 recommended."
                                setImageUrl={setImageUrl}
                            />
                        </Box>

                        {/* Form Fields using CustomInput */}
                        <Box paddingHorizontal="sm">
                            <CustomInput
                                label="Name"
                                value={values.name}
                                onChangeText={handleChange('name')}
                                onBlur={handleBlur('name')}
                                error={touched.name && errors.name}
                                placeholder="Enter your name"
                                iconSize="sm"
                            />
                            <Text style={{ color: '#616379', fontWeight: '400', fontSize: RFValue(11, height), marginTop: -10, marginLeft: 10 }}>Once name is changed, you won't be able to change it again for 90 days.</Text>

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
                            <Text style={{ color: '#616379', fontWeight: '400', fontSize: RFValue(11, height), marginTop: -10, marginLeft: 10 }}>Only month and day is visible to your followers</Text>

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
                                <Text style={styles.iAmAStudent}>I am a student</Text>
                                {/* <Switch
                                    value={isStudent}
                                    onValueChange={setIsStudent}
                                    thumbColor={isStudent ? 'purple' : 'grey'}
                                /> */}

                                <CustomSwitch // Use the custom switch here
                                    value={isStudent}
                                    onValueChange={setIsStudent}
                                />
                            </Box>

                            {/* Non-editable Fields */}
                            {
                                isStudent && (
                                    <SelectInput
                                        label="School"
                                        getSelectedValue={setSchool}
                                        list={schoolOptions}
                                        placeholder="Select School"
                                        selectedValue={school}
                                        modulePalette="primary"
                                        iconName="chevron_downward"
                                        iconSize="sml"
                                        searchable
                                        showHeader
                                        useSelectedValue
                                        isLoading={isLoadingInstitutions}
                                    />
                                )
                            }


                            {school && (
                                <SelectInput
                                    label="Faculty"
                                    getSelectedValue={setFaculty}
                                    list={facultyOptions}
                                    placeholder="Select Faculty"
                                    selectedValue={faculty}
                                    modulePalette="primary"
                                    iconName="chevron_downward"
                                    iconSize="sml"
                                    searchable
                                    showHeader
                                    isLoading={isLoadingFaculties}
                                />
                            )}

                            {faculty && (
                                <SelectInput
                                    label="Department"
                                    getSelectedValue={setDepartment}
                                    list={departmentOptions}
                                    placeholder="Select Department"
                                    selectedValue={department}
                                    modulePalette="primary"
                                    iconName="chevron_downward"
                                    iconSize="sml"
                                    searchable
                                    showHeader
                                />
                            )}
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
    profileImageContainer: {
        position: 'absolute',
        top: 100,
        left: width / 2 - 40, // Center profile image horizontally
        alignItems: 'center',
    },
    profileImage: {
        width: 80,
        height: 80,
        borderRadius: 40,
        borderWidth: 2,
        borderColor: 'white',
    },
    changeProfileIcon: {
        position: 'absolute',
        bottom: 0,
        right: 0,
        backgroundColor: 'white',
        borderRadius: 15,
        padding: 5,
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
    iAmAStudent: {
        fontSize: RFValue(16, height),
        fontWeight: '400',
        color: '#151619'
    }
})