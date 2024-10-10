import { showErrorToast, showSuccessToast } from '@/utils/helpers/toastHelper';
import { useUpdateUserInterestsMutation } from '@/redux/features/auth/service';

const useUpdateUserInterests = () => {
  const [updateUserInterests, { isLoading, isError }] =
    useUpdateUserInterestsMutation();

  const updateInterests = async (interests: string[]) => {
    try {
      const response = await updateUserInterests({ interests }).unwrap();

      if (response) {
        showSuccessToast('User interests updated successfully');
        return response;
      } else {
        throw new Error('Failed to update interests');
      }
    } catch (error: any) {
      showErrorToast(
        error?.data?.message || 'An error occurred while updating interests',
      );
      return null;
    }
  };

  return { isLoading, updateInterests, isError };
};

export default useUpdateUserInterests;
