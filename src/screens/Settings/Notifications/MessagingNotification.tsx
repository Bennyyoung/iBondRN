import { SvgIcon } from "@/assets/icons";
import Box from "@/components/Box";
import SettingsListItem from "@/components/SettingsListItem/SettingsListItem";
import Text from "@/components/Text";
import TitleBar from "@/components/TitleBar/TitleBar";
import { commonDataInNotificationsSettings, notifications } from "@/utils/notificationsSettingsData";
import { TouchableOpacity, View, FlatList, StyleSheet, Dimensions, TextStyle, ViewStyle } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";
import { StackNavigationProp } from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/native';
import { StackParamsList } from "@/navigation/types";
import { SwitchProps } from "@/components/types";
import Paragraph from "@/components/Paragraph/Paragraph";

const { height } = Dimensions.get('window')

// Define the structure for each notification item
interface Messaging {
    id: string;
    label: string;
    sublabel: string;
    switchProps: SwitchProps;
}

// Define the props for the Messaging component

// Define the props for the renderItem function
interface RenderItemProps {
    item: Messaging;
}

// Define the styles
interface Styles {
    container: ViewStyle;
    item: ViewStyle;
    label: TextStyle;
    optionsContainer: ViewStyle;
    options: TextStyle;
}

const MessagingNotification = () => {
    const navigation = useNavigation<StackNavigationProp<StackParamsList>>();

    const renderItem: React.FC<{ item: Messaging }> = ({ item }) => (
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
                        Messaging
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
                    <Paragraph>These are notifications letting you know you’ve received new messages.</Paragraph>
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

export default MessagingNotification

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