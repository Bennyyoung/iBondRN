import { SvgIcon } from "@/assets/icons";
import Box from "@/components/Box";
import SettingsListItem from "@/components/SettingsListItem/SettingsListItem";
import Text from "@/components/Text";
import TitleBar from "@/components/TitleBar/TitleBar";
import { SwitchProps } from "@/components/types";
import { notifications, commonDataInNotificationsSettings } from "@/utils/notificationsSettingsData";
import { TouchableOpacity, View, FlatList, StyleSheet, Dimensions, TextStyle, ViewStyle } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";

const { height } = Dimensions.get('window')

const data = [
    {
        label: "Responses",
        switchProps: {
            value: true, // Switch is turned on
            onValueChange: (newValue: boolean) => {
                console.log("Responses switched to: ", newValue);
            },
        },
    },
    {
        label: "Event Changes",
        switchProps: {
            value: true, // Switch is turned on
            onValueChange: (newValue: boolean) => {
                console.log("Event Changes switched to: ", newValue);
            },
        },
    },
    {
        label: "Suggestions",
        switchProps: {
            value: true, // Switch is turned on
            onValueChange: (newValue: boolean) => {
                console.log("Suggestions switched to: ", newValue);
            },
        },
    },
];

// Define the structure for each notification item
interface EventsSettings {
    id: string;
    label: string;
    sublabel: string;
    switchProps: SwitchProps;
}

// Define the props for the EventsSettings component

// Define the props for the renderItem function
interface RenderItemProps {
    item: EventsSettings
}

// Define the styles
interface Styles {
    container: ViewStyle;
    item: ViewStyle;
    label: TextStyle;
    optionsContainer: ViewStyle;
    options: TextStyle;
}

const EventsSettingsScreen = () => {
    const renderItem: React.FC<{ item: EventsSettings }> = ({ item }) => (
        <SettingsListItem
            key={item.id}
            label={item.label}
            sublabel={item.sublabel}
            switchProps={item.switchProps}
        />
    );

    return (
        <View style={styles.container}>
            <TitleBar>
                <Box style={styles.mainTitleContainer}>
                    <Text style={styles.title}>
                        Events
                    </Text>
                </Box>
                <TouchableOpacity onPress={() => { }}>
                    <Text>
                        {''}
                    </Text>
                </TouchableOpacity>
            </TitleBar>

            <Text style={styles.description}>These are notifications about events you host or responded to.</Text>
            <FlatList
                style={styles.flatList}
                data={commonDataInNotificationsSettings}
                renderItem={renderItem}
                keyExtractor={(item) => item.id}
            />

            <Text style={{ fontWeight: '400', fontSize: RFValue(13, height), marginTop: -190 }}>Receive notifications for:</Text>

            <FlatList
                style={styles.flatList}
                data={data}
                renderItem={renderItem}
                keyExtractor={(item) => item.id}
            />
        </View>
    );
};

export default EventsSettingsScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        paddingHorizontal: 10
    },
    title: {
        fontWeight: '600',
        fontSize: RFValue(17, height),
    },
    description: {
        fontSize: RFValue(16, height),
        fontWeight: 400,
        paddingRight: 50,
        marginTop: 50
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