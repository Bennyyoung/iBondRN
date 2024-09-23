import { BaseButton } from '@/components/BaseButton';
import Box from '@/components/Box';
import { CustomButton } from '@/components/CustomButton';
import { EventDetails, EventDetailsProps, RouteParams } from '@/navigation/types';
import { RouteProp } from '@react-navigation/core';
import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, ScrollView, Dimensions, Platform } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import Details from '../Details/Details';
import Comments from '../Comments/Comments';
import Attendees from '../Attendees/Attendees';
import TopEventsForYou from '@/components/TopEventsForYou/TopEventsForYou';
import MoreLikeThis from '@/components/MoreLikeThis/MoreLikeThis';
import Verified from "@/assets/svg/verify.svg"

const { height } = Dimensions.get('window')

type Tabs = 'Details' | 'Comments' | 'Attendees'

const EventDetailScreen: React.FC<EventDetailsProps> = ({ route }) => {
  const { event } = route.params as EventDetails

  const [activeTab, setActiveTab] = useState<Tabs>('Details')
  const [isAttending, setIsAttending] = useState(false)

  const toggleAttending = () => {
    setIsAttending(!isAttending)
  }

  const renderContent = (activeTab: Tabs) => {
    switch (activeTab) {
      case 'Details':
        return <Details event={event} />
      case 'Comments':
        return <Comments />
      case 'Attendees':
        return <Attendees />
      default:
        break;
    }
  }
  console.log('event', event);

  return (
    <ScrollView style={styles.container}>
      {/* Event Image */}
      <View style={styles.imageContainer}>
        {event.eventImage}
      </View>


      {/* Event Title */}
      <Text style={styles.eventTitle}>
        {event.eventTitle}
      </Text>

      {/* Event Date and Time */}
      <View style={styles.infoRow}>
        <Text style={styles.icon}>{event.statusIcon}</Text>
        <Text style={styles.infoText}>{event.eventStatus}</Text>
        {
          (event.eventTime && event.eventTimeIcon) && (
            <>
              <Text style={styles.dot}>•</Text>
              {event.eventTimeIcon}
              <Text style={[styles.status, { color: event.statusColor }]}>
                {event.eventTime}
              </Text>
            </>
          )
        }
      </View>

      {/* Event Type */}
      <View style={styles.infoRow}>
        <Text style={styles.icon}>{event.platformIcon}</Text>
        <Text style={styles.infoText}>{event.eventType}</Text>
      </View>

      {/* Action Buttons */}
      <View style={styles.actionButtons}>
        {/* <TouchableOpacity style={styles.attendButton}>
          <Text style={styles.attendText}>Attend</Text>
        </TouchableOpacity> */}
        <Box width={'45%'}>
          <CustomButton
            label={`${isAttending ? 'Cancel response' : 'Attend'}`}
            onPress={() => toggleAttending()}
            backgroundColor={`${isAttending ? 'white' : 'primary'}`}
            labelProps={{ color: `${isAttending ? 'primary' : 'white'}`, fontSize: RFValue(13, height), fontWeight: '400' }}
            borderRadius="smm"
          />
        </Box>
        <Box width={'45%'}>
          <CustomButton
            label="Share"
            onPress={() => { }}
            labelProps={{ color: 'black', fontSize: RFValue(13, height), fontWeight: '400' }}
            borderRadius="smm"
            style={{
              backgroundColor: '#FFFFFF',
              borderRadius: 8,
              borderColor: '#E9EAED',
              borderWidth: 0.5,
              alignContent: 'center',
              justifyContent: 'center',
            }}
          // isLoading={isSubmitting}
          // disabled={!values.emailOrPhone}
          />
        </Box>
      </View>

      {/* Tabs */}
      <View style={styles.tabs}>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'Details' && styles.activeTab]}
          onPress={() => setActiveTab('Details')}
        >
          <Text style={[styles.tabText, activeTab === 'Details' && styles.activeTabText]}>Details</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'Comments' && styles.activeTab]}
          onPress={() => setActiveTab('Comments')}
        >
          <Text style={[styles.tabText, activeTab === 'Comments' && styles.activeTabText]}>Comments</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'Attendees' && styles.activeTab]}
          onPress={() => setActiveTab('Attendees')}
        >
          <Text style={[styles.tabText, activeTab === 'Attendees' && styles.activeTabText]}>Attendees</Text>
        </TouchableOpacity>
      </View>

      <Box>
        {renderContent(activeTab)}
      </Box>

      {/* Organizer */}
      <View style={styles.detailsSection}>
        <Text style={styles.sectionTitle}>Organizer</Text>
        <View style={styles.organizerRow}>
          {event.organizer.organizerPicture}
          <View>
            <View style={styles.organizerNameContainer}>
              <Text style={styles.organizerName}>{event.organizer.organizerName}</Text>
              {event.organizer.isVerified && <Verified />}
            </View>
            <Text style={styles.organizerUniversity}>{event.organizer.organizerUniversity}</Text>
          </View>
          <TouchableOpacity>
            <Text style={styles.followText}>Follow</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* "More like this" Section */}
      <MoreLikeThis />

      <TopEventsForYou />

    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 16,
  },
  imageContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 12,
    backgroundColor: '#FFFFFF',
    marginHorizontal: 30,
    borderRadius: 8
  },
  eventImage: {
    width: '100%',
    height: 200,
    borderRadius: 8,
  },
  eventTitle: {
    fontSize: RFValue(18, height),
    fontWeight: 'bold',
    marginVertical: 10,
    color: '#333',
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 5,
  },
  icon: {
    fontSize: 16,
    marginRight: 5,
  },
  dot: {
    fontSize: RFValue(12, height),
    marginHorizontal: 10,
    color: '#6A6A6A',
  },
  status: {
    fontSize: RFValue(13, height),
    fontWeight: '400',
    marginLeft: 5,
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 20,
  },
  attendButton: {
    backgroundColor: '#6200ee',
    padding: 10,
    borderRadius: 8,
    width: '48%',
    alignItems: 'center',
  },
  shareButton: {
    backgroundColor: '#f1f1f1',
    padding: 10,
    borderRadius: 8,
    width: '48%',
    alignItems: 'center',
  },
  attendText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  shareText: {
    color: '#333',
    fontWeight: 'bold',
  },
  tabs: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    marginVertical: 20,
  },
  tab: {
    paddingVertical: 10,
  },
  activeTab: {
    borderBottomWidth: 2,
    borderBottomColor: '#6200ee',
    paddingBottom: 10,
  },
  inactiveTab: {
    paddingBottom: 10,
  },
  activeTabText: {
    color: '#6200ea',
  },
  detailsSection: {
    // marginVertical: 20
  },
  sectionTitle: {
    marginVertical: 20,
    fontWeight: '600',
    fontSize: RFValue(17, height),
    color: '#151619'
  },
  tabText: {
    fontSize: RFValue(16, height),
    fontWeight: 'bold',
    color: '#3D3F4B',
  },

  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 8,
  },
  organizerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  organizerAvatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  organizerNameContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    alignContent: 'center'
  },
  organizerName: {
    fontSize: RFValue(16, height),
    fontWeight: '400',
    color: '#151619'
  },
  organizerUniversity: {
    color: '#999BAD',
    fontWeight: '400',
    fontSize: RFValue(13, height),
  },
  organizerTitle: {
    fontSize: RFValue(14, height),
    color: '#666',
  },
  followButton: {
    backgroundColor: '#6200ee',
    padding: 6,
    borderRadius: 6,
  },
  followText: {
    color: '#6500E0',
    fontWeight: '400',
    fontSize: RFValue(17, height),
    lineHeight: 22
  },
  moreLikeThisRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
  },
  moreLikeThisImage: {
    width: 60,
    height: 60,
    borderRadius: 8,
    marginRight: 10,
  },
  moreLikeThisText: {
    fontSize: RFValue(17, height),
    color: 'red',
    fontWeight: '600'
  },
});

export default EventDetailScreen;
