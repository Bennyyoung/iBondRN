import useFetchFacultiesAndDepartments from '@/utils/hooks/Utility/useFacultiesAndDepartments';

export const useFacultyOptions = () => {
  const { data: facultiesAndDepartments, isLoading: isLoadingFaculties } = useFetchFacultiesAndDepartments();

  const facultyOptions = facultiesAndDepartments
    ? Object.keys(facultiesAndDepartments.Faculties).map(faculty => ({
        id: faculty,
        value: faculty,
      }))
    : [];

  return {
    facultyOptions,
    isLoadingFaculties,
  };
};
