import { useGetInterestsQuery } from '@/redux/features/utility/service';
import { useDispatch } from 'react-redux';
import { showErrorToast, showSuccessToast } from '@/utils/helpers/toastHelper';
import { clearData } from '@/redux/features/utility/slice';

const useFetchInterests = () => {
  const { data, error, isLoading } = useGetInterestsQuery();
  const dispatch = useDispatch();

  const fetchInterests = async () => {
    try {
      if (data) {
        showSuccessToast('Interests fetched successfully');
        return data;
      }
    } catch (err) {
      dispatch(clearData());
      showErrorToast('Failed to fetch interests');
    }
  };

  return { data, error, isLoading, fetchInterests };
};

export default useFetchInterests;
