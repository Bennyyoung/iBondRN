import Box from '@/components/Box';
import { CustomButton } from '@/components/CustomButton';
import Text from '@/components/Text';
import React from 'react';
import { useDispatch } from 'react-redux';
import { logout } from '@/redux/features/auth/slices';

const DashboardTab = () => {
  // const { userData, token } = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch();

  const handleSubmit = async () => {
    dispatch(logout());
  };

  return (
    <Box alignItems="center" justifyContent="center">
      <Text textAlign="center" mt="Ml">
        Dashboard Tabs
      </Text>
      <CustomButton
        label="Log out"
        onPress={handleSubmit}
        backgroundColor="primary"
        labelProps={{ color: 'white', variant: 'regular14' }}
        borderRadius="smm"
        marginTop="lg"
        width="80%"
      />
    </Box>
  );
};

export default DashboardTab;
