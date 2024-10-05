import { useGetInstitutionsQuery } from '@/redux/features/utility/service';
import { useDispatch } from 'react-redux';
import { showErrorToast, showSuccessToast } from '@/utils/helpers/toastHelper';
import { clearData } from '@/redux/features/utility/slice';

const useFetchInstitutions = () => {
  const { data, error, isLoading } = useGetInstitutionsQuery();
  const dispatch = useDispatch();

  const fetchInstitutions = async () => {
    try {
      if (data) {
        showSuccessToast('Institutions fetched successfully');
        return data;
      }
    } catch (err) {
      dispatch(clearData());
      showErrorToast('Failed to fetch institutions');
    }
  };

  return { data, error, isLoading, fetchInstitutions };
};

export default useFetchInstitutions;
