// import React from 'react';
// import { View, ScrollView } from 'react-native';
// import EventList from './EventList';  // Assuming EventList is in the same directory

// const EventsScreen = () => {
//   return (
//     <ScrollView>
//       <EventList
//         title="How to Manage a Remote Work Lifestyle"
//         date="September 30, 2024"
//         time="10:00 AM"
//         platform="Google Meet"
//         location="Virtual"
//       />
//     </ScrollView>
//   );
// };

// export default EventsScreen;


import React from 'react';
import { ScrollView } from 'react-native';
import EventList from './EventList'; // Make sure to adjust the import path as per your file structure

const EventsScreen: React.FC = () => {
  return (
    <ScrollView>
      <EventList
        title="How to Manage a Remote Work Lifestyle"
        date="September 30, 2024"
        time="10:00 AM"
        platform="Google Meet"
        location="Virtual"
      />
      <EventList
        title="Building an Effective Team"
        date="October 10, 2024"
        time="2:00 PM"
        platform="Zoom"
        location="Hybrid"
      />
      {/* Add more EventList components as needed */}
    </ScrollView>
  );
};

export default EventsScreen;
