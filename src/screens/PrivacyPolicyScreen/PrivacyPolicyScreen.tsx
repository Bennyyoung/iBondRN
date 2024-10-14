import React from 'react';
import { Dimensions, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import Box from '@/components/Box';
import Text from '@/components/Text';
import { RFValue } from 'react-native-responsive-fontsize';
import TitleBar from '@/components/TitleBar/TitleBar';

const { height } = Dimensions.get('window')

const PrivacyPolicy = () => {
    return (
        <ScrollView contentContainerStyle={styles.container}>
            <TitleBar>
                <Box style={styles.maintitle}>
                    <Text style={styles.privacyPolicy}>
                        Privacy Policy
                    </Text>
                </Box>
                <TouchableOpacity onPress={() => { }}>
                    <Text>
                        
                    </Text>
                </TouchableOpacity>
            </TitleBar>
            <Box style={styles.box}>
                <Text style={styles.title}>Privacy Policy</Text>
                <Text style={styles.lastUpdated}>Last updated: May 2024</Text>

                {/* Section 1: Introduction */}
                <Text style={styles.sectionTitle}>1. Introduction</Text>
                <Text style={styles.paragraph}>
                    Welcome to iBond! This Privacy Policy describes how we collect, use, and protect your personal
                    information when you use our social media platform. By using iBond, you consent to the practices
                    described in this policy.
                </Text>

                {/* Section 2: Information We Collect */}
                <Text style={styles.sectionTitle}>2. Information We Collect</Text>
                <Text style={styles.paragraph}>
                    We collect various types of information in connection with your use of iBond, including:
                </Text>
                {renderBulletPoints([
                    'Personal Information: Information that identifies you as an individual, such as your name, email address, phone number, and profile picture.',
                    'Account Information: Information related to your account, including your username, password, institution, and profile details.',
                    'Usage Information: Information about how you use iBond, such as the features you use, interactions with other users, and content you post.',
                    'Device Information: Information about the device you use to access iBond, including your IP address, device type, operating system, and browser type.',
                    'Location Information: Information about your location if you have enabled location services on your device.',
                    'Cookies and Tracking Technologies: Information collected through cookies and similar tracking technologies to enhance your user experience.',
                ])}

                {/* Section 3: How We Use Your Information */}
                <Text style={styles.sectionTitle}>3. How We Use Your Information</Text>
                {renderBulletPoints([
                    'To Provide and Improve Our Services: To operate and maintain iBond, personalize your experience, and improve our platform.',
                    'To Communicate with You: To send you updates, notifications, and other information related to your use of iBond.',
                    'To Analyze Usage: To analyze how users interact with iBond and to monitor and improve our services.',
                    'To Ensure Security: To protect the security and integrity of iBond and its users.',
                    'To Comply with Legal Obligations: To comply with applicable laws, regulations, and legal processes.',
                ])}

                {/* Section 4: How We Share Your Information */}
                <Text style={styles.sectionTitle}>4. How We Share Your Information</Text>
                {renderBulletPoints([
                    'With Your Consent: When you have given us your consent to share your information.',
                    'Service Providers: With third-party service providers who perform services on our behalf, such as hosting, data analysis, and customer support.',
                    'Legal Requirements: When required by law or in response to legal processes, such as a court order or subpoena.',
                    'Business Transfers: In connection with a merger, acquisition, or sale of all or a portion of our assets.',
                ])}

                {/* Section 5: Your Choices */}
                <Text style={styles.sectionTitle}>5. Your Choices</Text>
                {renderBulletPoints([
                    'Account Settings: You can update your account information and preferences through your account settings.',
                    'Privacy Settings: You can adjust your privacy settings to control who can see your content and profile information.',
                    'Opt-Out: You can opt out of receiving promotional communications from us by following the instructions in those communications.',
                    'Cookies: You can manage your cookie preferences through your browser settings.',
                ])}

                {/* Section 6: Data Security */}
                <Text style={styles.sectionTitle}>6. Data Security</Text>
                <Text style={styles.paragraph}>
                    We implement reasonable security measures to protect your information from unauthorized access,
                    disclosure, alteration, and destruction. However, no security system is impenetrable, and we cannot
                    guarantee the security of your data.
                </Text>

                {/* Section 7: Data Retention */}
                <Text style={styles.sectionTitle}>7. Data Retention</Text>
                <Text style={styles.paragraph}>
                    We retain your information for as long as necessary to fulfill the purposes for which it was
                    collected and to comply with legal obligations. If you deactivate your account, we will delete your
                    information, except as required by law or for legitimate business purposes.
                </Text>

                {/* Section 8: Children's Privacy */}
                <Text style={styles.sectionTitle}>8. Children’s Privacy</Text>
                <Text style={styles.paragraph}>
                    iBond is not intended for children under the age of 13. We do not knowingly collect personal
                    information from children under 13. If we become aware that we have collected personal information
                    from a child under 13, we will take steps to delete such information.
                </Text>

                {/* Section 9: International Data Transfers */}
                <Text style={styles.sectionTitle}>9. International Data Transfers</Text>
                <Text style={styles.paragraph}>
                    Your information may be transferred to and processed in countries other than your country of
                    residence. By using iBond, you consent to the transfer of your information to countries outside of
                    your country of residence, including Nigeria.
                </Text>

                {/* Section 10: Changes to This Privacy Policy */}
                <Text style={styles.sectionTitle}>10. Changes to This Privacy Policy</Text>
                <Text style={styles.paragraph}>
                    We may update this Privacy Policy from time to time. We will notify you of any changes by posting the
                    new policy on our platform. Your continued use of iBond after the changes take effect constitutes your
                    acceptance of the new policy.
                </Text>

                {/* Section 11: Contact Us */}
                <Text style={styles.sectionTitle}>11. Contact Us</Text>
                <Text style={styles.paragraph}>
                    If you have any questions about this Privacy Policy, please contact us at privacy@ibond.com.
                </Text>
            </Box>
        </ScrollView>
    );
};

const renderBulletPoints = (points: string[]) =>
    points.map((point, index) => (
        <Text key={index} style={styles.bulletPoint}>
            • {point}
        </Text>
    ));

const styles = StyleSheet.create({
    privacyPolicy: {
        fontWeight: '600',
        fontSize: RFValue(17, height),
    },
    maintitle: {
        paddingRight: RFValue(16),
        paddingLeft: RFValue(0),
        justifyContent: 'space-between',
        flexDirection: 'row',
        alignItems: 'center',
        gap: 16
    },
    container: {
        paddingHorizontal: 20,
        backgroundColor: '#fff'
    },
    box: {
        marginBottom: 20,
    },
    title: {
        fontSize: RFValue(24, height),
        fontWeight: '600',
        marginTop: 30,
        marginBottom: 10,
        color: '#151619',
    },
    lastUpdated: {
        fontSize: RFValue(16, height),
        marginBottom: 20,
        fontWeight: '400'
    },
    sectionTitle: {
        fontSize: RFValue(13, height),
        fontWeight: 'bold',
        marginBottom: 8,
    },
    paragraph: {
        fontSize: RFValue(16, height),
        marginBottom: 15,
        lineHeight: 24,
    },
    bulletPoint: {
        fontSize: RFValue(16, height),
        marginBottom: 8,
        lineHeight: 24,
    },
});

export default PrivacyPolicy;
