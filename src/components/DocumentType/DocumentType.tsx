
import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import RadioButtonCheckedIcon from '@/assets/svg/radioChecked.svg'; 
import RadioButtonUncheckedIcon from '@/assets/svg/radioUnchecked.svg'; 
import { CustomButton } from '@/components/CustomButton';
import RadioIcon from '@/assets/svg/radio.svg'; 



interface VerificationItemProps {
  icon: React.ReactNode;
  title: string;
}

const VerificationItem: React.FC<VerificationItemProps> = ({ icon, title }) => {
  const [checked, setChecked] = useState(false);

  return (

    
    <View style={styles.item}>
      <View style={styles.iconContainer}>{icon}</View>
      <View style={styles.textContainer}>
        <Text style={styles.itemTitle}>{title}</Text>
      </View>
      <TouchableOpacity onPress={() => setChecked(!checked)}>
        {checked ? (
          <RadioButtonCheckedIcon width={25} height={25} />
        ) : (
          <RadioButtonUncheckedIcon width={25} height={25} />
        )}
      </TouchableOpacity>
    </View>
  );
};

const DocumentType = () => {
  return (
    <View style={styles.container}>
      <View style={{ marginTop: 100 }}> 
      <Text style={styles.title}>Document type</Text>
      <Text style={styles.subtitle}>Please choose the ID document you have on hand.</Text>
      </View>

<View style={[styles.formContainer, { marginTop: 50 }]}>
  <VerificationItem
    icon={<RadioIcon width={45} height={45} marginTop={30} />}
    title="Verification badge"
  />
  <VerificationItem
    icon={<RadioIcon width={45} height={45} marginTop={30} />}
    title="Increased exposure"
  />
  <VerificationItem
    icon={<RadioIcon width={45} height={45} marginTop={30} />}
    title="Better support experience"
  />
  <VerificationItem
    icon={<RadioIcon width={45} height={45} marginTop={30} />}
    title="Better support experience"
  />
</View>


      <View style={styles.buttonContainer}>
        <CustomButton
          label={'Procced to Verification'}
          labelProps={{ color: 'whiteColor' }}
          borderRadius="sm"
        />
       
       <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text style={{ marginTop: 20, textAlign: 'center' }}>
          By tapping "Continue", you allow our partners to analyze your identity document and photos for identity verification and agree to the{' '}
          <Text style={{ fontWeight: 'bold' }}>
            Data Privacy and Retention Policies
          </Text>.
        </Text>
      </View>



      </View>

      <View>
       
      </View>

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
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
    marginBottom: 20,
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
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    width: '100%',
    padding: 20,
    backgroundColor: '#fff', // Optional background to separate from other content
  },
  formContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
});

export default DocumentType;
