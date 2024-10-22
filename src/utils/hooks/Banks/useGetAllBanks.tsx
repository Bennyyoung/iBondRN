import { useGetBanksQuery } from "@/reduxFolder/features/banks/service";
import { useGetCommentsQuery, useGetRepliesQuery } from "@/reduxFolder/features/comments/service";
import { showErrorToast } from "@/utils/helpers/toastHelper";

// Get Comments Hook
const useGetAllBanks = () => {
    const { data, isLoading, isError, isSuccess } = useGetBanksQuery();

    if (isError) {
        showErrorToast('An error occurred while fetching banks');
    }

    return { data, isLoading, isError, isSuccess };
};

export default useGetAllBanks