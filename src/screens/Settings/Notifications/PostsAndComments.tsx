import { SvgIcon } from "@/assets/icons";
import Box from "@/components/Box";
import Paragraph from "@/components/Paragraph/Paragraph";
import SettingsListItem from "@/components/SettingsListItem/SettingsListItem";
import Text from "@/components/Text";
import TitleBar from "@/components/TitleBar/TitleBar";
import { SwitchProps } from "@/components/types";
import { notifications, commonDataInNotificationsSettings } from "@/utils/notificationsSettingsData";
import { TouchableOpacity, View, FlatList, StyleSheet, Dimensions, TextStyle, ViewStyle } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";

const { height } = Dimensions.get('window')

// Define the structure for each notification item
interface PostAndComments {
    id: string;
    label: string;
    sublabel: string;
    switchProps: SwitchProps;
}

// Define the props for the PostAndComments component

// Define the props for the renderItem function
interface RenderItemProps {
    item: PostAndComments;
}

// Define the styles
interface Styles {
    container: ViewStyle;
    item: ViewStyle;
    label: TextStyle;
    optionsContainer: ViewStyle;
    options: TextStyle;
}

const PostAndCommentsScreen = () => {
    const renderItem: React.FC<{ item: PostAndComments }> = ({ item }) => (
        <SettingsListItem
            key={item.id}
            label={item.label}
            sublabel={item.sublabel}
            switchProps={item.switchProps}
        />
    );

    return (
        <Box style={styles.container}>
            <TitleBar>
                <Box style={styles.mainTitleContainer}>
                    <Text style={styles.title}>
                        Posts & comments
                    </Text>
                </Box>
                <TouchableOpacity onPress={() => { }}>
                    <Text>
                        {''}
                    </Text>
                </TouchableOpacity>
            </TitleBar>

            <Box style={{ paddingHorizontal: 20, marginTop: 20 }}>
                <Box style={{ paddingRight: 50 }}>
                    <Paragraph>These are notifications about comments and replies on your posts.</Paragraph>
                </Box>
                <FlatList
                    showsVerticalScrollIndicator={false}
                    data={commonDataInNotificationsSettings}
                    renderItem={renderItem}
                    keyExtractor={(item) => item.id}
                />
            </Box>

        </Box>
    );
};

export default PostAndCommentsScreen

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