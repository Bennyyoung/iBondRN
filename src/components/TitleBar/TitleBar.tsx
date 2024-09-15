import Box from "@/components/Box"
import LeftArrowIcon from "@/assets/svg/leftArrowIcon.svg"
import { RFValue } from "react-native-responsive-fontsize"
import { PropsWithChildren } from "react"

const TitleBar = ({ children }: PropsWithChildren) => {

    return (
        <Box flexDirection={'row'} justifyContent={'space-between'} alignItems={'center'} paddingHorizontal={'sm'}>
            <LeftArrowIcon />
            {children}
        </Box>
    )
}

export default TitleBar