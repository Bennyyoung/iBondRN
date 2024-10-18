import useFetchInstitutions from '@/utils/hooks/Utility/useInstitutions';

export const useSchoolOptions = () => {
  const { data: institutions, isLoading: isLoadingInstitutions } = useFetchInstitutions();

  const schoolOptions =
    institutions?.map(inst => ({
      id: inst.id,
      value: inst.name,
    })) || [];

  return {
    schoolOptions,
    isLoadingInstitutions,
  };
};
