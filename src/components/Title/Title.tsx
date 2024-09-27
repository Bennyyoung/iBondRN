import Box from "@/components/Box"
import Text from "@/components/Text"
import { FC, PropsWithChildren, ReactElement, ReactNode } from "react"
import { StyleSheet } from "react-native"
import { RFValue } from "react-native-responsive-fontsize"
import { SvgProps } from "react-native-svg"

type TitleProps = {
    icon?: ReactElement<SvgProps>
    children: ReactNode
}

const Title = ({ icon, children }: TitleProps) => {

    return (
        <Box style={styles.container}>
            {icon}
            <Text style={styles.text}>{children}</Text>
        </Box>
    )
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'space-between',
        flexDirection: 'row',
        paddingLeft: 16, // Assuming 'md' is 16px, adjust as necessary
        width: 130,
        alignItems: 'center',
    },
    text: {
        fontWeight: '600',
        color: '#151619',
        fontSize: RFValue(20),
        textAlign: 'center',
    },
});

export default Title