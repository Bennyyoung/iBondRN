import React from 'react';
import { StyleSheet } from 'react-native';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { RFValue } from 'react-native-responsive-fontsize';
import CustomInput from '../CustomInput';
import Box from '../Box';
import { FormikHelpers } from 'formik';
import { CustomButton } from '../CustomButton';
import Paragraph from '../Paragraph/Paragraph';

const validationSchema = Yup.object().shape({
    cardName: Yup.string().required('Name on card is required'),
    cardNumber: Yup.string()
        .matches(/^\d{16}$/, 'Card number must be 16 digits')
        .required('Card number is required'),
    expirationDate: Yup.string()
        .matches(/^(0[1-9]|1[0-2])\/\d{2}$/, 'Expiration date must be in MM/YY format')
        .required('Expiration date is required'),
    cvv: Yup.string()
        .matches(/^\d{3,4}$/, 'CVV must be 3 or 4 digits')
        .required('CVV is required'),
    cardPin: Yup.string()
        .matches(/^\d{4}$/, 'PIN must be 4 digits')
        .required('Card PIN is required'),
});

interface FormValues {
    cardName: string;
    cardNumber: string;
    expirationDate: string;
    cvv: string;
    cardPin: string;
}

const CreditCardInputContainer = () => {
    const initialValues = {
        cardName: '',
        cardNumber: '',
        expirationDate: '',
        cvv: '',
        cardPin: '',
    };

    const handleSubmit = (values: FormValues,
        { setSubmitting }: FormikHelpers<FormValues>
    ) => {
        // Handle form submission here
        console.log(values);
        setSubmitting(false);
    };

    return (
        <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
        >
            {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
                <Box style={styles.container}>
                    <CustomInput
                        label="Name on card"
                        value={values.cardName}
                        onChangeText={handleChange('cardName')}
                        onBlur={handleBlur('cardName')}
                        error={touched.cardName && errors.cardName}
                        // placeholder="Enter cardholder name"
                        containerProps={styles.inputWrapper}
                    />
                    <CustomInput
                        label="Card Number"
                        value={values.cardNumber}
                        onChangeText={handleChange('cardNumber')}
                        onBlur={handleBlur('cardNumber')}
                        error={touched.cardNumber && errors.cardNumber}
                        keyboardType="numeric"
                        // placeholder="Enter card number"
                        containerProps={styles.inputWrapper}
                    />
                    <Box flexDirection="row" justifyContent="space-between">
                        <CustomInput
                            label="Expiration date"
                            value={values.expirationDate}
                            onChangeText={handleChange('expirationDate')}
                            onBlur={handleBlur('expirationDate')}
                            error={touched.expirationDate && errors.expirationDate}
                            // placeholder="MM/YY"
                            keyboardType="numeric"
                            containerProps={[styles.inputWrapper, styles.halfWidth]}
                            iconName="calendar"
                            iconSize="sm"
                        />
                        <CustomInput
                            label="CVV"
                            value={values.cvv}
                            onChangeText={handleChange('cvv')}
                            onBlur={handleBlur('cvv')}
                            error={touched.cvv && errors.cvv}
                            // placeholder="Enter CVV"
                            keyboardType="numeric"
                            containerProps={[styles.inputWrapper, styles.halfWidth]}
                        />
                    </Box>
                    <CustomInput
                        label="Card Pin"
                        value={values.cardPin}
                        onChangeText={handleChange('cardPin')}
                        onBlur={handleBlur('cardPin')}
                        error={touched.cardPin && errors.cardPin}
                        // placeholder="Enter card PIN"
                        secureTextEntry
                        keyboardType="numeric"
                        containerProps={styles.inputWrapper}
                    />

                    <CustomButton
                        alignItems="center"
                        backgroundColor="primary"
                        borderRadius="sm"
                        justifyContent="center"
                        label="Save Card"
                        labelProps={{ color: 'whiteColor' }}
                        labelVariant="regular12"
                    // onPress={handleConfirm}
                    />

                    <Paragraph>
                        By tapping "Save card", you consent for your card to be securely stored and used for in-app purchase.
                    </Paragraph>
                </Box>
            )}
        </Formik>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: RFValue(16),
    },
    inputWrapper: {
        marginBottom: RFValue(16),
    },
    halfWidth: {
        width: '48%',
    },
});

export default CreditCardInputContainer;