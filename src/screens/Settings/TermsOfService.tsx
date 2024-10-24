import React from 'react';
import { Dimensions, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import Box from '@/components/Box';
import Text from '@/components/Text';
import Section from '@/components/Section/Section';

import { RFValue } from 'react-native-responsive-fontsize';
import TitleBar from '@/components/TitleBar/TitleBar';
import Heading from '@/components/Heading/Heading';
import Paragraph from '@/components/Paragraph/Paragraph';

const { height } = Dimensions.get('window')

const TermsOfService = () => {
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
      <Box style={styles.box}>
        <Heading>Terms of Service</Heading>
        <Paragraph>Last updated: May 2024</Paragraph>
        <Box marginBottom={'sml'} />


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
          <Text style={styles.bold}>- User Conduct:</Text> You agree not to use iBond for any illegal or unauthorized purpose. You must not, in the use of iBond, violate any laws in your jurisdiction.
          {'\n'}{'\n'}
          <Text style={styles.bold}>- Content Sharing:</Text> You are responsible for the content you post on iBond. You retain ownership of your content, but you grant iBond a non-exclusive, royalty-free, transferable, sub-licensable, worldwide license to use, display, reproduce, and distribute your content on the platform.
          {'\n'}{'\n'}
          <Text style={styles.bold}>- Prohibited Activities:</Text> You agree not to engage in any activity that disrupts or interferes with the proper functioning of iBond, including but not limited to hacking, spamming, or distributing malware.
        </Section>

        <Section heading="5. Privacy">
          Our Privacy Policy explains how we collect, use, and protect your personal information. By using iBond,
          you agree to the collection and use of information in accordance with our Privacy Policy.
        </Section>

        <Section heading="6. Intellectual Property">
          <Text style={{
            fontSize: RFValue(13, height),
          }}>
            - iBond’s Content: All content provided by iBond, including but not limited to text, graphics, logos, images, and software, is the property of iBond or its licensors and is protected by intellectual property laws.
          </Text>
          {'\n'}{'\n'}
          <Text style={{
            fontSize: RFValue(13, height),
          }}>
            - User Content: You retain ownership of the content you post on iBond. However, by posting content on iBond, you grant us a license to use, display, and distribute your content as described in Section 4.
          </Text>
        </Section>

        <Section heading="7. Payments and Subscriptions">
          Certain features of iBond may require payment or subscription. By subscribing to these features, you agree to pay the applicable fees. All fees are non-refundable.
        </Section>

        <Section heading="8. Termination">
          iBond reserves the right to suspend or terminate your account at any time, for any reason, including but not limited to violation of these Terms of Service. Upon termination, you must cease all use of iBond and delete any copies of our software from your devices.
        </Section>

        <Section heading="9. Limitation of Liability">
          iBond is provided "as is" and "as available" without any warranties of any kind. We do not guarantee that iBond will be uninterrupted or error-free. To the fullest extent permitted by law, iBond disclaims all warranties, express or implied, including but not limited to implied warranties of merchantability and fitness for a particular purpose.
        </Section>

        <Section heading="10. Indemnification">
          You agree to indemnify, defend, and hold harmless iBond, its affiliates, and their respective officers, directors, employees, and agents from and against any claims, liabilities, damages, losses, and expenses, including reasonable attorney's fees, arising out of or in any way connected with your access to or use of iBond.
        </Section>

        <Section heading="11. Changes to the Terms">
          iBond reserves the right to modify these Terms of Service at any time. We will notify you of any changes by posting the new terms on our platform. Your continued use of iBond after the changes take effect constitutes your acceptance of the new terms.
        </Section>

        <Section heading="12. Governing Law">
          These Terms of Service are governed by and construed in accordance with the laws of Nigeria, without regard to its conflict of law principles.
        </Section>

        <Section heading="13. Dispute Resolution">
          Any disputes arising out of or in connection with these Terms of Service shall be resolved through arbitration in accordance with the rules of the Nigerian Arbitration Association. The place of arbitration shall be Lagos, Nigeria.
        </Section>

        <Section heading="14. Contact Information">
          If you have any questions about these Terms of Service, please contact us at support@ibond.com.
        </Section>
      </Box>
    </ScrollView>
  );
};

export default TermsOfService;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  box: {
    marginBottom: 20,
    paddingHorizontal: 20,
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
    color: '#3D3F4B',
    marginBottom: 8,
    fontSize: RFValue(13, height),
  },
});