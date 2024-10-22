import { showErrorToast, showSuccessToast } from '@/utils/helpers/toastHelper';
import { useFollowUserMutation } from '@/reduxFolder/features/auth/service';

const useUpdateUserFollowers = () => {
  const [followUser, { isLoading, isError }] = useFollowUserMutation();

  const updateFollowers = async (userId: number) => {
    try {
      const response = await followUser(userId).unwrap();

      if (response) {
        showSuccessToast('Success');
        return response;
      } else {
        throw new Error('Failed');
      }
    } catch (error: any) {
      showErrorToast(
        error?.data?.message || 'An error occurred while updating user account',
      );
      return null;
    }
  };

  return { isLoading, updateFollowers, isError };
};

export default useUpdateUserFollowers;
