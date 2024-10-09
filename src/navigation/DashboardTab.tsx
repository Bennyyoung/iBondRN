import Box from '@/components/Box';
import Text from '@/components/Text';
import { RootState } from '@/redux/store';
import React from 'react';
import { useSelector } from 'react-redux';

const DashboardTab = () => {
  const { userData, token } = useSelector((state: RootState) => state.user);
  console.log(userData, token, 'everything here');

  return (
    <Box>
      <Text>Dashboard Tabs</Text>
    </Box>
  );
};

export default DashboardTab;
