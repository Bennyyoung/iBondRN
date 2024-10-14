import { SvgIcon } from "@/assets/icons";
import { TouchableOpacity, Text, View, StyleSheet, Dimensions, Switch } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";
import CustomSwitch from "../CustomSwitch/CustomSwitch";

const { height } = Dimensions.get('window')

interface SettingsListItemProps {
    label: string;
    sublabel?: string;
    options?: string[];
    onPress?: () => void;
    showChevron?: boolean;
    switchProps?: {
        value: boolean;
        onValueChange: (value: boolean) => void;
    };
}

const SettingsListItem: React.FC<SettingsListItemProps> = ({
    label,
    sublabel,
    options,
    onPress,
    showChevron = true,
    switchProps
}) => {
    return (
        <TouchableOpacity
            style={styles.item}
            onPress={onPress}
            disabled={!!switchProps} // Disable touch if there's a switch
        >
            <View style={styles.textContainer}>
                <Text style={styles.label}>{label}</Text>
                {sublabel && <Text style={styles.sublabel}>{sublabel}</Text>}
            </View>
            <View style={styles.rightContainer}>
                {options && <Text style={styles.options}>{options.join(', ')}</Text>}
                {showChevron && !switchProps && <SvgIcon name="chevron_forward" />}
                {switchProps && (
                    <CustomSwitch // Use the custom switch here
                        value={switchProps.value}
                        onValueChange={switchProps.onValueChange}
                    />

                )}
            </View>
        </TouchableOpacity>
    );
};

export default SettingsListItem


const styles = StyleSheet.create({
    item: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 26,
        borderBottomWidth: 0.3,
        borderBottomColor: '#c6c6c8',
        backgroundColor: 'white',
        // marginTop: 20
    },
    label: {
        fontSize: RFValue(16, height),
        color: '#151619',
        fontWeight: '400'
    },
    sublabel: {
        fontSize: RFValue(14, height),
        color: '#8e8e93',
        marginTop: 4,
    },
    rightContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    optionsContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    options: {
        fontSize: RFValue(15, height),
        color: '#8e8e93',
        marginRight: 8,
    },
    textContainer: {
        flex: 1,
    },
})