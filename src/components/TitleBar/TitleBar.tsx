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
            borderBottomWidth={0.2}
            style={{ paddingVertical: 10, borderBottomColor: '#c6c6c8'}}

        >
            <SvgIcon name="leftArrowIcon" size="sm" onPress={() => navigation.goBack()} />
            {children}
        </Box>
    )
}

export default TitleBar