import React, { useState } from 'react';
import { Switch } from 'react-native';
import Box from '../Box';

type CustomSwitchProps = {
    value: boolean
    onValueChange: React.Dispatch<React.SetStateAction<boolean>>
}

const CustomSwitch = ({ value, onValueChange }: CustomSwitchProps) => {
    // const [isEnabled, setIsEnabled] = useState(false);

    // const toggleSwitch = () => setIsEnabled(previousState => !previousState);

    return (
        <Box>
            <Switch
                trackColor={{ false: "#767577", true: "#6500E0" }} // Purple track for 'true'
                thumbColor={value ? "#ffffff" : "#f4f3f4"} // White thumb for 'true'
                onValueChange={onValueChange}
                value={value}
            />
        </Box>
    );
};

export default CustomSwitch;
