import React, { useState } from 'react';
import { Switch} from 'react-native';
import Box from '../Box';

const CustomSwitch = () => {
    const [isEnabled, setIsEnabled] = useState(false);

    const toggleSwitch = () => setIsEnabled(previousState => !previousState);

    return (
        <Box>
            <Switch
                trackColor={{ false: "#767577", true: "#6500E0" }} // Purple track for 'true'
                thumbColor={isEnabled ? "#ffffff" : "#f4f3f4"} // White thumb for 'true'
                onValueChange={toggleSwitch}
                value={isEnabled}
            />
        </Box>
    );
};

export default CustomSwitch;
