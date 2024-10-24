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
interface MarketPlaceSettings {
    id: string;
    label: string;
    sublabel: string;
    switchProps: SwitchProps;
}

// Define the props for the MarketPlaceSettings component

// Define the props for the renderItem function
interface RenderItemProps {
    item: MarketPlaceSettings;
}

// Define the styles
interface Styles {
    container: ViewStyle;
    item: ViewStyle;
    label: TextStyle;
    optionsContainer: ViewStyle;
    options: TextStyle;
}

const MarketPlace = () => {
    const renderItem: React.FC<{ item: MarketPlaceSettings }> = ({ item }) => (
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
                        Marketplace
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
                    <Paragraph>These are notifications about your marketplace listing and those you interact with.
                    </Paragraph>
                </Box>
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

export default MarketPlace

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