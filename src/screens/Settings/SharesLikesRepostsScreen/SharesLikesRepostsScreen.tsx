import { SvgIcon } from "@/assets/icons";
import Box from "@/components/Box";
import SettingsListItem from "@/components/SettingsListItem/SettingsListItem";
import Text from "@/components/Text";
import TitleBar from "@/components/TitleBar/TitleBar";
import { SwitchProps } from "@/components/types";
import { commonDataInNotificationsSettings } from "@/utils/notificationsSettingsData";
import { TouchableOpacity, View, FlatList, StyleSheet, Dimensions, TextStyle, ViewStyle } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";

const { height } = Dimensions.get('window')

// Define the structure for each notification item
interface SharesLikesReposts {
    id: string;
    label: string;
    sublabel: string;
    switchProps: SwitchProps;
}

// Define the props for the SharesLikesReposts component

// Define the props for the renderItem function
interface RenderItemProps {
    item: SharesLikesReposts;
}

// Define the styles
interface Styles {
    container: ViewStyle;
    item: ViewStyle;
    label: TextStyle;
    optionsContainer: ViewStyle;
    options: TextStyle;
}

const SharesLikesRepostsScreen = () => {
    const renderItem: React.FC<{ item: SharesLikesReposts }> = ({ item }) => (
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
                        Shares, likes, reposts
                    </Text>
                </Box>
                <TouchableOpacity onPress={() => { }}>
                    <Text>
                        {''}
                    </Text>
                </TouchableOpacity>
            </TitleBar>

            <Text style={styles.description}>
                These are notifications for likes, shares and reposts on posts on your timeline and more.
            </Text>
            <FlatList
                style={styles.flatList}
                data={commonDataInNotificationsSettings}
                renderItem={renderItem}
                keyExtractor={(item) => item.id}
            />
        </View>
    );
};

export default SharesLikesRepostsScreen

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