import { BASE_URL, IMAGE_BASE_URL } from '@env';

const baseURLs = {
  baseurl: BASE_URL,
  imageBaseUrl: IMAGE_BASE_URL
};

export const getBaseUrl = (type: keyof typeof baseURLs) => baseURLs[type];
