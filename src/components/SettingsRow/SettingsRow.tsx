import { SvgIcon } from "@/assets/icons"
import Box from "@/components/Box"
import Text from "@/components/Text"
import { Dimensions, StyleSheet } from "react-native"
import { RFValue } from "react-native-responsive-fontsize"
import { SvgIconPackType } from "@/assets/icons"
import { TouchableOpacity } from "react-native-gesture-handler"
import { useNavigation } from '@react-navigation/native';
import React from "react"
import { StackNavigationProp } from "@react-navigation/stack"

type SettingsRowProps = {
    svgName?: SvgIconPackType
    title?: string
    link?: string
    section?: string
    options?: {
        id: number;
        title: string;
        link: string;
    }[]
}

const { height } = Dimensions.get('window')

const SettingsRow = (props: SettingsRowProps) => {
    const { svgName, title, link, section, options } = props;
    const navigation = useNavigation<StackNavigationProp<any>>();

    const displaySettingsRow = () => {
        // If there is a section, render the section and its options
        if (section && options) {
            return (
                <>
                    <Text style={styles.sectionTitle}>{section}</Text>
                    {options.map((option) => (
                        <TouchableOpacity
                            key={option.id}
                            style={styles.container}
                            onPress={() => navigation.navigate(option.link)}
                        >
                            <Box style={styles.subContainer}>
                                <Text style={styles.title}>{option.title}</Text>
                            </Box>
                            <SvgIcon name="rightArrow" size="sml" />
                        </TouchableOpacity>
                    ))}
                </>
            );
        }

        // If no section, render the single row
        return (
            <TouchableOpacity style={styles.container} onPress={() => {
                if (link) {
                    navigation.navigate(link);
                }
            }}>
                <Box style={styles.subContainer}>
                    {svgName ? <SvgIcon name={svgName} size="sml" /> : null}
                    <Text style={styles.title}>{title}</Text>
                </Box>
                <SvgIcon name="rightArrow" size="sml" />
            </TouchableOpacity>
        );
    };

    return (
        <>
            {displaySettingsRow()}
        </>
    );
};



export default SettingsRow

const styles = StyleSheet.create({
    sectionTitle: {
        color: '#3D3F4B',
        fontSize: RFValue(13, height),
        fontWeight: '400'
    },
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderTopColor: '#E5E5E5',
        borderBottomColor: '#E5E5E5',
        marginVertical: 20
    },
    subContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    title: {
        marginLeft: 20,
        color: '#151619',
        fontWeight: '400',
        fontSize: RFValue(16, height)
    }
})