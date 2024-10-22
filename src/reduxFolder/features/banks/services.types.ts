export type GetBankRequest = {
    headquarters: string;
    address: string;
    name: string;
    sort_code: Record<string, any>;
    website: string;
    year_of_establishment: number;
    logo_url: string
}