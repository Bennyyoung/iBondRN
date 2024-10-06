import { BASE_URL } from '@env';

const baseURLs = {
  baseurl: BASE_URL,
};

export const getBaseUrl = (type: keyof typeof baseURLs) => baseURLs[type];
