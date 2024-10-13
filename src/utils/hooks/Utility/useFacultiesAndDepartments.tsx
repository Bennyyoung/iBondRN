import { useGetFacultiesAndDepartmentsQuery } from '@/reduxFolder/features/utility/service';
import { useDispatch } from 'react-redux';
import { showErrorToast, showSuccessToast } from '@/utils/helpers/toastHelper';
import { clearData } from '@/reduxFolder/features/utility/slice';

const useFetchFacultiesAndDepartments = () => {
  const { data, error, isLoading } = useGetFacultiesAndDepartmentsQuery();
  const dispatch = useDispatch();

  const fetchFacultiesAndDepartments = async () => {
    try {
      if (data) {
        showSuccessToast('Faculties and Departments fetched successfully');
        return data;
      }
    } catch (err) {
      dispatch(clearData());
      showErrorToast('Failed to fetch faculties and departments');
    }
  };

  return { data, error, isLoading, fetchFacultiesAndDepartments };
};

export default useFetchFacultiesAndDepartments;
