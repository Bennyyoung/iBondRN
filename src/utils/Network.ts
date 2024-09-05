import NetInfo from '@react-native-community/netinfo';

export default async function isNetworkConnected(): Promise<boolean> {
  try {
    const { isConnected } = await NetInfo.fetch();

    return Boolean(isConnected);
  } catch {
    return false;
  }
}
