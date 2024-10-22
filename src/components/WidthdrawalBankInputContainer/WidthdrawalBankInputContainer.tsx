import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Formik } from 'formik';
import * as Yup from 'yup';
import CustomInput from '../CustomInput';
import SelectInput from '../SelectInput';
import useGetAllBanks from '@/utils/hooks/Banks/useGetAllBanks';

// Assuming you have a list of banks for the SelectInput
const bankList = [
  { id: '1', value: 'Bank A' },
  { id: '2', value: 'Bank B' },
  // Add more banks as needed
];

const validationSchema = Yup.object().shape({
  bankName: Yup.string().required('Bank Name is required'),
  accountNumber: Yup.string().required('Account Number is required'),
  iBondPassword: Yup.string().required('iBond Password is required'),
});

const WidthdrawalBankInputContainer = () => {
  const { data: banks, isLoading, isError } = useGetAllBanks()

  console.log('banks', JSON.stringify(banks, null, 2));


  const handleSubmit = (values) => {
    console.log(values);
    // Handle form submission
  };

  return (
    <Formik
      initialValues={{ bankName: '', accountNumber: '', iBondPassword: '' }}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ handleChange, handleBlur, values, errors, touched, setFieldValue }) => (
        <View style={styles.container}>
          <SelectInput
            label="Bank Name"
            selectedValue={values.bankName}
            placeholder="Select Bank"
            list={bankList}
            getSelectedValue={(value) => setFieldValue('bankName', value)}
            errorMessage={touched.bankName && errors.bankName}
            showHeader={true}
            iconName="chevron_downward"
            iconSize="sml"
          // iconNameStart
          />
          <CustomInput
            label="Account Number"
            value={values.accountNumber}
            onChangeText={handleChange('accountNumber')}
            onBlur={handleBlur('accountNumber')}
            error={touched.accountNumber && errors.accountNumber}
            keyboardType="numeric"
          />
          <CustomInput
            label="iBond Password"
            value={values.iBondPassword}
            onChangeText={handleChange('iBondPassword')}
            onBlur={handleBlur('iBondPassword')}
            error={touched.iBondPassword && errors.iBondPassword}
            secureTextEntry={true}
          // iconName="key" // Assuming you have a key icon
          // iconSize="sml"
          />
        </View>
      )}
    </Formik>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
});

export default WidthdrawalBankInputContainer;