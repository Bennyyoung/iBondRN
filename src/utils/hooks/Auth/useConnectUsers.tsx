import { showErrorToast } from '@/utils/helpers/toastHelper';
import { useConnectUsersMutation } from '@/redux/features/auth/service';
import { ConnectUsersRequest } from '@/redux/features/auth/services.types';

const useConnectUsers = () => {
  const [connectUsers, { isLoading, isError }] = useConnectUsersMutation();

  const fetchConnectedUsers = async (connectRequest: ConnectUsersRequest) => {
    try {
      const response = await connectUsers(connectRequest).unwrap();
      return response;
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
