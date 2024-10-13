import Box from "@/components/Box"
import { SvgIcon } from "@/assets/icons"
import { useNavigation } from "@react-navigation/core"

type TitleBarProps = {
    children: React.ReactNode
}

const TitleBar = (props: TitleBarProps) => {
    const navigation = useNavigation()
    const { children } = props

    return (
        <Box
            flexDirection={'row'}
            justifyContent={'space-between'}
            alignItems={'center'}
            paddingHorizontal={'sm'}
            style={{marginTop: 10}}
        >
            <SvgIcon name="leftArrowIcon" size="sm" onPress={() => navigation.goBack()} />
            {children}
        </Box>
    )
}

export default TitleBar