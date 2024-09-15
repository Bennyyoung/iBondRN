import Box from "@/components/Box"
import Text from "@/components/Text"
import { FC, PropsWithChildren, ReactElement, ReactNode } from "react"
import { SvgProps } from "react-native-svg"

type TitleProps = {
    icon: ReactElement<SvgProps>
    children: ReactNode
}

const Title = ({ icon, children }: TitleProps) => {

    return (
        <Box justifyContent={'space-between'} flexDirection={'row'} paddingLeft={'md'} width={144} alignItems={'center'}>
            {icon}
            <Text fontWeight={600} style={{ color: '#151619' }}>{children}</Text>
        </Box>
    )
}

export default Title