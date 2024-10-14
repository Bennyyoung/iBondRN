import { SvgIcon } from "@/assets/icons";
import Box from "@/components/Box";
import SettingsListItem from "@/components/SettingsListItem/SettingsListItem";
import Text from "@/components/Text";
import TitleBar from "@/components/TitleBar/TitleBar";
import { notifications } from "@/utils/notificationsSettingsData";
import { TouchableOpacity, View, FlatList, StyleSheet, Dimensions, TextStyle, ViewStyle } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";
import { StackNavigationProp } from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/native';
import { StackParamsList } from "@/navigation/types";

const { height } = Dimensions.get('window')

// Define the structure for each notification item
interface NotificationItem {
  id: string;
  label: string;
  options: string[];
  link: string;
}

// Define the props for the NotificationSettingsScreen component

// Define the props for the renderItem function
interface RenderItemProps {
  item: NotificationItem;
}

// Define the styles
interface Styles {
  container: ViewStyle;
  item: ViewStyle;
  label: TextStyle;
  optionsContainer: ViewStyle;
  options: TextStyle;
}

const NotificationSettingsScreen = () => {
  const navigation = useNavigation<StackNavigationProp<StackParamsList>>();

  const renderItem: React.FC<{ item: NotificationItem }> = ({ item }) => (
    <SettingsListItem
      key={item.id}
      label={item.label}
      options={item.options}
      onPress={() => navigation.navigate(item.link)}
    />
  );

  return (
    <View style={styles.container}>
      <TitleBar>
        <Box style={styles.mainTitleContainer}>
          <Text style={styles.notifications}>
            Notifications
          </Text>
        </Box>
        <TouchableOpacity onPress={() => { }}>
          <Text>
            {''}
          </Text>
        </TouchableOpacity>
      </TitleBar>
      <FlatList
        style={styles.flatList}
        data={notifications}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};

export default NotificationSettingsScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  notifications: {
    fontWeight: '600',
    fontSize: RFValue(17, height),
  },
  flatList: {
    paddingHorizontal: 10
  },
  mainTitleContainer: {
    paddingRight: RFValue(16),
    paddingLeft: RFValue(0),
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16
  },
});