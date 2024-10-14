import React from 'react';
import { Dimensions, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import Box from '@/components/Box';
import Text from '@/components/Text';
import Section from '@/components/Section/Section';

import { RFValue } from 'react-native-responsive-fontsize';
import TitleBar from '@/components/TitleBar/TitleBar';

const { height } = Dimensions.get('window')

const TermsOfServiceScreen = () => {
  return (
    <ScrollView style={styles.container}>
      <TitleBar>
        <Box style={styles.mainTitleContainer}>
          <Text style={styles.termsOfService}>
            Terms of Service
          </Text>
        </Box>
        <TouchableOpacity onPress={() => { }}>
          <Text>
            {''}
          </Text>
        </TouchableOpacity>
      </TitleBar>
      <Box>
        <Text style={styles.title}>Terms of Service</Text>
        <Text style={styles.date}>Last updated: May 2024</Text>

        <Section heading="1. Introduction">
          Welcome to iBond! These Terms of Service govern your use of our social media platform.
          By accessing or using iBond, you agree to these terms. If you do not agree, please do not use our platform.
        </Section>

        <Section heading="2. Eligibility">
          You must be at least 18 years old or have the consent of a parent or guardian to use iBond.
          By using iBond, you represent and warrant that you meet these requirements.
        </Section>

        <Section heading="3. Account Registration">
          To use certain features of iBond, you may need to register for an account.
          You agree to provide accurate, complete, and updated information during the registration process.
          You are responsible for maintaining the confidentiality of your account and password.
        </Section>

        <Section heading="4. Use of the Platform">
          <Text style={styles.bold}>- User Conduct:</Text> You agree not to use iBond for any illegal or unauthorized purpose.
          {'\n'}{'\n'}
          <Text style={styles.bold}>- Content Sharing:</Text> You retain ownership of your content, but grant iBond a license to use, display, and distribute it.
          {'\n'}{'\n'}
          <Text style={styles.bold}>- Prohibited Activities:</Text> You agree not to engage in activities like hacking or spamming that disrupt the platform's operations.
        </Section>

        <Section heading="5. Privacy">
          Our Privacy Policy explains how we collect, use, and protect your personal information. By using iBond,
          you agree to the collection and use of information in accordance with our Privacy Policy.
        </Section>

        <Section heading="6. Intellectual Property">
          iBond’s content is protected by intellectual property laws. You retain ownership of the content you post but
          grant us a license to use and distribute it as outlined in Section 4.
        </Section>

        <Section heading="7. Payments and Subscriptions">
          Certain features may require a subscription. All fees are non-refundable.
        </Section>

        <Section heading="8. Termination">
          We may suspend or terminate your account at any time, for any reason, including violation of these terms.
        </Section>

        <Section heading="9. Limitation of Liability">
          iBond is provided "as is" without any warranties. We are not liable for any issues arising from your use of the platform.
        </Section>

        <Section heading="10. Indemnification">
          You agree to indemnify iBond and its affiliates from claims and damages related to your use of the platform.
        </Section>

        <Section heading="11. Changes to the Terms">
          We may modify these terms at any time. Your continued use of the platform constitutes your acceptance of the new terms.
        </Section>

        <Section heading="12. Governing Law">
          These terms are governed by the laws of Nigeria, without regard to its conflict of law principles.
        </Section>

        <Section heading="13. Dispute Resolution">
          Disputes will be resolved through arbitration in accordance with the rules of the Nigerian Arbitration Association in Lagos, Nigeria.
        </Section>

        <Section heading="14. Contact Information">
          For any questions, contact us at support@ibond.com.
        </Section>
      </Box>
    </ScrollView>
  );
};

export default TermsOfServiceScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 20
  },
  mainTitleContainer: {
    paddingRight: RFValue(16),
    paddingLeft: RFValue(0),
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16
  },
  termsOfService: {
    fontWeight: '600',
    fontSize: RFValue(17, height),
  },
  title: {
    fontSize: RFValue(24, height),
    fontWeight: 'bold',
    color: '#3D3F4B',
    marginBottom: 8,
    marginTop: 60
  },
  date: {
    fontSize: RFValue(14, height),
    color: '#3D3F4B',
    marginBottom: 20,
  },
  section: {
    marginBottom: 24,
  },
  heading: {
    fontSize: RFValue(18, height),
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 8,
  },
  text: {
    fontSize: RFValue(16, height),
    color: '#ddd',
    lineHeight: 22,
  },
  bold: {
    fontWeight: 'bold',
    fontSize: RFValue(16, height),
  },
});