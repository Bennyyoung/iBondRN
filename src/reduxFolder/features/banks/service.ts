import { api } from '../rtkQuery/authApi';
import paths from './paths';
import { GetBankRequest } from './services.types';

export const iBondMobileApi = api.injectEndpoints({
    endpoints: (build) => ({
        getBanks: build.query<GetBankRequest[], void>({
            query: () => ({
                url: paths.getBanks,
                method: 'GET',
            }),
        }),
    })
})

export const {
    useGetBanksQuery
} = iBondMobileApi