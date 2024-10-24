import { SvgIcon } from "@/assets/icons";
import Box from "@/components/Box";
import Paragraph from "@/components/Paragraph/Paragraph";
import SettingsListItem from "@/components/SettingsListItem/SettingsListItem";
import Text from "@/components/Text";
import TitleBar from "@/components/TitleBar/TitleBar";
import { SwitchProps } from "@/components/types";
import { commonDataInNotificationsSettings } from "@/utils/notificationsSettingsData";
import { TouchableOpacity, View, FlatList, StyleSheet, Dimensions, TextStyle, ViewStyle } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";

const { height } = Dimensions.get('window')

// Define the structure for each notification item
interface TagAndMentions {
    id: string;
    label: string;
    sublabel: string;
    switchProps: SwitchProps;
}

// Define the props for the TagAndMentions component

// Define the props for the renderItem function
interface RenderItemProps {
    item: TagAndMentions;
}

// Define the styles
interface Styles {
    container: ViewStyle;
    item: ViewStyle;
    label: TextStyle;
    optionsContainer: ViewStyle;
    options: TextStyle;
}

const TagsAndMentions = () => {
    const renderItem: React.FC<{ item: TagAndMentions }> = ({ item }) => (
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
                        Tags And Mentions
                    </Text>
                </Box>
                <TouchableOpacity onPress={() => { }}>
                    <Text>
                        {''}
                    </Text>
                </TouchableOpacity>
            </TitleBar>

            <Box style={{ paddingHorizontal: 20, marginTop: 20 }}>
                <Box style={{ paddingRight: 50 }}></Box>
                <Paragraph>
                    These are notifications that you have been tagged or mentioned in a post, or comment.
                </Paragraph>
                <FlatList
                    showsVerticalScrollIndicator={false}
                    data={commonDataInNotificationsSettings}
                    renderItem={renderItem}
                    keyExtractor={(item) => item.id}
                />
            </Box>
        </View>
    );
};

export default TagsAndMentions

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
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
    mainTitleContainer: {
        paddingRight: RFValue(16),
        paddingLeft: RFValue(0),
        justifyContent: 'space-between',
        flexDirection: 'row',
        alignItems: 'center',
        gap: 16
    },
});