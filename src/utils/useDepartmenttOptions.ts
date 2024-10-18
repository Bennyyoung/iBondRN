import useFetchFacultiesAndDepartments from '@/utils/hooks/Utility/useFacultiesAndDepartments';

export const useDepartmentOptions = (faculty: string) => {
  const { data: facultiesAndDepartments, isLoading: isLoadingFaculties } = useFetchFacultiesAndDepartments();

  const departmentOptions =
    faculty && facultiesAndDepartments
      ? (facultiesAndDepartments.Faculties[faculty] || []).map(dept => ({
          id: dept,
          value: dept,
        }))
      : [];

  return {
    departmentOptions,
    isLoadingFaculties,
  };
};
