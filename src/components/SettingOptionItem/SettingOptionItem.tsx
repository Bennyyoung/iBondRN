import { TouchableOpacity } from "react-native";
import Box from "../Box";
import Paragraph from "../Paragraph/Paragraph";
import SmallSizedParagraph from "../SmallSizedParagraph/SmallSizedParagraph";
import CustomSwitch from "../CustomSwitch/CustomSwitch";
import { SvgIcon } from "@/assets/icons";


const SettingOptionItem = ({ label, description, toggle, onPress }) => (
    <TouchableOpacity onPress={onPress} disabled={!onPress} style={{ paddingVertical: 10 }}>
        <Box style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
            <Box>
                <Paragraph>{label}</Paragraph>
                {description && <SmallSizedParagraph>{description}</SmallSizedParagraph>}
            </Box>
           { !toggle && <SvgIcon name="chevron_forward" />}
            {toggle !== undefined && (
                <CustomSwitch
                    value={toggle}
                    onValueChange={() => console.log(`${label} toggled`)}
                />
            )}
        </Box>
    </TouchableOpacity>
);

export default SettingOptionItem