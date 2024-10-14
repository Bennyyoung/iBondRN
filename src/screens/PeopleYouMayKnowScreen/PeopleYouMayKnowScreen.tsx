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

// Define the structure for each notification item
interface PeopleYouMayKnow {
    id: string;
    label: string;
    sublabel: string;
    switchProps: SwitchProps;
}

// Define the props for the PeopleYouMayKnow component

// Define the props for the renderItem function
interface RenderItemProps {
    item: PeopleYouMayKnow
}

// Define the styles
interface Styles {
    container: ViewStyle;
    item: ViewStyle;
    label: TextStyle;
    optionsContainer: ViewStyle;
    options: TextStyle;
}

const PeopleYouMayKnowScreen = () => {
    const renderItem: React.FC<{ item: PeopleYouMayKnow }> = ({ item }) => (
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
                    People you may know
                    </Text>
                </Box>
                <TouchableOpacity onPress={() => { }}>
                    <Text>
                        {''}
                    </Text>
                </TouchableOpacity>
            </TitleBar>

            <Text style={styles.description}>These are notifications letting you know about new people.</Text>
            <FlatList
                style={styles.flatList}
                data={commonDataInNotificationsSettings}
                renderItem={renderItem}
                keyExtractor={(item) => item.id}
            />
        </View>
    );
};

export default PeopleYouMayKnowScreen

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