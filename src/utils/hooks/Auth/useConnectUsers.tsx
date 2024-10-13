import { showErrorToast } from '@/utils/helpers/toastHelper';
import { useConnectUsersQuery } from '@/redux/features/auth/service';

const useConnectUsers = () => {
  const { data, isLoading, isError } = useConnectUsersQuery(null);

  const fetchConnectedUsers = async () => {
    try {
      if (data) {
        return data;
      } else {
        throw new Error('Failed to fetch connected users');
      }
    } catch (err: any) {
      showErrorToast(
        err?.data?.message ||
          'An error occurred while fetching connected users',
      );
      return null;
    }
  };

  return { isLoading, fetchConnectedUsers, isError };
};

export default useConnectUsers;
