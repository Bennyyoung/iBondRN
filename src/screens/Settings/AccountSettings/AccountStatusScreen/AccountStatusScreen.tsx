import React from 'react';
import { View, StyleSheet, Image, Dimensions } from 'react-native';
import { useAppSelector } from "@/reduxFolder/index";
import Box from '@/components/Box';
import Text from '@/components/Text';
import { SvgIcon } from '@/assets/icons';
import { RFValue } from 'react-native-responsive-fontsize';
import TitleBar from '@/components/TitleBar/TitleBar';
import Paragraph from '@/components/Paragraph/Paragraph';
import { TouchableOpacity } from 'react-native-gesture-handler';

const { height } = Dimensions.get('window')

const AccountStatusScreen = () => {
  const userData = useAppSelector(state => state.user.userData);
  console.log('userData', JSON.stringify(userData, null, 2));


  const fullName = `${userData?.firstName} ${userData?.lastName}`;

  return (
    <Box flex={1} backgroundColor="white">

      <TitleBar>
        <Text style={styles.title}>Account Status</Text>
        <SvgIcon name="infoCircle" size="sml" />
      </TitleBar>

      <Box alignItems="center" marginVertical="lg">
        <View style={styles.avatar}>
          {userData?.profilePicture ? (
            <Image source={{ uri: userData?.profilePicture }} style={styles.avatarImage} />
          ) : (
            <SvgIcon name="avatar" size="sml" />
          )}
        </View>
        <Text marginTop="md" style={styles.fullName}>{fullName}</Text>
        <Box flexDirection="row" alignItems="center" marginTop="sml">
          <Box style={{ flexDirection: 'row' }}>
            <Text style={styles.status}>
              Status: {' '}
            </Text>
            <Text style={styles.good}>
              Good
            </Text>
          </Box>
          <SvgIcon name="tickCircle" size="sml" style={styles.tickCircle} />
        </Box>
      </Box>

      <Box style={{ alignItems: 'center' }}>
        <Text style={{ fontSize: RFValue(13, height), fontWeight: '400', textAlign: 'center' }}>
          Thank you for adhering to our
          <Text style={styles.accountPolicyCommunityGuidelines}>{' '}Account Policy{' '}</Text>
          and
          <Text style={styles.accountPolicyCommunityGuidelines}>{' '}Community Guidelines{' '}</Text>
          and helping us keep iBond safe for all.
        </Text>
      </Box>

      <Box marginTop="lg">
        <Text marginLeft="lg" style={styles.violationHeadings}>Violation Summary</Text>
        <Box style={{
          borderBottomWidth: 0.2,
          borderColor: '#c6c6c8'
        }} />

        <TouchableOpacity style={styles.violationSummaryRow}>
          <Box flexDirection="row" alignItems="center">
            <SvgIcon name="dangerRed" size="sml" style={{ marginRight: 10 }} />
            <Paragraph marginTop={0}>Serious Violations</Paragraph>
          </Box>
          <Box flexDirection="row" alignItems="center">
            <Text variant="body">{userData?.profileStatusDetails?.violations?.filter(v => v.level === 'SERIOUS')?.length}</Text>
            <SvgIcon name="rightArrow" size="sml" />
          </Box>
        </TouchableOpacity>
        <TouchableOpacity style={styles.violationSummaryRow}>
          <Box flexDirection="row" alignItems="center">
            <SvgIcon name="dangerOrange" size="sml" style={{ marginRight: 10 }} />
            <Paragraph marginTop={0}>Minor Violations</Paragraph>

          </Box>
          <Box flexDirection="row" alignItems="center">
            <Text variant="body">{userData?.profileStatusDetails?.violations?.filter(v => v.level === 'MINOR')?.length}</Text>
            <SvgIcon name="rightArrow" size="sml" />
          </Box>
        </TouchableOpacity>
      </Box>

      <Box marginTop="lg">
        <Text marginLeft="lg" style={styles.violationHeadings}>Violation Details</Text>
        {userData?.profileStatusDetails?.violations?.length ? (
          userData?.profileStatusDetails?.violations?.slice(0, 3).map((violation, index) => (
            <Box key={index} flexDirection="row" justifyContent="space-between" alignItems="center" paddingHorizontal="lg" paddingVertical="md">
              <Box>
                <Text variant="body">{new Date(violation.createdAt).toISOString().split('T')[0]}</Text>
                <Text
                  style={{
                    color: violation.level === 'SERIOUS' ? 'red' : 'orange'
                  }}
                >{violation.level}</Text>
              </Box>
              <Text variant="body" color="purple">View</Text>
            </Box>
          ))
        ) : (
          <Box flexDirection="row" justifyContent="center" alignItems="center" paddingVertical="lg">
            <Text variant="body" color="grey">No violation details</Text>
          </Box>
        )
        }
      </Box>
    </Box>
  );
};

const styles = StyleSheet.create({
  fullName: {
    fontWeight: '600',
    fontSize: RFValue(20, height)
  },
  container: {
    backgroundColor: '#fff',
    paddingHorizontal: 30,
    flex: 1
  },
  title: {
    fontSize: RFValue(17, height),
    fontWeight: '600',
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#FDE8D7',
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  avatarImage: {
    width: '100%',
    height: '100%',
  },
  tickCircle: {
    marginLeft: 10,
  },
  status: {
    fontWeight: '400',
    fontSize: RFValue(16, height),
    color: '#151619'
  },
  good: {
    color: '#34C759',
    fontWeight: '600',
    fontSize: RFValue(16, height)
  },
  accountPolicyCommunityGuidelines: {
    fontWeight: '600',
    fontSize: RFValue(13, height)
  },
  violationHeadings: {
    color: '#151619',
    fontWeight: '600',
    fontSize: RFValue(17, height),
    paddingVertical: 20,

  },
  violationSummaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 20,
    marginBottom: 10,
    borderBottomWidth: 0.3,
    borderColor: '#c6c6c8'
  }
});

export default AccountStatusScreen;